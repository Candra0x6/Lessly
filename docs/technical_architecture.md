# Technical Architecture

## Overview

Lessly is built on the Internet Computer Protocol (ICP) using a modular canister architecture. The system is designed for scalability, security, and true decentralization, with all data stored on-chain and no reliance on traditional cloud services.

## Backend Architecture

### Canister Structure

The backend consists of three main canisters, each with specific responsibilities:

#### 1. User Management Canister (`user/main.mo`)

**Responsibilities:**
- User authentication and profile management
- Subscription tier management
- Principal-based identity verification

**Key Functions:**
- `createUser(username: Text)` - Creates new user accounts
- `getUser(userId: UserId)` - Retrieves user profiles (query)
- `getUserByPrincipal(principal: Principal)` - Gets user by principal ID
- `updateSubscription(tier: SubscriptionTier)` - Updates user subscription tier

**Data Storage:**
- Users are stored in a HashMap with Principal as the key
- Stable storage ensures data persistence across upgrades
- Implements preupgrade/postupgrade hooks for orthogonal persistence

#### 2. Project Management Canister (`project_management/main.mo`)

**Responsibilities:**
- Website project creation and management
- Project versioning system
- Collaboration and access control
- Project publishing status

**Key Functions:**
- `createProject(name, description, template_id)` - Creates new website projects
- `getProject(projectId)` - Retrieves project details (query)
- `getUserProjects(userId)` - Gets all projects for a user (query)
- `updateProject(projectId, name, description)` - Updates project metadata
- `publishProject(projectId, publish)` - Toggles project publication status
- `createVersion(projectId, description)` - Creates new project versions
- `getProjectVersions(projectId)` - Retrieves all versions (query)

**Data Storage:**
- Projects stored in HashMap with Text-based project IDs
- Versions stored separately with linking to parent projects
- Implements access control for owners and collaborators

#### 3. Website Storage Canister (`website_storage/main.mo`)

**Responsibilities:**
- Asset storage and retrieval
- Chunked file upload for large assets
- Project-based access control
- Asset versioning and metadata management

**Key Functions:**
- `storeAssetMetadata()` - Stores asset metadata
- `storeAssetChunk(asset_id, index, data)` - Stores file chunks
- `getAssetMetadata(asset_id)` - Retrieves asset info (query)
- `getAssetChunk(asset_id, index)` - Retrieves file chunks (query)
- `getProjectAssets(project_id)` - Gets all project assets (query)
- `getVersionAssets(project_id, version_id)` - Gets version-specific assets (query)
- `deleteAsset(asset_id)` - Removes assets and their chunks
- `setProjectAccess(project_id, users)` - Configures project access

**Data Storage:**
- Asset metadata stored in HashMap
- File content stored as chunks in separate HashMap
- Project access control list maintained separately
- Supports large file uploads through chunking mechanism

### Type System (`types/lib.mo`)

The system uses a comprehensive type system that defines:

**Core Types:**
- `UserId` - Principal-based user identification
- `ProjectId` - Text-based project identification
- `VersionId` - Text-based version identification
- `AssetId` - Text-based asset identification

**Data Structures:**
- `User` - User profiles with subscription tiers
- `Project` - Project metadata with ownership and collaboration
- `ProjectVersion` - Version control information
- `Asset` - File metadata with content type and versioning
- `Chunk` - File content chunks for large file support

**Error Types:**
- `ProjectError` - Project-related error handling
- `AuthError` - Authentication error handling
- `AssetError` - Asset storage error handling

**Subscription Tiers:**
- `#free` - Basic tier with limited features
- `#premium` - Enhanced tier with analytics
- `#business` - Full-featured tier for enterprises

## Frontend Architecture

### Technology Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Custom component library
- **State Management:** React hooks and context
- **Routing:** React Router (inferred from page structure)

### Project Structure

```
frontend/src/
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── assets/                # Static assets (images, logos)
├── components/            # Reusable UI components
│   ├── analytics/         # Analytics dashboard components
│   ├── assets/           # Asset management components
│   ├── auth/             # Authentication components
│   ├── create-project/   # Project creation components
│   ├── dashboard/        # Dashboard components
│   ├── dropdown/         # Dropdown UI components
│   ├── editor/           # Website editor components
│   ├── kokonutui/        # UI library components
│   ├── layout/           # Layout components
│   ├── sections/         # Page section components
│   ├── templates/        # Project template components
│   └── ui/               # Base UI components
├── hooks/                # Custom React hooks
│   ├── useProjectManagement.ts
│   ├── useUserManagement.ts
│   └── useWebsiteStorage.ts
├── lib/                  # Utility libraries
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
├── pages/                # Application pages/routes
│   ├── analytics/        # Analytics pages
│   ├── assets/          # Asset management pages
│   ├── auth/            # Authentication pages
│   ├── dashboard/       # Dashboard pages
│   ├── editor/          # Website editor pages
│   ├── preview/         # Website preview pages
│   ├── project-details/ # Project detail pages
│   ├── settings/        # Settings pages
│   └── site/            # Public site pages
├── types/               # TypeScript type definitions
│   └── type.ts
└── utility/             # Utility components and contexts
    ├── ProtectedRoute.tsx
    ├── RegistrationContext.tsx
    ├── use-auth-client.tsx
    └── actors/          # IC actor implementations
```

### Custom Hooks

The application uses three main custom hooks that interface with the backend canisters:

1. **useUserManagement** - Interfaces with User Management canister
2. **useProjectManagement** - Interfaces with Project Management canister
3. **useWebsiteStorage** - Interfaces with Website Storage canister

## Security Architecture

### Authentication
- Uses Internet Identity for secure, cryptographic authentication
- Principal-based user identification ensures unique identity
- No passwords or traditional authentication mechanisms

### Authorization
- Owner-based access control for projects
- Collaborator system for shared project access
- Canister-level permission checks for all operations

### Data Integrity
- All data stored on-chain with cryptographic guarantees
- Immutable audit trail through version control
- Stable storage with upgrade-safe persistence

## Scalability Features

### Storage Optimization
- Chunked file upload for large assets
- Efficient HashMap storage with stable memory
- Lazy loading for large datasets

### Canister Scaling
- Modular canister architecture allows independent scaling
- Query functions for read-heavy operations
- Stable storage ensures data persistence during upgrades

### Performance Optimizations
- Query functions for fast data retrieval
- Efficient data structures (HashMap) for O(1) access
- Minimal state mutations for better performance

## Deployment Architecture

### Local Development
- dfx for local Internet Computer replica
- Vite dev server for frontend development
- Hot reloading and fast refresh for development

### Production Deployment
- Canisters deployed to Internet Computer mainnet
- Frontend served from IC with HTTP gateway
- Cycles management for canister operation costs

## Future Extensibility

The architecture is designed for future enhancements:
- Additional canisters can be added for new features
- Type system supports extension without breaking changes
- Modular frontend architecture allows component reuse
- Stable storage ensures data migration capabilities