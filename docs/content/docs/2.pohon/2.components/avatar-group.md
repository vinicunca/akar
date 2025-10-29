---
title: AvatarGroup
description: Stack multiple avatars in a group.
category: element
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/avatar-group.vue
---

## Usage

Wrap multiple [Avatar](/docs/pohon/components/avatar) within an AvatarGroup to stack them.

::docs-pohon-preview
---
prettier: true
slots:
  default: |

    <PAvatar src="https://github.com/praburangki.png" alt="praburangki" />
    <PAvatar src="https://github.com/wahyu-ivan.png" alt="Wahyu Ivan" />
    <PAvatar src="https://github.com/GunawanAhmad.png" alt="Gunawan Ahmad" />
---
:p-avatar{src="https://github.com/praburangki.png" alt="praburangki"}
:p-avatar{src="https://github.com/wahyu-ivan.png" alt="Wahyu Ivan"}
:p-avatar{src="https://github.com/GunawanAhmad.png" alt="Gunawan Ahmad"}
::

### Size

Use the `size` prop to change the size of all the avatars.

::docs-pohon-preview
---
prettier: true
props:
  size: xl
slots:
  default: |

    <PAvatar src="https://github.com/praburangki.png" alt="praburangki" />
    <PAvatar src="https://github.com/wahyu-ivan.png" alt="Wahyu Ivan" />
    <PAvatar src="https://github.com/GunawanAhmad.png" alt="Gunawan Ahmad" />
---
:p-avatar{src="https://github.com/praburangki.png" alt="praburangki"}
:p-avatar{src="https://github.com/wahyu-ivan.png" alt="Wahyu Ivan"}
:p-avatar{src="https://github.com/GunawanAhmad.png" alt="Gunawan Ahmad"}
::

### Max

Use the `max` prop to limit the number of avatars displayed. The rest is displayed as an `+X` avatar.

::docs-pohon-preview
---
prettier: true
props:
  max: 2
slots:
  default: |

    <PAvatar src="https://github.com/praburangki.png" alt="praburangki" />
    <PAvatar src="https://github.com/wahyu-ivan.png" alt="Wahyu Ivan" />
    <PAvatar src="https://github.com/GunawanAhmad.png" alt="Gunawan Ahmad" />
---
:p-avatar{src="https://github.com/praburangki.png" alt="praburangki"}
:p-avatar{src="https://github.com/wahyu-ivan.png" alt="Wahyu Ivan"}
:p-avatar{src="https://github.com/GunawanAhmad.png" alt="Gunawan Ahmad"}
::

## Examples

### With tooltip

Wrap each avatar with a [Tooltip](/docs/pohon/components/tooltip) to display a tooltip on hover.

:docs-component-example{name="avatar-group-tooltip-example"}

### With chip

Wrap each avatar with a [Chip](/docs/pohon/components/chip) to display a chip around the avatar.

:docs-component-example{name="avatar-group-chip-example"}

### With link

Wrap each avatar with a [Link](/docs/pohon/components/link) to make them clickable.

:docs-component-example{name="avatar-group-link-example"}

### With mask

Wrap an avatar with a CSS mask to display it with a custom shape.

:docs-component-example{name="avatar-group-mask-example"}

::warning
The `chip` prop does not work correctly when using a mask. Chips may be cut depending on the mask shape.
::

## API

### Props

:docs-pohon-props

### Slots

:docs-pohon-slots

## Theme

:docs-pohon-theme

## Changelog

:docs-component-changelog
