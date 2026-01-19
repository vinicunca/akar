---
title: Customize components
description: Learn how to customize Pohon UI components with the UnoCSS Variants API for advanced, flexible, and maintainable styling.
navigation.title: Components
navigation.icon: 'i-lucide:layout-grid'
---

## UnoCSS Variants

Pohon UI components are styled using the [UnoCSS Variants](https://vinicunca.dev/unocss-variants) API, which provides a powerful way to create variants and manage component styles.

### Slots

Components can have multiple `slots`, each representing a distinct HTML element or section within the component. These slots allow for flexible content insertion and styling.

Let's take the [Card](/docs/pohon/components/card) component as an example which has multiple slots:

::code-group

```ts [src/theme/card.ts]
export default {
  slots: {
    root: 'bg-background ring ring-ring divide-y divide-divide rounded-lg',
    header: 'p-4 sm:px-6',
    body: 'p-4 sm:p-6',
    footer: 'p-4 sm:px-6'
  }
};
```

```vue [src/runtime/components/card.vue]
<template>
  <div :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <div :class="pohon.header({ class: props.pohon?.header })">
      <slot name="header" />
    </div>

    <div :class="pohon.body({ class: props.pohon?.body })">
      <slot />
    </div>

    <div :class="pohon.footer({ class: props.pohon?.footer })">
      <slot name="footer" />
    </div>
  </div>
</template>
```

::

Some components don't have slots, they are just composed of a single root element. In this case, the theme only defines the `base` slot like the [Container](/docs/pohon/components/container) component for example:

::code-group

```ts [src/theme/container.ts]
export default {
  base: 'max-w-$pohon-container mx-auto px-4 sm:px-6 lg:px-8'
};
```

```vue [src/runtime/components/container.vue]
<template>
  <div :class="container({ class: props.class })">
    <slot />
  </div>
</template>
```

::

::warning
Components without slots don't have a [`pohon` prop](#pohon-prop), only the [`class` prop](#class-prop) is available to override styles.
::

### Variants

Components support `variants`, which allow you to dynamically adjust the styles of different `slots` based on component props.

For example, the [Avatar](/docs/pohon/components/avatar) component uses a `size` variant to control its appearance:

```ts [src/theme/avatar.ts] {6-18}
export default {
  slots: {
    root: 'inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-elevated',
    image: 'h-full w-full rounded-[inherit] object-cover'
  },
  variants: {
    size: {
      sm: {
        root: 'size-7 text-sm'
      },
      md: {
        root: 'size-8 text-base'
      },
      lg: {
        root: 'size-9 text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
};
```

This way, the `size` prop will apply the corresponding styles to the `root` slot:

::docs-pohon-preview{slug="avatar"}
---
ignore:
  - src
props:
  src: 'https://github.com/nuxt.png'
  size: lg
---
::

### Default Variants

The `defaultVariants` property sets the default value for each variant when no prop is passed.

For example, the [Avatar](/docs/pohon/components/avatar) component has its default size set to `md`:

```ts [src/theme/avatar.ts] {19-21}
export default {
  slots: {
    root: 'inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-elevated',
    image: 'h-full w-full rounded-[inherit] object-cover'
  },
  variants: {
    size: {
      sm: {
        root: 'size-7 text-sm'
      },
      md: {
        root: 'size-8 text-base'
      },
      lg: {
        root: 'size-9 text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
};
```

::docs-framework-only
#nuxt
:::tip{to="/docs/pohon/getting-started/installation/nuxt#themedefaultvariants"}
You can use the `theme.defaultVariants` option in your `nuxt.config.ts` to override the default values for `size` and `color` for all components at once.
:::

#vue
:::tip{to="/docs/pohon/getting-started/installation/vue#themedefaultvariants"}
You can use the `theme.defaultVariants` option in your `vite.config.ts` to override the default values for `size` and `color` for all components at once.
:::
::

### Compound Variants

Some components use the `compoundVariants` property to apply classes when multiple variant conditions are met at the same time.

For example, the [Button](/docs/pohon/components/button) component uses the `compoundVariants` property to apply classes for a specific `color` and `variant` combination:

```ts [src/theme/button.ts] {27-31}
import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    base: 'font-500 rounded-md inline-flex transition-colors-280 items-center aria-disabled:(opacity-75 cursor-not-allowed) disabled:(opacity-75 cursor-not-allowed)',
  },
  variants: {
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, ''])),
      neutral: ''
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
      ghost: '',
      link: ''
    }
  },
  compoundVariants: [
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'outline',
      class: `ring ring-inset ring-${color}/50 text-${color} hover:bg-${color}/10 active:bg-${color}/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-${color}`
    })),
    {
      color: 'neutral',
      variant: 'outline',
      class: 'ring ring-inset ring-accented color-text bg-background hover:bg-elevated active:bg-elevated disabled:bg-background aria-disabled:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted'
    }
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid'
  }
});
```

## Customize theme

You have multiple ways to customize the appearance of Pohon UI components, you can do it for all components at once or on a per-component basis.

::caution
UnoCSS Variants doesn't support merging classes, so there's a possibility you might have the same class defined in multiple places or conflicting classes such as `p-1 px-5`. So it's your responsibility to ensure that the classes you define don't conflict with each other. One way to handle this is to use [UnoCSS Layers](https://unocss.dev/config/layers#layers-using-variants). There will be no implementation for merging classes based on [this comment](https://github.com/unocss/unocss/issues/2748#issuecomment-1902572595).
::

::tip
You can explore the theme for each component in two ways:

- Check the `Theme` section in the documentation of each individual component.
- Browse the source code directly in the GitHub repository at [`src/theme`](https://github.com/vinicunca/akar/tree/main/packages/pohon/src/theme).
::

### Global config

::docs-framework-only
#nuxt
You can override the theme of components globally inside your `app.config.ts` by using the exact same structure as the theme object.
#vue
You can override the theme of components globally inside your `vite.config.ts` by using the exact same structure as the theme object.
::

You can customize the [`slots`](#slots), [`variants`](#variants), [`compoundVariants`](#compound-variants) and [`defaultVariants`](#default-variants) of a component to change the default theme of a component:

::docs-framework-only
#nuxt
:::div
```ts [app.config.ts]
export default defineAppConfig({
  pohon: {
    button: {
      slots: {
        base: 'font-bold'
      },
      variants: {
        size: {
          md: {
            leadingIcon: 'size-4'
          }
        }
      },
      compoundVariants: [{
        color: 'neutral',
        variant: 'outline',
        class: 'ring-ring hover:bg-accented'
      }],
      defaultVariants: {
        color: 'neutral',
        variant: 'outline'
      }
    }
  }
});
```
:::

#vue
:::div
```ts [vite.config.ts]
import vue from '@vitejs/plugin-vue';
import pohon from 'pohon-ui/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),
    pohon({
      pohon: {
        button: {
          slots: {
            base: 'uno-layer-variants:font-bold'
          },
          variants: {
            size: {
              md: {
                leadingIcon: 'uno-layer-variants:size-4'
              }
            }
          },
          compoundVariants: [{
            color: 'neutral',
            variant: 'outline',
            class: 'uno-layer-variants:(ring-ring hover:bg-accented)'
          }],
          defaultVariants: {
            color: 'neutral',
            variant: 'outline'
          }
        }
      }
    })
  ]
});
```
:::
::

::note
In this example, `font-bold` will have a higher specificity compared to `font-medium` on all buttons, `size-4` will have a higher specificity compared to `size-5` class on the leading icon when `size="md"` and `ring-ring hover:bg-accented` will have a higher specificity compared to `ring-accented hover:bg-elevated` when `color="neutral"` and `variant="outline"`. The buttons now defaults to `color="neutral"` and `variant="outline"`.
::

### `pohon` prop

You can also override a component's **slots** using the `pohon` prop. This takes priority over both global config and resolved `variants`.

::docs-pohon-preview{slug="button"}
---
prettier: true
ignore:
  - pohon.trailingIcon
  - color
  - variant
  - size
  - icon
props:
  trailingIcon: i-lucide:chevron-right
  size: md
  color: neutral
  variant: outline
  pohon:
    trailingIcon: 'akar:rotate-90 akar:size-3'
slots:
  default: |

    Button
---
::

::note
In this example, the `trailingIcon` slot is overwritten with `size-3` even though the `md` size variant would apply a `size-5` class to it.
::

### `class` prop

The `class` prop allows you to override the classes of the `root` or `base` slot. This takes priority over both global config and resolved `variants`.

::docs-pohon-preview{slug="button"}
---
props:
  class: 'akar:font-bold akar:rounded-full'
slots:
  default: Button
---
::

::note
In this example, the `font-bold` class will override the default `font-medium` class on this button.
::
