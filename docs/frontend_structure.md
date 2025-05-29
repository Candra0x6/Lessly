# Frontend Structure

## Overview

The Lessly frontend is a modern React application built with TypeScript, Vite, and Tailwind CSS. It follows a component-based architecture with clear separation of concerns and modular design patterns.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: Custom component library with shadcn/ui integration
- **State Management**: React hooks and context patterns
- **Authentication**: Internet Identity integration via IC agents

## Project Structure

```
frontend/src/
├── App.tsx                 # Root application component
├── main.tsx               # Application entry point
├── assets/                # Static assets
│   ├── logo.svg          # Lessly brand logo
│   └── profile-pic.jpeg  # Default profile picture
├── components/            # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── pages/                # Application routes/pages
├── types/                # TypeScript type definitions
└── utility/              # Utility components and contexts
```

## Component Architecture

### Core Components (`/components`)

#### Analytics Components (`/analytics`)
- `analytics-summary.tsx` - Overview dashboard for website analytics
- `charts.tsx` - Data visualization components for metrics
- `data-table.tsx` - Tabular data presentation for analytics
- `date-range-picker.tsx` - Date selection for analytics filtering

*Available for Premium and Business subscription tiers*

#### Asset Management (`/assets`)
Components for managing website files and media assets:
- File upload interfaces
- Asset browser and organizer
- Image optimization tools
- Media library management

#### Authentication (`/auth`)
Authentication flow components:
- Login/logout interfaces
- Internet Identity integration
- User registration flows
- Session management

#### Project Creation (`/create-project`)
Project setup and initialization components:
- Project creation wizards
- Template selection interfaces
- Initial configuration forms
- Project settings management

#### Dashboard (`/dashboard`)
Main application dashboard components:
- Project overview cards
- Quick action buttons
- Recent activity feeds
- Statistics summaries

#### Dropdown Components (`/dropdown`)
Reusable dropdown UI elements:
- Menu dropdowns
- Selection dropdowns
- Action menus
- Context menus

#### Website Editor (`/editor`)
Core website building interface:
- Visual drag-and-drop editor
- Code editor integration
- Component palette
- Property panels
- Preview modes

#### KokonutUI (`/kokonutui`)
Custom UI component library:
- Base UI components
- Design system elements
- Reusable interface patterns
- Styled components

#### Layout Components (`/layout`)
Application layout and structure:
- Header/navigation components
- Sidebar components
- Footer components
- Page layout wrappers

#### Section Components (`/sections`)
Page section building blocks:
- Hero sections
- Content blocks
- Call-to-action sections
- Feature showcases

#### Template Components (`/templates`)
Website template system:
- Template galleries
- Template previews
- Template customization interfaces
- Template categories

#### Base UI Components (`/ui`)
Fundamental UI building blocks:
- Buttons, inputs, forms
- Modal dialogs
- Loading indicators
- Typography components

### Custom Hooks (`/hooks`)

The application uses three primary custom hooks that interface with the backend canisters:

#### `useUserManagement.ts`
Manages user authentication and profile operations:
```typescript
// User authentication state
// Profile management functions
// Subscription tier handling
// Internet Identity integration
```

#### `useProjectManagement.ts`
Handles project-related operations:
```typescript
// Project CRUD operations
// Version control management
// Collaboration features
// Publishing controls
```

#### `useWebsiteStorage.ts`
Manages asset storage and retrieval:
```typescript
// File upload/download
// Asset metadata management
// Chunked file handling
// Project asset organization
```

### Utility Libraries (`/lib`)

#### `types.ts`
TypeScript type definitions for:
- API response types
- Component prop types
- State management types
- Form validation schemas

#### `utils.ts`
Common utility functions:
- Data formatting helpers
- Validation functions
- API request utilities
- State management helpers

## Page Structure (`/pages`)

### Core Application Pages

#### Authentication Pages (`/auth`)
- Login page with Internet Identity
- Registration/onboarding flows
- Account verification
- Password reset (if applicable)

#### Dashboard Pages (`/dashboard`)
- Main dashboard overview
- Project management interface
- User profile settings
- Subscription management

#### Website Editor (`/editor`)
- Visual website editor interface
- Code editor mode
- Component library
- Preview modes
- Publishing tools

#### Project Management (`/project-details`)
- Individual project overview
- Project settings and configuration
- Collaboration management
- Version history
- Publishing controls

#### Asset Management (`/assets`)
- Media library interface
- File upload/management
- Asset organization
- Optimization tools

#### Analytics (`/analytics`)
- Website traffic analytics
- Performance metrics
- User behavior insights
- Custom report generation

*Premium and Business tiers only*

#### Preview System (`/preview`)
- Website preview interface
- Responsive design testing
- Cross-browser preview
- Mobile/tablet preview modes

#### Settings (`/settings`)
- User account settings
- Notification preferences
- Billing and subscription
- API key management

#### Public Site (`/site`)
- Marketing/landing pages
- Documentation
- Pricing information
- About pages

### Error and Utility Pages

- `403.tsx` - Access denied page
- `error.tsx` - General error handling
- `maintenance.tsx` - Maintenance mode page
- `not-found.tsx` - 404 error page
- `layout.tsx` - Common page layout
- `page.tsx` - Default page component
- `globals.css` - Global styles

## Utility Components (`/utility`)

### Authentication & Authorization

#### `ProtectedRoute.tsx`
Route protection component:
- Checks user authentication status
- Redirects unauthorized users
- Handles subscription tier access
- Manages loading states

#### `use-auth-client.tsx`
Internet Identity authentication hook:
- IC agent initialization
- Authentication state management
- Login/logout functionality
- Session persistence

#### `RegistrationContext.tsx`
User onboarding context:
- Registration flow state
- Multi-step form management
- User preference collection
- Initial setup processes

### IC Integration (`/actors`)
Internet Computer actor implementations:
- Canister interface definitions
- API call wrappers
- Error handling utilities
- Type-safe canister communication

## State Management Strategy

### Local State
- Component-level state with React hooks
- Form state management
- UI interaction state

### Global State
- User authentication context
- Application settings
- Theme and preferences

### Server State
- Custom hooks for API integration
- Caching strategies for performance
- Optimistic updates for better UX

## Styling Architecture

### Tailwind CSS
- Utility-first CSS framework
- Custom design system configuration
- Responsive design utilities
- Dark/light theme support

### Component Styling
- Styled components with Tailwind classes
- CSS modules for complex components
- Theme variables for consistency
- Responsive design patterns

## Development Workflow

### Build System
- Vite for fast development builds
- Hot module replacement (HMR)
- TypeScript compilation
- Asset optimization

### Development Server
- Local development with hot reload
- API proxy for canister integration
- Environment variable management
- Development tools integration

## Performance Optimizations

### Code Splitting
- Route-based code splitting
- Component lazy loading
- Dynamic imports for large components

### Asset Optimization
- Image optimization and lazy loading
- Bundle size optimization
- Tree shaking for unused code
- Progressive web app features

### Caching Strategies
- Browser caching for static assets
- API response caching
- Service worker implementation
- Offline functionality support