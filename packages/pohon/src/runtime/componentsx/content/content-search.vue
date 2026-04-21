<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { VNode } from 'vue';
import type { PButtonProps, CommandPaletteGroup, CommandPaletteItem, CommandPaletteProps, CommandPaletteSlots, PIconProps, InputProps, LinkProps, PLinkPropsKeys, ModalProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-search';

type ContentSearch = ComponentConfig<typeof theme, AppConfig, 'contentSearch'>;

export interface ContentSearchLink extends Omit<LinkProps, 'custom'> {
  label?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  children?: Array<ContentSearchLink>;
}

export interface ContentSearchFile {
  id: string;
  title: string;
  titles: Array<string>;
  level: number;
  content: string;
}

export interface ContentSearchItem extends Omit<LinkProps, 'custom'>, CommandPaletteItem {
  level?: number;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
}

export interface ContentSearchProps<T extends ContentSearchLink = ContentSearchLink> extends Pick<ModalProps, 'title' | 'description' | 'overlay' | 'transition' | 'content' | 'dismissible' | 'fullscreen' | 'modal' | 'portal'> {
  /**
   * @defaultValue 'md'
   */
  size?: ContentSearch['variants']['size'];
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
  /** Links group displayed as the first group in the command palette. */
  links?: Array<T>;
  navigation?: Array<ContentNavigationItem>;
  /** Custom groups displayed between navigation and color mode group. */
  groups?: Array<CommandPaletteGroup<ContentSearchItem>>;
  files?: Array<ContentSearchFile>;
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse) passed to the [CommandPalette](https://pohon.nuxt.com/docs/components/command-palette).
   * @defaultValue { fuseOptions: { includeMatches: true } }
   */
  fuse?: UseFuseOptions<T>;
  /**
   * When `true`, the theme command will be added to the groups.
   * @defaultValue true
   */
  colorMode?: boolean;
  class?: any;
  pohon?: ContentSearch['slots'] & CommandPaletteProps<CommandPaletteGroup<ContentSearchItem>, ContentSearchItem>['pohon'];
}

export type ContentSearchSlots = CommandPaletteSlots<ContentSearchItem> & {
  content?: (props: { close: () => void }) => Array<VNode>;
};

</script>

<script setup lang="ts" generic="T extends ContentSearchLink">
import { defineShortcuts, useAppConfig, useColorMode } from '#imports';
import { reactivePick } from '@vueuse/core';
import { defu } from 'defu';
import { useForwardProps } from 'akar';
import { computed, useTemplateRef } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { useContentSearch } from '../../composables/useContentSearch';
import { useLocale } from '../../composables/use-locale';
import { omit, transformPohon } from '../../utils';
import { uv } from '../../utils/uv';
import UCommandPalette from '../CommandPalette.vue';
import UModal from '../Modal.vue';

const props = withDefaults(defineProps<ContentSearchProps<T>>(), {
  shortcut: 'meta_k',
  colorMode: true,
  close: true,
  fullscreen: false,
});
const slots = defineSlots<ContentSearchSlots>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const { open, mapNavigationItems, postFilter } = useContentSearch();

const colorMode = useColorMode();
const appConfig = useAppConfig() as ContentSearch['AppConfig'];
const pohonProp = useComponentPohon('contentSearch', props);

const commandPaletteProps = useForwardProps(reactivePick(props, 'size', 'icon', 'placeholder', 'autofocus', 'loading', 'loadingIcon', 'close', 'closeIcon'));
const modalProps = useForwardProps(reactivePick(props, 'overlay', 'transition', 'content', 'dismissible', 'fullscreen', 'modal', 'portal'));

const getProxySlots = () => omit(slots, ['content']);

const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    includeMatches: true,
  },
} as UseFuseOptions<T>));

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.contentSearch || {}) })({
  size: props.size,
  fullscreen: props.fullscreen,
}));

const commandPaletteRef = useTemplateRef('commandPaletteRef');

const mappedLinksItems = computed(() => {
  if (!props.links?.length) {
    return [];
  }

  return props.links.flatMap((link) => [{
    ...link,
    suffix: link.description,
    description: undefined,
    icon: link.icon || appConfig.pohon.icons.file,
    children: undefined,
  }, ...(link.children?.map((child) => ({
    ...child,
    prefix: `${link.label} >`,
    suffix: child.description,
    description: undefined,
    icon: child.icon || link.icon || appConfig.pohon.icons.file,
  })) || [])]);
});

const mappedNavigationGroups = computed(() => {
  if (!props.navigation?.length) {
    return [];
  }

  if (props.navigation.some((link) => !!link.children?.length)) {
    return props.navigation.map((group) => ({
      id: group.path,
      label: group.title,
      items: mapNavigationItems(group.children || [], props.files || []),
      postFilter,
    }));
  } else {
    return [{ id: 'docs', items: mapNavigationItems(props.navigation, props.files || []), postFilter }];
  }
});

const themeGroup = computed(() => {
  if (!props.colorMode || colorMode?.forced) {
    return null;
  }

  return {
    id: 'theme',
    label: t('contentSearch.theme'),
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
  };
});

const groups = computed(() => {
  const groups = [];

  if (mappedLinksItems.value.length) {
    groups.push({ id: 'links', label: t('contentSearch.links'), items: mappedLinksItems.value });
  }

  groups.push(...mappedNavigationGroups.value);

  groups.push(...(props.groups || []));

  if (themeGroup.value) {
    groups.push(themeGroup.value);
  }

  return groups;
});

function onSelect(item: ContentSearchItem) {
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
    :title="title || t('contentSearch.title')"
    :description="description || t('contentSearch.description')"
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
