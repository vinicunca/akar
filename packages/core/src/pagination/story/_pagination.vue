<script setup lang="ts">
import type { APaginationEllipsisProps, APaginationFirstProps, APaginationLastProps, APaginationListItemProps, APaginationListProps, APaginationNextProps, APaginationPrevProps, APaginationRootProps } from '..';
import { computed } from 'vue';
import { APaginationEllipsis, APaginationFirst, APaginationLast, APaginationList, APaginationListItem, APaginationNext, APaginationPrev, APaginationRoot } from '..';

const props = defineProps<{
  root?: APaginationRootProps;
  list?: APaginationListProps;

  first?: APaginationFirstProps;
  prev?: APaginationPrevProps;

  listItem?: Partial<APaginationListItemProps>;
  ellipsis?: APaginationEllipsisProps;

  next?: APaginationNextProps;
  last?: APaginationLastProps;
}>();

const rootProps = computed(() => ({ total: 100, ...props.root }));
</script>

<template>
  <APaginationRoot
    v-bind="rootProps"
    :items-per-page="10"
  >
    <APaginationList
      v-slot="{ items }"
      v-bind="props.list"
      class="flex gap-2 items-center"
    >
      <APaginationFirst v-bind="props.first" />
      <APaginationPrev v-bind="props.prev" />
      <template v-for="(page, index) in items">
        <APaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="data-[selected]:bg-grass8 px-4 py-2 border rounded"
          :value="page.value"
          v-bind="props.listItem"
        >
          {{ page.value }}
        </APaginationListItem>
        <APaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="px-4 py-2 border rounded"
          v-bind="props.ellipsis"
        >
          &#8230;
        </APaginationEllipsis>
      </template>
      <APaginationNext v-bind="props.next" />
      <APaginationLast v-bind="props.last" />
    </APaginationList>
  </APaginationRoot>
</template>
