---
description: Display content in a card with a header, body and footer.
category: element
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/Card.vue
---

## Usage

Use the `header`, `default` and `footer` slots to add content to the Card.

::docs-component-example
---
collapse: true
name: 'card-example'
props:
  class: 'w-full'
---
::

### Variant

Use the `variant` prop to change the variant of the Card.

::docs-pohon-preview
---
prettier: true
hide:
  - class
props:
  variant: subtle
  class: 'w-full'
slots:
  header: |

    <CorePlaceholder class="h-8" />

  default: |

    <CorePlaceholder class="h-32" />

  footer: |

    <CorePlaceholder class="h-8" />
---

#header
:placeholder{class="h-8"}

#default
:placeholder{class="h-32"}

#footer
:placeholder{class="h-8"}
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
