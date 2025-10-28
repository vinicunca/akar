---
title: FieldGroup
description: Group multiple button-like elements together.
category: element
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/FieldGroup.vue
---

## Usage

Wrap multiple [Button](/components/button) within a FieldGroup to group them together.

::docs-pohon-preview
---
prettier: true
slots:
  default: |

    <PButton color="neutral" variant="subtle" label="Button" />
    <PButton color="neutral" variant="outline" icon="i-lucide-chevron-down" />
---
:u-button{color="neutral" variant="subtle" label="Button"}
:u-button{color="neutral" variant="outline" icon="i-lucide-chevron-down"}
::

### Size

Use the `size` prop to change the size of all the buttons.

::docs-pohon-preview
---
prettier: true
props:
  size: xl
slots:
  default: |

    <PButton color="neutral" variant="subtle" label="Button" />
    <PButton color="neutral" variant="outline" icon="i-lucide-chevron-down" />
---
:u-button{color="neutral" variant="subtle" label="Button"}
:u-button{color="neutral" variant="outline" icon="i-lucide-chevron-down"}
::

### Orientation

Use the `orientation` prop to change the orientation of the buttons. Defaults to `horizontal`.

::docs-pohon-preview
---
prettier: true
props:
  orientation: vertical
slots:
  default: |

    <PButton color="neutral" variant="subtle" label="Submit" />
    <PButton color="neutral" variant="outline" label="Cancel" />
---
:u-button{color="neutral" variant="subtle" label="Submit"}
:u-button{color="neutral" variant="outline" label="Cancel"}
::

## Examples

### With input

You can use components like [Input](/components/input), [InputMenu](/components/input-menu), [Select](/components/select) [SelectMenu](/components/select-menu), etc. within a field group.

::docs-pohon-preview
---
prettier: true
slots:
  default: |

    <PInput color="neutral" variant="outline" placeholder="Enter token" />

    <PButton color="neutral" variant="subtle" icon="i-lucide-clipboard" />
---
:u-input{color="neutral" variant="outline" placeholder="Enter token"}
:u-button{color="neutral" variant="subtle" icon="i-lucide-clipboard"}
::

### With tooltip

You can use a [Tooltip](/components/tooltip) within a field group.

:docs-component-example{name="field-group-tooltip-example"}

### With dropdown

You can use a [DropdownMenu](/components/dropdown-menu) within a field group.

:docs-component-example{name="field-group-dropdown-example"}

### With badge

You can use a [Badge](/components/badge) within a field group.

:docs-component-example{name="field-group-badge-example"}

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
