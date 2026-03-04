<script setup lang="ts">
import type { ARatingRootProps } from '..';
import { Icon } from '@iconify/vue';
import { ARatingItem, ARatingItemIndicator, ARatingRoot } from '..';

const props = defineProps<ARatingRootProps>();
</script>

<template>
  <ARatingRoot
    v-slot="{ items }"
    v-bind="props"
    class="flex gap-2"
  >
    <ARatingItem
      v-for="item in items"
      :key="item"
      v-slot="{ steps }"
      :item="item"
      class="size-8 relative"
    >
      <ARatingItemIndicator
        v-for="step in steps"
        :key="step"
        :step="step"
        class="text-gray-400 opacity-[var(--akar-rating-item-step-opacity)] w-[var(--akar-rating-item-step-width)] absolute z-[var(--reka-rating-item-step-z-index)] overflow-hidden data-[state=active]:text-yellow-500"
        :aria-label="`Rating ${step} of ${items.length}`"
      >
        <Icon
          icon="radix-icons:star"
          class="size-8"
        />
      </ARatingItemIndicator>
    </ARatingItem>
  </ARatingRoot>
</template>
