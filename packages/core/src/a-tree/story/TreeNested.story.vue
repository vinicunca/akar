<script setup lang="ts">
import { ATreeRoot } from '..'
import { items } from './constants'
import AATree from './_ATreeNested.vue'
</script>

<template>
  <Story
    title="AATree/Nested"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATreeRoot
        class="list-none select-none w-64 bg-white text-blackA11 rounded-lg p-2 text-sm font-medium"
        :items="items"
        :get-key="(item) => item.title"
      >
        <AATree :tree-items="items" />
      </ATreeRoot>
    </Variant>
  </Story>
</template>
