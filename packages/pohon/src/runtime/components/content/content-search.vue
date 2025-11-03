<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
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
  PLinkProps,
} from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/content/content-search';
import { defineShortcuts } from '../../composables/define-shortcuts';

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

export interface PContentSearchProps<T extends PContentSearchLink = PContentSearchLink> extends Pick<PDialogProps, 'title' | 'description' | 'overlay' | 'transition' | 'content' | 'dismissible' | 'fullscreen' | 'modal' | 'portal'> {
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
   * Display a close button in the input (useful when inside a Dialog for example).
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
   * Keyboard shortcut to open the search (used by [`defineShortcuts`](https://akara.vinicunca.dev/pohon/composables/define-shortcuts))
   * @defaultValue 'meta_k'
   */
  shortcut?: string;
  /** Links group displayed as the first group in the command palette. */
  links?: Array<T>;
  navigation?: Array<ContentNavigationItem>;
  /** Custom groups displayed between navigation and color mode group. */
  groups?: Array<PCommandPaletteGroup<PContentSearchItem>>;
  files?: Array<PContentSearchFile>;
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse) passed to the [CommandPalette](https://akara.vinicunca.dev/pohon/components/command-palette).
   * @defaultValue { fuseOptions: { includeMatches: true } }
   */
  fuse?: UseFuseOptions<T>;
  /**
   * When `true`, the theme command will be added to the groups.
   * @defaultValue true
   */
  colorMode?: boolean;
  class?: any;
  pohon?: ContentSearch['slots'] & PCommandPaletteProps<PCommandPaletteGroup<PContentSearchItem>, PContentSearchItem>['pohon'];
}

export type PContentSearchSlots = PCommandPaletteSlots<PCommandPaletteGroup<PContentSearchItem>, PContentSearchItem> & {
  content: (props: { close: () => void }) => any;
};

</script>

<script setup lang="ts" generic="T extends PContentSearchLink">
import { useAppConfig, useColorMode } from '#imports';
import { omit } from '@vinicunca/perkakas';
import { reactivePick } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { computed, useTemplateRef } from 'vue';
import { useContentSearch } from '../../composables/use-content-search';
import { useLocale } from '../../composables/use-locale';
import { transformPohon } from '../../utils';
import { uv } from '../../utils/uv';
import PCommandPalette from '../command-palette.vue';
import PDialog from '../dialog.vue';

const props = withDefaults(
  defineProps<PContentSearchProps<T>>(),
  {
    shortcut: 'meta_k',
    colorMode: true,
    close: true,
    fullscreen: false,
  },
);
const slots = defineSlots<PContentSearchSlots>();

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const { open } = useContentSearch();

const colorMode = useColorMode();
const appConfig = useAppConfig() as ContentSearch['AppConfig'];

const commandPaletteProps = useForwardProps(
  reactivePick(
    props,
    'icon',
    'placeholder',
    'autofocus',
    'loading',
    'loadingIcon',
    'close',
    'closeIcon',
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
  },
));

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.contentSearch || {}),
  })({
    fullscreen: props.fullscreen,
  }),
);

function mapLinksItems(links: Array<T>): Array<PContentSearchItem> {
  return links.flatMap((link) => [
    {
      ...link,
      suffix: link.description,
      description: undefined,
      icon: link.icon || appConfig.pohon.icons.file,
    },
    ...(
      link.children?.map((child) => ({
        ...child,
        prefix: `${link.label} >`,
        suffix: child.description,
        description: undefined,
        icon: child.icon || link.icon || appConfig.pohon.icons.file,
      })) || []
    ),
  ]);
}

function mapNavigationItems(children: Array<ContentNavigationItem>, parent?: ContentNavigationItem): Array<PContentSearchItem> {
  return children.flatMap((link) => {
    if (link.children?.length) {
      return mapNavigationItems(link.children, link);
    }

    return props.files?.filter(
      (file) => file.id === link.path || file.id.startsWith(`${link.path}#`),
    )?.map((file) => mapFile(file, link, parent)) || [];
  });
}

function mapFile(file: PContentSearchFile, link: ContentNavigationItem, parent?: ContentNavigationItem): PContentSearchItem {
  const prefix = [...new Set([parent?.title, ...file.titles].filter(Boolean))];

  return {
    prefix: prefix?.length ? (`${prefix.join(' > ')} >`) : undefined,
    label: file.id === link.path ? link.title : file.title,
    suffix: file.content.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
    to: file.id,
    icon: (link.icon || parent?.icon || (file.level > 1 ? appConfig.pohon.icons.hash : appConfig.pohon.icons.file)) as string,
    level: file.level,
  };
}

const groups = computed(() => {
  const groups = [];

  if (props.links?.length) {
    groups.push({ id: 'links', label: t('contentSearch.links'), items: mapLinksItems(props.links) });
  }

  if (props.navigation?.length) {
    if (props.navigation.some((link) => !!link.children?.length)) {
      groups.push(...props.navigation.map((group) => ({ id: group.path, label: group.title, items: mapNavigationItems(group.children || []), postFilter })));
    } else {
      groups.push({ id: 'docs', items: mapNavigationItems(props.navigation), postFilter });
    }
  }

  groups.push(...(props.groups || []));

  if (props.colorMode && !colorMode?.forced) {
    groups.push({
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
    });
  }

  return groups;
});

function postFilter(query: string, items: Array<PContentSearchItem>) {
  // Filter only first level items if no query
  if (!query) {
    return items?.filter((item) => item.level === 1);
  }

  return items;
}

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

const commandPaletteRef = useTemplateRef('commandPaletteRef');

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
    :class="pohon.dialog({ class: [props.pohon?.dialog, props.class] })"
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
          :pohon="transformPohon(omit(pohon, ['dialog']), props.pohon)"
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
