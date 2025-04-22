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
        class="w-64 select-none list-none rounded-lg bg-white p-2 text-sm text-blackA11 font-medium"
        :items="items"
        :get-key="(item) => item.title"
        multiple
        propagate-select
      >
        <ATreeItem
          v-for="item in flattenItems"
          :key="item._id"
          v-slot="{ handleSelect, isSelected }"
          v-bind="item.bind"
          :style="{ 'margin-left': `${item.level - 1}rem` }"
          class="my-0.5 w-max flex items-center rounded px-2 py-1 outline-none data-[selected]:bg-grass4 focus:ring-2 focus:ring-grass9"
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
