import type { Ref } from '#imports';
import type { ContentNavigationItem } from '@nuxt/content';
import { computed, useFrameworks, useRoute } from '#imports';
import { findPageBreadcrumb, findPageChildren } from '@nuxt/content/utils';
import { mapContentNavigation } from 'pohon-ui/utils/content';

const CATEGORIES = {
  akar: {
    components: [
      {
        id: 'element',
        title: 'Element',
      },
      {
        id: 'form',
        title: 'Form',
      },
      {
        id: 'navigation',
        title: 'Navigation',
      },
      {
        id: 'overlay',
        title: 'Overlay',
      },
    ],
  },
  pohon: {
    components: [
      {
        id: 'layout',
        title: 'Layout',
      },
      {
        id: 'element',
        title: 'Element',
      },
      {
        id: 'form',
        title: 'Form',
      },
      {
        id: 'data',
        title: 'Data',
      },
      {
        id: 'navigation',
        title: 'Navigation',
      },
      {
        id: 'overlay',
        title: 'Overlay',
      },
      {
        id: 'page',
        title: 'Page',
      },
      {
        id: 'dashboard',
        title: 'Dashboard',
      },
      {
        id: 'chat',
        title: 'Chat',
      },
      {
        id: 'content',
        title: 'Content',
        framework: 'nuxt',
      },
      {
        id: 'color-mode',
        title: 'Color Mode',
      },
      {
        id: 'i18n',
        title: 'i18n',
      },
    ],
    typography: [
      {
        id: 'components',
        title: 'Components',
      },
    ],
  },
} as const;

type ParentCategory = keyof typeof CATEGORIES;
type SlugCategory = keyof (typeof CATEGORIES)[ParentCategory];

function processNavigationItem(
  item: ContentNavigationItem,
  parent?: ContentNavigationItem,
): ContentNavigationItem | Array<ContentNavigationItem> {
  return {
    ...item,
    title: parent?.title ? parent.title : item.title,
    badge: parent?.badge || item.badge,
    class: [item.framework && `${item.framework}-only`].filter(Boolean),
    children: item.children?.length ? item.children?.flatMap((child) => processNavigationItem(child)) : undefined,
  };
}

export function useNavigation(
  navigation: Ref<Array<ContentNavigationItem> | undefined>,
) {
  const { framework } = useFrameworks();

  const rootNavigation = computed(() => {
    const route = useRoute();

    const parentSlug = route.params.slug?.[0] as string;

    const parent = navigation.value?.[0]?.children?.find(
      (child) => child.path === `/docs/${parentSlug}`,
    );

    if (!parent) {
      return [];
    }

    return parent.children?.map((item) => processNavigationItem(item)) as Array<ContentNavigationItem>;
  });

  function findBreadcrumb(path: string) {
    const breadcrumb = findPageBreadcrumb(navigation?.value, path, { indexAsChild: true });

    return mapContentNavigation(
      breadcrumb.slice(0),
    ).map(({ icon, ...link }) => link);
  }

  const navigationByCategory = computed(() => {
    const route = useRoute();

    const parent = route.params.slug?.[0] as ParentCategory;
    const slug = route.params.slug?.[1] as SlugCategory;

    const children = findPageChildren(
      navigation?.value,
      `/docs/${parent}/${slug}`,
      { indexAsChild: true },
    );

    return groupChildrenByCategory({ items: children, parent, slug });
  });

  function findSurround(path: string): [ContentNavigationItem | undefined, ContentNavigationItem | undefined] {
    const flattenNavigation = navigationByCategory.value
      ?.flatMap((item) => filterChildrenByFramework(item, framework.value)?.children) ?? [];

    const index = flattenNavigation.findIndex((item) => item?.path === path);

    if (index === -1) {
      return [undefined, undefined];
    }

    return [flattenNavigation[index - 1], flattenNavigation[index + 1]];
  }

  return {
    rootNavigation,
    findBreadcrumb,
    findSurround,
    navigationByCategory,
  };
}

function groupChildrenByCategory(
  { items, parent, slug }: {
    items: Array<ContentNavigationItem>;
    parent: ParentCategory;
    slug: SlugCategory;
  },
): Array<ContentNavigationItem> {
  if (!items.length) {
    return [];
  }

  const groups: Array<ContentNavigationItem> = [];

  const categorized: Record<string, Array<ContentNavigationItem>> = {};
  const uncategorized: Array<ContentNavigationItem> = [];

  for (const item of items) {
    if (item.category) {
      const itemCategory = item.category as string;
      categorized[itemCategory] = categorized[itemCategory] || [];
      categorized[itemCategory]?.push(item);
    } else {
      uncategorized.push(item);
    }
  }

  if (uncategorized.length) {
    const withChildren = uncategorized
      .filter((item) => item.children?.length)
      ?.map((item) => ({
        ...item,
        children: item.children?.map((child) => ({ ...child, icon: undefined })),
      }));
    const withoutChildren = uncategorized.filter((item) => !item.children?.length);

    if (withoutChildren.every((item) => Boolean(item.shadow))) {
      groups.push(...withoutChildren);
    } else if (withoutChildren.length) {
      groups.push({
        title: 'Overview',
        path: `/${parent}/${slug}`,
        children: withoutChildren?.map((item) => ({ ...item, icon: undefined })),
      });
    }

    groups.push(...withChildren);
  }

  for (const category of CATEGORIES[parent][slug] || []) {
    if (categorized[category.id]?.length) {
      groups.push({
        title: category.title,
        path: `/docs/${slug}`,
        class: 'framework' in category ? [`${category.framework}-only`] : undefined,
        children: categorized[category.id],
      });
    }
  }

  return groups;
}

function filterChildrenByFramework(item: ContentNavigationItem, framework: string): ContentNavigationItem {
  const filteredChildren = item.children?.filter((child) => {
    if (child.path.startsWith('/docs/akar/components')) {
      return true;
    }

    if (child.framework && child.framework !== framework) {
      return false;
    }

    return true;
  })?.map((child) => filterChildrenByFramework(resolveNavigationIcon(child), framework));

  return {
    ...item,
    children: filteredChildren?.length ? filteredChildren : undefined,
  };
}

function resolveNavigationIcon(item: ContentNavigationItem) {
  let icon = item.icon;
  if (item.path.startsWith('/docs/components')) {
    icon = 'i-lucide:square-code';
  }
  if (item.path.startsWith('/docs/composables')) {
    icon = 'i-lucide:square-function';
  }
  if (item.path.startsWith('/docs/typography')) {
    icon = 'i-lucide:square-pilcrow';
  }

  return {
    ...item,
    icon,
  };
}
