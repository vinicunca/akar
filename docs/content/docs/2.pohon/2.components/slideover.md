---
description: A dialog that slides in from any side of the screen.
category: overlay
links:
  - label: Dialog
    to: /docs/akar/components/dialog
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/slideover.vue
---

## Usage

Use a [Button](/docs/pohon/components/button) or any other component in the default slot of the Slideover.

Then, use the `#content` slot to add the content displayed when the Slideover is open.

::docs-pohon-preview
---
prettier: true
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" />

  content: |

    <CorePlaceholder class="h-full m-4" />
---

:p-button{label="Open" color="neutral" variant="subtle"}

#content
:core-placeholder{class="h-full m-4"}
::

You can also use the `#header`, `#body` and `#footer` slots to customize the Slideover's content.

### Title

Use the `title` prop to set the title of the Slideover's header.

::docs-pohon-preview
---
prettier: true
props:
  title: 'Slideover with title'
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" />

  body: |

    <CorePlaceholder class="h-full" />
---

:p-button{label="Open" color="neutral" variant="subtle"}

#body
:core-placeholder{class="h-full"}
::

### Description

Use the `description` prop to set the description of the Slideover's header.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
props:
  title: 'Slideover with description'
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" />

  body: |

    <CorePlaceholder class="h-full" />
---

:p-button{label="Open" color="neutral" variant="subtle"}

#body
:core-placeholder{class="h-full"}
::

### Close

Use the `close` prop to customize or hide the close button (with `false` value) displayed in the Slideover's header.

You can pass any property from the [Button](/docs/pohon/components/button) component to customize it.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - close.color
  - close.variant
props:
  title: 'Slideover with close button'
  close:
    color: primary
    variant: outline
    class: 'rounded-full'
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" />

  body: |

    <CorePlaceholder class="h-full" />
---

:p-button{label="Open" color="neutral" variant="subtle"}

#body
:core-placeholder{class="h-full"}
::

::note
The close button is not displayed if the `#content` slot is used as it's a part of the header.
::

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](/docs/pohon/components/icon). Defaults to `i-lucide-x`.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
props:
  title: 'Slideover with close button'
  closeIcon: 'i-lucide-arrow-right'
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" />

  body: |

    <CorePlaceholder class="h-full" />
---

:p-button{label="Open" color="neutral" variant="subtle"}

#body
:core-placeholder{class="h-full"}
::

::docs-framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt#theme"}
You can customize this icon globally in your `app.config.ts` under `pohon.icons.close` key.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue#theme"}
You can customize this icon globally in your `vite.config.ts` under `pohon.icons.close` key.
:::
::

### Side

Use the `side` prop to set the side of the screen where the Slideover will slide in from. Defaults to `right`.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
props:
  side: 'left'
  title: 'Slideover with side'
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" />

  body: |

    <CorePlaceholder class="h-full min-h-48" />
---

:p-button{label="Open" color="neutral" variant="subtle"}

#body
:core-placeholder{class="h-full min-h-48"}
::

### Overlay

Use the `overlay` prop to control whether the Slideover has an overlay or not. Defaults to `true`.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
props:
  overlay: false
  title: 'Slideover without overlay'
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" />

  body: |

    <CorePlaceholder class="h-full" />
---

:p-button{label="Open" color="neutral" variant="subtle"}

#body
:core-placeholder{class="h-full"}
::

### Transition

Use the `transition` prop to control whether the Slideover is animated or not. Defaults to `true`.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
props:
  transition: false
  title: 'Slideover without transition'
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" />

  body: |

    <CorePlaceholder class="h-full" />
---

:p-button{label="Open" color="neutral" variant="subtle"}

#body
:core-placeholder{class="h-full"}
::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::docs-component-example
---
name: 'slideover-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts), you can toggle the Slideover by pressing :kbd{value="O"}.
::

::tip
This allows you to move the trigger outside of the Slideover or remove it entirely.
::

### Disable dismissal

Set the `dismissible` prop to `false` to prevent the Slideover from being closed when clicking outside of it or pressing escape. A `close:prevent` event will be emitted when the user tries to close it.

::docs-pohon-preview
---
prettier: true
ignore:
  - title
  - dismissible
props:
  dismissible: false
  title: 'Slideover non-dismissible'
slots:
  default: |

    <PButton label="Open" color="neutral" variant="subtle" />

  body: |

    <CorePlaceholder class="h-full" />
---

:p-button{label="Open" color="neutral" variant="subtle"}

#body
:core-placeholder{class="h-full"}
::

### Programmatic usage

You can use the [`useOverlay`](/docs/composables/use-overlay) composable to open a Slideover programmatically.

::warning
Make sure to wrap your app with the [`App`](/docs/pohon/components/app) component which uses the [`OverlayProvider`](https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/overlay-provider.vue) component.
::

First, create a slideover component that will be opened programmatically:

::docs-component-example
---
prettier: true
name: 'slideover-example'
preview: false
---
::

::note
We are emitting a `close` event when the slideover is closed or dismissed here. You can emit any data through the `close` event, however, the event must be emitted in order to capture the return value.
::

Then, use it in your app:

::docs-component-example
---
name: 'slideover-programmatic-example'
---
::

::tip
You can close the slideover within the slideover component by emitting `emit('close')`.
::

### Nested slideovers

You can nest slideovers within each other.

::docs-component-example
---
name: 'slideover-nested-example'
---
::

### With footer slot

Use the `#footer` slot to add content after the Slideover's body.

::docs-component-example
---
name: 'slideover-footer-slot-example'
---
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
