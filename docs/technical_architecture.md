# Lessly Technical Architecture

This document provides a technical perspective on the Lessly platform architecture, including data models, canister interfaces, and communication patterns.

## System Architecture Overview

The Lessly platform is built on the Internet Computer Protocol (ICP), using a modular canister design to separate concerns and enable efficient scaling.

```
┌────────────────────────────────────────────────────────────────────┐
│                        Frontend Application                        │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐│
│ │User Dashboard│ │Website Editor│ │Asset Manager │ │Admin Panel   ││
└─┬─────────────┬┴─┬─────────────┬┴─┬─────────────┬┴─┬─────────────┬┘
  │             │   │             │   │             │   │             │
  ▼             ▼   ▼             ▼   ▼             ▼   ▼             ▼
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│    User    │ │  Project   │ │  Website   │ │  Website   │
│ Management │ │ Management │ │  Storage   │ │  Renderer  │
│  Canister  │ │  Canister  │ │  Canister  │ │  Canister  │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
       │              │              │              │
       └──────────────┴──────────────┴──────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │Internet Computer│
                    │   Blockchain    │
                    └─────────────────┘
```

## Data Models

### User Management Canister

```
type User = {
  id: Principal;
  username: Text;
  email: Text;
  created_at: Time;
  updated_at: Time;
  subscription_tier: SubscriptionTier;
  principal: Principal;
};

type SubscriptionTier = {
  #free;
  #pro;
  #enterprise;
};

type AuthError = {
  #UserNotFound;
  #Unauthorized;
  #InvalidCredentials;
};
```

### Project Management Canister

```
type Project = {
  id: Text;
  name: Text;
  owner: Principal;
  description: Text;
  created_at: Int;
  updated_at: Int;
  published: Bool;
  url_slug: Text;
  collaborators: [Principal];
  current_version: Text;
  template_id: ?Text;
};

type ProjectVersion = {
  id: Text;
  project_id: Text;
  created_at: Int;
  created_by: Principal;
  description: Text;
};

type ProjectError = {
  #NotFound;
  #Unauthorized;
  #InvalidInput;
};
```

### Website Storage Canister

```
type Asset = {
  id: Text;
  project_id: Text;
  filename: Text;
  content_type: Text;
  size: Nat;
  created_at: Int;
  updated_at: Int;
  version_id: Text;
  asset_type: AssetType;
  path: Text;
};

type AssetType = {
  #html;
  #css;
  #javascript;
  #image;
  #document;
  #other;
};

type Chunk = Blob;

type AssetError = {
  #NotFound;
  #Unauthorized;
  #InvalidInput;
  #StorageLimitExceeded;
};

type StoreAssetResult = {
  #ok: Asset;
  #err: AssetError;
};
```

### Website Renderer Canister

```
type HttpRequest = {
  method: Text;
  url: Text;
  headers: [(Text, Text)];
  body: Blob;
};

type HttpResponse = {
  status_code: Nat16;
  headers: [(Text, Text)];
  body: Blob;
  streaming_strategy: ?StreamingStrategy;
};

type StreamingStrategy = {
  #Callback: {
    callback: query (StreamingCallbackToken) -> async StreamingCallbackResponse;
    token: StreamingCallbackToken;
  };
};

type StreamingCallbackToken = {
  asset_id: Text;
  chunk_index: Nat;
  project_id: Text;
};

type StreamingCallbackResponse = {
  body: Blob;
  token: ?StreamingCallbackToken;
};

type Domain = {
  name: Text;
  project_id: Text;
  created_at: Int;
};

type RenderError = {
  #NotFound;
  #Unauthorized;
  #AssetError;
};
```

## Canister Interface Definitions

### User Management Canister

```
actor UserManagement {
  // Create a new user profile
  public shared (msg) func createUser(username: Text, email: Text) 
    : async Result.Result<User, Text>;
  
  // Get user profile by ID
  public query func getUser(userId: Principal)
    : async Result.Result<User, AuthError>;
    
  // Get user by principal identifier
  public shared func getUserByPrincipal(principal: Principal)
    : async ?User;
  
  // Update subscription tier
  public shared (msg) func updateSubscription(tier: SubscriptionTier)
    : async Result.Result<User, AuthError>;
}
```

