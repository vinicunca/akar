---
description: An indicator of a numeric value or a state.
category: element
links:
  - label: GitHub
    icon: i-simple-icons:github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/chip.vue
---

## Usage

Wrap any component with a Chip to display an indicator.

::docs-pohon-preview
---
prettier: true
slots:
  default: |

    <PButton icon="i-lucide:mail" color="neutral" variant="subtle" />
---
:p-button{icon="i-lucide:mail" color="neutral" variant="subtle"}
::

### Color

Use the `color` prop to change the color of the Chip.

::docs-pohon-preview
---
prettier: true
props:
  color: neutral
slots:
  default: |

    <PButton icon="i-lucide:mail" color="neutral" variant="subtle" />
---
:p-button{icon="i-lucide:mail" color="neutral" variant="subtle"}
::

### Size

Use the `size` prop to change the size of the Chip.

::docs-pohon-preview
---
prettier: true
props:
  size: 3xl
slots:
  default: |

    <PButton icon="i-lucide:mail" color="neutral" variant="subtle" />
---
:p-button{icon="i-lucide:mail" color="neutral" variant="subtle"}
::

### Text

Use the `text` prop to set the text of the Chip.

::docs-pohon-preview
---
prettier: true
props:
  text: 5
  size: 3xl
slots:
  default: |

    <PButton icon="i-lucide:mail" color="neutral" variant="subtle" />
---
:p-button{icon="i-lucide:mail" color="neutral" variant="subtle"}
::

### Position

Use the `position` prop to change the position of the Chip.

::docs-pohon-preview
---
prettier: true
props:
  position: 'bottom-left'
slots:
  default: |

    <PButton icon="i-lucide:mail" color="neutral" variant="subtle" />
---
:p-button{icon="i-lucide:mail" color="neutral" variant="subtle"}
::

### Inset

Use the `inset` prop to display the Chip inside the component. This is useful when dealing with rounded components.

::docs-pohon-preview
---
prettier: true
props:
  inset: true
slots:
  default: |

    <PAvatar src="https://github.com/praburangki.png" />
---
:p-avatar{src="https://github.com/praburangki.png"}
::

### Standalone

Use the `standalone` prop alongside the `inset` prop to display the Chip inline.

::docs-pohon-preview
---
props:
  standalone: true
  inset: true
---
::

::note
It's used this way in the [`CommandPalette`](/docs/pohon/components/command-palette), [`InputMenu`](/docs/pohon/components/input-menu), [`Select`](/docs/pohon/components/select) or [`SelectMenu`](/docs/pohon/components/select-menu) components for example.
::

## Examples

### Control visibility

You can control the visibility of the Chip using the `show` prop.

:docs-component-example{name="chip-show-example"}

::note
In this example, the Chip has a color per status and is displayed when the status is not `offline`.
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

### Emits

:docs-pohon-emits

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
