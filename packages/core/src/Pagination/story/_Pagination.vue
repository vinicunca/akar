<script setup lang="ts">
import { computed } from 'vue';
import { APaginationEllipsis, type APaginationEllipsisProps, APaginationFirst, type APaginationFirstProps, APaginationLast, type APaginationLastProps, APaginationList, APaginationListItem, type APaginationListItemProps, type APaginationListProps, APaginationNext, type APaginationNextProps, APaginationPrev, type APaginationPrevProps, APaginationRoot, type APaginationRootProps } from '..';

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
      class="flex items-center gap-2"
    >
      <APaginationFirst v-bind="props.first" />
      <APaginationPrev v-bind="props.prev" />
      <template v-for="(page, index) in items">
        <APaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="data-[selected]:bg-grass8 border rounded px-4 py-2"
          :value="page.value"
          v-bind="props.listItem"
        >
          {{ page.value }}
        </APaginationListItem>
        <APaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="border rounded px-4 py-2"
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
