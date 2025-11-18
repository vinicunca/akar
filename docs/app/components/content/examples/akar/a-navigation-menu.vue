<script setup lang="ts">
import {
  ANavigationMenuContent,
  ANavigationMenuIndicator,
  ANavigationMenuItem,
  ANavigationMenuLink,
  ANavigationMenuList,
  ANavigationMenuRoot,
  ANavigationMenuTrigger,
  ANavigationMenuViewport,
} from 'akar';
import { ref } from 'vue';

const currentTrigger = ref('');

const items = ref<Array<any>>([
  {
    label: 'Guide',
    icon: 'i-lucide:book-open',
    to: '/docs/akar/overview/getting-started',
    children: [
      {
        label: 'Introduction',
        description: 'Fully styled and customizable components for Nuxt.',
        icon: 'i-lucide:house',
      },
      {
        label: 'Installation',
        description: 'Learn how to install and configure Pohon UI in your application.',
        icon: 'i-lucide:cloud-download',
      },
      {
        label: 'Icons',
        icon: 'i-lucide:smile',
        description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
      },
      {
        label: 'Colors',
        icon: 'i-lucide:swatch-book',
        description: 'Choose a primary and a neutral color from your UnoCSS theme.',
      },
      {
        label: 'Theme',
        icon: 'i-lucide:cog',
        description: 'You can customize components by using the `class` / `pohon` props or in your app.config.ts.',
      },
    ],
  },
  {
    label: 'Composables',
    icon: 'i-lucide:database',
    to: '/docs/pohon/composables',
    children: [
      {
        label: 'defineShortcuts',
        icon: 'i-lucide:file-text',
        description: 'Define shortcuts for your application.',
        to: '/docs/pohon/composables/define-shortcuts',
      },
      { label: 'useOverlay', icon: 'i-lucide:file-text', description: 'Display a modal/slideover within your application.', to: '/docs/pohon/composables/use-overlay' },
      { label: 'useToast', icon: 'i-lucide:file-text', description: 'Display a toast within your application.', to: '/docs/pohon/composables/use-toast' },
    ],
  },
  {
    label: 'Components',
    icon: 'i-lucide:box',
    to: '/docs/pohon/components',
    active: true,
    children: [
      {
        label: 'Link',
        icon: 'i-lucide:file-text',
        description: 'Use NuxtLink with superpowers.',
        to: '/docs/pohon/components/link',
      },
      {
        label: 'Modal',
        icon: 'i-lucide:file-text',
        description: 'Display a modal within your application.',
        to: '/docs/pohon/components/dialog',
      },
      {
        label: 'NavigationMenu',
        icon: 'i-lucide:file-text',
        description: 'Display a list of links.',
        to: '/docs/pohon/components/navigation-menu',
      },
      {
        label: 'Pagination',
        icon: 'i-lucide:file-text',
        description: 'Display a list of pages.',
        to: '/docs/pohon/components/pagination',
      },
      {
        label: 'Popover',
        icon: 'i-lucide:file-text',
        description: 'Display a non-modal dialog that floats around a trigger element.',
        to: '/docs/pohon/components/popover',
      },
      {
        label: 'Progress',
        icon: 'i-lucide:file-text',
        description: 'Show a horizontal bar to indicate task progression.',
        to: '/docs/pohon/components/progress',
      },
    ],
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons:github',
    badge: '3.8k',
    to: 'https://github.com/nuxt/ui',
    target: '_blank',
  },
  {
    label: 'Help',
    icon: 'i-lucide:circle-help',
    disabled: true,
  },
]);
</script>

