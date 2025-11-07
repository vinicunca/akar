---
title: FormField
description: A wrapper for form elements that provides validation and error handling.
category: form
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/form-field.vue
---

## Usage

Wrap any form component with a FormField. Used in a [Form](/docs/pohon/components/form), it provides validation and error handling.

### Label

Use the `label` prop to set the label for the form control.

::docs-pohon-preview
---
prettier: true
props:
  label: Email
slots:
  default: |

    <PInput placeholder="Enter your email" />
---

:p-input{placeholder="Enter your email"}
::

::note
The label `for` attribute and the form control are associated with a unique `id` if not provided.
::

When using the `required` prop, an asterisk is added next to the label.

::docs-pohon-preview
---
prettier: true
ignore:
  - label
props:
  label: Email
  required: true
slots:
  default: |

    <PInput placeholder="Enter your email" />
---

:p-input{placeholder="Enter your email"}
::

### Description

Use the `description` prop to provide additional information below the label.

::docs-pohon-preview
---
prettier: true
ignore:
  - label
props:
  label: Email
  description: We'll never share your email with anyone else.
slots:
  default: |

    <PInput placeholder="Enter your email" class="w-full" />
---

:p-input{placeholder="Enter your email" class="w-full"}
::

### Hint

Use the `hint` prop to display a hint message next to the label.

::docs-pohon-preview
---
prettier: true
ignore:
  - label
props:
  label: Email
  hint: Optional
slots:
  default: |

    <PInput placeholder="Enter your email" />
---

:p-input{placeholder="Enter your email"}
::

### Help

Use the `help` prop to display a help message below the form control.

::docs-pohon-preview
---
prettier: true
ignore:
  - label
props:
  label: Email
  help: Please enter a valid email address.
slots:
  default: |

    <PInput placeholder="Enter your email" class="w-full" />
---

:p-input{placeholder="Enter your email" class="w-full"}
::

### Error

Use the `error` prop to display an error message below the form control. When used together with the `help` prop, the `error` prop takes precedence.

When used inside a [Form](/docs/pohon/components/form), this is automatically set when a validation error occurs.

::docs-pohon-preview
---
prettier: true
ignore:
  - label
props:
  label: Email
  error: Please enter a valid email address.
slots:
  default: |

    <PInput placeholder="Enter your email" class="w-full" />
---

:p-input{placeholder="Enter your email" class="w-full"}
::

::tip{to="/docs/getting-started/theme/design-system#colors"}
This sets the `color` to `error` on the form control. You can change it globally in your `app.config.ts`.
::

### Size

Use the `size` prop to change the size of the FormField, the `size` is proxied to the form control.

::docs-pohon-preview
---
prettier: true
ignore:
  - label
  - description
  - hint
  - help
props:
  label: Email
  description: We'll never share your email with anyone else.
  hint: Optional
  help: Please enter a valid email address.
  size: xl
slots:
  default: |

    <PInput placeholder="Enter your email" class="w-full" />
---

:p-input{placeholder="Enter your email" class="w-full"}
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
