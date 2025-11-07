<script setup lang="ts">
import type { AToggleGroupRootEmits, AToggleGroupRootProps } from '..';
import { Icon } from '@iconify/vue';
import { useForwardPropsEmits } from '../../shared';
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
      aria-label="AToggle italic"
      :class="toggleGroupItemClasses"
    >
      <Icon
        icon="radix-icons:text-align-left"
        class="text-black"
      />
    </AToggleGroupItem>
    <AToggleGroupItem
      value="center"
      aria-label="AToggle italic"
      :class="toggleGroupItemClasses"
    >
      <Icon
        icon="radix-icons:text-align-center"
        class="text-black"
      />
    </AToggleGroupItem>
    <AToggleGroupItem
      value="right"
      aria-label="AToggle italic"
      :class="toggleGroupItemClasses"
    >
      <Icon
        icon="radix-icons:text-align-right"
        class="text-black"
      />
    </AToggleGroupItem>
  </AToggleGroupRoot>
</template>
