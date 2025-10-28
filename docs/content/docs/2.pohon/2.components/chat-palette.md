---
title: ChatPalette
description: 'A chat palette to create a chatbot interface inside an overlay.'
category: chat
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/pohon/src/runtime/components/ChatPalette.vue
---

## Usage

The ChatPalette component is a structured layout wrapper that organizes [ChatMessages](/docs/pohon/components/chat-messages) in a scrollable content area and [ChatPrompt](/docs/pohon/components/chat-prompt) in a fixed bottom section, creating cohesive chatbot interfaces for modals, slideovers, or drawers.

```vue{2,8}
<template>
  <UChatPalette>
    <UChatMessages />

    <template #prompt>
      <UChatPrompt />
    </template>
  </UChatPalette>
</template>
```

## Examples

::note{to="https://ai-sdk.dev/docs/getting-started/nuxt" target="_blank"}
These chat components are designed to be used with the **AI SDK v5** from **Vercel AI SDK**.
::

### Within a Modal

You can use the ChatPalette component inside a [Modal](/docs/pohon/components/modal)'s content.

::docs-component-example
---
collapse: true
iframe:
  height: 500px;
iframeMobile: true
overflowHidden: true
name: 'chat-palette-modal-example'
---
::

### Within ContentSearch

You can use the ChatPalette component conditionally inside [ContentSearch](/docs/pohon/components/content-search)'s content to display a chatbot interface when a user selects an item.

::docs-component-example
---
collapse: true
iframe:
  height: 500px;
iframeMobile: true
overflowHidden: true
name: 'chat-palette-content-search-example'
---
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
