---
title: Timeline
description: 'A component that displays a sequence of events with dates, titles, icons or avatars.'
category: data
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/Timeline.vue
---

## Usage

Use the Timeline component to display a list of items in a timeline.

::docs-pohon-preview
---
collapse: true
hide:
  - class
  - defaultValue
ignore:
  - items
  - class
  - defaultValue
external:
  - items
props:
  defaultValue: 2
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.'
      icon: 'i-lucide-rocket'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.'
      icon: 'i-lucide-palette'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.'
      icon: 'i-lucide-code'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization. Deployed the application to production.'
      icon: 'i-lucide-check-circle'
  class: 'w-96'
---
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `date?: string`{lang="ts-type"}
- `title?: string`{lang="ts-type"}
- `description?: AvatarProps`{lang="ts-type"}
- `icon?: string`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `value?: string | number`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `ui?: { item?: ClassNameValue, container?: ClassNameValue, indicator?: ClassNameValue, separator?: ClassNameValue, wrapper?: ClassNameValue, date?: ClassNameValue, title?: ClassNameValue, description?: ClassNameValue }`{lang="ts-type"}

::docs-pohon-preview
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  defaultValue: 2
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.'
      icon: 'i-lucide-rocket'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.'
      icon: 'i-lucide-palette'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.'
      icon: 'i-lucide-code'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization. Deployed the application to production.'
      icon: 'i-lucide-check-circle'
  class: 'w-96'
---
::

### Color

Use the `color` prop to change the color of the active items in a Timeline.

::docs-pohon-preview
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  color: neutral
  defaultValue: 2
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.'
      icon: 'i-lucide-rocket'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.'
      icon: 'i-lucide-palette'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.'
      icon: 'i-lucide-code'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization. Deployed the application to production.'
      icon: 'i-lucide-check-circle'
  class: 'w-96'
---
::

### Size

Use the `size` prop to change the size of the Timeline.

::docs-pohon-preview
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  size: xs
  defaultValue: 2
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.'
      icon: 'i-lucide-rocket'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops. Created wireframes and prototypes for user testing.'
      icon: 'i-lucide-palette'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development. Implemented core features and integrated with APIs.'
      icon: 'i-lucide-code'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization. Deployed the application to production.'
      icon: 'i-lucide-check-circle'
  class: 'w-96'
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Timeline. Defaults to `vertical`.

::docs-pohon-preview
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  orientation: 'horizontal'
  defaultValue: 2
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment.'
      icon: 'i-lucide-rocket'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops.'
      icon: 'i-lucide-palette'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development.'
      icon: 'i-lucide-code'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization.'
      icon: 'i-lucide-check-circle'
  class: 'w-full'
class: 'overflow-x-auto'
---
::

### Reverse

Use the reverse prop to reverse the direction of the Timeline.

::docs-pohon-preview
---
ignore:
  - items
  - class
  - defaultValue
external:
  - items
externalTypes:
  - TimelineItem[]
props:
  reverse: true
  modelValue: 2
  orientation: 'vertical'
  items:
    - date: 'Mar 15, 2025'
      title: 'Project Kickoff'
      description: 'Kicked off the project with team alignment.'
      icon: 'i-lucide-rocket'
    - date: 'Mar 22 2025'
      title: 'Design Phase'
      description: 'User research and design workshops.'
      icon: 'i-lucide-palette'
    - date: 'Mar 29 2025'
      title: 'Development Sprint'
      description: 'Frontend and backend development.'
      icon: 'i-lucide-code'
    - date: 'Apr 5 2025'
      title: 'Testing & Deployment'
      description: 'QA testing and performance optimization.'
      icon: 'i-lucide-check-circle'
  class: 'w-full'
class: 'overflow-x-auto'
---
::

## Examples

### Control active item

You can control the active item by using the `default-value` prop or the `v-model` directive with the index of the item.

:component-example{name="timeline-model-value-example" prettier}

::tip
You can also pass the `value` of one of the items if provided.
::

### With alternating layout

Use the `ui` prop to create a Timeline with alternating layout.

:component-example{name="timeline-alternating-layout-example" prettier}

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}-indicator`{lang="ts-type"}
- `#{{ item.slot }}-date`{lang="ts-type"}
- `#{{ item.slot }}-title`{lang="ts-type"}
- `#{{ item.slot }}-description`{lang="ts-type"}

:component-example{name="timeline-custom-slot-example" prettier}

### With slots

Use the available slots to create a more complex Timeline.

:component-example{name="timeline-slots-example" prettier}

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
