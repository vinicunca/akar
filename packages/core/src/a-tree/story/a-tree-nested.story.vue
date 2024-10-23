<script setup lang="ts">
import { ATreeRoot } from '..';
import AATree from './_a-tree-nested.vue';
import { items } from './constants';
</script>

<template>
  <Story
    title="AATree/Nested"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATreeRoot
        class="w-64 select-none list-none rounded-lg bg-white p-2 text-sm text-blackA11 font-medium"
        :items="items"
        :get-key="(item) => item.title"
      >
        <AATree :tree-items="items" />
      </ATreeRoot>
    </Variant>
  </Story>
</template>
