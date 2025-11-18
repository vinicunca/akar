---
title: CodeGroup
description: 'Group multiple code examples in tabbed interfaces for easy comparison.'
framework: nuxt
category: components
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/prose/CodeGroup.vue
---

## Usage

Wrap your code blocks around a `code-group` component to group them together in tabs.

::code-preview{class="[&>div>*]:my-0 [&>div>*]:w-full"}

:::code-group

```bash [pnpm]
pnpm add pohon-ui
```

```bash [npm]
npm install pohon-ui
```

```bash [bun]
bun add pohon-ui
```

:::

#code

````mdc
::code-group

```bash [pnpm]
pnpm add pohon-ui
```

```bash [npm]
npm install pohon-ui
```

```bash [bun]
bun add pohon-ui
```

::
````

::

::note{to="/docs/pohon/typography/code#code-blocks"}
Like the `ProsePre` component, the `CodeGroup` handles filenames, icons and copy button.
::

## API

### Props

:docs-pohon-props{prose}

### Slots

:docs-pohon-slots{prose}

## Theme

:docs-pohon-theme{prose}

## Changelog

:docs-component-changelog{prefix="prose"}
