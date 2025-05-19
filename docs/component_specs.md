# Lessly UI Components

This document details the UI components required for the Lessly platform, organized by category and featuring their properties, states, and usage patterns.

## Layout Components

### MainLayout

Primary layout wrapper used throughout the authenticated application.

**Props:**
- `children`: React nodes to render within the layout
- `hideNavigation?`: Boolean to hide navigation (default: false)

**Features:**
- Header with logo, navigation, and user menu
- Responsive sidebar navigation
- Footer with links and copyright
- Breadcrumb support

### AuthLayout

Layout used for authentication-related pages.

**Props:**
- `children`: React nodes to render within the layout
- `title?`: Page title string

**Features:**
- Centered content with logo
- Clean, minimalistic design
- Optional page title

### EditorLayout

Special layout for the website editor workspace.

**Props:**
- `projectId`: String ID of the current project
- `children`: React nodes to render within the layout

**Features:**
- Collapsed navigation to maximize workspace
- Editor-specific toolbar
- Persistent save status indicator
- Device preview switcher

## Navigation Components

### MainNavigation

Primary navigation component for authenticated users.

**Props:**
- `currentPath`: Current URL path
- `collapsed?`: Boolean to display in collapsed state (default: false)

**Features:**
- Responsive design (full sidebar/collapsed/mobile menu)
- Active page indicators
- Icon + text combinations for items
- Subscription tier indicators

### Breadcrumbs

Path indicator showing current location in the application hierarchy.

**Props:**
- `paths`: Array of path objects with label and href
- `separator?`: Custom separator element (default: "/")

**Features:**
- Dynamic path generation
- clickable navigation links
- Truncation for long paths
- Supports custom separators

### UserMenu

Dropdown menu for user-related actions.

**Props:**
- `user`: User object with profile information

**Features:**
- Profile picture display
- Account settings link
- Subscription status indicator
- Logout action

## Authentication Components

### InternetIdentityButton

Button that initiates Internet Identity authentication flow.

**Props:**
- `onSuccess`: Callback function after successful authentication
- `onError?`: Callback function if authentication fails
- `text?`: Custom button text (default: "Login with Internet Identity")

**Features:**
- Internet Identity icon
- Loading state during authentication
- Error state handling
- Success animation

### InternetIdentitySteps

Step indicator for the Internet Identity authentication process.

**Props:**
- `currentStep`: Current authentication step number
- `totalSteps?`: Total number of steps (default: 3)

**Features:**
- Visual step progress indicator
- Current step highlighting
- Step descriptions
- Mobile-friendly design

### RegistrationForm

Form for collecting additional user information after initial authentication.

**Props:**
- `initialValues?`: Pre-filled form values
- `onSubmit`: Callback function for form submission

**Features:**
- Username and email fields
- Validation with error messaging
- Subscription tier selection
- Terms of service checkbox
- Submit button with loading state

## Dashboard Components

### ProjectCard

Card component displaying a project in the dashboard.

**Props:**
- `project`: Project object with details
- `onClick?`: Click handler function
- `thumbnail?`: Image URL for project thumbnail

**Features:**
- Project thumbnail preview
- Project name and description
- Published/draft status badge
- Last modified date
- Quick action buttons (edit, preview, settings)
- Hover state with elevation change

### ProjectGrid

Grid layout for displaying multiple project cards.

**Props:**
- `projects`: Array of project objects
- `loading?`: Boolean loading state
- `emptyState?`: Component to display when no projects exist
- `onProjectClick?`: Handler function for project selection

**Features:**
- Responsive grid layout (1-3 columns based on screen size)
- Loading skeleton state
- Empty state for new users
- Filtered view options

### CreateProjectButton

Call-to-action button for creating a new project.

**Props:**
- `onClick`: Handler function for button click
- `large?`: Boolean for larger size variant (default: false)

**Features:**
- Primary color styling
- Icon + text combination
- Hover/focus states
- Optional large variant for empty states

### FilterBar

Filtering and sorting controls for the projects dashboard.

**Props:**
- `filters`: Object containing current filter settings
- `onFilterChange`: Handler function for filter changes
- `sortOptions`: Array of available sort options

**Features:**
- Status filter (all, published, draft)
- Date filter (newest, oldest)
- Search input
- Mobile-friendly dropdown for smaller screens

## Editor Components

### GrapesJSEditor

Main website builder component integrating the GrapesJS library.

