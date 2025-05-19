# Lessly Frontend Pages

This document details all the pages required for the Lessly platform, including their purpose, key components, and interactions with the backend canisters.

## Landing Page (`/`)

### Purpose
The landing page serves as the entry point for new and returning users, showcasing the platform's capabilities and driving conversions.

### Key Components
- **Hero Section**: Headline, tagline, and call-to-action
- **Feature Showcase**: Visual highlights of key platform features
- **Pricing Display**: Subscription tier comparison
- **Testimonials**: Success stories from users
- **Authentication Buttons**: Login and signup options

### Backend Interactions
- None (static content)

### User Flow
- User discovers the platform
- User explores features and pricing
- User clicks "Get Started" or "Login" to proceed to authentication

## Internet Identity Login (`/auth/login`)

### Purpose
Provides secure authentication through Internet Identity integration.

### Key Components
- **Internet Identity Button**: Initiates the authentication flow
- **Login Status Indicator**: Shows authentication progress
- **Error Messages**: Displays authentication issues

### Backend Interactions
- Authenticates with Internet Identity service
- Verifies user existence with `userManagementActor`

### User Flow
- User clicks "Login with Internet Identity"
- User completes Internet Identity authentication process
- If existing user: Redirect to dashboard
- If new user: Redirect to registration completion

## Registration Completion (`/auth/register`)

### Purpose
Collects additional information from new users after Internet Identity authentication.

### Key Components
- **Registration Form**: Fields for username and email
- **Subscription Selection**: Choose between available tiers
- **Terms Acceptance**: Checkbox for terms of service

### Backend Interactions
- Creates new user profile with `userManagementActor.createUser`

### User Flow
- User provides required information
- User selects subscription tier
- User submits form and is redirected to dashboard

## Dashboard (`/dashboard`)

### Purpose
Central hub showing all user projects and providing access to platform features.

### Key Components
- **Project Grid**: Visual display of all user projects
- **Project Cards**: Thumbnail, name, status, last modified date
- **Create Project Button**: Button to start a new project
- **Filter Options**: Sort and filter projects by status/date
- **Navigation**: Access to settings and account management

### Backend Interactions
- Fetches user projects with `projectManagementActor.getUserProjects`
- Retrieves project thumbnails with `websiteStorageActor`

### User Flow
- User views their projects
- User can click on a project to edit it
- User can create a new project
- User can navigate to other sections of the application

## Create Project (`/create-project`)

### Purpose
Allows users to create a new website project, either from scratch or from a template.

### Key Components
- **Project Form**: Fields for project name and description
- **Template Chooser**: Grid of available templates
- **Blank Option**: Option to start with a blank canvas
- **Preview Thumbnails**: Visual previews of templates

### Backend Interactions
- Creates new project with `projectManagementActor.createProject`
- Sets up initial project structure with appropriate canisters

### User Flow
- User enters project name and description
- User selects a template or blank canvas
- User clicks "Create Project"
- User is redirected to the editor with the new project

## Template Gallery (`/templates`)

### Purpose
Showcases available website templates for users to browse and select.

### Key Components
- **Template Grid**: Visual display of all available templates
- **Category Filters**: Filter templates by category or purpose
- **Search**: Search templates by name or description
- **Preview Option**: Button to preview template in full screen
- **Use Template Button**: Select template for new project

### Backend Interactions
- Fetches template data for display

### User Flow
- User browses available templates
- User can filter by category or search for specific templates
- User previews templates of interest
- User selects a template and proceeds to project creation
<!-- K -->
## Website Editor (`/editor/:projectId`)

### Purpose
Primary workspace for building and editing websites using GrapesJS.

### Key Components
- **GrapesJS Editor**: Main website builder interface
- **Component Panel**: Draggable website components
- **Style Panel**: Design controls for selected elements
- **Layer Manager**: Hierarchical view of page elements
- **Device Preview Toolbar**: Switch between desktop/tablet/mobile views
- **Save/Publish Controls**: Buttons to save work or publish website

