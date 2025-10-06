import type { Ref } from '#imports';
import type { ContentNavigationItem } from '@nuxt/content';
import { computed } from '#imports';
import { findPageBreadcrumb } from '@nuxt/content/utils';
import { mapContentNavigation } from 'pohon/utils/content';

function processNavigationItem(item: ContentNavigationItem, parent?: ContentNavigationItem): ContentNavigationItem | Array<ContentNavigationItem> {
  if (item.shadow) {
    return item.children?.flatMap((child) => processNavigationItem(child, item)) || [];
  }

  return {
    ...item,
    title: parent?.title ? parent.title : item.title,
    badge: parent?.badge || item.badge,
    class: [item.framework && `${item.framework}-only`].filter(Boolean),
    children: item.children?.length ? item.children?.flatMap((child) => processNavigationItem(child)) : undefined,
  };
}

export function useNavigation(navigation: Ref<Array<ContentNavigationItem> | undefined>) {
  const rootNavigation = computed(() =>
    navigation.value?.[0]?.children?.map((item) => processNavigationItem(item)) as Array<ContentNavigationItem>,
  );

  function findBreadcrumb(path: string) {
    const breadcrumb = findPageBreadcrumb(navigation?.value, path, { indexAsChild: true });

    return mapContentNavigation(breadcrumb).map(({ icon, ...link }) => link);
  }

  return {
    rootNavigation,
    findBreadcrumb,
  };
}
