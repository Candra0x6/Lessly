# User Flow Documentation

## Overview

This document outlines the complete user journeys through the Lessly platform, from initial registration to website publication. All flows are based on the actual implementation in the Motoko canisters and React frontend.

## 1. User Registration and Onboarding Flow

### Initial Access
```
Landing Page → Internet Identity Authentication → User Registration → Dashboard
```

**Step-by-Step Process:**

1. **Landing Page Access**
   - User visits Lessly platform
   - Presented with login/register options
   - Marketing content explains platform benefits

2. **Internet Identity Authentication**
   - User clicks "Login with Internet Identity"
   - Redirected to Internet Identity service
   - Completes biometric or device-based authentication
   - Returns to Lessly with authenticated principal

3. **User Profile Creation**
   - Frontend calls `createUser(username)` on User Management canister
   - System checks if user already exists based on principal
   - If new user: creates profile with `#free` subscription tier
   - If existing user: retrieves existing profile

4. **Onboarding Experience**
   - Welcome tutorial explaining key features
   - Optional project creation walkthrough
   - Subscription tier explanation and upgrade options

**Frontend Components Involved:**
- `/pages/auth/` - Authentication pages
- `/utility/use-auth-client.tsx` - IC authentication hook
- `/utility/RegistrationContext.tsx` - Onboarding flow management
- `/hooks/useUserManagement.ts` - User canister interface

## 2. Project Creation Flow

### From Dashboard to Live Website
```
Dashboard → Create Project → Template Selection → Project Setup → Asset Upload → Publishing
```

**Detailed Steps:**

1. **Project Initiation**
   - User navigates to dashboard
   - Clicks "Create New Project" button
   - Presented with project creation form

2. **Project Configuration**
   - User enters project name and description
   - Optional template selection from available templates
   - Frontend validates input data

3. **Project Creation Backend Call**
   ```typescript
   // Frontend hook usage
   const { createProject } = useProjectManagement();
   const result = await createProject(name, description, templateId);
   ```
   - Calls `createProject()` on Project Management canister
   - System generates unique project ID: `name + "-" + principal`
   - Creates initial version: `"v1-" + projectId`
   - Sets up project metadata with owner permissions

4. **Access Control Setup**
   - Frontend calls `setProjectAccess()` on Website Storage canister
   - Configures owner access for asset management
   - Establishes project permissions for file uploads

5. **Project Dashboard**
   - User redirected to project-specific dashboard
   - Shows project metadata, version history
   - Provides access to editor, settings, and publishing controls

**Frontend Components Involved:**
- `/components/create-project/` - Project creation components
- `/pages/dashboard/` - Main dashboard interface
- `/pages/project-details/` - Individual project management
- `/hooks/useProjectManagement.ts` - Project canister interface

## 3. Website Building Flow

### Content Creation and Asset Management
```
Project Dashboard → Editor → Content Creation → Asset Upload → Preview → Save Version
```

**Editor Experience:**

1. **Editor Access**
   - User clicks "Edit Website" from project dashboard
   - Loads website editor interface
   - Displays current project version content

2. **Content Creation Options**
   - **Visual Editor**: Drag-and-drop interface for non-technical users
   - **Code Editor**: Direct HTML/CSS/JavaScript editing
   - **Component Library**: Pre-built sections and elements
   - **Template Customization**: Modify selected templates

3. **Asset Management**
   - **File Upload Process**:
     ```typescript
     // Asset upload with chunking
     const { uploadAsset } = useWebsiteStorage();
     const result = await uploadAsset(file, projectId, versionId);
     ```
   - Large files automatically split into chunks
   - Each chunk uploaded via `storeAssetChunk()`
   - Asset metadata stored via `storeAssetMetadata()`
   - Supports HTML, CSS, JavaScript, images, fonts

4. **Real-time Preview**
   - Live preview of changes as user edits
   - Responsive design testing (mobile, tablet, desktop)
   - Cross-browser compatibility preview

5. **Version Control**
   - Auto-save functionality for work in progress
   - Manual version creation with descriptions
   - Ability to revert to previous versions
   - Version comparison tools

**Frontend Components Involved:**
- `/components/editor/` - Website editor interface
- `/components/assets/` - Asset management components
- `/pages/editor/` - Editor page layouts
- `/pages/preview/` - Preview functionality
- `/hooks/useWebsiteStorage.ts` - Storage canister interface

## 4. Collaboration Flow (Owner + Collaborators)

### Multi-User Project Management
```
Owner Invitation → Collaborator Access → Shared Editing → Version Management
```

**Collaboration Process:**

1. **Collaborator Invitation**
   - Project owner accesses project settings
   - Enters collaborator's principal ID or username
   - System updates project collaborators list
   - Collaborator receives access notification

2. **Permission Verification**
   - All project operations verify user permissions
   - Owner: Full access to all project functions
   - Collaborator: Edit access to content and assets
   - System checks access on every operation

3. **Collaborative Editing**
   - Multiple users can work on different aspects
   - Version control manages concurrent changes
   - Change attribution tracks who made what modifications

4. **Version Management**
   - Any collaborator can create new versions
   - Version descriptions include creator information
   - Owner controls publishing decisions