### Backend Interactions
- Fetches project data with `projectManagementActor.getProject`
- Retrieves assets with `websiteStorageActor.getProjectAssets`
- Uploads new assets with `websiteStorageActor.storeAssetMetadata` and `storeAssetChunk`
- Saves project changes with appropriate canister calls
- Creates versions with `projectManagementActor.createVersion`

### User Flow
- User drags components onto canvas
- User edits content and styling
- User saves progress periodically
- User previews website before publishing
- User publishes website when ready

## Website Preview (`/preview/:projectId`)

### Purpose
Allows users to preview their website as it will appear to visitors.

### Key Components
- **Preview Frame**: Full-screen view of the website
- **Device Toolbar**: Buttons to switch between device sizes
- **Edit Button**: Return to editor
- **Share Button**: Generate shareable preview link
- **Publish Button**: Make website live

### Backend Interactions
- Renders preview using `websiteRenderActor` functionality
- May create temporary preview links for sharing

### User Flow
- User views website as it will appear to visitors
- User checks responsiveness across devices
- User shares preview link with stakeholders for feedback
- User returns to editor for further changes or proceeds to publish

## Account Settings (`/settings/account`)

### Purpose
Allows users to manage their account details and subscription.

### Key Components
- **Profile Form**: Update username and email
- **Subscription Panel**: View and change subscription tier
- **Payment Management**: Add/edit payment methods
- **Security Settings**: Password/authentication options

### Backend Interactions
- Updates user profile with `userManagementActor` functions
- Updates subscription with `userManagementActor.updateSubscription`

### User Flow
- User reviews current account information
- User makes desired changes to profile or subscription
- User saves changes and receives confirmation

## Project Settings (`/settings/project/:projectId`)

### Purpose
Provides access to project-specific settings and management features.

### Key Components
- **Project Details Form**: Edit name and description
- **Collaborator Management**: Add/remove team members
- **Domain Settings**: Configure custom domains
- **Version History**: View and restore previous versions
- **Export Options**: Export project files
- **Danger Zone**: Delete project option

### Backend Interactions
- Updates project with `projectManagementActor.updateProject`
- Manages domain settings with `websiteRenderActor.linkDomain`
- Retrieves versions with `projectManagementActor.getProjectVersions`

### User Flow
- User navigates to desired settings section
- User makes configuration changes
- User saves changes and receives confirmation

## Analytics Dashboard (`/analytics/:projectId`)

### Purpose
Provides insights into website performance and visitor behavior.

### Key Components
- **Traffic Overview**: Visitor count and trends
- **Page Performance**: Loading times and resource usage
- **Traffic Sources**: Referrers and entry pages
- **Geographic Data**: Visitor locations
- **Device Breakdown**: Desktop vs mobile usage
- **Export Controls**: Download reports in various formats

### Backend Interactions
- Retrieves analytics data from appropriate services

### User Flow
- User views website performance metrics
- User filters data by date range or other parameters
- User identifies insights for website improvement
- User optionally exports reports for sharing

## Domain Management (`/domains/:projectId`)

### Purpose
Enables users to connect custom domains to their websites.

### Key Components
- **Domain List**: Currently connected domains
- **Add Domain Form**: Field to add new domain
- **DNS Instructions**: Setup guide for domain connections
- **SSL Status**: Certificate information and status
- **Verification Steps**: Domain ownership verification process

### Backend Interactions
- Links domains with `websiteRenderActor.linkDomain`
- Retrieves domain information with `websiteRenderActor.getProjectDomains`

### User Flow
- User adds custom domain
- User follows instructions to configure DNS settings
- System verifies domain ownership
- Domain becomes active for the website

## Error Pages

### 404 Not Found (`/404`)
- Custom 404 page with navigation assistance

### 403 Forbidden (`/403`) 
- Access denied page for unauthorized access attempts

### 500 Server Error (`/500`)
- Error page for backend failures with reporting option

### Maintenance Page (`/maintenance`)
- Displayed during scheduled maintenance periods


## Responsive Design Considerations

All pages are designed with a mobile-first approach and include:

- **Adaptive Layouts**: Adjust content organization based on screen size
- **Touch-Friendly Controls**: Larger hit areas on mobile devices
- **Simplified Navigation**: Collapsible menus on smaller screens
- **Optimized Assets**: Different image sizes based on device capabilities