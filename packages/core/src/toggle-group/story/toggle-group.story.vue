<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { AToggleGroupItem, AToggleGroupRoot } from '..';

const toggleStateSingle = ref<string | null>(null);
const toggleStateMultiple = ref<Array<string> | string | null>('123');

const toggleGroupItemClasses
  = 'hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex h-[35px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none';
</script>

<template>
  <Story
    title="AToggle Group/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <AToggleGroupRoot
        v-model="toggleStateSingle"
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
      <br>
      <AToggleGroupRoot
        v-model="toggleStateMultiple"
        type="multiple"
        class="flex"
      >
        <AToggleGroupItem
          :value="{ val: 'bold' }"
          aria-label="AToggle Bold"
          :class="toggleGroupItemClasses"
        >
          <Icon
            icon="radix-icons:font-bold"
            class="text-black"
          />
        </AToggleGroupItem>
        <AToggleGroupItem
          :value="{ val: 'italic' }"
          aria-label="AToggle italic"
          :class="toggleGroupItemClasses"
        >
          <Icon
            icon="radix-icons:font-italic"
            class="text-black"
          />
        </AToggleGroupItem>
        <AToggleGroupItem
          :value="{ val: 'strikethrough' }"
          aria-label="AToggle Strikethrough"
          :class="toggleGroupItemClasses"
        >
          <Icon
            icon="radix-icons:strikethrough"
            class="text-black"
          />
        </AToggleGroupItem>
      </AToggleGroupRoot>
    </Variant>
  </Story>
</template>
