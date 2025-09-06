<script setup lang="ts">
import { ANavigationMenuLink } from '..';

const props = defineProps({
  title: String,
});
</script>

<template>
  <li>
    <ANavigationMenuLink as-child>
      <a
        v-bind="$attrs"
        class="block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
      >
        <div class="mb-[5px] color-green12 font-medium leading-[1.2]">
          {{ props.title }}
        </div>
        <p class="text-mauve11 leading-[1.4]">
          <slot />
        </p>
      </a>
    </ANavigationMenuLink>
  </li>
</template>