**Props:**
- `projectId`: String ID of the current project
- `initialContent?`: Initial HTML content
- `onSave?`: Callback function when content is saved
- `config?`: Additional GrapesJS configuration options

**Features:**
- Full GrapesJS integration
- Custom component blocks for Lessly
- Asset manager integration with storage canister
- Auto-save functionality
- Responsive preview modes

### ComponentPanel

Panel displaying available components for dragging onto the canvas.

**Props:**
- `categories`: Array of component categories
- `searchTerm?`: String for filtering components
- `onComponentDrag?`: Handler for component drag events

**Features:**
- Categorized component listing
- Search functionality
- Preview thumbnails
- Drag-and-drop functionality
- Collapse/expand categories

### StylePanel

Panel for editing selected element styles.

**Props:**
- `selectedElement`: Currently selected editor element
- `onChange?`: Handler function for style changes

**Features:**
- Common style properties (typography, colors, spacing)
- Device-specific style adjustments
- CSS class manager
- Custom style input
- Color picker with presets

### LayerManager

Hierarchical view of page elements.

**Props:**
- `layers`: Array of layer objects
- `selectedLayerId?`: ID of currently selected layer
- `onSelect?`: Handler function for layer selection

**Features:**
- Tree view of elements
- Drag-and-drop reordering
- Visibility toggles
- Selection highlighting
- Context menu for actions

### DevicePreview

Toolbar for switching between device preview modes.

**Props:**
- `currentDevice`: String indicating current device (desktop/tablet/mobile)
- `onChange`: Handler function for device changes

**Features:**
- Device icons (desktop, tablet, mobile)
- Active state indicator
- Tooltip labels
- Keyboard shortcuts

### AssetManager

Component for managing website assets.

**Props:**
- `projectId`: String ID of the current project
- `onAssetSelect`: Handler function when asset is selected
- `allowedTypes?`: Array of allowed file types

**Features:**
- File upload with drag-and-drop
- Asset library grid view
- File type filtering
- Search functionality
- Delete and replace options

## Settings Components

### ProfileForm

Form for managing user profile information.

**Props:**
- `user`: User object with current profile data
- `onSubmit`: Handler function for form submission
- `loading?`: Boolean loading state

**Features:**
- Username and email fields
- Profile picture upload
- Validation with error messages
- Save button with loading state
- Reset button

### SubscriptionPanel

Panel for viewing and changing subscription tier.

**Props:**
- `currentTier`: String indicating current subscription tier
- `onTierChange`: Handler function for tier changes
- `loading?`: Boolean loading state

**Features:**
- Current plan details
- Available plan comparison
- Upgrade/downgrade options
- Billing cycle selection
- Payment method integration

### CollaboratorManagement

Interface for managing project collaborators.

**Props:**
- `projectId`: String ID of the current project
- `collaborators`: Array of current collaborators
- `onAdd`: Handler function for adding collaborators
- `onRemove`: Handler function for removing collaborators

**Features:**
- Collaborator listing with role information
- Add collaborator form with email input
- Role selection dropdown (admin, editor, viewer)
- Remove collaborator button with confirmation
- Pending invitation management

### DomainSettings

Interface for managing custom domains for a project.

**Props:**
- `projectId`: String ID of the current project
- `domains`: Array of current domains
- `onAdd`: Handler function for adding domains
- `onRemove`: Handler function for removing domains

**Features:**
- Domain listing with status indicators
- Add domain form with validation
- DNS setup instructions
- SSL certificate status
- Verification steps display

### VersionHistory

Component for viewing and managing project versions.

**Props:**
- `projectId`: String ID of the current project
- `versions`: Array of version objects
- `currentVersion`: String ID of current version
- `onRestore`: Handler function for restoring versions

**Features:**
- Version listing with timestamps and descriptions
- Current version indicator
- Preview version button
- Restore version button with confirmation
- Version comparison view

## Utility Components

### Button

Standard button component with multiple variants.

**Props:**
- `variant?`: String variant type (default, primary, danger, etc.)
- `size?`: String size (small, medium, large)
- `disabled?`: Boolean disabled state
- `loading?`: Boolean loading state
- `icon?`: Optional icon element
- `onClick`: Handler function for click events
- `children`: Button label content

**Features:**
- Multiple color variants
- Size variations
- Loading spinner state
- Icon support (left or right)
- Disabled state styling

### Input

Standard text input component.

**Props:**
- `type?`: String input type (text, email, password, etc.)
- `label?`: String label text
- `placeholder?`: String placeholder text
- `value`: Current input value
- `onChange`: Handler function for input changes
- `error?`: Error message string
- `disabled?`: Boolean disabled state

