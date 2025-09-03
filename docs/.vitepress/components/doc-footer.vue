<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useData } from 'vitepress';
import { computed } from 'vue';
import { useEditLink } from '../composables/use-edit-link';
import { usePrevNext } from '../composables/use-prev-next';
import DocFooterLastUpdated from './doc-footer-last-updated.vue';

const { theme, page, frontmatter } = useData();

const editLink = useEditLink();
const control = usePrevNext();

const hasEditLink = computed(
  () => theme.value.editLink && frontmatter.value.editLink !== false,
);
const hasLastUpdated = computed(() => page.value.lastUpdated);
const showFooter = computed(
  () =>
    hasEditLink.value
    || hasLastUpdated.value
    || control.value.prev
    || control.value.next,
);
</script>

<template>
  <footer
    v-if="showFooter"
    class="my-28"
  >
    <div
      v-if="hasEditLink || hasLastUpdated"
      class="text-muted-foreground flex justify-between"
    >
      <div
        v-if="hasEditLink"
        class="text-sm text-muted-foreground hover:text-foreground"
      >
        <a
          :href="editLink.url"
          target="_blank"
          class="inline-flex gap-2 items-center"
        >
          <Icon icon="lucide:pencil-line" />
          {{ editLink.text }}
        </a>
      </div>

      <div
        v-if="hasLastUpdated"
        class="text-sm"
      >
        <DocFooterLastUpdated />
      </div>
    </div>

    <nav
      v-if="control.prev?.link || control.next?.link"
      class="mt-8 flex flex-col gap-4 items-center justify-between md:flex-row"
      aria-labelledby="doc-footer-aria-label"
    >
      <span
        id="doc-footer-aria-label"
        class="sr-only"
      >
        Pager
      </span>

      <div class="group w-full">
        <a
          v-if="control.prev?.link"
          class="hover:border-docs-primary px-4 py-6 border border-muted rounded-lg bg-transparent inline-flex flex-col w-full"
          :href="control.prev.link"
        >
          <span
            class="text-xs text-muted-foreground group-hover:text-foreground"
            v-html="theme.docFooter?.prev || 'Previous page'"
          />
          <p class="mt-2 inline-flex gap-1 items-center">
            <Icon icon="lucide:arrow-left" />
            <span
              class="text-sm font-semibold"
              v-html="control.prev.text"
            />
          </p>
        </a>
      </div>
      <div class="group w-full">
        <a
          v-if="control.next?.link"
          class="hover:border-docs-primary px-4 py-6 border border-muted rounded-lg bg-transparent inline-flex flex-col w-full items-end"
          :href="control.next.link"
        >
          <span
            class="text-xs text-muted-foreground group-hover:text-foreground"
            v-html="theme.docFooter?.next || 'Next page'"
          />

          <p class="mt-2 inline-flex gap-1 items-center">
            <span
              class="text-sm font-semibold"
              v-html="control.next.text"
            />
            <Icon icon="lucide:arrow-right" />
          </p>
        </a>
      </div>
    </nav>
  </footer>
</template>
