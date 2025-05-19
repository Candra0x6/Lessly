# Canister Architecture

## Overview
The Lessly platform is built on the Internet Computer (IC) blockchain, using multiple canisters working together to provide a complete website building and hosting solution. This architecture leverages Motoko's actor model and orthogonal persistence to create a scalable, efficient, and decentralized system.

## Canister Structure

```
Lessly Website Builder Platform
│
├── UserManagementCanister
│   ├── User authentication/authorization with Internet Identity
│   ├── User profiles and preferences
│   ├── Subscription management
│   └── Access control and permissions
│
├── ProjectManagementCanister
│   ├── Project metadata storage
│   ├── Version history tracking
│   ├── Project settings and configuration
│   └── Collaborator management
│
├── WebsiteStorageCanister
│   ├── Asset storage (HTML, CSS, JS, images)
│   ├── Chunked file uploads and management
│   ├── Version-specific asset organization
│   └── Project-based access control
│
└── WebsiteRendererCanister
    ├── HTTP request handling
    ├── Dynamic content serving
    ├── URL routing and domain management
    └── Streaming for large assets
```

## Detailed Canister Responsibilities

### UserManagementCanister
- **Authentication**: Integration with Internet Identity for secure, anonymous authentication
- **User Profiles**: Store and manage user information, preferences, and settings
- **Subscription Management**: Handle different subscription tiers (Free, Pro, Enterprise)
- **Authorization**: Provide access control for other canisters to verify user permissions

### ProjectManagementCanister
- **Project Metadata**: Store core project information (name, description, settings)
- **Versioning**: Track and manage different versions of a website project
- **Collaboration**: Manage project owners and collaborators with appropriate permissions
- **Templates**: Support starting projects from pre-designed templates

### WebsiteStorageCanister
- **Asset Management**: Store and organize all website assets
- **Chunking**: Break large files into manageable chunks for efficient storage and retrieval
- **Access Control**: Enforce project-based permissions for asset operations
- **Version Tracking**: Associate assets with specific project versions

### WebsiteRendererCanister
- **HTTP Gateway**: Handle incoming HTTP requests to display websites
- **Asset Assembly**: Retrieve and assemble assets from storage to serve to visitors
- **Domain Management**: Map custom domains to projects
- **Streaming Support**: Efficiently deliver large assets using streaming

## Canister Interactions

1. **User Authentication Flow**:
   - Frontend → UserManagementCanister: Authentication requests via Internet Identity
   - UserManagementCanister → ProjectManagementCanister: User access verification for projects
   - UserManagementCanister → WebsiteStorageCanister: Verify permissions for asset operations

2. **Website Creation Flow**:
   - Frontend → ProjectManagementCanister: Create new project and initialize metadata
   - ProjectManagementCanister → WebsiteStorageCanister: Set up access control for project assets

3. **Asset Upload Flow**:
   - Frontend → WebsiteStorageCanister: Upload website assets in chunks
   - WebsiteStorageCanister → ProjectManagementCanister: Verify user's access to project
   - WebsiteStorageCanister → Frontend: Confirm successful uploads

4. **Website Serving Flow**:
   - Visitor → WebsiteRendererCanister: HTTP request for website content
   - WebsiteRendererCanister → ProjectManagementCanister: Resolve project from URL/domain
   - WebsiteRendererCanister → WebsiteStorageCanister: Fetch required assets
   - WebsiteRendererCanister → Visitor: Serve compiled website with proper headers

## Scaling Considerations

- **Canister Sharding**: As projects grow, assets can be distributed across multiple storage canisters
- **Read/Write Separation**: High-traffic websites can use dedicated renderer canisters
- **Tiered Architecture**: Enterprise users can have dedicated canisters for improved performance
- **Caching Strategy**: Frequently accessed assets can be cached for faster delivery
- **Chunk Optimization**: Asset chunk sizes are optimized for IC ingress/egress limits

## Data Persistence

All canisters implement orthogonal persistence through Motoko's stable variables:
- User data is preserved across canister upgrades
- Project metadata persists through system updates
- Assets remain accessible without external databases
- Domain mappings are retained through canister cycles

## Security Model

- **Authentication**: Based on Internet Identity for anonymous, secure authentication
- **Authorization**: Fine-grained access control for projects and assets
- **Canister Principles**: Each canister operates with least-privilege access to other canisters
- **Data Isolation**: User and project data is isolated between different accounts