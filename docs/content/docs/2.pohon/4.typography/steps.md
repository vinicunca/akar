---
title: Steps
description: 'Transform headings into numbered step-by-step guides and tutorials.'
framework: nuxt
category: components
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/prose/Steps.vue
---

## Usage

Wrap your headings with the Steps component to display a list of steps.

Use the `level` prop to define which heading will be used for the steps.

:::code-preview{class="[&>div]:*:w-full"}
::steps{level="4"}

#### Add the Pohon UI module in your `nuxt.config.ts`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['pohon-ui']
});
```

#### Create a config for UnoCSS and add the module

```ts [uno.config.ts]
import { defineConfig } from 'unocss';

export default defineConfig({
});
```

#### Start your development server

```bash
pnpm run dev
```

::

#code

````mdc
::steps{level="4"}

#### Add the Pohon UI module in your `nuxt.config.ts`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['pohon-ui']
})
```

#### Create a config for UnoCSS and add the module

```ts [uno.config.ts]
import { defineConfig } from 'unocss';

export default defineConfig({
});
```

#### Start your development server

```bash
npm run dev
```

::
````

:::

## API

### Props

:docs-pohon-props{prose}

### Slots

:docs-pohon-slots{prose}

## Theme

:docs-pohon-theme{prose}

## Changelog

:docs-component-changelog{prefix="prose"}
