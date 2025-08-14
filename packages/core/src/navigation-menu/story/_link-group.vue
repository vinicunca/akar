<script setup lang="ts">
import { ANavigationMenuLink } from '..';

defineProps<{
  items: Array<string>;
}>();
</script>

<template>
  <ul class="m-0 p-[22px] list-none flex flex-col gap-2">
    <li
      v-for="(item, index) in items"
      :key="index"
    >
      <ANavigationMenuLink
        href="#example"
        class="px-4 py-2 rounded flex items-center hover:bg-gray-200"
      >
        {{ item }}
      </ANavigationMenuLink>
    </li>
  </ul>
</template>
