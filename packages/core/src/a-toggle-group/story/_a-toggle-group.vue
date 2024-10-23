<script setup lang="ts">
import { useForwardPropsEmits } from '~~/shared';

import type { AToggleGroupRootEmits, AToggleGroupRootProps } from '..';

import { AToggleGroupItem, AToggleGroupRoot } from '..';

const props = defineProps<AToggleGroupRootProps>();
const emits = defineEmits<AToggleGroupRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const toggleGroupItemClasses
  = 'hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex h-[35px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none';
</script>

<template>
  <AToggleGroupRoot
    v-bind="forwarded"
    class="flex"
  >
    <AToggleGroupItem
      value="left"
      aria-label="Toggle italic"
      :class="toggleGroupItemClasses"
    >
      <i
        class="i-radix-icons:text-align-left text-black"
      />
    </AToggleGroupItem>
    <AToggleGroupItem
      value="center"
      aria-label="Toggle italic"
      :class="toggleGroupItemClasses"
    >
      <i
        class="i-radix-icons:text-align-center text-black"
      />
    </AToggleGroupItem>
    <AToggleGroupItem
      value="right"
      aria-label="Toggle italic"
      :class="toggleGroupItemClasses"
    >
      <i
        class="i-radix-icons:text-align-right text-black"
      />
    </AToggleGroupItem>
  </AToggleGroupRoot>
</template>
