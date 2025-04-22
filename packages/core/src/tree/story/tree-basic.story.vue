<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ATreeItem, ATreeRoot } from '..';
import { items } from './constants';
</script>

<template>
  <Story
    title="Tree/Basic"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATreeRoot
        v-slot="{ flattenItems }"
        class="w-64 select-none list-none rounded-lg bg-white p-2 text-sm text-blackA11 font-medium"
        :items="items"
        :get-key="(item) => item.title"
      >
        <ATreeItem
          v-for="item in flattenItems"
          :key="item._id"
          v-bind="item.bind"
          :style="{ 'margin-left': `${item.level - 1}rem` }"
          class="my-0.5 w-max flex items-center rounded px-2 py-1 outline-none data-[selected]:bg-grass4 focus:ring-2 focus:ring-grass9"
        >
          <Icon
            v-if="item.hasChildren"
            icon="radix-icons:chevron-down"
            class="mr-2 h-4 w-4"
          />
          <div>
            {{ item.value.title }}
          </div>
        </ATreeItem>
      </ATreeRoot>
    </Variant>
  </Story>
</template>
