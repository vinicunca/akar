# Akar UI - AI Coding Agent Instructions

## Project Overview

Akar UI is a monorepo containing two main Vue component libraries:

- **akar** (`packages/core`): Headless, unstyled, accessible Vue 3 components inspired by Radix UI
- **pohon-ui** (`packages/pohon`): A styled UI library built on Akar + UnoCSS with Nuxt module support
- **docs**: Nuxt-based documentation site at [akar.vinicunca.dev](https://akar.vinicunca.dev)

## Architecture & Key Patterns

### Component Naming Convention

- **Akar (core)**: All components prefixed with `A` (e.g., `AAccordionRoot`, `ADialogTrigger`)
- **Pohon**: Components prefixed with `P` by default (configurable via `prefix` option)
- Each component directory exports via `index.ts` with explicit type exports

### Composition Pattern

Components use `asChild` prop for composition (similar to Radix UI's Slot pattern):

```vue
<ADialogTrigger as-child>
  <button>Custom Button</button>
</ADialogTrigger>
```

Implementation in `packages/core/src/primitive/primitive.ts` - the `APrimitive` component handles both `as` (element type) and `asChild` (slot merging).

### Context Management

Use `createContext` helper from `packages/core/src/shared/create-context.ts`:

```typescript
export const [injectAAccordionRootContext, provideAAccordionRootContext]
  = createContext<AccordionRootContext>('AAccordionRoot');
```

This pattern is used throughout for parent-child component communication.

### Exports Structure

Akar provides multiple export paths in `packages/core/package.json`:

- `.` - Main component exports
- `./constant` - Component constants (lists of component names)
- `./date` - Date utilities
- `./namespaced` - All components with `A` prefix
- `./nuxt` - Nuxt module integration
- `./resolver` - Auto-import resolver

## Development Workflows

### Build Commands (from root)

```bash
pnpm build              # Build all packages (akar, pohon, plugins)
pnpm build:docs         # Build documentation site
pnpm docs:dev           # Run docs dev server (localhost:5173)
pnpm docs:gen           # Generate component metadata
```

### Testing

- **Akar**: Uses Vitest with `@testing-library/vue`
- Test files: `packages/core/src/**/*.test.ts`
- Run: `pnpm test` from `packages/core`
- Timezone for tests: US/Eastern (set in `vitest.global.ts`)

### Documentation Generation

The docs automatically generate component metadata:

- Script: `docs/scripts/akar.gen.ts`
- Uses `vue-component-meta` to extract props, events, slots
- Outputs JSON to `docs/content/metadata/*.json`
- Run: `pnpm docs:gen`

## Technology Stack

### Core Dependencies

- **pnpm workspaces** with catalog mode for dependency management
- **TypeScript 5.8.3** (enforced via override)
- **tsdown** for building akar package (see `packages/core/tsdown.config.ts`)
- **unbuild** for building pohon module
- **Vinicunca ESLint config** with specific rule overrides in `eslint.config.js`

### Component Libraries

- Akar components built with Vue 3 composition API
- Floating UI for popper/positioning components
- `@internationalized/date` and `@internationalized/number` for i18n
- `@tanstack/vue-virtual` for virtualization

### Pohon UI Specifics

- UnoCSS for styling with `@vinicunca/unocss-preset`
- Theme system in `packages/pohon/src/theme`
- Nuxt module with auto-imports and component registration
- Runtime components in `packages/pohon/src/runtime/components`

## Code Conventions

### Vue SFC Structure

Components follow this pattern (see `packages/core/src/accordion/accordion-root.vue`):

```vue
<script lang="ts">
// Types, interfaces, context creation
export interface ComponentProps { /* ... */ }
export type ComponentEmits = Record<string, any>;
export const [injectContext, provideContext] = createContext('ComponentName');
</script>

<script setup lang="ts" generic="T extends SomeType">
// Component logic
</script>

<template>
  <div><!-- Template --></div>
</template>
```

### Shared Utilities

Import from `packages/core/src/shared`:

- `useForwardExpose`, `useForwardProps`, `useForwardPropsEmits` - Prop forwarding
- `useEmitAsProps` - Convert emits to reactive props
- `useDirection` - RTL/LTR support
- `useId` - Unique ID generation
- `createContext` - Context creation

### Testing Pattern

```typescript
import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';

describe('given ComponentName', () => {
  it('should behave as expected', () => {
    const { getByRole } = render(ComponentName);
    expect(getByRole('button')).toBeDefined();
  });
});
```

## Important File Locations

- Component constants: `packages/core/constant/components.ts`
- Primitive base: `packages/core/src/primitive/primitive.ts`
- Pohon module entry: `packages/pohon/src/module.ts`
- Docs config: `docs/nuxt.config.ts`
- Root scripts: `package.json` (workspace root)

## Changesets Workflow

Uses `@changesets/cli` for versioning:

```bash
pnpm bump              # Create changeset
pnpm ci:version        # Bump versions
pnpm ci:publish        # Publish packages
```

## Notes

- Components emphasize accessibility (ARIA attributes, keyboard navigation)
- All components support disabled state and RTL direction
- Presence component handles mount/unmount animations
- Focus management uses focus-scope and roving-focus patterns
