<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ATreeItem, ATreeRoot } from '..';
import { items } from './constants';
</script>

<template>
  <Story
    title="Tree/Checkbox"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATreeRoot
        v-slot="{ flattenItems }"
        class="text-blackA11 text-sm font-medium p-2 list-none rounded-lg bg-white w-64 select-none"
        :items="items"
        :get-key="(item) => item.title"
        multiple
        propagate-select
        bubble-select
      >
        <ATreeItem
          v-for="item in flattenItems"
          :key="item._id"
          v-slot="{ handleSelect, isSelected, isIndeterminate }"
          v-bind="item.bind"
          :style="{ 'margin-left': `${item.level - 1}rem` }"
          class="data-[selected]:bg-grass4 focus:ring-grass9 my-0.5 px-2 py-1 outline-none rounded flex w-max items-center focus:ring-2"
          @select="(event) => {
            if (event.detail.originalEvent.type === 'click')
              event.preventDefault()
          }"
        >
          <Icon
            v-if="item.hasChildren"
            icon="radix-icons:chevron-down"
            class="h-4 w-4"
          />
          <input
            :checked="isSelected"
            type="checkbox"
            tabindex="-1"
            :indeterminate="isIndeterminate"
            @click.stop
            @change="handleSelect"
          >
          <div class="pl-2">
            {{ item.value.title }}
          </div>
        </ATreeItem>
      </ATreeRoot>
    </Variant>
  </Story>
</template>
