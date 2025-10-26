---
description: A collapsible element to toggle visibility of its content.
category: element
links:
  - label: Collapsible
    to: /docs/akar/components/collapsible
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/Collapsible.vue
---

## Usage

Use a [PButton](/docs/pohon/components/button) or **any other component** in the default slot of the Collapsible.

Then, use the `#content` slot to add the content displayed when the Collapsible is open.

::docs-pohon-preview
---
prettier: true
ignore:
  - class
props:
  class: 'flex flex-col gap-2 w-48 bg-background p-4 rounded-md'
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />

  content: |

    <CorePlaceholder class="h-48" />
---

:p-button{label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block}

#content
:core-placeholder{class="h-48"}
::

### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the Collapsible is collapsed. Defaults to `true`.

::docs-pohon-preview
---
prettier: true
ignore:
  - class
props:
  unmountOnHide: false
  class: 'flex flex-col gap-2 w-48 bg-background p-4 rounded-md'
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />

  content: |

    <CorePlaceholder class="h-48" />
---

:p-button{label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block}

#content
:core-placeholder{class="h-48"}
::

::note
You can inspect the DOM to see the content being rendered.
::

### Disabled

Use the `disabled` prop to disable the Collapsible.

::docs-pohon-preview
---
prettier: true
ignore:
  - class
props:
  class: 'flex flex-col gap-2 w-48 bg-background p-4 rounded-md'
  disabled: true
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block />

  content: |

    <CorePlaceholder class="h-48" />
---

:p-button{label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block}

#content
:core-placeholder{class="h-48"}
::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::docs-pohon-example
---
name: 'collapsible-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts), you can toggle the Collapsible by pressing :kbd{value="O"}.
::

::tip
This allows you to move the trigger outside of the Collapsible or remove it entirely.
::

### With rotating icon

Here is an example with a rotating icon in the Button that indicates the open state of the Collapsible.

::docs-pohon-example
---
name: 'collapsible-icon-example'
---
::

## API

### Props

:docs-pohon-props

### Emits

:docs-pohon-emits

### Slots

:docs-pohon-slots

## Theme

:docs-pohon-theme

### Anatomy

<!-- TODO: Create anatomy images for this component -->
Here is the anatomy of themeable parts of the Accordion component:

Coming soon...


## Changelog

::docs-component-changelog
