<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { AToggleGroupItem, AToggleGroupRoot } from 'akar';
import { ref } from 'vue';

const toggleStateSingle = ref('left');
const toggleStateMultiple = ref(['italic']);

const toggleGroupItemClasses = 'hover:bg-stone-50 text-mauve11 data-[state=on]:bg-stone-100 flex h-[35px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l-[7px] last:rounded-r-[7px] focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none';
</script>

<template>
  <div>
    <AToggleGroupRoot
      v-model="toggleStateSingle"
      type="single"
      class="border rounded-lg flex shadow-sm"
    >
      <AToggleGroupItem
        value="left"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <Icon
          icon="radix-icons:text-align-left"
          class="h-[15px] w-[15px]"
        />
      </AToggleGroupItem>
      <AToggleGroupItem
        value="center"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
        class="border-x"
      >
        <Icon
          icon="radix-icons:text-align-center"
          class="h-[15px] w-[15px]"
        />
      </AToggleGroupItem>
      <AToggleGroupItem
        value="right"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <Icon
          icon="radix-icons:text-align-right"
          class="h-[15px] w-[15px]"
        />
      </AToggleGroupItem>
    </AToggleGroupRoot>
    <br>
    <AToggleGroupRoot
      v-model="toggleStateMultiple"
      type="multiple"
      class="border rounded-lg flex shadow-sm"
    >
      <AToggleGroupItem
        value="bold"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <Icon
          icon="radix-icons:font-bold"
          class="h-[15px] w-[15px]"
        />
      </AToggleGroupItem>
      <AToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
        class="border-x"
      >
        <Icon
          icon="radix-icons:font-italic"
          class="h-[15px] w-[15px]"
        />
      </AToggleGroupItem>
      <AToggleGroupItem
        value="strikethrough"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <Icon
          icon="radix-icons:strikethrough"
          class="h-[15px] w-[15px]"
        />
      </AToggleGroupItem>
    </AToggleGroupRoot>
  </div>
</template>
