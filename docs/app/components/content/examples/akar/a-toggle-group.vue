<script setup lang="ts">
import { AToggleGroupItem, AToggleGroupRoot } from 'akar';
import { ref } from 'vue';

const toggleStateSingle = ref('left');
const toggleStateMultiple = ref(['italic']);

const toggleGroupItemClasses = 'color-text bg-background flex h-[35px] w-[35px] items-center justify-center bg-background text-base leading-4 first:rounded-l-[7px] last:rounded-r-[7px]  data-[state=on]:bg-background-accented hover:bg-background-elevated focus:(focus:z-10 ring-2 ring-ring-inverted)';
</script>

<template>
  <div>
    <AToggleGroupRoot
      v-model="toggleStateSingle"
      type="single"
      class="rounded-lg flex ring ring-ring-accented ring-inset shadow-sm"
    >
      <AToggleGroupItem
        value="left"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <i
          class="i-lucide:text-align-start size-4"
        />
      </AToggleGroupItem>
      <AToggleGroupItem
        value="center"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
        class="border-x border-border-accented"
      >
        <i
          class="i-lucide:text-align-center size-4"
        />
      </AToggleGroupItem>
      <AToggleGroupItem
        value="right"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <i
          class="i-lucide:text-align-end size-4"
        />
      </AToggleGroupItem>
    </AToggleGroupRoot>
    <br>
    <AToggleGroupRoot
      v-model="toggleStateMultiple"
      type="multiple"
      class="rounded-lg flex ring ring-ring-accented ring-inset shadow-sm"
    >
      <AToggleGroupItem
        value="bold"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <i
          class="i-lucide:bold size-4"
        />
      </AToggleGroupItem>
      <AToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
        class="border-x border-border-accented"
      >
        <i
          class="i-lucide:italic size-4"
        />
      </AToggleGroupItem>
      <AToggleGroupItem
        value="strikethrough"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <i
          class="i-lucide:strikethrough size-4"
        />
      </AToggleGroupItem>
    </AToggleGroupRoot>
  </div>
</template>
