# Lessly: A Web3 Website Building Platform

## System Overview

Lessly is a decentralized website building and hosting platform running on the Internet Computer Protocol (ICP). The system allows users to create, manage, and publish websites with custom domains in a fully decentralized manner.

## Canister Architecture

The platform is divided into four main canisters, each responsible for a specific aspect of the system:

### 1. UserManagement

This canister handles user registration, authentication, and subscription management.

**Key Features:**
- User creation and profile management
- Session-based authentication
- Subscription tier management (free/premium)
- Orthogonal persistence for user data

### 2. ProjectManagement

This canister manages website projects and their versions.

**Key Features:**
- Project creation and metadata management
- Version control for website releases
- Access control for project owners and collaborators
- Publishing control for making websites public

### 3. WebsiteStorage

This canister handles the storage of website assets (HTML, CSS, JS, images, etc.).

**Key Features:**
- Asset metadata management
- Chunked storage of large files
- Project-based access control
- Version-specific asset management

### 4. WebsiteRenderer

This canister renders websites to visitors by serving assets from storage.

**Key Features:**
- HTTP request handling
- Custom domain support
- Large file streaming
- Content type management
- Asset delivery optimization

## Data Flow

1. Users register and authenticate via the UserManagement canister
2. Authenticated users create and manage projects via ProjectManagement
3. Website assets are uploaded to WebsiteStorage
4. WebsiteRenderer serves the websites to visitors by fetching assets from storage

## Technical Implementation

The platform is built using the Motoko programming language, specifically designed for the Internet Computer. It leverages key Motoko features:

- Actor-based architecture
- Orthogonal persistence
- Async/await programming model
- Inter-canister calls
- Stable variables for upgrades 