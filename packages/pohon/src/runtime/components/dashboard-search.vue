<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type {
  PButtonProps,
  PCommandPaletteGroup,
  PCommandPaletteItem,
  PCommandPaletteProps,
  PCommandPaletteSlots,
  PDialogProps,
  PIconProps,
  PInputProps,
} from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/dashboard-search';

type DashboardSearch = ComponentConfig<typeof theme, AppConfig, 'dashboardSearch'>;

export interface PDashboardSearchProps<T extends PCommandPaletteItem = PCommandPaletteItem> extends Pick<PDialogProps, 'title' | 'description' | 'overlay' | 'transition' | 'content' | 'dismissible' | 'fullscreen' | 'modal' | 'portal'> {
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
  placeholder?: PInputProps['placeholder'];
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
  close?: boolean | Partial<PButtonProps>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: PIconProps['name'];
  /**
   * Keyboard shortcut to open the search (used by [`defineShortcuts`](https://ui.nuxt.com/docs/composables/define-shortcuts))
   * @defaultValue 'meta_k'
   */
  shortcut?: string;
  groups?: Array<PCommandPaletteGroup<T>>;
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse) passed to the [CommandPalette](https://ui.nuxt.com/docs/components/command-palette).
   * @defaultValue {}
   */
  fuse?: UseFuseOptions<T>;
  /**
   * When `true`, the theme command will be added to the groups.
   * @defaultValue true
   */
  colorMode?: boolean;
  class?: any;
  pohon?: DashboardSearch['slots'] & PCommandPaletteProps<PCommandPaletteGroup<PCommandPaletteItem>, PCommandPaletteItem>['pohon'];
}

export type PDashboardSearchSlots = PCommandPaletteSlots<PCommandPaletteGroup<PCommandPaletteItem>, PCommandPaletteItem> & {
  content: (props?: object) => any;
};

</script>

<script setup lang="ts">
import { defineShortcuts, useAppConfig, useColorMode, useRuntimeHook } from '#imports';
import { omit } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { computed, useTemplateRef } from 'vue';
import { useLocale } from '../composables/use-locale';
import { transformPohon } from '../utils';
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
  },
);
const slots = defineSlots<PDashboardSearchSlots>();

const open = defineModel<boolean>('open', { default: false });
const searchTerm = defineModel<string>('searchTerm', { default: '' });

useRuntimeHook(
  'dashboard:search:toggle',
  () => {
    open.value = !open.value;
  },
);

const { t } = useLocale();

const colorMode = useColorMode();
const appConfig = useAppConfig() as DashboardSearch['AppConfig'];

const commandPaletteProps = useForwardProps(reactivePick(props, 'icon', 'placeholder', 'autofocus', 'loading', 'loadingIcon', 'close', 'closeIcon'));
const modalProps = useForwardProps(reactivePick(props, 'overlay', 'transition', 'content', 'dismissible', 'fullscreen', 'modal', 'portal'));

const getProxySlots = () => omit(slots, ['content']);

const fuse = computed(() =>
  defu({}, props.fuse, {
    fuseOptions: {
    },
  }),
);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.dashboardSearch || {}),
  })({
    fullscreen: props.fullscreen,
  }),
);

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
  config: {
    [props.shortcut]: {
      usingInput: true,
      handler: () => {
        open.value = !open.value;
      },
    },
  },
});

const commandPaletteRef = useTemplateRef('commandPaletteRef');

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
    :class="pohon.modal({ class: [props.pohon?.modal, props.class] })"
  >
    <template #content>
      <slot name="content">
        <PCommandPalette
          ref="commandPaletteRef"
          v-model:search-term="searchTerm"
          v-bind="commandPaletteProps"
          :groups="groups"
          :fuse="fuse"
          :pohon="transformPohon(omit(pohon, ['modal']), props.pohon)"
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