### Project Management Canister

```
actor ProjectManagement {
  // Create a new project
  public shared (msg) func createProject(name: Text, description: Text, template_id: ?Text)
    : async Result.Result<Project, ProjectError>;
  
  // Get project by ID
  public query func getProject(projectId: Text)
    : async Result.Result<Project, ProjectError>;
  
  // Get all projects for a user
  public query func getUserProjects(userId: Principal)
    : async [Project];
  
  // Update project metadata
  public shared (msg) func updateProject(projectId: Text, name: ?Text, description: ?Text)
    : async Result.Result<Project, ProjectError>;
  
  // Publish or unpublish a project
  public shared (msg) func publishProject(projectId: Text, publish: Bool)
    : async Result.Result<Project, ProjectError>;
  
  // Create a new version of a project
  public shared (msg) func createVersion(projectId: Text, description: Text)
    : async Result.Result<ProjectVersion, ProjectError>;
  
  // Get all versions of a project
  public query func getProjectVersions(projectId: Text)
    : async Result.Result<[ProjectVersion], ProjectError>;
}
```

### Website Storage Canister

```
actor WebsiteStorage {
  // Configure project access
  public shared (msg) func setProjectAccess(projectId: Text, users: [Principal])
    : async Bool;
  
  // Store asset metadata
  public shared (msg) func storeAssetMetadata(
    project_id: Text,
    filename: Text,
    content_type: Text,
    size: Nat,
    version_id: Text,
    asset_type: AssetType,
    path: Text
  ) : async Result.Result<Asset, AssetError>;
  
  // Store a chunk of asset data
  public shared (msg) func storeAssetChunk(asset_id: Text, index: Nat, data: Blob)
    : async Result.Result<(), AssetError>;
  
  // Get asset metadata
  public query func getAssetMetadata(asset_id: Text)
    : async Result.Result<Asset, AssetError>;
  
  // Get a chunk of asset data
  public query func getAssetChunk(asset_id: Text, index: Nat)
    : async Result.Result<Blob, AssetError>;
  
  // Get all assets for a project
  public query func getProjectAssets(project_id: Text)
    : async [Asset];
  
  // Get assets for a specific project version
  public query func getVersionAssets(project_id: Text, version_id: Text)
    : async [Asset];
  
  // Delete an asset
  public shared (msg) func deleteAsset(asset_id: Text)
    : async Result.Result<(), AssetError>;
}
```

### Website Renderer Canister

```
actor WebsiteRenderer {
  // Link a custom domain to a project
  public shared (msg) func linkDomain(domain_name: Text, project_id: Text)
    : async Result.Result<Domain, Text>;
  
  // HTTP request handler
  public func http_request(request: HttpRequest)
    : async HttpResponse;
  
  // Streaming callback for large assets
  public func http_streaming_callback(token: StreamingCallbackToken)
    : async StreamingCallbackResponse;
  
  // Get all domains linked to a project
  public query func getProjectDomains(project_id: Text)
    : async [Domain];
}
```

## Inter-Canister Communication Patterns

### Authentication Flow

```
┌──────────┐     ┌───────────────┐     ┌──────────────┐
│ Frontend │     │Internet       │     │User          │
│          │────►│Identity       │────►│Management    │
│          │◄────│               │◄────│Canister      │
└──────────┘     └───────────────┘     └──────────────┘
```

1. Frontend redirects user to Internet Identity
2. User authenticates with Internet Identity
3. Internet Identity returns authentication principal
4. User Management canister verifies the principal
5. User Management returns user profile to frontend

### Project Creation Flow

```
┌──────────┐     ┌───────────────┐     ┌──────────────┐
│ Frontend │────►│Project        │────►│Website       │
│          │◄────│Management     │◄────│Storage       │
└──────────┘     └───────────────┘     └──────────────┘
```

1. Frontend sends project creation request to Project Management
2. Project Management creates project and initial version
3. Project Management sets up access control with Website Storage
4. Website Storage confirms access configuration
5. Project creation confirmation returned to frontend

### Asset Upload Flow

```
┌──────────┐     ┌───────────────┐     ┌──────────────┐
│ Frontend │────►│Website        │────►│Project       │
│          │     │Storage        │────►│Management    │
│          │     │               │◄────│              │
│          │◄────│               │     └──────────────┘
└──────────┘     └───────────────┘
```

