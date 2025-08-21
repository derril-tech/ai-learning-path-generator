# Components Directory Instructions

This directory contains all React components for the Learning Path Generator frontend.

## Directory Structure

```
components/
├── ui/                    # Base UI components (buttons, inputs, etc.)
├── layout/               # Layout components (header, sidebar, etc.)
├── forms/                # Form components and validation
├── charts/               # Data visualization components
├── providers/            # React context providers
└── _INSTRUCTIONS.md      # This file
```

## Component Guidelines

### 1. File Naming
- Use PascalCase for component files: `Button.tsx`, `PlanCard.tsx`
- Use kebab-case for directories: `plan-card/`, `skill-graph/`

### 2. Component Structure
```tsx
// ComponentName.tsx
import React from 'react';
import { ComponentProps } from './types';

interface ComponentNameProps {
  // Define props here
}

export function ComponentName({ ...props }: ComponentNameProps) {
  return (
    // Component JSX
  );
}
```

### 3. Styling
- Use Tailwind CSS classes
- Create reusable component variants using `clsx` or `tailwind-merge`
- Follow the design system defined in `tailwind.config.js`

### 4. Props and Types
- Define TypeScript interfaces for all props
- Use descriptive prop names
- Provide default values where appropriate
- Export types from a separate `types.ts` file for complex components

### 5. Accessibility
- Include proper ARIA labels
- Ensure keyboard navigation works
- Use semantic HTML elements
- Test with screen readers

## TODO: Required Components

### UI Components (`ui/`)
- [ ] Button (primary, secondary, outline variants)
- [ ] Input (text, email, password, textarea)
- [ ] Select (dropdown, multi-select)
- [ ] Checkbox and Radio
- [ ] Modal and Dialog
- [ ] Toast notifications
- [ ] Loading spinners
- [ ] Progress bars
- [ ] Badge and Tag components

### Layout Components (`layout/`)
- [ ] Header with navigation
- [ ] Sidebar with menu
- [ ] Footer
- [ ] Page layout wrapper
- [ ] Breadcrumb navigation
- [ ] Responsive grid layouts

### Form Components (`forms/`)
- [ ] Form wrapper with validation
- [ ] Field components with error handling
- [ ] Multi-step form wizard
- [ ] File upload component
- [ ] Search and filter forms

### Chart Components (`charts/`)
- [ ] Progress charts
- [ ] Skill mastery visualization
- [ ] Time tracking charts
- [ ] Learning analytics dashboards
- [ ] Interactive skill graphs

### Feature Components
- [ ] PlanTimeline - Learning plan timeline view
- [ ] SkillGraphView - Interactive skill graph
- [ ] ContentCard - Content item display
- [ ] AssessmentPlayer - Assessment interface
- [ ] CoachChat - AI coach chat interface
- [ ] CalendarBuilder - Learning schedule builder
- [ ] CitationSidebar - Source citations display

## Implementation Notes

1. **State Management**: Use React Query for server state, Zustand for client state
2. **Error Handling**: Implement proper error boundaries and fallback UI
3. **Performance**: Use React.memo, useMemo, and useCallback where appropriate
4. **Testing**: Write unit tests for all components using React Testing Library
5. **Documentation**: Include JSDoc comments for complex components

## Examples

### Good Component Example
```tsx
import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  children,
  onClick 
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
    secondary: 'bg-secondary-100 hover:bg-secondary-200 text-secondary-900 focus:ring-secondary-500',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-primary-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Bad Component Example
```tsx
// ❌ Avoid: No TypeScript, hardcoded styles, no accessibility
export function Button(props) {
  return (
    <button style={{background: 'blue', color: 'white'}} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
```

Follow these guidelines to maintain consistency and quality across all components.
