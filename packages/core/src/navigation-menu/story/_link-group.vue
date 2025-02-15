<script setup lang="ts">
import { ANavigationMenuLink } from '..';

defineProps<{
  items: Array<string>;
}>();
</script>

<template>
  <ul class="m-0 flex flex-col list-none gap-2 p-[22px]">
    <li
      v-for="(item, index) in items"
      :key="index"
    >
      <ANavigationMenuLink
        href="#example"
        class="flex items-center rounded px-4 py-2 hover:bg-gray-200"
      >
        {{ item }}
      </ANavigationMenuLink>
    </li>
  </ul>
</template>