1. Frontend sends asset metadata to Website Storage
2. Website Storage verifies project access with Project Management
3. Website Storage sends upload approval to frontend
4. Frontend uploads asset chunks to Website Storage
5. Website Storage confirms successful upload

### Website Rendering Flow

```
┌──────────┐     ┌───────────────┐     ┌──────────────┐
│ Browser  │────►│Website        │────►│Project       │
│          │     │Renderer       │────►│Management    │
│          │     │               │◄────│              │
│          │     │               │     └──────────────┘
│          │     │               │     ┌──────────────┐
│          │     │               │────►│Website       │
│          │     │               │◄────│Storage       │
│          │◄────│               │     │              │
└──────────┘     └───────────────┘     └──────────────┘
```

1. Browser sends HTTP request to Website Renderer
2. Website Renderer identifies project from URL
3. Website Renderer verifies project status with Project Management
4. Website Renderer requests required assets from Website Storage
5. Website Storage returns asset data to Website Renderer
6. Website Renderer assembles HTTP response
7. Browser receives rendered website

## Storage Architecture

The Lessly platform uses a chunked storage architecture to efficiently manage website assets:

```
┌───────────────────────────┐
│      Asset Metadata       │
│ ┌─────────────────────┐   │
│ │ ID: example-asset   │   │
│ │ Project: project-id │   │
│ │ Size: 5MB           │   │
│ │ Content-Type: image │   │
│ └─────────────────────┘   │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│     Chunked Storage       │
│ ┌─────────┐ ┌─────────┐   │
│ │Chunk 0  │ │Chunk 1  │   │
│ │(2MB)    │ │(2MB)    │   │
│ └─────────┘ └─────────┘   │
│ ┌─────────┐              │
│ │Chunk 2  │              │
│ │(1MB)    │              │
│ └─────────┘              │
└───────────────────────────┘
```

### Chunking Strategy:
1. Assets are split into chunks of approximately 2MB
2. Each chunk is stored with an index and asset ID reference
3. Chunks can be retrieved independently for streaming
4. Metadata includes information about total size and number of chunks

## Versioning System

Lessly's versioning system keeps track of website revisions:

```
┌─────────────────────────┐
│      Project            │
│  ┌─────────────────┐    │
│  │ID: project-1    │    │
│  │Current: v3      │    │
│  └─────────────────┘    │
└──────────┬──────────────┘
           │
           ▼
┌──────────────────────────────────────────────────┐
│                  Versions                        │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐      │
│  │Version 1│    │Version 2│    │Version 3│      │
│  │Initial  │    │Updated  │    │Current  │      │
│  └────┬────┘    └────┬────┘    └────┬────┘      │
└───────┼───────────────┼───────────────┼─────────┘
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│Assets v1     │ │Assets v2     │ │Assets v3     │
│              │ │              │ │              │
│- index.html  │ │- index.html  │ │- index.html  │
│- style.css   │ │- style.css   │ │- style.css   │
│- script.js   │ │- script.js   │ │- script.js   │
│- logo.png    │ │- logo.png    │ │- logo.png    │
│              │ │- banner.jpg  │ │- banner.jpg  │
│              │ │              │ │- new-form.js │
└──────────────┘ └──────────────┘ └──────────────┘
```

### Version Control Features:
1. Each version has a unique identifier
2. Assets are tagged with version ID for association
3. Project tracks current active version
4. Historical versions remain accessible
5. Versions can be created, viewed, and rolled back

## Deployment Architecture

The Lessly platform's deployment architecture on the Internet Computer:

```
┌──────────────────────────────────────┐
│          Internet Computer           │
│                                      │
│  ┌───────────┐      ┌───────────┐   │
│  │Replica 1  │      │Replica 2  │   │
│  │           │      │           │   │
│  │ Lessly    │      │ Lessly    │   │
│  │ Canisters │      │ Canisters │   │
│  └───────────┘      └───────────┘   │
│         ▲                  ▲        │
└─────────┼──────────────────┼────────┘
          │                  │
      ┌───┴──────────────────┴───┐
      │                          │
      │         Internet         │
      │                          │
      └──────────┬───────────────┘
                 │
                 ▼
      ┌───────────────────┐
      │  User's Browser   │
      └───────────────────┘
```

