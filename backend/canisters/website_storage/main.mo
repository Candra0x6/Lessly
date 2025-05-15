import Types "Types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";

actor WebsiteStorage {
  type Asset = Types.Asset;
  type AssetId = Types.AssetId;
  type ProjectId = Types.ProjectId;
  type UserId = Types.UserId;
  type VersionId = Types.VersionId;
  type Chunk = Types.Chunk;
  type AssetError = Types.AssetError;
  type StoreAssetResult = Types.StoreAssetResult;
  
  // Stable storage for asset metadata
  private stable var assetEntries : [(AssetId, Asset)] = [];
  private var assets = HashMap.HashMap<AssetId, Asset>(0, Text.equal, Text.hash);
  
  // Stable storage for asset content chunks
  private stable var chunkEntries : [((AssetId, Nat), Blob)] = [];
  private var chunks = HashMap.HashMap<(AssetId, Nat), Blob>(0, func(a, b) {
    Text.equal(a.0, b.0) and a.1 == b.1
  }, func(k) {
    Text.hash(k.0) + Nat.hash(k.1)
  });
  
  // Stable storage for project access control
  private stable var projectAccessEntries : [(ProjectId, [UserId])] = [];
  private var projectAccess = HashMap.HashMap<ProjectId, [UserId]>(0, Text.equal, Text.hash);
  
  // System upgrade hooks for orthogonal persistence
  system func preupgrade() {
    assetEntries := Iter.toArray(assets.entries());
    chunkEntries := Iter.toArray(chunks.entries());
    projectAccessEntries := Iter.toArray(projectAccess.entries());
  };
  
  system func postupgrade() {
    assets := HashMap.fromIter<AssetId, Asset>(assetEntries.vals(), 0, Text.equal, Text.hash);
    chunks := HashMap.fromIter<(AssetId, Nat), Blob>(chunkEntries.vals(), 0, func(a, b) {
      Text.equal(a.0, b.0) and a.1 == b.1
    }, func(k) {
      Text.hash(k.0) + Nat.hash(k.1)
    });
    projectAccess := HashMap.fromIter<ProjectId, [UserId]>(projectAccessEntries.vals(), 0, Text.equal, Text.hash);
    assetEntries := [];
    chunkEntries := [];
    projectAccessEntries := [];
  };
  
  // Check if user has access to project
  private func hasAccess(userId: UserId, projectId: ProjectId) : Bool {
    switch (projectAccess.get(projectId)) {
      case (?users) {
        Array.find<UserId>(users, func(id) { id == userId });
      };
      case null {
        false;
      };
    };
  };
  
  // Configure access for a project
  public shared(msg) func setProjectAccess(projectId: ProjectId, users: [UserId]) : async Bool {
    let caller = msg.caller;
    
    // Check if caller is already in the access list or if this is a new project
    if (hasAccess(caller, projectId) or projectAccess.get(projectId) == null) {
      projectAccess.put(projectId, users);
      return true;
    };
    
    return false;
  };
  
  // Store asset metadata
  public shared(msg) func storeAssetMetadata(
    project_id: ProjectId,
    filename: Text,
    content_type: Text,
    size: Nat,
    version_id: VersionId,
    asset_type: Types.AssetType,
    path: Text
  ) : async Result.Result<Asset, AssetError> {
    let caller = msg.caller;
    
    // Check access
    if (not hasAccess(caller, project_id)) {
      return #err(#Unauthorized);
    };
    
    let now = Time.now();
    let asset_id = project_id # "-" # path # "-" # filename;
    
    // Check if asset already exists
    let existingAsset = assets.get(asset_id);
    
    let asset : Asset = {
      id = asset_id;
      project_id = project_id;
      filename = filename;
      content_type = content_type;
      size = size;
      created_at = switch (existingAsset) { 
        case (?a) { a.created_at }; 
        case null { now }; 
      };
      updated_at = now;
      version_id = version_id;
      asset_type = asset_type;
      path = path;
    };
    
    assets.put(asset_id, asset);
    return #ok(asset);
  };
  
  // Store a chunk of asset data
  public shared(msg) func storeAssetChunk(asset_id: AssetId, index: Nat, data: Blob) : async Result.Result<(), AssetError> {
    let caller = msg.caller;
    
    // Get the asset to check permissions
    switch (assets.get(asset_id)) {
      case (?asset) {
        // Check access
        if (not hasAccess(caller, asset.project_id)) {
          return #err(#Unauthorized);
        };
        
        // Store the chunk
        chunks.put((asset_id, index), data);
        return #ok();
      };
      case null {
        return #err(#NotFound);
      };
    };
  };
  
  // Get asset metadata
  public query func getAssetMetadata(asset_id: AssetId) : async Result.Result<Asset, AssetError> {
    switch (assets.get(asset_id)) {
      case (?asset) {
        return #ok(asset);
      };
      case null {
        return #err(#NotFound);
      };
    };
  };
  
  // Get a chunk of asset data
  public query func getAssetChunk(asset_id: AssetId, index: Nat) : async Result.Result<Blob, AssetError> {
    switch (chunks.get((asset_id, index))) {
      case (?data) {
        return #ok(data);
      };
      case null {
        return #err(#NotFound);
      };
    };
  };
  
  // Get all assets for a project
  public query func getProjectAssets(project_id: ProjectId) : async [Asset] {
    let projectAssets = Buffer.Buffer<Asset>(0);
    
    for ((_, asset) in assets.entries()) {
      if (asset.project_id == project_id) {
        projectAssets.add(asset);
      };
    };
    
    return Buffer.toArray(projectAssets);
  };
  
  // Get assets for a specific project version
  public query func getVersionAssets(project_id: ProjectId, version_id: VersionId) : async [Asset] {
    let versionAssets = Buffer.Buffer<Asset>(0);
    
    for ((_, asset) in assets.entries()) {
      if (asset.project_id == project_id and asset.version_id == version_id) {
        versionAssets.add(asset);
      };
    };
    
    return Buffer.toArray(versionAssets);
  };
  
  // Delete an asset
  public shared(msg) func deleteAsset(asset_id: AssetId) : async Result.Result<(), AssetError> {
    let caller = msg.caller;
    
    switch (assets.get(asset_id)) {
      case (?asset) {
        // Check access
        if (not hasAccess(caller, asset.project_id)) {
          return #err(#Unauthorized);
        };
        
        // Delete all chunks
        var index = 0;
        var chunk_exists = true;
        
        while (chunk_exists) {
          switch (chunks.get((asset_id, index))) {
            case (?_) {
              chunks.delete((asset_id, index));
              index += 1;
            };
            case null {
              chunk_exists := false;
            };
          };
        };
        
        // Delete the asset metadata
        assets.delete(asset_id);
        return #ok();
      };
      case null {
        return #err(#NotFound);
      };
    };
  };
}