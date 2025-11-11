<script setup lang="ts">
import { APaginationEllipsis, APaginationFirst, APaginationLast, APaginationList, APaginationListItem, APaginationNext, APaginationPrev, APaginationRoot } from 'akar';

const btnClasses = 'text-sm color-text font-500 p-1.5 rounded-md bg-background inline-flex gap-1.5 ring ring-ring-accented ring-inset transition-colors-280 items-center focus:outline-none active:bg-background-elevated aria-disabled:(bg-background opacity-75 cursor-not-allowed) disabled:(bg-background opacity-75 cursor-not-allowed) hover:bg-background-elevated focus-visible:(ring-2 ring-ring-inverted)';
</script>

<template>
  <APaginationRoot
    :total="100"
    :sibling-count="1"
    :items-per-page="10"
    show-edges
    :default-page="2"
  >
    <APaginationList
      v-slot="{ items }"
      class="flex gap-1 items-center"
    >
      <APaginationFirst :class="btnClasses">
        <i class="i-lucide:chevrons-left size-5" />
      </APaginationFirst>

      <APaginationPrev :class="btnClasses">
        <i class="i-lucide:chevron-left size-5" />
      </APaginationPrev>

      <template v-for="(page, index) in items">
        <APaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="data-[selected]:bg-primary"
          :class="btnClasses"
          :value="page.value"
        >
          <span class="min-w-5">{{ page.value }}</span>
        </APaginationListItem>

        <APaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          :class="btnClasses"
        >
          <i class="i-lucide:ellipsis size-5" />
        </APaginationEllipsis>
      </template>
      <APaginationNext :class="btnClasses">
        <i class="i-lucide:chevron-right size-5" />
      </APaginationNext>
      <APaginationLast :class="btnClasses">
        <i class="i-lucide:chevrons-right size-5" />
      </APaginationLast>
    </APaginationList>
  </APaginationRoot>
</template>
