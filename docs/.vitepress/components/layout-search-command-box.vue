<script setup lang="ts">
import type { GenericComponentInstance } from '@vinicunca/akar';

import type { SearchResult } from 'minisearch';

import type { Ref } from 'vue';

// @ts-expect-error internal function
import localSearchIndex from '@localSearchIndex';

import {
  ADialogClose,
  AListboxContent,
  AListboxFilter,
  AListboxItem,
  AListboxRoot,
} from '@vinicunca/akar';
import { computedAsync, debouncedWatch } from '@vueuse/core';

// @ts-expect-error ignoring
import Mark from 'mark.js/src/vanilla.js';
import MiniSearch from 'minisearch';
import { useData } from 'vitepress';
import { markRaw, nextTick, ref, shallowRef } from 'vue';
import { LRUCache } from '../functions/cache';

const emits = defineEmits<{
  close: [];
}>();

const { localeIndex } = useData();

const filterText = ref('');
const enableNoResults = ref(false);
const resultsEl = shallowRef<HTMLElement>();
const searchIndexData = shallowRef(localSearchIndex);
const results: Ref<Array<SearchResult & Result>> = shallowRef([]);
const listboxRef = ref<GenericComponentInstance<typeof AListboxRoot>>();

interface Result {
  title: string;
  titles: Array<string>;
  text?: string;
}

// hmr
if (import.meta.hot) {
  import.meta.hot.accept('/@localSearchIndex', (m) => {
    if (m) {
      searchIndexData.value = m.default;
    }
  });
}

const mark = computedAsync(async () => {
  if (!resultsEl.value) {
    return;
  }
  return markRaw(new Mark(resultsEl.value));
}, null);

const searchIndex = computedAsync(async () =>
  markRaw(
    MiniSearch.loadJSON<Result>(
      (await searchIndexData.value[localeIndex.value]?.())?.default,
      {
        fields: ['title', 'titles', 'text'],
        storeFields: ['title', 'titles'],
        searchOptions: {
          fuzzy: 0.2,
          prefix: true,
          boost: { title: 4, text: 2, titles: 1 },
        },
      },
    ),
  ),
);

const cache = new LRUCache(16); // 16 files

debouncedWatch(
  () => [searchIndex.value, filterText.value] as const,
  async ([index, filterTextValue], old, onCleanup) => {
    if (old?.[0] !== index) {
      // in case of hmr
      cache.clear();
    }

    let canceled = false;
    onCleanup(() => {
      canceled = true;
    });

    if (!index) {
      return;
    }

    // Search
    results.value = index
      .search(filterTextValue)
      .slice(0, 16) as Array<SearchResult & Result>;

    if (canceled) {
      return;
    }

    const terms = new Set<string>();

    results.value = results.value.map((result) => {
      const [id, anchor] = result.id.split('#');
      const map = cache.get(id);
      const text = map?.get(anchor) ?? '';

      // eslint-disable-next-line no-restricted-syntax
      for (const term in result.match) {
        terms.add(term);
      }
      return { ...result, text };
    });

    await nextTick();
    if (canceled) {
      return;
    }

    await new Promise((r) => {
      mark.value?.unmark({
        done: () => {
          mark.value?.markRegExp(formMarkRegex(terms), { done: r });
        },
      });
    });

    enableNoResults.value = true;
    // FIXME: without this whole page scrolls to the bottom
    resultsEl.value?.firstElementChild?.scrollIntoView({ block: 'start' });
    listboxRef.value?.highlightFirstItem();
  },
  { debounce: 200, immediate: true },
);

function formMarkRegex(terms: Set<string>) {
  return new RegExp(
    [...terms]
      .sort((a, b) => b.length - a.length)
      .map((term) => `(${term.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')})`)
      .join('|'),
    'gi',
  );
}
</script>

<template>
  <AListboxRoot ref="listboxRef">
    <div class="w-full flex items-center px-6">
      <AListboxFilter
        v-model="filterText"
        class="h-14 w-full flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        placeholder="Search documentation"
        auto-focus
      />
      <ADialogClose>
        <i class="i-lucide:x block" />
      </ADialogClose>
    </div>

    <AListboxContent
      :ref="(node) => {
        if (node && '$el' in node) {
          resultsEl = node.$el
        }
      }"
      as="ul"
      class="max-h-[55vh] overflow-auto border-y border-muted p-0.5 empty:border-t-0"
    >
      <AListboxItem
        v-for="p in results"
        :key="p.id"
        :value="p.id"
        class="text-sm text-muted-foreground data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary data-[highlighted]:font-semibold"
        as-child
        @select="emits('close')"
      >
        <a
          :href="p.id"
          class="w-full inline-flex px-6 py-4"
        >
          <div class="flex flex-wrap items-center">
            <!-- <span>#</span> -->
            <span
              v-for="(t, index) in p.titles"
              :key="index"
              class="flex items-center"
            >
              <span
                class="text"
                v-html="t"
              />
              <i
                inline
                class="i-lucide:chevron-right mx-1 md:mx-2"
              />
            </span>
            <span>
              <span
                class="text"
                v-html="p.title"
              />
            </span>
          </div>
        </a>
      </AListboxItem>

      <li
        v-if="filterText && !results.length && enableNoResults"
        class="flex items-center justify-center p-16 text-sm text-foreground"
      >
        No results for "<strong>{{ filterText }}</strong>"
      </li>
    </AListboxContent>

    <div class="hidden items-center gap-4 px-6 py-4 text-sm prose prose-stone md:flex dark:prose-invert">
      <span class="inline-flex items-center gap-1 leading-4">
        <kbd aria-label="Up arrow">
          <i class="i-lucide:arrow-up block" />
        </kbd>
        <kbd aria-label="Down arrow">
          <i class="i-lucide:arrow-down block" />
        </kbd>
        to navigate
      </span>

      <span class="inline-flex items-center gap-1 leading-4">
        <kbd aria-label="Enter">
          enter
        </kbd>
        to select
      </span>

      <span class="inline-flex items-center gap-1 leading-4">
        <kbd aria-label="Escape">esc</kbd>
        to close
      </span>
    </div>
  </AListboxRoot>
</template>
