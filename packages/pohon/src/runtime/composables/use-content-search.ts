import type { ContentNavigationItem } from '@nuxt/content';
import type { PContentSearchFile, PContentSearchItem } from '../components/content/content-search.vue';
import { useAppConfig } from '#imports';
import { createSharedComposable } from '@vueuse/core';
import { ref } from 'vue';

function _useContentSearch() {
  const open = ref(false);
  const appConfig = useAppConfig();

  /**
   * Map a file to a ContentSearchItem
   */
  function mapFile(
    file: PContentSearchFile,
    link: ContentNavigationItem,
    parent?: ContentNavigationItem,
  ): PContentSearchItem {
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

  /**
   * Map navigation items to ContentSearchItems
   */
  function mapNavigationItems(
    children: Array<ContentNavigationItem>,
    files: Array<PContentSearchFile>,
    parent?: ContentNavigationItem,
  ): Array<PContentSearchItem> {
    return children.flatMap((link) => {
      if (link.children?.length) {
        return mapNavigationItems(link.children, files, link);
      }

      return files
        ?.filter((file) => file.id === link.path || file.id.startsWith(`${link.path}#`))
        ?.map((file) => mapFile(file, link, parent)) || [];
    });
  }

  /**
   * Post-filter function to filter only first level items when no query
   */
  function postFilter(query: string, items: Array<PContentSearchItem>): Array<PContentSearchItem> {
    if (!query) {
      return items?.filter((item) => item.level === 1);
    }
    return items;
  }

  return {
    open,
    mapFile,
    mapNavigationItems,
    postFilter,
  };
}

export const useContentSearch = /* @__PURE__ */ createSharedComposable(_useContentSearch);
