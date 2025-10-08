<script setup lang="ts">
import { ATreeRoot } from '..';
import Tree from './_tree-nested.vue';
import { items } from './constants';
</script>

<template>
  <Story
    title="Tree/Nested"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATreeRoot
        class="text-blackA11 text-sm font-medium p-2 list-none rounded-lg bg-white w-64 select-none"
        :items="items"
        :get-key="(item) => item.title"
      >
        <Tree :tree-items="items" />
      </ATreeRoot>
    </Variant>
  </Story>
</template>
