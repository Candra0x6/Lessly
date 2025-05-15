import Types "Types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Nat16 "mo:base/Nat16";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";

actor WebsiteRenderer {
  type HttpRequest = Types.HttpRequest;
  type HttpResponse = Types.HttpResponse;
  type ProjectId = Types.ProjectId;
  type AssetId = Types.AssetId;
  type Domain = Types.Domain;
  type StreamingCallbackToken = Types.StreamingCallbackToken;
  type StreamingCallbackResponse = Types.StreamingCallbackResponse;
  type RenderError = Types.RenderError;
  
  // Reference to the WebsiteStorage canister
  private let storageCanister : actor {
    getAssetMetadata : (AssetId) -> async Result.Result<Types.Asset, Types.AssetError>;
    getAssetChunk : (AssetId, Nat) -> async Result.Result<Blob, Types.AssetError>;
    getProjectAssets : (ProjectId) -> async [Types.Asset];
  } = actor("website-storage-canister-id");
  
  // Reference to the ProjectManagement canister
  private let projectCanister : actor {
    getProject : (ProjectId) -> async Result.Result<Types.Project, Types.ProjectError>;
  } = actor("project-management-canister-id");
  
  // Cache for domain mappings
  private stable var domainEntries : [(Text, Domain)] = [];
  private var domains = HashMap.HashMap<Text, Domain>(0, Text.equal, Text.hash);
  
  // Cache for content type mappings
  private let contentTypes = HashMap.HashMap<Text, Text>(10, Text.equal, Text.hash);
  
  // Initialize common content types
  private func initContentTypes() {
    contentTypes.put("html", "text/html; charset=UTF-8");
    contentTypes.put("css", "text/css; charset=UTF-8");
    contentTypes.put("js", "application/javascript; charset=UTF-8");
    contentTypes.put("json", "application/json; charset=UTF-8");
    contentTypes.put("png", "image/png");
    contentTypes.put("jpg", "image/jpeg");
    contentTypes.put("jpeg", "image/jpeg");
    contentTypes.put("svg", "image/svg+xml");
    contentTypes.put("ico", "image/x-icon");
    contentTypes.put("woff", "font/woff");
    contentTypes.put("woff2", "font/woff2");
    contentTypes.put("ttf", "font/ttf");
  };
  
  // System upgrade hooks for orthogonal persistence
  system func preupgrade() {
    domainEntries := Iter.toArray(domains.entries());
  };
  
  system func postupgrade() {
    domains := HashMap.fromIter<Text, Domain>(domainEntries.vals(), 0, Text.equal, Text.hash);
    domainEntries := [];
    initContentTypes();
  };
  
  // Link a custom domain to a project
  public shared(msg) func linkDomain(domain_name: Text, project_id: ProjectId) : async Result.Result<Domain, Text> {
    // Check if domain already exists
    switch (domains.get(domain_name)) {
      case (?existing) {
        return #err("Domain is already linked to a project");
      };
      case null {
        // Verify the project exists and caller has access
        try {
          let projectResult = await projectCanister.getProject(project_id);
          
          switch (projectResult) {
            case (#ok(project)) {
              if (project.owner != msg.caller) {
                return #err("Only the project owner can link domains");
              };
              
              let domain : Domain = {
                name = domain_name;
                project_id = project_id;
                created_at = Time.now();
              };
              
              domains.put(domain_name, domain);
              return #ok(domain);
            };
            case (#err(_)) {
              return #err("Project not found");
            };
          };
        } catch (e) {
          return #err("Error connecting to project canister");
        };
      };
    };
  };
  
  // Get the project ID from a URL
  private func getProjectIdFromUrl(url: Text) : ?ProjectId {
    // Extract domain or subdomain from URL
    let parts = Text.split(url, #text("/"));
    let host = switch (Iter.toArray(parts)[0]) {
      case ("http:" or "https:") {
        // URL has protocol, get the host part
        let hostParts = Text.split(Iter.toArray(parts)[2], #text(":"));
        Iter.toArray(hostParts)[0];
      };
      case (_) {
        // URL doesn't have protocol, first part is the host
        Iter.toArray(parts)[0];
      };
    };
    
    // Check if this is a custom domain
    switch (domains.get(host)) {
      case (?domain) {
        ?domain.project_id;
      };
      case null {
        // Check if this is a default *.ic0.app URL
        let hostParts = Text.split(host, #text("."));
        let parts = Iter.toArray(hostParts);
        
        if (parts.size() >= 3 and parts[parts.size() - 2] == "ic0" and parts[parts.size() - 1] == "app") {
          ?parts[0];
        } else {
          null;
        };
      };
    };
  };
  
  // Get the asset path from a URL
  private func getAssetPathFromUrl(url: Text) : Text {
    let parts = Text.split(url, #text("?"));
    let pathWithoutQuery = Iter.toArray(parts)[0];
    
    let pathParts = Text.split(pathWithoutQuery, #text("/"));
    let pathArray = Iter.toArray(pathParts);
    
    // Skip the first part (protocol or empty) and the host
    var path = "";
    for (i in Iter.range(3, pathArray.size() - 1)) {
      if (i < pathArray.size()) {
        path := path # "/" # pathArray[i];
      };
    };
    
    if (path == "") {
      "/index.html";
    } else if (Text.endsWith(path, #text("/"))) {
      path # "index.html";
    } else if (not Text.contains(path, #text("."))) {
      path # "/index.html";
    } else {
      path;
    };
  };
  
  // HTTP request handler
  public query func http_request(request: HttpRequest) : async HttpResponse {
    let url = request.url;
    
    // Get project ID from URL
    switch (getProjectIdFromUrl(url)) {
      case (?project_id) {
        // Get the asset path
        let asset_path = getAssetPathFromUrl(url);
        
        // Try to find the asset in the project
        try {
          let projectAssets = await storageCanister.getProjectAssets(project_id);
          
          // Find the asset by path
          let matchingAssets = Array.filter<Types.Asset>(projectAssets, func(asset) {
            asset.path == asset_path;
          });
          
          if (matchingAssets.size() > 0) {
            let asset = matchingAssets[0];
            
            // Check if we have this asset's first chunk
            try {
              let firstChunkResult = await storageCanister.getAssetChunk(asset.id, 0);
              
              switch (firstChunkResult) {
                case (#ok(chunk)) {
                  // Determine if we need streaming
                  if (asset.size > chunk.size()) {
                    // Set up streaming for large assets
                    let streamingToken : Types.StreamingCallbackToken = {
                      asset_id = asset.id;
                      chunk_index = 1; // Next chunk
                      project_id = project_id;
                    };
                    
                    return {
                      status_code = 200;
                      headers = [
                        ("Content-Type", asset.content_type),
                        ("Cache-Control", "public, max-age=3600")
                      ];
                      body = chunk;
                      streaming_strategy = ?#Callback({
                        callback = http_streaming_callback;
                        token = streamingToken;
                      });
                    };
                  } else {
                    // Small asset, return in one response
                    return {
                      status_code = 200;
                      headers = [
                        ("Content-Type", asset.content_type),
                        ("Cache-Control", "public, max-age=3600")
                      ];
                      body = chunk;
                      streaming_strategy = null;
                    };
                  };
                };
                case (#err(_)) {
                  return {
                    status_code = 404;
                    headers = [("Content-Type", "text/plain")];
                    body = Text.encodeUtf8("Asset content not found");
                    streaming_strategy = null;
                  };
                };
              };
            } catch (e) {
              return {
                status_code = 500;
                headers = [("Content-Type", "text/plain")];
                body = Text.encodeUtf8("Error retrieving asset chunk");
                streaming_strategy = null;
              };
            };
          } else {
            return {
              status_code = 404;
              headers = [("Content-Type", "text/plain")];
              body = Text.encodeUtf8("Asset not found: " # asset_path);
              streaming_strategy = null;
            };
          };
        } catch (e) {
          return {
            status_code = 500;
            headers = [("Content-Type", "text/plain")];
            body = Text.encodeUtf8("Error retrieving assets");
            streaming_strategy = null;
          };
        };
      };
      case null {
        return {
          status_code = 404;
          headers = [("Content-Type", "text/plain")];
          body = Text.encodeUtf8("Website not found");
          streaming_strategy = null;
        };
      };
    };
  };
  
  // Streaming callback for large assets
  public query func http_streaming_callback(token: StreamingCallbackToken) : async StreamingCallbackResponse {
    let asset_id = token.asset_id;
    let chunk_index = token.chunk_index;
    
    try {
      let chunkResult = await storageCanister.getAssetChunk(asset_id, chunk_index);
      
      switch (chunkResult) {
        case (#ok(chunk)) {
          // Try to get the next chunk to see if we need to continue streaming
          try {
            let nextChunkResult = await storageCanister.getAssetChunk(asset_id, chunk_index + 1);
            
            switch (nextChunkResult) {
              case (#ok(_)) {
                // More chunks available
                return {
                  body = chunk;
                  token = ?{
                    asset_id = asset_id;
                    chunk_index = chunk_index + 1;
                    project_id = token.project_id;
                  };
                };
              };
              case (#err(_)) {
                // No more chunks
                return {
                  body = chunk;
                  token = null;
                };
              };
            };
          } catch (e) {
            // Error checking next chunk, assume this is the last one
            return {
              body = chunk;
              token = null;
            };
          };
        };
        case (#err(_)) {
          // Chunk not found
          return {
            body = Blob.fromArray([]);
            token = null;
          };
        };
      };
    } catch (e) {
      return {
        body = Blob.fromArray([]);
        token = null;
      };
    };
  };
}