<template>
  <ANavigationMenuRoot
    v-model="currentTrigger"
    class="bg-background flex gap-1.5 w-full items-center justify-center relative [&>div]:min-w-0"
  >
    <ANavigationMenuList class="flex min-w-0 items-center isolate">
      <ANavigationMenuItem
        v-for="item in items"
        :key="item.label"
        class="py-2 min-w-0"
      >
        <ANavigationMenuLink
          v-if="!item.children"
          class="group text-sm color-text-muted font-medium px-2.5 py-1.5 gap-1.5 grid grid-cols-[min-content_1fr_min-content] w-full cursor-pointer transition-colors-280 items-center relative data-[state=open]:color-text-highlighted hover:color-text-highlighted focus-visible:(outline-none before:ring-2 before:ring-primary before:ring-inset) focus:outline-none before:(rounded-md content-empty transition-colors-280 inset-x-px inset-y-0 absolute -z-1) dark:focus-visible:outline-none data-[state=open]:before:bg-background-elevated/50 hover:before:bg-background-elevated/50"
        >
          <span
            class="color-text-dimmed shrink-0 size-5 transition-colors-280 group-data-[state=open]:color-text group-hover:color-text"
            :class="item.icon"
          />

          {{ item.label }}
        </ANavigationMenuLink>
        <ANavigationMenuTrigger
          v-else
          class="group text-sm color-text-muted font-medium px-2.5 py-1.5 gap-1.5 grid grid-cols-[min-content_1fr_min-content] w-full transition-colors-280 items-center relative data-[state=open]:color-text-highlighted hover:color-text-highlighted focus-visible:(outline-none before:ring-2 before:ring-primary before:ring-inset) focus:outline-none before:(rounded-md content-empty transition-colors-280 inset-x-px inset-y-0 absolute -z-1) dark:focus-visible:outline-none data-[state=open]:before:bg-background-elevated/50 hover:before:bg-background-elevated/50"
        >
          <span
            class="color-text-dimmed shrink-0 size-5 transition-colors-280 group-data-[state=open]:color-text group-hover:color-text"
            :class="item.icon"
          />

          {{ item.label }}

          <span class="group ms-auto inline-flex gap-1.5 items-center">
            <span
              class="i-lucide:chevron-down shrink-0 size-5 transform transition-transform-280 group-data-[state=open]:rotate-180"
            />
          </span>
        </ANavigationMenuTrigger>

        <ANavigationMenuContent
          v-if="!!item.children"
          class="max-h-[70vh] w-full left-0 top-0 absolute overflow-y-auto data-[motion^=from-]:(animate-in fade-in) data-[motion^=to-]:(animate-out fade-out) data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52"
        >
          <ul class="p-2 gap-2 grid grid-cols-2 isolate">
            <li
              v-for="child in item.children"
              :key="child.label"
            >
              <ANavigationMenuLink as-child>
                <a
                  class="group text-sm color-text px-3 py-2 text-start flex gap-2 size-full transition-colors-280 items-start relative hover:color-text-highlighted focus-visible:outline-none focus:outline-none before:rounded-md before:content-empty before:transition-colors-280 before:inset-x-px before:inset-y-0 before:absolute dark:focus-visible:outline-none hover:before:bg-background-elevated/50 focus-visible:before:ring-2 focus-visible:before:ring-primary focus-visible:before:ring-inset before:-z-1"
                  :href="child.to"
                >
                  <span
                    class="color-text-dimmed shrink-0 size-5 transition-colors-280 group-hover:color-text"
                    :class="child.icon"
                  />
                  <div class="min-w-0">
                    <p class="font-medium truncate">
                      {{ child.label }}
                    </p>
                    <p class="color-text-muted">
                      {{ child.description }}
                    </p>
                  </div>
                </a>
              </ANavigationMenuLink>
            </li>
          </ul>
        </ANavigationMenuContent>
      </ANavigationMenuItem>
    </ANavigationMenuList>

    <div class="flex w-full left-0 top-full absolute">
      <ANavigationMenuIndicator
        class="flex h-2.5 w-$akar-navigation-menu-indicator-size translate-x-$akar-navigation-menu-indicator-position transition-[transform,width]-280 items-end bottom-0 justify-center absolute z-2 overflow-hidden data-[state=hidden]:(animate-out fade-out) data-[state=visible]:(animate-in fade-in)"
      >
        <div class="border border-border rounded-xs bg-background size-2.5 rotate-45 top-[50%] relative z-1" />
      </ANavigationMenuIndicator>

      <ANavigationMenuViewport
        class="rounded-md bg-background h-$akar-navigation-menu-viewport-height w-full ring ring-ring shadow-lg origin-[top_center] transition-[width,height,left]-280 relative z-1 overflow-hidden data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[state=open]:(animate-in zoom-in-90)"
      />
    </div>
  </ANavigationMenuRoot>
</template>
