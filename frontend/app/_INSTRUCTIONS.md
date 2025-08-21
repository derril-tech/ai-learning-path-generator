# Frontend App Directory Instructions

## Overview
This directory contains the Next.js 14 application using the App Router. All pages and layouts are organized here.

## Structure
- `layout.tsx` - Root layout with global providers and metadata
- `page.tsx` - Landing page
- `globals.css` - Global styles and Tailwind imports
- `dashboard/` - Dashboard page with learning progress
- `plan/` - Detailed learning plan view
- `coach/` - AI coach chat interface
- `catalog/` - Content catalog and search (TODO)
- `assess/` - Assessment interface (TODO)
- `admin/` - Admin panel (TODO)
- `settings/` - User settings (TODO)

## Guidelines
1. **Page Structure**: Each page should be a client component with proper TypeScript types
2. **Styling**: Use Tailwind CSS with custom design tokens from `tailwind.config.js`
3. **State Management**: Use React Query for server state, Zustand for UI state
4. **Navigation**: Use Next.js Link component for internal navigation
5. **Icons**: Use Lucide React icons consistently
6. **Responsive Design**: Ensure all pages work on mobile, tablet, and desktop
7. **Accessibility**: Follow WCAG 2.1 AA guidelines

## TODO Items
- [ ] Add catalog page with content search and filtering
- [ ] Create assessment interface with quiz/project components
- [ ] Build admin panel for user and content management
- [ ] Add user settings page with profile and preferences
- [ ] Implement authentication pages (login, register, forgot password)
- [ ] Add error pages (404, 500)
- [ ] Create loading states and skeletons
- [ ] Add offline support and service worker

## File Naming
- Use kebab-case for file names
- Group related pages in directories
- Use descriptive names that indicate the page purpose

## Component Organization
- Keep page components focused on layout and data fetching
- Extract reusable UI components to `components/` directory
- Use composition over inheritance for component relationships
