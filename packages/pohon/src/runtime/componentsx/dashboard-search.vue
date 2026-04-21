<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { VNode } from 'vue';
import type { CommandPaletteGroup, CommandPaletteItem, CommandPaletteProps, CommandPaletteSlots, InputProps, ModalProps, PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-search';

type DashboardSearch = ComponentConfig<typeof theme, AppConfig, 'dashboardSearch'>;

export interface DashboardSearchProps<T extends CommandPaletteItem = CommandPaletteItem> extends Pick<ModalProps, 'title' | 'description' | 'overlay' | 'transition' | 'content' | 'dismissible' | 'fullscreen' | 'modal' | 'portal'> {
  /**
   * @defaultValue 'md'
   */
  size?: DashboardSearch['variants']['size'];
  /**
   * The icon displayed in the input.
   * @defaultValue appConfig.pohon.icons.search
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * The placeholder text for the input.
   * @defaultValue t('commandPalette.placeholder')
   */
  placeholder?: InputProps['placeholder'];
  /**
   * Automatically focus the input when component is mounted.
   * @defaultValue true
   */
  autofocus?: boolean;
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean;
  /**
   * The icon when the `loading` prop is `true`.
   * @defaultValue appConfig.pohon.icons.loading
   * @IconifyIcon
   */
  loadingIcon?: PIconProps['name'];
  /**
   * Display a close button in the input (useful when inside a Modal for example).
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue true
   */
  close?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: PIconProps['name'];
  /**
   * Keyboard shortcut to open the search (used by [`defineShortcuts`](https://pohon.nuxt.com/docs/composables/define-shortcuts))
   * @defaultValue 'meta_k'
   */
  shortcut?: string;
  groups?: Array<CommandPaletteGroup<T>>;
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse) passed to the [CommandPalette](https://pohon.nuxt.com/docs/components/command-palette).
   * @defaultValue {}
   */
  fuse?: UseFuseOptions<T>;
  /**
   * When `true`, the theme command will be added to the groups.
   * @defaultValue true
   */
  colorMode?: boolean;
  class?: any;
  pohon?: DashboardSearch['slots'] & CommandPaletteProps<CommandPaletteGroup<CommandPaletteItem>, CommandPaletteItem>['pohon'];
}

export type DashboardSearchSlots = CommandPaletteSlots<CommandPaletteItem> & {
  content?: (props: { close: () => void }) => Array<VNode>;
};

</script>

<script setup lang="ts">
import { defineShortcuts, useAppConfig, useColorMode, useRuntimeHook } from '#imports';
import { reactivePick } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { computed, useTemplateRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { omit, transformPohon } from '../utils';
import { uv } from '../utils/uv';
import UCommandPalette from './CommandPalette.vue';
import UModal from './Modal.vue';

const props = withDefaults(defineProps<DashboardSearchProps>(), {
  shortcut: 'meta_k',
  colorMode: true,
  close: true,
  fullscreen: false,
});
const slots = defineSlots<DashboardSearchSlots>();

const open = defineModel<boolean>('open', { default: false });
const searchTerm = defineModel<string>('searchTerm', { default: '' });

useRuntimeHook('dashboard:search:toggle', () => {
  open.value = !open.value;
});

const { t } = useLocale();

const colorMode = useColorMode();
const appConfig = useAppConfig() as DashboardSearch['AppConfig'];
const pohonProp = useComponentPohon('dashboardSearch', props);

const commandPaletteProps = useForwardProps(reactivePick(props, 'size', 'icon', 'placeholder', 'autofocus', 'loading', 'loadingIcon', 'close', 'closeIcon'));
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

function onSelect(item: CommandPaletteItem) {
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
    handler: () => open.value = !open.value,
  },
});

defineExpose({
  commandPaletteRef,
});
</script>

<template>
  <UModal
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
        <UCommandPalette
          ref="commandPaletteRef"
          v-model:search-term="searchTerm"
          v-bind="commandPaletteProps"
          :groups="groups"
          :fuse="fuse"
          :input="{ fixed: true }"
          :pohon="transformPohon(omit(ui, ['modal']), pohonProp)"
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
        </UCommandPalette>
      </slot>
    </template>
  </UModal>
</template>
