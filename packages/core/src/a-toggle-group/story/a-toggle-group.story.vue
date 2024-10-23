<script setup lang="ts">
import { ref } from 'vue';

import { AToggleGroupItem, AToggleGroupRoot } from '..';

const toggleStateSingle = ref('center');

const toggleGroupItemClasses
  = 'hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex h-[35px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none';
</script>

<template>
  <Story
    title="Toggle Group/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <AToggleGroupRoot
        v-model="toggleStateSingle"
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
      <br>
      <AToggleGroupRoot
        :default-value="[{ val: 'bold' }, { val: 'italic' }]"
        type="multiple"
        class="flex"
      >
        <AToggleGroupItem
          :value="{ val: 'bold' }"
          aria-label="Toggle Bold"
          :class="toggleGroupItemClasses"
        >
          <i
            class="i-radix-icons:font-bold text-black"
          />
        </AToggleGroupItem>
        <AToggleGroupItem
          :value="{ val: 'italic' }"
          aria-label="Toggle italic"
          :class="toggleGroupItemClasses"
        >
          <i
            class="i-radix-icons:font-italic text-black"
          />
        </AToggleGroupItem>
        <AToggleGroupItem
          :value="{ val: 'strikethrough' }"
          aria-label="Toggle Strikethrough"
          :class="toggleGroupItemClasses"
        >
          <i
            class="i-radix-icons:strikethrough text-black"
          />
        </AToggleGroupItem>
      </AToggleGroupRoot>
    </Variant>
  </Story>
</template>
