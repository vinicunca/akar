<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { VNode } from 'vue';
import type {
  PButtonProps,
  PCommandPaletteGroup,
  PCommandPaletteItem,
  PCommandPaletteProps,
  PCommandPaletteSlots,
  PDialogProps,
  PIconProps,
  PLinkProps,
  PLinkPropsKeys,
} from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-search';

type ContentSearch = ComponentConfig<typeof theme, AppConfig, 'contentSearch'>;

export interface PContentSearchLink extends Omit<PLinkProps, 'custom'> {
  label?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  children?: Array<PContentSearchLink>;
}

export interface PContentSearchFile {
  id: string;
  title: string;
  titles: Array<string>;
  level: number;
  content: string;
}

export interface PContentSearchItem extends Omit<PLinkProps, 'custom'>, PCommandPaletteItem {
  level?: number;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
}

export interface PContentSearchProps<T extends PContentSearchLink = PContentSearchLink> extends Pick<PDialogProps, 'title' | 'description' | 'overlay' | 'transition' | 'content' | 'dismissible' | 'fullscreen' | 'modal' | 'portal'>, Pick<PCommandPaletteProps<PCommandPaletteGroup<PContentSearchItem>, PContentSearchItem>, 'icon' | 'placeholder' | 'autofocus' | 'loading' | 'loadingIcon' | 'closeIcon' | 'groups'> {
  /**
   * @defaultValue 'md'
   */
  size?: ContentSearch['variants']['size'];
  close?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * Keyboard shortcut to open the search (used by [`defineShortcuts`](https://pohon.nuxt.com/docs/composables/define-shortcuts))
   * @defaultValue 'meta_k'
   */
  shortcut?: string;
  /** Links group displayed as the first group in the command palette. */
  links?: Array<T>;
  navigation?: Array<ContentNavigationItem>;
  files?: Array<PContentSearchFile>;
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse) passed to the [CommandPalette](https://pohon.nuxt.com/docs/components/command-palette).
   * @defaultValue {
      fuseOptions: {
        ignoreLocation: true,
        includeMatches: true,
        threshold: 0.1,
        keys: ['label', 'suffix']
      },
      resultLimit: 12,
      matchAllWhenSearchEmpty: true
    }
   */
  fuse?: UseFuseOptions<T>;
  /**
   * Delay (in milliseconds) before the search term is passed to Fuse (debounced).
   * Useful for large doc sets where running fuzzy search on every keystroke is the bottleneck — the input stays responsive while Fuse only re-runs after typing settles.
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
  pohon?: ContentSearch['slots'] & PCommandPaletteProps<PCommandPaletteGroup<PContentSearchItem>, PContentSearchItem>['pohon'];
}

export type PContentSearchSlots = PCommandPaletteSlots<PContentSearchItem> & {
  content?: (props: { close: () => void }) => Array<VNode>;
};

</script>

<script setup lang="ts" generic="T extends PContentSearchLink">
import { reactivePick } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { computed, useTemplateRef } from 'vue';
import { defineShortcuts, useAppConfig, useColorMode } from '#imports';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { useContentSearch } from '../../composables/use-content-search';
import { useLocale } from '../../composables/use-locale';
import { omit, transformPohon } from '../../utils';
import { uv } from '../../utils/uv';
import PCommandPalette from '../CommandPalette.vue';
import PDialog from '../Dialog.vue';

const props = withDefaults(
  defineProps<PContentSearchProps<T>>(),
  {
    shortcut: 'meta_k',
    colorMode: true,
    close: true,
    fullscreen: false,
    searchDelay: 100,
  },
);
const slots = defineSlots<PContentSearchSlots>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const { open, mapNavigationItems, postFilter } = useContentSearch();

const colorMode = useColorMode();
const appConfig = useAppConfig() as ContentSearch['AppConfig'];
const pohonProp = useComponentPohon('contentSearch', props);

const commandPaletteProps = useForwardProps(
  reactivePick(
    props,
    'size',
    'icon',
    'placeholder',
    'autofocus',
    'loading',
    'loadingIcon',
    'close',
    'closeIcon',
    'searchDelay',
  ),
);
const dialogProps = useForwardProps(
  reactivePick(
    props,
    'overlay',
    'transition',
    'content',
    'dismissible',
    'fullscreen',
    'modal',
    'portal',
  ),
);

const getProxySlots = () => omit(slots, ['content']);

const fuse = computed(() => defu(
  {},
  props.fuse,
  {
    fuseOptions: {
      includeMatches: true,
    },
  } as UseFuseOptions<T>,
));

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.contentSearch || {}),
  },
  )({
    size: props.size,
    fullscreen: props.fullscreen,
  }),
);

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
    return [{
      id: 'docs',
      items: mapNavigationItems(props.navigation, props.files || []),
      postFilter,
    }];
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

function onSelect(item: PContentSearchItem) {
  if (item.disabled) {
    return;
  }

  // Close dialog on select
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
    :title="title || t('contentSearch.title')"
    :description="description || t('contentSearch.description')"
    v-bind="dialogProps"
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
