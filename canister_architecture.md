# Canister Architecture

## Overview

Lessly uses a three-canister architecture on the Internet Computer, each responsible for specific functionality. This modular approach ensures scalability, maintainability, and clear separation of concerns.

## User Management Canister

### Purpose
Handles user authentication, profile management, and subscription tiers.

### Data Structures

```motoko
type User = {
    id : UserId;                    // Principal-based unique identifier
    username : Text;                // User-chosen display name
    principal : Principal;          // IC Principal for authentication
    created_at : Int;              // Timestamp of account creation
    updated_at : Int;              // Timestamp of last profile update
    subscription_tier : SubscriptionTier; // Current subscription level
};

type SubscriptionTier = {
    #free;      // Basic tier
    #premium;   // Enhanced features with analytics
    #business;  // Full enterprise features
};
```

### Storage Architecture
- **Primary Storage**: HashMap<UserId, User> for O(1) user lookups
- **Stable Storage**: Array of user entries for upgrade persistence
- **Persistence**: Pre/post upgrade hooks ensure data survival across canister upgrades

### Public Functions

#### Mutating Functions
- `createUser(username: Text)` - Creates new user accounts with duplicate prevention
- `updateSubscription(tier: SubscriptionTier)` - Updates user subscription tier

#### Query Functions
- `getUser(userId: UserId)` - Retrieves user profile by ID
- `getUserByPrincipal(principal: Principal)` - Gets user by principal

### Authentication Flow
1. User authenticates via Internet Identity
2. Principal extracted from message caller
3. User account created or retrieved from storage
4. Subscription tier determines feature access

## Project Management Canister

### Purpose
Manages website projects, versioning, collaboration, and publishing status.

### Data Structures

```motoko
type Project = {
    id : ProjectId;                 // Unique project identifier
    name : Text;                    // Project display name
    owner : UserId;                 // Project owner principal
    description : Text;             // Project description
    created_at : Int;              // Creation timestamp
    updated_at : Int;              // Last modification timestamp
    published : Bool;              // Publication status
    url_slug : Text;               // URL-friendly identifier
    collaborators : [UserId];      // List of collaborator principals
    current_version : VersionId;   // Active version reference
    template_id : ?Text;           // Optional template reference
};

type ProjectVersion = {
    id : VersionId;                // Unique version identifier
    project_id : ProjectId;        // Parent project reference
    created_at : Int;              // Version creation timestamp
    created_by : UserId;           // Version creator principal
    description : Text;            // Version description/changelog
};
```

### Storage Architecture
- **Projects**: HashMap<ProjectId, Project> for project metadata
- **Versions**: HashMap<VersionId, ProjectVersion> for version control
- **Stable Storage**: Separate arrays for projects and versions
- **ID Generation**: Combines project name with owner principal for uniqueness

### Public Functions

#### Mutating Functions
- `createProject(name, description, template_id)` - Creates new projects with initial version
- `updateProject(projectId, name, description)` - Updates project metadata with authorization
- `publishProject(projectId, publish)` - Controls project publication status
- `createVersion(projectId, description)` - Creates new project versions

#### Query Functions
- `getProject(projectId)` - Retrieves project details
- `getUserProjects(userId)` - Gets all projects for a user
- `getProjectVersions(projectId)` - Retrieves all project versions

### Access Control
- **Owner Access**: Full control over project settings and collaboration
- **Collaborator Access**: Edit permissions for project content
- **Authorization**: Function-level checks for all operations

## Website Storage Canister

### Purpose
Handles asset storage, retrieval, and management with chunked upload support for large files.

### Data Structures

```motoko
type Asset = {
    id : AssetId;                  // Unique asset identifier
    project_id : ProjectId;        // Parent project reference
    filename : Text;               // Original filename
    content_type : Text;           // MIME type
    size : Nat;                    // File size in bytes
    created_at : Int;              // Creation timestamp
    updated_at : Int;              // Last modification timestamp
    version_id : VersionId;        // Associated version
    asset_type : AssetType;        // Categorized asset type
    path : Text;                   // File path within project
};

type AssetType = {
    #html;        // HTML documents
    #css;         // Stylesheets
    #javascript;  // JavaScript files
    #image;       // Image files
    #font;        // Font files
    #other;       // Other file types
};

type Chunk = {
    asset_id : AssetId;           // Parent asset reference
    index : Nat;                  // Chunk sequence number
    data : Blob;                  // Binary chunk data
};
```

