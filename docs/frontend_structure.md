# Lessly Frontend Structure

This document outlines the structure of the Lessly platform frontend, including the organization of components, pages, and state management.

## Directory Structure

```
frontend/
├── src/
│   ├── assets/            # Static assets like images and icons
│   ├── components/        # Reusable UI components
│   │   ├── auth/          # Authentication-related components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── editor/        # Website editor components
│   │   ├── layouts/       # Layout components (headers, footers, etc.)
│   │   └── ui/            # Basic UI components (buttons, inputs, etc.)
│   ├── hooks/             # Custom React hooks
│   │   ├── useProjectManagement.ts
│   │   ├── useUserManagement.ts
│   │   ├── useWebsiteRenderer.ts
│   │   └── useWebsiteStorage.ts
│   ├── lib/               # Utility functions and libraries
│   │   └── utils.ts
│   ├── pages/             # Top-level page components
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # Dashboard-related pages
│   │   ├── editor/        # Website editor pages
│   │   ├── preview/       # Website preview pages
│   │   ├── settings/      # User and project settings pages
│   │   └── templates/     # Template selection pages
│   ├── types/             # TypeScript type definitions
│   │   └── type.ts
│   └── utility/           # Utility files for authentication and actor creation
│       ├── ProtectedRoute.tsx
│       ├── RegistrationContext.tsx
│       ├── use-auth-client.tsx
│       └── actors/        # Internet Computer actor creation utilities
│           ├── projectManagementActor.ts
│           ├── userManagementActor.ts
│           ├── websiteRenderActor.ts
│           └── websiteStorageActor.ts
├── App.tsx                # Main application component with routing
└── main.tsx               # Entry point for the React application
```

## Core Architecture

The frontend architecture follows these key principles:

1. **Component-Based Design**: UI is broken down into reusable components
2. **Page-Level Organization**: Top-level pages serve as containers for components
3. **Custom Hooks for Backend**: Each canister has a corresponding hook for easy access
4. **Protected Routes**: Authentication-based route protection
5. **TypeScript**: Strong typing throughout the application

## Frontend-Backend Integration

The frontend interacts with the backend canisters through actor interfaces:

- **userManagementActor**: Authentication and user profile management
- **projectManagementActor**: Project creation and management
- **websiteStorageActor**: Asset upload and management
- **websiteRenderActor**: Website previews and domain management

Each actor is wrapped in a custom React hook to simplify usage in components.

## Routing Structure

```
/                           # Landing page for unauthenticated users
/auth/login                 # Internet Identity login
/dashboard                  # User's project dashboard
/create-project             # Project creation page
/editor/:projectId          # GrapesJS website editor
/preview/:projectId         # Website preview page
/settings/account           # User account settings
/settings/project/:projectId # Project settings
/templates                  # Website template selection
```

## State Management

The application uses several methods for state management:

1. **React Context**: For global state (authentication, registration context)
2. **Custom Hooks**: For canister interactions and derived state
3. **Local Component State**: For UI-specific state
4. **URL Parameters**: For navigation and state persistence between page loads

## Authentication Flow

The authentication flow uses Internet Identity:

1. User navigates to `/auth/login`
2. Authentication is handled by the Internet Identity service
3. Upon successful authentication:
   - If the user is new, they are directed to complete registration
   - If the user is returning, they are redirected to the dashboard
4. Protected routes check authentication status before rendering

## UI Component Library

The UI is built using a combination of:

1. **Tailwind CSS**: For styling and responsive design
2. **Custom UI Components**: Built from scratch with accessibility in mind
3. **GrapesJS**: Integrated as the website builder interface

## Build and Deployment

The frontend is built using:

1. **Vite**: For fast development and optimized production builds
2. **React**: As the core UI library
3. **TypeScript**: For type safety
4. **dfx**: For deployment to the Internet Computer

Frontend assets are served from an asset canister on the Internet Computer.

## Error Handling

The application implements a multi-layered error handling approach:

1. **Try/Catch Blocks**: For async operations
2. **Error Boundaries**: For component-level errors
3. **User Feedback**: Toast notifications and error messages
4. **Logging**: Console logging in development, silent in production