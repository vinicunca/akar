import type { DefaultTheme } from 'vitepress/theme';
import type { ComputedRef, Ref } from 'vue';
import { isBrowser } from '@vinicunca/perkakas';
import { useData } from 'vitepress';
import {
  computed,
  onMounted,
  ref,
  watch,
  watchEffect,
  watchPostEffect,
} from 'vue';

export interface SidebarControl {
  collapsed: Ref<boolean>;
  collapsible: ComputedRef<boolean>;
  isLink: ComputedRef<boolean>;
  isActiveLink: Ref<boolean>;
  hasActiveLink: ComputedRef<boolean>;
  hasChildren: ComputedRef<boolean>;
  toggle: () => void;
}

export interface SidebarItem extends DefaultTheme.SidebarItem {}

export function useSidebarControl(
  item: ComputedRef<DefaultTheme.SidebarItem>,
): SidebarControl {
  const { page, hash } = useData();

  const collapsed = ref(false);

  const collapsible = computed(() => {
    return item.value.collapsed != null;
  });

  const isLink = computed(() => {
    return !!item.value.link;
  });

  const isActiveLink = ref(false);
  const updateIsActiveLink = () => {
    isActiveLink.value = isActive(page.value.relativePath, item.value.link);
  };

  watch([page, item, hash], updateIsActiveLink);
  onMounted(updateIsActiveLink);

  const hasActiveLink = computed(() => {
    if (isActiveLink.value) {
      return true;
    }

    return item.value.items
      ? containsActiveLink(page.value.relativePath, item.value.items)
      : false;
  });

  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length);
  });

  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed);
  });

  watchPostEffect(() => {
    if (isActiveLink.value || hasActiveLink.value) {
      collapsed.value = false;
    }
  });

  function toggle() {
    if (collapsible.value) {
      collapsed.value = !collapsed.value;
    }
  }

  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink,
    hasChildren,
    toggle,
  };
}

const HASH_RE = /#.*$/;
const HASH_OR_QUERY_RE = /[?#].*$/;
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/;

export function isActive(
  currentPath: string,
  matchPath?: string,
  asRegex: boolean = false,
): boolean {
  if (matchPath === undefined) {
    return false;
  }

  currentPath = normalize(`/${currentPath}`);

  if (asRegex) {
    return new RegExp(matchPath).test(currentPath);
  }

  if (normalize(matchPath) !== currentPath) {
    return false;
  }

  const hashMatch = matchPath.match(HASH_RE);

  if (hashMatch) {
    return (isBrowser ? location.hash : '') === hashMatch[0];
  }

  return true;
}

function normalize(path: string): string {
  return decodeURI(path)
    .replace(HASH_OR_QUERY_RE, '')
    .replace(INDEX_OR_EXT_RE, '$1');
}

// From https://github.com/vuejs/vitepress/blob/97f9469b6d4eb7ba9de9a1111986581d1f704ec3/src/client/theme-default/support/sidebar.ts
function containsActiveLink(
  path: string,
  items: any | Array<any>,
): boolean {
  if (Array.isArray(items)) {
    return items.some((item) => containsActiveLink(path, item));
  }

  // eslint-disable-next-line no-nested-ternary
  return isActive(path, items.link)
    ? true
    // eslint-disable-next-line sonar/no-nested-conditional
    : items.items
      ? containsActiveLink(path, items.items)
      : false;
}

// From https://github.com/vuejs/vitepress/blob/fa81e89643523170047ca2c9a690f4d7adf4ffdc/src/client/theme-default/support/sidebar.ts
export interface SidebarLink {
  text: string;
  link: string;
  docFooterText?: string;
}

function ensureStartingSlash(path: string): string {
  return /^\//.test(path) ? path : `/${path}`;
}

/**
 * Get the `Sidebar` from sidebar option. This method will ensure to get correct
 * sidebar config from `MultiSideBarConfig` with various path combinations such
 * as matching `guide/` and `/guide/`. If no matching config was found, it will
 * return empty array.
 */
export function getSidebar(
  _sidebar: DefaultTheme.Sidebar | undefined,
  path: string,
): Array<SidebarItem> {
  if (Array.isArray(_sidebar)) {
    return addBase(_sidebar);
  }
  if (_sidebar == null) {
    return [];
  }

  path = ensureStartingSlash(path);

  const dir = Object.keys(_sidebar)
    .sort((a, b) => {
      return b.split('/').length - a.split('/').length;
    })
    .find((dir) => {
      // make sure the multi sidebar key starts with slash too
      return path.startsWith(ensureStartingSlash(dir));
    });

  const sidebar = dir ? _sidebar[dir] : [];
  return Array.isArray(sidebar)
    ? addBase(sidebar)
    : addBase(sidebar.items, sidebar.base);
}

export function getFlatSideBarLinks(sidebar: Array<SidebarItem>): Array<SidebarLink> {
  const links: Array<SidebarLink> = [];

  function recursivelyExtractLinks(items: Array<SidebarItem>) {
    for (const item of items) {
      if (item.text && item.link) {
        links.push({
          text: item.text,
          link: item.link,
          docFooterText: item.docFooterText,
        });
      }

      if (item.items) {
        recursivelyExtractLinks(item.items);
      }
    }
  }

  recursivelyExtractLinks(sidebar);

  return links;
}

function addBase(items: Array<SidebarItem>, _base?: string): Array<SidebarItem> {
  return [...items].map((_item) => {
    const item = { ..._item };
    const base = item.base || _base;
    if (base && item.link) {
      item.link = base + item.link;
    }
    if (item.items) {
      item.items = addBase(item.items, base);
    }
    return item;
  });
}
