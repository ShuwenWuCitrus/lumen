# Lumen Project Architecture

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── tasks/            # Tasks feature
│   ├── notes/            # Notes feature
│   └── community/        # Community feature
├── components/            # React components
│   ├── common/           # Shared/UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── TextArea.tsx
│   ├── features/         # Feature-specific components
│   │   ├── tasks/       # Task-related components
│   │   ├── notes/       # Note-related components
│   │   └── community/   # Community-related components
│   └── layout/          # Layout components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── Providers.tsx
├── contexts/            # React Context providers
├── i18n/               # Internationalization
│   └── locales/       # Translation files
├── lib/               # Third-party library configurations
├── styles/            # Global styles
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Best Practices

1. **Component Organization**

   - Common UI components go in `components/common/`
   - Feature-specific components go in `components/features/{feature-name}/`
   - Layout components go in `components/layout/`

2. **Feature Organization**

   - Each feature (tasks, notes, community) has its own directory in `app/`
   - Feature-specific components are grouped in `components/features/{feature-name}/`
   - Feature-specific types go in `types/`

3. **State Management**

   - Use React Context for global state (`contexts/`)
   - Keep state as close to where it's used as possible
   - Use hooks for shared logic

4. **Styling**

   - Use Tailwind CSS for styling
   - Global styles in `styles/`
   - Use CSS modules for component-specific styles if needed

5. **Internationalization**

   - All text content should be in i18n files
   - Use translation keys consistently
   - Keep translations organized by feature

6. **Type Safety**

   - Use TypeScript for all files
   - Keep shared types in `types/`
   - Use strict type checking

7. **API Integration**
   - API routes go in `app/api/`
   - Use typed API responses
   - Handle errors consistently

## Code Style Guidelines

1. **Naming Conventions**

   - Use PascalCase for components
   - Use camelCase for functions and variables
   - Use kebab-case for file names
   - Use UPPER_CASE for constants

2. **File Organization**

   - One component per file
   - Group related utilities
   - Keep files focused and small

3. **Imports**

   - Use absolute imports with `@/` prefix
   - Group imports by type (React, components, utils, etc.)
   - Keep imports organized and clean

4. **Component Structure**
   - Props interface at the top
   - Hooks after props
   - Helper functions next
   - Return statement last

## Development Workflow

1. **Creating New Features**

   - Create feature directory in `app/`
   - Add feature-specific components in `components/features/`
   - Add necessary types in `types/`
   - Add translations in `i18n/`

2. **Making Changes**

   - Follow the component structure
   - Update types as needed
   - Add translations for new text
   - Update tests if applicable

3. **Code Review**
   - Check type safety
   - Verify translations
   - Review component organization
   - Ensure code style compliance
