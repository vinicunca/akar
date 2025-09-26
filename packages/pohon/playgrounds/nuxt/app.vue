<script setup lang="ts">
import { useColorMode } from '#imports';
import { splitByCase, upperFirst } from 'scule';

const router = useRouter();
const appConfig = useAppConfig();
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light';
  },
});

const components = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'card',
  'calendar',
  'carousel',
  'checkbox',
  'checkbox-group',
  'chip',
  'collapsible',
  'color-picker',
  'context-menu',
  'command-palette',
  'drawer',
  'dropdown-menu',
  'field-group',
  'file-upload',
  'form',
  'form-field',
  'input',
  'input-menu',
  'input-number',
  'input-tags',
  'kbd',
  'link',
  'modal',
  'navigation-menu',
  'pagination',
  'pin-input',
  'popover',
  'progress',
  'radio-group',
  'select',
  'select-menu',
  'separator',
  'shortcuts',
  'skeleton',
  'slideover',
  'slider',
  'stepper',
  'switch',
  'tabs',
  'table',
  'textarea',
  'timeline',
  'toast',
  'tooltip',
  'tree',
];

const items = components.map((component) => ({ label: upperName(component), to: `/components/${component}` }));

function upperName(name: string) {
  return splitByCase(name).map((p) => upperFirst(p)).join('');
}

const isCommandPaletteOpen = ref(false);

function onSelect(item: any) {
  router.push(item.to);
}

defineShortcuts({
  meta_k: () => isCommandPaletteOpen.value = true,
});

useHead({
  title: 'Nuxt UI - Playground',
});
</script>

<template>
  <template v-if="!$route.path.startsWith('/__nuxt_ui__')">
    <UApp :toaster="appConfig.toaster">
      <div
        class="bg-default flex flex-col h-screen min-h-0 w-screen overflow-hidden lg:flex-row"
        data-vaul-drawer-wrapper
      >
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="border-default p-4 border-e w-48 hidden overflow-y-auto lg:flex"
        />
        <UNavigationMenu
          :items="items"
          orientation="horizontal"
          class="border-default border-b overflow-x-auto [&>div]:min-w-min lg:hidden"
        />

        <div class="flex gap-2 items-center end-4 top-15 fixed lg:top-3">
          <ClientOnly v-if="!colorMode?.forced">
            <UButton
              :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
              color="neutral"
              variant="ghost"
              :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
              @click="isDark = !isDark"
            />

            <template #fallback>
              <div class="size-8" />
            </template>
          </ClientOnly>
        </div>

        <div class="px-4 py-14 flex flex-1 flex-col w-full items-center justify-around overflow-y-auto">
          <NuxtPage />
        </div>

        <UModal
          v-model:open="isCommandPaletteOpen"
          class="sm:h-96"
        >
          <template #content>
            <UCommandPalette
              placeholder="Search a component..."
              :groups="[{ id: 'items', items }]"
              :fuse="{ resultLimit: 100 }"
              @update:model-value="onSelect"
              @update:open="value => isCommandPaletteOpen = value"
            />
          </template>
        </UModal>
      </div>
    </UApp>
  </template>
  <template v-else>
    <NuxtPage />
  </template>
</template>