### Storage Architecture
- **Asset Metadata**: HashMap<AssetId, Asset> for file information
- **File Chunks**: HashMap<(AssetId, Nat), Blob> for binary content
- **Access Control**: HashMap<ProjectId, [UserId]> for project permissions
- **Chunking Strategy**: Large files split into manageable chunks for efficient storage

### Public Functions

#### Mutating Functions
- `storeAssetMetadata()` - Stores file metadata with access control
- `storeAssetChunk(asset_id, index, data)` - Stores individual file chunks
- `deleteAsset(asset_id)` - Removes assets and all associated chunks
- `setProjectAccess(project_id, users)` - Configures project access permissions

#### Query Functions
- `getAssetMetadata(asset_id)` - Retrieves file information
- `getAssetChunk(asset_id, index)` - Retrieves specific file chunks
- `getProjectAssets(project_id)` - Gets all assets for a project
- `getVersionAssets(project_id, version_id)` - Gets version-specific assets
- `getAssetsIds()` - Lists all asset identifiers

### Chunking System
- **Purpose**: Handle large file uploads efficiently
- **Implementation**: Files split into sequential chunks
- **Retrieval**: Chunks reassembled on download
- **Cleanup**: All chunks deleted when asset is removed

## Inter-Canister Communication

### Data Flow
1. **User Authentication**: User canister validates identity
2. **Project Creation**: Project management canister creates project metadata
3. **Asset Storage**: Website storage canister handles file uploads
4. **Access Control**: Cross-canister permission verification

### Security Model
- **Principal-based Authentication**: All operations use IC Principal for identity
- **Canister-level Authorization**: Each canister validates permissions independently
- **Data Isolation**: Canisters maintain separate data stores with controlled access

## Upgrade Strategy

### Stable Storage Implementation
All canisters implement orthogonal persistence:

```motoko
system func preupgrade() {
    // Convert HashMap to stable arrays
    entries := Iter.toArray(storage.entries());
};

system func postupgrade() {
    // Restore HashMap from stable arrays
    storage := HashMap.fromIter(entries.vals(), 0, keyEqual, keyHash);
    entries := [];
};
```

### Benefits
- **Zero Downtime**: Upgrades don't lose data or interrupt service
- **Backward Compatibility**: Type system ensures safe migrations
- **Rollback Capability**: Previous versions can be restored if needed

## Error Handling

### Comprehensive Error Types
- **ProjectError**: `#NotFound | #Unauthorized | #AlreadyExists | #InvalidInput`
- **AuthError**: `#UserNotFound | #Unauthorized | #SessionExpired`
- **AssetError**: `#NotFound | #Unauthorized | #InvalidInput | #StorageFull`

### Error Propagation
- Functions return `Result<T, Error>` types for explicit error handling
- Client applications can handle specific error cases
- Consistent error patterns across all canisters

## Performance Considerations

### Query vs Update Functions
- **Query Functions**: Read-only operations for fast data retrieval
- **Update Functions**: State-modifying operations with consensus
- **Optimization**: Minimal state changes in update functions

### Storage Efficiency
- **HashMap Usage**: O(1) lookup performance for all data structures
- **Stable Memory**: Efficient serialization for upgrade persistence
- **Chunking**: Large files handled without memory constraints

## Scalability Features

### Horizontal Scaling
- **Modular Design**: Each canister can scale independently
- **Load Distribution**: Different canisters handle different operation types
- **Future Expansion**: Additional canisters can be added without affecting existing ones

### Storage Scaling
- **Chunked Storage**: No single-file size limitations
- **Efficient Indexing**: HashMap-based storage for fast access
- **Access Optimization**: Project-based data organization for efficient queries