**Backend Implementation:**
```motoko
// Access control check in Project Management canister
let isCollaborator = switch (Array.find<UserId>(project.collaborators, func(id) { id == caller })) {
  case (?_) { true };
  case null { false };
};

if (project.owner != caller and not isCollaborator) {
  return #err(#Unauthorized);
};
```

## 5. Website Publishing Flow

### From Draft to Live Website
```
Final Review → Publish Decision → Domain Configuration → Live Website → Analytics
```

**Publishing Process:**

1. **Pre-Publication Review**
   - User reviews website in preview mode
   - Tests all functionality and links
   - Verifies responsive design across devices
   - Checks asset loading and performance

2. **Publication Action**
   - User clicks "Publish Website" button
   - Frontend calls `publishProject(projectId, true)`
   - Project Management canister updates `published = true`
   - Website becomes publicly accessible

3. **Domain Configuration**
   - **Default**: Website available at IC canister URL
   - **Custom Domain** (Premium/Business):
     - User configures custom domain in settings
     - Receives DNS configuration instructions
     - Domain mapping configured in Website Renderer

4. **Live Website Access**
   - Public users can access published website
   - Website Renderer serves content from latest published version
   - Assets delivered via chunked streaming for performance

5. **Post-Publication Management**
   - **Analytics Tracking** (Premium/Business tiers)
   - **Performance Monitoring**
   - **SEO Optimization Tools**
   - **Update Publishing** for new versions

**Frontend Components Involved:**
- `/pages/project-details/` - Publishing controls
- `/pages/settings/` - Domain configuration
- `/components/analytics/` - Analytics dashboard (Premium/Business)

## 6. Analytics and Insights Flow (Premium/Business)

### Data Collection to Actionable Insights
```
Website Traffic → Data Collection → Analytics Processing → Dashboard Visualization → Insights
```

**Analytics Experience:**

1. **Data Collection**
   - Automatic tracking of website visitors
   - Page view metrics and user behavior
   - Traffic source identification
   - Performance metrics collection

2. **Analytics Dashboard Access**
   - User navigates to Analytics section
   - Dashboard shows key metrics overview
   - Date range filtering capabilities
   - Real-time and historical data

3. **Detailed Reports**
   - Traffic analytics with source breakdown
   - User behavior flow analysis
   - Performance metrics and recommendations
   - Exportable reports for external analysis

4. **Insights and Recommendations**
   - Automated insights based on data patterns
   - Performance improvement suggestions
   - SEO recommendations
   - Content optimization tips

**Frontend Components Involved:**
- `/components/analytics/` - Complete analytics suite
  - `analytics-summary.tsx` - Overview dashboard
  - `charts.tsx` - Data visualization
  - `data-table.tsx` - Detailed data tables
  - `date-range-picker.tsx` - Time period selection

## 7. Subscription Management Flow

### Tier Upgrades and Billing
```
Free Tier Usage → Feature Limitations → Upgrade Decision → Payment → Enhanced Features
```

**Subscription Process:**

1. **Feature Limitation Discovery**
   - Free tier users encounter feature restrictions
   - Clear messaging about premium features
   - Examples: analytics, custom domains, advanced templates

2. **Upgrade Decision**
   - User accesses subscription settings
   - Compares tier features and pricing
   - Selects Premium ($9.99/month) or Business ($29.99/month)

3. **Subscription Update**
   - Payment processing (external integration)
   - Backend call to `updateSubscription(tier)`
   - User Management canister updates subscription tier
   - Immediate access to new features

4. **Enhanced Feature Access**
   - Analytics dashboard unlocked
   - Custom domain configuration available
   - Advanced templates and tools accessible
   - Priority support access

## 8. Error Handling and Recovery Flows

### Graceful Error Management
```
Operation Attempt → Error Detection → User Feedback → Recovery Options → Resolution
```

**Error Scenarios and Handling:**

1. **Authentication Errors**
   - Internet Identity connection issues
   - Session expiration handling
   - Automatic re-authentication prompts

2. **Project Access Errors**
   - Unauthorized access attempts
   - Clear permission denied messages
   - Guidance for requesting access

3. **Asset Upload Errors**
   - File size limitations
   - Unsupported file types
   - Network connection issues
   - Chunked upload failure recovery

4. **Publication Errors**
   - Missing required assets
   - Validation failures
   - Network connectivity issues

**Error Recovery Mechanisms:**
- Automatic retry for transient failures
- Clear error messaging with actionable steps
- Help documentation links
- Support contact options

## User Experience Principles

### Design Philosophy

1. **Progressive Disclosure**
   - Simple interfaces for beginners
   - Advanced features available on demand
   - Contextual help and guidance

2. **Familiar Patterns**
   - Traditional website builder UX patterns
   - Gradual introduction to Web3 concepts
   - No blockchain complexity exposed to users

3. **Performance Focus**
   - Fast loading times for all interfaces
   - Optimistic UI updates where possible
   - Clear loading states and progress indicators

4. **Accessibility**
   - WCAG 2.1 compliance across all interfaces
   - Keyboard navigation support
   - Screen reader compatibility
   - High contrast mode support

This user flow documentation reflects the actual implementation capabilities and provides a comprehensive understanding of how users interact with the Lessly platform from registration through website publication and management.