### Deployment Characteristics:
1. Canisters are deployed across the Internet Computer network
2. Replicated execution ensures availability and fault tolerance
3. The boundary node network provides HTTP gateway for public access
4. Users access websites directly through canister URLs or custom domains
5. All website assets are served directly from the IC network

## Security Model

Lessly implements a multi-layered security model:

```
┌───────────────────────────────────────────────┐
│                Authentication                 │
│  ┌───────────────────────────────────┐        │
│  │        Internet Identity          │        │
│  └───────────────────────────────────┘        │
└───────────────────────┬───────────────────────┘
                        │
┌───────────────────────▼───────────────────────┐
│                Authorization                  │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  │
│  │  Owner    │  │Collaborator│  │  Viewer  │  │
│  │Permissions│  │Permissions │  │Permissions│  │
│  └───────────┘  └───────────┘  └───────────┘  │
└───────────────────────┬───────────────────────┘
                        │
┌───────────────────────▼───────────────────────┐
│              Access Control                   │
│  ┌───────────────────────────────────┐        │
│  │  Canister-level Guard Functions   │        │
│  └───────────────────────────────────┘        │
└───────────────────────┬───────────────────────┘
                        │
┌───────────────────────▼───────────────────────┐
│              Data Security                    │
│  ┌───────────────────────────────────┐        │
│  │    Orthogonal Persistence         │        │
│  └───────────────────────────────────┘        │
└───────────────────────────────────────────────┘
```

### Security Layers:
1. **Authentication**: Internet Identity provides secure, anonymous authentication
2. **Authorization**: Role-based access control for project operations
3. **Access Control**: Canister-level guards validate all incoming calls
4. **Data Security**: Orthogonal persistence ensures data integrity

## Scaling Strategy

Lessly's architecture is designed to scale horizontally:

```
┌────────────────────────────────┐
│        User Management         │
│  ┌──────────┐    ┌──────────┐  │
│  │ Primary  │    │Secondary │  │
│  │ Canister │    │Canister  │  │
│  └──────────┘    └──────────┘  │
└────────────────────────────────┘

┌────────────────────────────────┐
│       Project Management       │
│  ┌──────────┐    ┌──────────┐  │
│  │ Primary  │    │Secondary │  │
│  │ Canister │    │Canister  │  │
│  └──────────┘    └──────────┘  │
└────────────────────────────────┘

┌────────────────────────────────┐
│        Website Storage         │
│  ┌──────────┐    ┌──────────┐  │
│  │Storage 1 │    │Storage 2 │  │
│  │Canister  │    │Canister  │  │
│  └──────────┘    └──────────┘  │
│  ┌──────────┐    ┌──────────┐  │
│  │Storage 3 │    │Storage 4 │  │
│  │Canister  │    │Canister  │  │
│  └──────────┘    └──────────┘  │
└────────────────────────────────┘

┌────────────────────────────────┐
│        Website Renderer        │
│  ┌──────────┐    ┌──────────┐  │
│  │Renderer 1│    │Renderer 2│  │
│  │Canister  │    │Canister  │  │
│  └──────────┘    └──────────┘  │
└────────────────────────────────┘
```

### Scaling Approaches:
1. **User Management**: Sharded by user ID ranges
2. **Project Management**: Sharded by project ID
3. **Website Storage**: Multiple storage canisters for different projects
4. **Website Renderer**: Load-balanced renderers for high-traffic websites

## Development and Deployment Workflow

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│  Develop   │────►│   Test     │────►│  Deploy    │────►│  Monitor   │
│  Code      │     │  Locally   │     │ to Mainnet │     │ & Update   │
└────────────┘     └────────────┘     └────────────┘     └────────────┘
```

1. **Development**: 
   - Develop Motoko actors for each canister
   - Configure inter-canister communication
   - Implement frontend components

2. **Testing**:
   - Local deployment using dfx
   - Unit and integration testing
   - Simulated user workflows

3. **Deployment**:
   - Staged deployment to IC mainnet
   - Canister upgrades with data preservation
   - Frontend deployment to asset canister

4. **Monitoring**:
   - Performance monitoring
   - Error tracking
   - Usage analytics