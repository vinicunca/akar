---
description: A popup that reveals information when hovering over an element.
category: overlay
links:
  - label: Tooltip
    icon: i-custom-akar
    to: https://akar.com/docs/components/tooltip
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/Tooltip.vue
---

## Usage

Use a [Button](/docs/components/button) or any other component in the default slot of the Tooltip.

::docs-pohon-preview
---
prettier: true
ignore:
  - text
props:
  text: 'Open on GitHub'
slots:
  default: |

    <UButton label="Open" color="neutral" variant="subtle" />
---

:u-button{label="Open" color="neutral" variant="subtle"}
::

::warning
Make sure to wrap your app with the [`App`](/docs/components/app) component which uses the [`TooltipProvider`](https://akar.com/docs/components/tooltip#provider) component from Reka UI.
::

::tip{to="/docs/components/app#props"}
You can check the `App` component `tooltip` prop to see how to configure the Tooltip globally.
::

### Text

Use the `text` prop to set the content of the Tooltip.

::docs-pohon-preview
---
prettier: true
props:
  text: 'Open on GitHub'
slots:
  default: |

    <UButton label="Open" color="neutral" variant="subtle" />
---

:u-button{label="Open" color="neutral" variant="subtle"}
::

### Kbds

Use the `kbds` prop to render [Kbd](/docs/components/kbd) components in the Tooltip.

::docs-pohon-preview
---
prettier: true
ignore:
  - text
  - kbds
props:
  text: 'Open on GitHub'
  kbds:
    - meta
    - G
slots:
  default: |

    <UButton label="Open" color="neutral" variant="subtle" />
---

:u-button{label="Open" color="neutral" variant="subtle"}
::

::tip
You can use special keys like `meta` that displays as `⌘` on macOS and `Ctrl` on other platforms.
::

### Delay

Use the `delay-duration` prop to change the delay before the Tooltip appears. For example, you can make it appear instantly by setting it to `0`.

::docs-pohon-preview
---
prettier: true
ignore:
  - text
props:
  delayDuration: 0
  text: 'Open on GitHub'
slots:
  default: |

    <UButton label="Open" color="neutral" variant="subtle" />
---

:u-button{label="Open" color="neutral" variant="subtle"}
::

::tip
This can be configured globally through the `tooltip.delayDuration` option in the [`App`](/docs/components/app) component.
::

### Content

Use the `content` prop to control how the Tooltip content is rendered, like its `align` or `side` for example.

::docs-pohon-preview
---
prettier: true
ignore:
  - text
items:
  content.align:
    - start
    - center
    - end
  content.side:
    - right
    - left
    - top
    - bottom
props:
  content:
    align: center
    side: bottom
    sideOffset: 8
  text: 'Open on GitHub'
slots:
  default: |

    <UButton label="Open" color="neutral" variant="subtle" />
---

:u-button{label="Open" color="neutral" variant="subtle"}
::

### Arrow

Use the `arrow` prop to display an arrow on the Tooltip.

::docs-pohon-preview
---
prettier: true
ignore:
  - text
  - arrow
props:
  arrow: true
  text: 'Open on GitHub'
slots:
  default: |

    <UButton label="Open" color="neutral" variant="subtle" />
---

:u-button{label="Open" color="neutral" variant="subtle"}
::

### Disabled

Use the `disabled` prop to disable the Tooltip.

::docs-pohon-preview
---
prettier: true
ignore:
  - text
props:
  disabled: true
  text: 'Open on GitHub'
slots:
  default: |

    <UButton label="Open" color="neutral" variant="subtle" />
---

:u-button{label="Open" color="neutral" variant="subtle"}
::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'tooltip-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts), you can toggle the Tooltip by pressing :kbd{value="O"}.
::

### With following cursor

You can make the Tooltip follow the cursor when hovering over an element using the [`reference`](https://akar.com/docs/components/tooltip#trigger) prop:

::component-example
---
name: 'tooltip-cursor-example'
---
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme

## Changelog

:component-changelog
