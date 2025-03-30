# Task Manager - SmallGis

A modern task management application with responsive design, built with React and IndexDB for local data storage in indexDB.

## Features

- **Task Management**: Create, edit, delete, and organize tasks
- **Filtering & Sorting**: Search by title/description, filter by status, sort by date
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Offline Capability**: Full functionality without internet connection

## Getting Started

### Installation

First, install the dependencies:

```sh
pnpm install
```

### Development

To run the dev server for your app, use:

```sh
pnpm dev
```

### Production

To create a production bundle:

```sh
pnpm build
```

To run the production server:

```sh
pnpm start
```

### Testing

To run the tests:

```sh
pnpm test
```

## Project Architecture

### Tech Stack

- **Frontend Framework**: React 19
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query for data management
- **Routing**: TanStack Router for type-safe routing
- **UI Components**: Radix UI primitives with Shadcn component system
- **Styling**: TailwindCSS for utility-first styling
- **Form Handling**: React Hook Form with Zod validation
- **Local Storage**: IndexDB via idb library
- **Build Tool**: Vite for fast development and optimized builds
- **Type Safety**: TypeScript for static typing

### Feature-Based Structure

The project follows a feature-based architecture to maintain scalability and separation of concerns:

```
src/
├── features/                  # Feature modules
│   ├── feat-dashboard/        # Dashboard feature
│   │   ├── components/        # Feature-specific UI components
│   │   ├── hooks/             # Custom hooks for this feature
│   │   ├── types/             # TypeScript interfaces/types
│   │   └── index.tsx          # Feature entry point & exports
│   │
│   ├── feat-task-create/      # Task creation functionality
│   ├── feat-task-details/     # Task details view
│   ├── feat-task-edit/        # Task editing functionality
│   ├── feat-task-list-details/# Task list details
│   ├── feat-task-list-edit/   # Task list editing
│   └── shared/                # Shared feature components
│
├── libs/                      # Core utilities and configurations
│   ├── hooks/                 # Global custom hooks
│   │   ├── use-indexdb/       # IndexDB access hooks
│   │   └── use-task-lists/    # Task list data hooks
│   ├── utils/                 # Utility functions
│   ├── constants/             # App configurations
│   └── providers/             # Context providers
│       └── indexdb-provider/  # IndexDB context provider
│
├── components/                # Global shared UI components
│   ├── ui/                    # Base UI components (shadcn)
│   └── layouts/               # Layout components
│       ├── app-layout/        # Main application layout
│       └── app-sidebar/       # Sidebar navigation
│
├── api/                       # API layer
│   ├── actions/               # API actions by entity
│   │   ├── lists/             # Task list CRUD operations
│   │   └── tasks/             # Task CRUD operations
│   ├── indexdb/               # IndexDB implementation
│   │   ├── index.ts           # Database initialization
│   │   └── types.ts           # Database schema types
│   └── utils/                 # API utilities
│       └── error-handler.ts   # Standardized error handling
│
├── routes/                    # Application routes
│   ├── _layout.tsx            # Root layout component
│   └── index.tsx              # Home page route
│
└── styles/                    # Global styles
    └── globals.css            # Global CSS styles
```

Each feature is isolated with its own components, hooks, and business logic, promoting maintainability and code reuse.

### Data Flow Architecture

The application follows a unidirectional data flow pattern:

1. **UI Layer**: React components render the user interface and capture user interactions
2. **State Management**:

   - **Local State**: Component-level state using React's useState
   - **Global State**: Zustand stores for cross-component state
   - **Server State**: TanStack Query for data fetching, caching, and synchronization

3. **Data Access Layer**:

   - Custom hooks abstract data access operations
   - IndexDB service provides CRUD operations
   - Action creators handle business logic and data transformations

4. **Storage Layer**:
   - IndexDB handles persistent storage
   - Database schema defined with proper indexes for efficient queries

This architecture ensures:

- Clear separation of concerns
- Testable components and business logic
- Predictable state management
- Easy debugging and maintenance

### Component Hierarchy

Components are organized in a hierarchical structure:

1. **Layout Components**: Define the overall application structure

   - App Layout (main container)
   - Sidebar (navigation)
   - Content Area (dynamic content)

2. **Feature Components**: Implement specific features

   - Dashboard (task overview)
   - Task Creation/Editing
   - Task List Management

3. **Shared UI Components**: Reusable across features

   - Button, Input, Dialog (from Shadcn/Radix)
   - Custom composite components (TaskCard, ListSelector)

4. **Context Providers**: Wrap the application to provide:
   - IndexDB access
   - Async Query Management by TanStack Query

## Using IndexDB

This project uses IndexDB as a client-side storage solution for several reasons:

1. **Offline Capability**: Allows the app to function without an internet connection
2. **Performance**: Fast data access without network latency
3. **API-Ready Architecture**: Structured to easily transition to REST API in the future

### IndexDB Implementation

The data layer is designed with a service-oriented architecture that abstracts the storage mechanism:

- **Database Structure**: Organized by entity types (tasks, task lists)
- **API-Like Interface**: Action creators follow REST API patterns
- **Error Handling**: Standardized error responses

This approach allows for a seamless future transition to a server-based REST API by only needing to replace the data access layer while keeping the application logic intact.

## Development Principles

- **Component-Based Design**: Modular, reusable UI components
- **Clean Code**: Following SOLID principles and best practices
- **Accessibility**: Built with a11y in mind for all users
- **Performance Optimized**: Efficient rendering and data handling
- **Test Coverage**: Unit and integration tests for critical functionality
