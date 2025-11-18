---
description: A button element that can act as a link or trigger an action.
category: element
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/button.vue
---

## Usage

Use the default slot to set the label of the Button.

::docs-pohon-preview
---
slots:
  default: Button
---
::

### Label

Use the `label` prop to set the label of the Button.

::docs-pohon-preview
---
props:
  label: Button
---
::

### Color

Use the `color` prop to change the color of the Button.

::docs-pohon-preview
---
props:
  color: neutral
slots:
  default: Button
---
::

### Variant

Use the `variant` prop to change the variant of the Button.

::docs-pohon-preview
---
props:
  color: neutral
  variant: outline
slots:
  default: Button
---
::

### Size

Use the `size` prop to change the size of the Button.

::docs-pohon-preview
---
props:
  size: xl
slots:
  default: Button
---
::

### Icon

Use the `icon` prop to show an [Icon](/docs/pohon/components/icon) inside the Button.

::docs-pohon-preview
---
props:
  icon: i-lucide:rocket
  size: md
  color: primary
  variant: solid
slots:
  default: Button
---
::

Use the `leading` and `trailing` props to set the icon position or the `leading-icon` and `trailing-icon` props to set a different icon for each position.

::docs-pohon-preview
---
props:
  trailingIcon: i-lucide:arrow-right
  size: md
slots:
  default: Button
---
::

The `label` as prop or slot is optional so you can use the Button as an icon-only button.

::docs-pohon-preview
---
props:
  icon: i-lucide:search
  size: md
  color: primary
  variant: solid
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/pohon/components/avatar) inside the Button.

::docs-pohon-preview
---
prettier: true
props:
  avatar:
    src: 'https://github.com/nuxt.png'
  size: md
  color: neutral
  variant: outline
slots:
  default: |

    Button
---
::

The `label` as prop or slot is optional so you can use the Button as an avatar-only button.

::docs-pohon-preview
---
prettier: true
props:
  avatar:
    src: 'https://github.com/nuxt.png'
  size: md
  color: neutral
  variant: outline
---
::

### Link

You can pass any property from the [Link](/docs/pohon/components/link#props) component such as `to`, `target`, etc.

::docs-pohon-preview
---
ignore:
  - target
props:
  to: https://github.com/nuxt/ui
  target: _blank
slots:
  default: Button
---
::

When the Button is a link or when using the `active` prop, you can use the `active-color` and `active-variant` props to customize the active state.

::docs-pohon-preview
---
prettier: true
ignore:
  - color
  - variant
items:
  activeColor:
    - primary
    - secondary
    - success
    - info
    - warning
    - error
    - neutral
  activeVariant:
    - solid
    - outline
    - soft
    - subtle
    - ghost
    - link
props:
  active: true
  color: neutral
  variant: outline
  activeColor: primary
  activeVariant: solid
slots:
  default: |

    Button
---

Button
::

You can also use the `active-class` and `inactive-class` props to customize the active state.

::docs-pohon-preview
---
props:
  active: true
  activeClass: 'font-bold'
  inactiveClass: 'font-light'
slots:
  default: Button
---

Button
::

::tip
You can configure these styles globally in your `app.config.ts` file under the `pohon.button.variants.active` key.

```ts
export default defineAppConfig({
  pohon: {
    button: {
      variants: {
        active: {
          true: {
            base: 'font-bold'
          }
        }
      }
    }
  }
})
```
::

### Loading

Use the `loading` prop to show a loading icon and disable the Button.

::docs-pohon-preview
---
props:
  loading: true
  trailing: false
slots:
  default: Button
---
Button
::

Use the `loading-auto` prop to show the loading icon automatically while the `@click` promise is pending.

:docs-component-example{name="button-loading-auto-example"}

This also works with the [Form](/docs/pohon/components/form) component.

:docs-component-example{name="button-loading-auto-form-example"}

### Loading Icon

Use the `loading-icon` prop to customize the loading icon. Defaults to `i-lucide:loader-circle`.

::docs-pohon-preview
---
props:
  loading: true
  loadingIcon: 'i-lucide:loader'
slots:
  default: Button
---
Button
::

::docs-framework-only
#nuxt
:::tip{to="/docs/pohon/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.loading` key.
:::

#vue
:::tip{to="/docs/pohon/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.loading` key.
:::
::

### Disabled

Use the `disabled` prop to disable the Button.

::docs-pohon-preview
---
props:
  disabled: true
slots:
  default: Button
---

Button
::

## Examples

### `class` prop

Use the `class` prop to override the base styles of the Button.

::docs-pohon-preview
---
props:
  class: 'akar:font-bold akar:rounded-full'
slots:
  default: Button
---
::

### `pohon` prop

Use the `pohon` prop to override the slots styles of the Button.

::docs-pohon-preview
---
prettier: true
ignore:
  - pohon
  - color
  - variant
  - icon
props:
  icon: i-lucide:rocket
  color: neutral
  variant: outline
  pohon:
    leadingIcon: 'color-primary'
slots:
  default: |

    Button
---
::

## API

### Props

:docs-pohon-props

::callout{icon="i-simple-icons:github" to="https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/link.vue#L13"}
The `Button` component extends the `Link` component. Check out the source code on GitHub.
::

### Slots

:docs-pohon-slots

::callout{icon="i-simple-icons:mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
This component also supports all native `<button>` HTML attributes.
::

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