**Features:**
- Multiple input types
- Floating label option
- Error state with message
- Disabled state styling
- Focus state styling

### Select

Dropdown select component.

**Props:**
- `options`: Array of option objects with label and value
- `value`: Currently selected value
- `onChange`: Handler function for selection changes
- `label?`: String label text
- `placeholder?`: String placeholder text
- `error?`: Error message string
- `disabled?`: Boolean disabled state

**Features:**
- Option group support
- Search filtering for large lists
- Custom rendering of options
- Multi-select capability
- Clear selection button

### Modal

Dialog component for overlaying content.

**Props:**
- `isOpen`: Boolean visibility state
- `onClose`: Handler function for closing the modal
- `title?`: String title text
- `size?`: String size (small, medium, large)
- `children`: Modal content
- `footer?`: Footer content with action buttons

**Features:**
- Multiple size options
- Close button
- Title bar
- Optional footer for actions
- Overlay click dismissal
- Focus trapping for accessibility
- ESC key dismissal

### Tooltip

Component for displaying additional information on hover.

**Props:**
- `content`: Tooltip content (string or element)
- `position?`: String position (top, right, bottom, left)
- `children`: Element the tooltip attaches to

**Features:**
- Multiple positioning options
- Delayed appearance
- Arrow pointing to parent element
- Max-width to prevent overflow
- Fade in/out animation

### Notification

Toast notification component for system feedback.

**Props:**
- `type?`: String notification type (info, success, warning, error)
- `title?`: String title text
- `message`: Notification message content
- `duration?`: Number of milliseconds to display
- `onClose?`: Handler function when notification closes

**Features:**
- Multiple message types with appropriate styling
- Auto-dismiss with configurable duration
- Manual close button
- Stacking of multiple notifications
- Slide-in animation

## Template Components

### TemplateCard

Card displaying a website template.

**Props:**
- `template`: Template object with details
- `onClick?`: Handler function for selection
- `selected?`: Boolean selected state

**Features:**
- Template thumbnail preview
- Template name and description
- Category badges
- Hover state with "Use Template" button
- Selected state indicator

### TemplatePreview

Full-screen preview of a template.

**Props:**
- `template`: Template object with details
- `onClose`: Handler function to close preview
- `onUse`: Handler function to use the template

**Features:**
- Large template preview
- Template details sidebar
- Device preview modes
- "Use Template" action button
- Close button

### TemplateFilter

Filter controls for template gallery.

**Props:**
- `categories`: Array of available categories
- `selectedCategories`: Array of currently selected categories
- `onChange`: Handler function for filter changes
- `searchTerm?`: Current search term
- `onSearch?`: Handler function for search changes

**Features:**
- Category checkboxes or pills
- Search input
- Clear filters button
- Mobile-friendly dropdown for smaller screens
- Count of matching templates

## Analytics Components

### TrafficChart

Visualization of website visitor traffic.

**Props:**
- `data`: Array of traffic data points
- `period?`: String time period (day, week, month, year)
- `loading?`: Boolean loading state

**Features:**
- Line or bar chart visualization
- Time period selection
- Hover tooltips with detailed data
- Responsive sizing
- Loading skeleton state

### GeoMap

Geographic visualization of visitor locations.

**Props:**
- `data`: Array of location data with counts
- `loading?`: Boolean loading state
- `highlightedRegion?`: Currently highlighted region

**Features:**
- Interactive world map
- Heat map coloring based on visitor density
- Zoom and pan controls
- Region tooltips with visitor counts
- Responsive sizing

### MetricsCard

Card displaying a key analytics metric.

**Props:**
- `title`: String metric title
- `value`: Current metric value
- `previousValue?`: Previous period value for comparison
- `change?`: Percentage change from previous period
- `trend?`: Boolean indicating positive or negative trend
- `loading?`: Boolean loading state

**Features:**
- Large value display
- Previous period comparison
- Trend indicator (up/down arrow)
- Positive/negative change styling
- Loading skeleton state

### DataTable

Tabular data display for detailed analytics.

**Props:**
- `columns`: Array of column definitions
- `data`: Array of data objects
- `loading?`: Boolean loading state
- `pagination?`: Pagination configuration
- `sortable?`: Boolean to enable sorting

**Features:**
- Column sorting
- Pagination
- Search/filter functionality
- Customizable cell rendering
- Responsive design with horizontal scrolling
- Loading skeleton state