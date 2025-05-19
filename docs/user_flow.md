# Lessly User Flow

This document outlines the detailed user journeys through the Lessly platform, from registration to website deployment and management. The flows include both user interactions and the system processes that support them.

## User Registration and Authentication

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Start    │────►│  Visit      │────►│  Internet   │────►│    User     │
│             │     │  Platform   │     │  Identity   │     │   Creation  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Dashboard  │◄────│   Profile   │◄────│ Subscription│◄────│   Welcome   │
│   Access    │     │   Setup     │     │  Selection  │     │    Page     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Step-by-Step Process:

1. **Initial Visit**
   - User navigates to the Lessly platform
   - User is presented with an overview of the platform and login options

2. **Authentication**
   - User clicks "Sign In" or "Register"
   - User is directed to Internet Identity authentication
   - User authenticates with their Internet Identity or creates a new one
   - System receives authentication confirmation from Internet Identity

3. **User Profile Creation**
   - First-time users are prompted to create a profile
   - User enters username and email address
   - User Management canister creates and stores the user profile
   - System assigns default Free tier to new users

4. **Dashboard Access**
   - User is directed to their personal dashboard
   - System displays available projects (empty for new users)
   - User is presented with subscription tier information and platform capabilities

## Website Creation

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Dashboard  │────►│ "New Project"│────►│  Project    │────►│  Template   │
│             │     │   Button     │     │   Details   │     │  Selection  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Website   │◄────│   GrapesJS  │◄────│  Editor     │◄────│  Project    │
│   Preview   │     │   Designer  │     │   Loading   │     │  Creation   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Step-by-Step Process:

1. **Project Initiation**
   - From dashboard, user clicks "New Project" button
   - User enters project name and description
   - User selects subscription tier for the project (based on their account tier)

2. **Template Selection**
   - User browses available website templates
   - Templates are filtered based on user's subscription tier
   - User selects desired template or opts for a blank canvas

3. **Project Creation**
   - System calls Project Management canister to create project record
   - Project Management canister generates unique project ID 
   - Project Management creates initial version (v1)
   - Website Storage canister is configured for project assets

4. **Editor Access**
   - GrapesJS editor loads with selected template or blank canvas
   - Editor displays responsive preview options (desktop, tablet, mobile)
   - Asset library becomes available for the user's content

## Website Design and Editing

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  GrapesJS   │────►│  Component  │────►│   Style     │────►│   Content   │
│   Editor    │     │   Dragging  │     │  Adjustment │     │   Editing   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Save     │◄────│  Responsive │◄────│   Asset     │◄────│    Code     │
│   Changes   │     │   Testing   │     │  Uploading  │     │   Editing   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Step-by-Step Process:

1. **Visual Editing**
   - User drags components from the sidebar onto the canvas
   - Components include text blocks, images, buttons, forms, and layout elements
   - User arranges components using drag-and-drop
   - User adjusts styling via the properties panel

2. **Content Management**
   - User adds and edits text content
   - User uploads images and other media assets
   - System processes uploads in chunks for efficient storage
   - Uploads are stored in Website Storage canister with metadata

3. **Advanced Editing**
   - Advanced users can access HTML/CSS editor
   - Custom code can be added through the code editor panel
   - Changes are reflected in real-time in the visual editor

4. **Responsive Design**
   - User toggles between desktop, tablet, and mobile views
   - User adjusts responsive breakpoints and styling
   - System ensures cross-device compatibility

5. **Saving Work**
   - User clicks "Save" button to store current progress
   - System asynchronously uploads changes to Website Storage canister
   - Project version is updated with timestamp

## Website Publishing and Deployment

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Completed  │────►│  Preview    │────►│  "Publish"  │────►│  Version    │
│   Design    │     │   Website   │     │   Button    │     │  Creation   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Share    │◄────│   Domain    │◄────│  Deployment │◄────│   Asset     │
│   Options   │     │   Setup     │     │ Confirmation│     │ Processing  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Step-by-Step Process:

1. **Pre-Deployment Preview**
   - User clicks "Preview" to see the website as visitors will
   - Preview displays website in a new tab with temporary URL
   - User can navigate through pages to verify functionality

2. **Publishing Decision**
   - After reviewing preview, user clicks "Publish" button
   - System displays confirmation dialog with publishing options
   - User selects whether to create new version or update current

3. **Asset Processing**
   - System finalizes all assets and prepares them for deployment
   - Assets are chunked if necessary for efficient storage
   - All assets are tagged with appropriate version ID
   - Website Storage canister confirms all assets are properly stored

4. **Deployment**
   - Project Management canister marks the project as published
   - Project Management updates current version reference if necessary
   - Website Renderer canister is notified of newly published content
   - System generates a unique URL for the website (e.g., project-id.ic0.app)

5. **Domain Configuration**
   - User can optionally set up custom domain
   - System provides DNS configuration instructions 
   - User updates DNS records with their domain registrar
   - Website Renderer canister associates domain with project

6. **Sharing**
   - System displays success message with website URL
   - User is provided with sharing options (social media, email, etc.)
   - Analytics tracking is initialized for the published website

