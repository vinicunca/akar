<script setup lang="ts">
import { APaginationEllipsis, APaginationFirst, APaginationLast, APaginationList, APaginationListItem, APaginationNext, APaginationPrev, APaginationRoot } from '..';
</script>

<template>
  <Story
    title="Pagination/Default"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <APaginationRoot
        :total="34"
        :sibling-count="1"
        :items-per-page="10"
      >
        <APaginationList
          v-slot="{ items }"
          class="flex gap-2 items-center"
        >
          <APaginationFirst />
          <APaginationPrev />
          <template v-for="(page, index) in items">
            <APaginationListItem
              v-if="page.type === 'page'"
              :key="index"
              class="data-[selected]:bg-grass8 px-4 py-2 border rounded"
              :value="page.value"
            >
              {{ page.value }}
            </APaginationListItem>
            <APaginationEllipsis
              v-else
              :key="page.type"
              :index="index"
              class="px-4 py-2 border rounded"
            >
              &#8230;
            </APaginationEllipsis>
          </template>
          <APaginationNext />
          <APaginationLast />
        </APaginationList>
      </APaginationRoot>
    </Variant>
  </Story>
</template>
