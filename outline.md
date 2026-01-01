# WAG Portal - Project Outline

## File Structure

### Core Files
- **index.html** - Main dashboard page with sidebar navigation and module shortcuts
- **main.js** - Primary JavaScript file containing all application logic and interactions
- **resources/** - Directory containing all images, icons, and media assets

### Module Pages
- **office-updates.html** - Office news, policy updates, and polls management
- **employee-hub.html** - Leave requests, item requests, and defect reporting
- **program-calendar.html** - Meeting, workshop, training, and event scheduling
- **tech-knowledge.html** - Technical knowledge sharing across MEP disciplines
- **shared-facilities.html** - Meeting room and Zoom account reservations
- **wellbeing.html** - Environmental monitoring and health recommendations

### Authentication
- **signin.html** - User and admin sign-in interface

## Page Content Structure

### Index.html - Main Dashboard
**Purpose**: Central hub providing overview and quick access to all modules
**Content Sections**:
- Collapsible sidebar navigation with module links
- Header with user profile and office branding
- Dashboard grid with real-time counters for each module
- Quick action buttons for common tasks
- Recent activity feed
- System status indicators

### Office Updates Module
**Purpose**: Manage office communications and announcements
**Content Sections**:
- Tabbed interface (News, Policy Updates, Polls)
- Create/edit forms with rich text editing
- Grid/list view toggle for content display
- Voting interface for polls
- Archive and search functionality

### Employee Hub Module
**Purpose**: Handle employee requests and service tickets
**Content Sections**:
- Three-tab system (Leave, Item, Defect requests)
- Request submission forms with file attachments
- Status tracking with visual indicators
- Admin approval interface
- Historical request archive

### Program Calendar Module
**Purpose**: Schedule and manage office events and meetings
**Content Sections**:
- Four-tab system (Meetings, Workshops, Training, Events)
- Comprehensive event creation forms
- Calendar view with event scheduling
- Participant management system
- Resource attachment (files, images, links)

### Tech Knowledge Module
**Purpose**: Share technical expertise across MEP disciplines
**Content Sections**:
- Six-category tabs (EE, HVAC, SN, FP, CAD/Revit, Other)
- Rich media posting system
- File upload and link embedding
- Search and filter capabilities
- Calendar view for post timeline

### Shared Facilities Module
**Purpose**: Manage office resource reservations
**Content Sections**:
- Resource booking interface
- Meeting room availability calendar
- Zoom account management
- My reservations dashboard
- Facility usage analytics

### Wellbeing Module
**Purpose**: Monitor environmental conditions and health metrics
**Content Sections**:
- Floor selection tabs (2nd, 3rd, 4th, 5th)
- Real-time sensor data visualization
- Trend charts for environmental metrics
- AI-based health recommendations
- Alert system for unhealthy conditions

### Sign-in Page
**Purpose**: Secure user authentication system
**Content Sections**:
- Clean sign-in form with email/password fields
- Role selection (User/Admin)
- Password recovery options
- Office branding and welcome message

## Interactive Components

### Dashboard Widgets
- Real-time counter cards with animated updates
- Status indicator badges with color coding
- Quick action buttons with hover effects
- Activity timeline with expandable details

### Form Systems
- Multi-step forms for complex submissions
- Real-time validation and error handling
- File upload with progress indicators
- Rich text editing for content creation

### Data Visualization
- Interactive charts for wellbeing monitoring
- Calendar interfaces for scheduling
- Timeline views for historical data
- Search and filter interfaces

### Navigation System
- Collapsible sidebar with smooth animations
- Mobile-responsive bottom navigation
- Breadcrumb navigation for deep pages
- Quick search functionality

## Technical Implementation

### Libraries Integration
- **Anime.js**: Smooth animations for UI transitions
- **ECharts.js**: Professional charts for data visualization
- **Splide.js**: Image carousels and content sliders
- **Matter.js**: Physics-based interactions for engaging UX
- **p5.js**: Custom graphics and interactive visualizations

### Data Management
- Local storage for user preferences and draft content
- Session management for authentication
- Mock data systems for realistic demonstrations
- State management for complex interactions

### Responsive Design
- Mobile-first approach with progressive enhancement
- Flexible grid systems for all screen sizes
- Touch-optimized interactions for mobile devices
- Accessible navigation patterns

This structure ensures comprehensive coverage of all required functionality while maintaining clean code organization and optimal user experience across all devices and use cases.