## Website Management and Updates

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Dashboard  │────►│   Project   │────►│  "Edit"     │────►│   Editor    │
│             │     │    List     │     │   Button    │     │   Loading   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Publish    │◄────│   Save      │◄────│   Make      │◄────│  Existing   │
│  Updates    │     │  Changes    │     │  Changes    │     │  Website    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Step-by-Step Process:

1. **Project Selection**
   - User navigates to dashboard and views project list
   - System displays projects with status (published/draft)
   - User selects the project they wish to edit

2. **Editor Access**
   - User clicks "Edit" button for the selected project
   - System loads the current version of the website in GrapesJS editor
   - All existing assets and content are retrieved from Website Storage canister

3. **Making Changes**
   - User modifies content, layout, or styling
   - Changes are saved periodically to prevent data loss
   - User can create a new version to preserve the previous state

4. **Publishing Updates**
   - User clicks "Publish Updates" after completing changes
   - System provides option to publish immediately or schedule for later
   - User can add a description of the changes for version history

5. **Deployment of Updates**
   - System processes changed assets (new, modified, or deleted)
   - Website Storage canister updates asset records
   - Project Management canister updates version information
   - Website Renderer canister begins serving updated content immediately

## Collaboration and Team Management

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Project    │────►│ "Collaborate"│────►│   Invite    │────►│   Email     │
│  Settings   │     │   Button    │     │ Collaborator│     │  Invitation │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│Collaborator │◄────│ Permission  │◄────│  Accept     │◄────│ Collaboration│
│  Activity   │     │  Setting    │     │ Invitation  │     │   Notice    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Step-by-Step Process:

1. **Initiating Collaboration**
   - Project owner navigates to project settings
   - Owner clicks "Collaborate" button 
   - System displays collaborator management interface

2. **Inviting Collaborators**
   - Owner enters collaborator's email or username
   - Owner assigns permission level (editor, viewer, admin)
   - System sends invitation to potential collaborator

3. **Accepting Invitation**
   - Collaborator receives email notification
   - Collaborator clicks link and authenticates with Internet Identity
   - If not registered, collaborator creates an account
   - Project appears in collaborator's dashboard with appropriate label

4. **Collaborative Editing**
   - Multiple team members can access the project
   - Permissions restrict available actions based on assigned role
   - Version history tracks which team member made which changes

## Analytics and Performance Monitoring

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Project    │────►│ "Analytics" │────►│  Dashboard  │────►│   Visitor   │
│  Dashboard  │     │   Button    │     │   Loading   │     │  Overview   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Export     │◄────│  Custom     │◄────│   Traffic   │◄────│   Page      │
│  Reports    │     │  Filters    │     │   Sources   │     │  Performance│
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Step-by-Step Process:

1. **Accessing Analytics**
   - User navigates to project dashboard
   - User clicks "Analytics" button for a published project
   - System loads analytics dashboard with data visualization

2. **Viewing Core Metrics**
   - User sees visitor count, page views, and engagement metrics
   - System displays charts for traffic trends over time
   - Page performance data shows loading times and resource usage

3. **Analyzing Traffic Sources**
   - User views breakdown of traffic sources (direct, search, social)
   - Geographic distribution of visitors is displayed
   - Referral links are tracked and displayed

4. **Custom Analysis**
   - User can filter data by date range, device type, or location
   - Custom reports can be configured for specific metrics
   - Data can be exported for external analysis

## Subscription Management

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │────►│ "Subscription│────►│   Plans     │────►│   Plan      │
│  Dashboard  │     │    Button   │     │  Comparison │     │  Selection  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Access    │◄────│  Payment    │◄────│  Billing    │◄────│  Payment    │
│New Features │     │Confirmation │     │ Information │     │  Method     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Step-by-Step Process:

1. **Viewing Subscription Options**
   - User navigates to account settings
   - User clicks "Subscription" button
   - System displays available plans with feature comparison

2. **Upgrading Subscription**
   - User selects desired subscription tier
   - System displays price information and billing cycle options
   - User confirms selection and proceeds to payment

3. **Payment Processing**
   - User enters payment information
   - System processes payment securely
   - User Management canister updates subscription status

4. **Accessing Premium Features**
   - User receives confirmation of successful upgrade
   - System immediately enables access to new features
   - Dashboard is updated to reflect new capabilities

## Key Touchpoints and Experience Goals

### First-Time User Experience
- Intuitive onboarding that explains the platform's capabilities
- Quick time-to-value with template selection
- Clear guidance on how to create and publish a first website

### Regular User Workflow
- Efficient dashboard for managing multiple projects
- Seamless transition between editing and publishing
- Real-time feedback on changes and updates

### Power User Capabilities
- Advanced customization options through code editing
- Batch operations for asset management
- Team collaboration tools for complex projects
- Detailed analytics for performance optimization

## System Integration Touchpoints

Throughout these user flows, the four core canisters work together seamlessly:

1. **User Management Canister** handles all authentication, profile management, and subscription operations

2. **Project Management Canister** manages project metadata, versioning, and access control

3. **Website Storage Canister** handles all asset uploads, storage, and retrieval operations

4. **Website Renderer Canister** serves the published websites to visitors and manages domains

Each user interaction may involve multiple canister operations happening in the background, creating a seamless experience while maintaining the decentralized architecture of the platform.