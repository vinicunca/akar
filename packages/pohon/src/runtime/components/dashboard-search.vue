<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PButtonProps, PCommandPaletteGroup, PCommandPaletteItem, PCommandPaletteProps, PCommandPaletteSlots, PDialogProps, PLinkPropsKeys } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-search';

type DashboardSearch = ComponentConfig<typeof theme, AppConfig, 'dashboardSearch'>;

export interface PDashboardSearchProps<T extends PCommandPaletteItem = PCommandPaletteItem> extends Pick<PDialogProps, 'title' | 'description' | 'overlay' | 'transition' | 'content' | 'dismissible' | 'fullscreen' | 'modal' | 'portal'>, Pick<PCommandPaletteProps<PCommandPaletteGroup<T>, T>, 'icon' | 'placeholder' | 'autofocus' | 'loading' | 'loadingIcon' | 'closeIcon' | 'groups' | 'fuse'> {
  /**
   * @defaultValue 'md'
   */
  size?: DashboardSearch['variants']['size'];
  /**
   * Display a close button in the input (useful when inside a Modal for example).
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue true
   */
  close?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * Keyboard shortcut to open the search (used by [`defineShortcuts`](https://pohon.nuxt.com/docs/composables/define-shortcuts))
   * @defaultValue 'meta_k'
   */
  shortcut?: string;
  /**
   * Delay (in milliseconds) before the search term is passed to Fuse (debounced).
   * Useful for large datasets where running fuzzy search on every keystroke is the bottleneck — the input stays responsive while Fuse only re-runs after typing settles.
   * Set to `0` to disable.
   * @defaultValue 100
   */
  searchDelay?: number;
  /**
   * When `true`, the theme command will be added to the groups.
   * @defaultValue true
   */
  colorMode?: boolean;
  class?: any;
  pohon?: DashboardSearch['slots'] & PCommandPaletteProps<PCommandPaletteGroup<PCommandPaletteItem>, PCommandPaletteItem>['pohon'];
}

export type PDashboardSearchSlots = PCommandPaletteSlots<PCommandPaletteItem> & {
  content?: (props: { close: () => void }) => Array<VNode>;
};

</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { computed, useTemplateRef } from 'vue';
import { defineShortcuts, useAppConfig, useColorMode, useRuntimeHook } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { omit, transformPohon } from '../utils';
import { uv } from '../utils/uv';
import PCommandPalette from './command-palette.vue';
import PDialog from './dialog.vue';

const props = withDefaults(
  defineProps<PDashboardSearchProps>(),
  {
    shortcut: 'meta_k',
    colorMode: true,
    close: true,
    fullscreen: false,
    searchDelay: 100,
  },
);
const slots = defineSlots<PDashboardSearchSlots>();

const open = defineModel<boolean>('open', { default: false });
const searchTerm = defineModel<string>('searchTerm', { default: '' });

useRuntimeHook('dashboard:search:toggle', () => {
  open.value = !open.value;
});

const { t } = useLocale();

const colorMode = useColorMode();
const appConfig = useAppConfig() as DashboardSearch['AppConfig'];
const pohonProp = useComponentPohon('dashboardSearch', props);

const commandPaletteProps = useForwardProps(reactivePick(props, 'size', 'icon', 'placeholder', 'autofocus', 'loading', 'loadingIcon', 'close', 'closeIcon', 'searchDelay'));
const modalProps = useForwardProps(reactivePick(props, 'overlay', 'transition', 'content', 'dismissible', 'fullscreen', 'modal', 'portal'));

const getProxySlots = () => omit(slots, ['content']);

const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
  },
}));

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.dashboardSearch || {}) })({
  size: props.size,
  fullscreen: props.fullscreen,
}));

const groups = computed(() => {
  const groups = [];

  groups.push(...(props.groups || []));

  if (props.colorMode && !colorMode?.forced) {
    groups.push({
      id: 'theme',
      label: t('dashboardSearch.theme'),
      items: [{
        label: t('colorMode.system'),
        icon: appConfig.pohon.icons.system,
        active: colorMode.preference === 'system',
        onSelect: () => {
          colorMode.preference = 'system';
        },
      }, {
        label: t('colorMode.light'),
        icon: appConfig.pohon.icons.light,
        active: colorMode.preference === 'light',
        onSelect: () => {
          colorMode.preference = 'light';
        },
      }, {
        label: t('colorMode.dark'),
        icon: appConfig.pohon.icons.dark,
        active: colorMode.preference === 'dark',
        onSelect: () => {
          colorMode.preference = 'dark';
        },
      }],
    });
  }

  return groups;
});

const commandPaletteRef = useTemplateRef('commandPaletteRef');

function onSelect(item: PCommandPaletteItem) {
  if (item.disabled) {
    return;
  }

  // Close modal on select
  open.value = false;
  // Reset search term on select
  searchTerm.value = '';
}

defineShortcuts({
  [props.shortcut]: {
    usingInput: true,
    handler: () => {
      open.value = !open.value;
    },
  },
});

defineExpose({
  commandPaletteRef,
});
</script>

<template>
  <PDialog
    v-model:open="open"
    :title="title || t('dashboardSearch.title')"
    :description="description || t('dashboardSearch.description')"
    v-bind="modalProps"
    data-slot="modal"
    :class="pohon.modal({ class: [pohonProp?.modal, props.class] })"
  >
    <template #content="contentData">
      <slot
        name="content"
        v-bind="contentData"
      >
        <PCommandPalette
          ref="commandPaletteRef"
          v-model:search-term="searchTerm"
          v-bind="commandPaletteProps"
          :groups="groups"
          :fuse="fuse"
          :input="{ fixed: true }"
          :pohon="transformPohon(omit(pohon, ['modal']), pohonProp)"
          @update:model-value="onSelect"
          @update:open="open = $event"
        >
          <template
            v-for="(_, name) in getProxySlots()"
            #[name]="slotData"
          >
            <slot
              :name="name"
              v-bind="slotData"
            />
          </template>
        </PCommandPalette>
      </slot>
    </template>
  </PDialog>
</template>
