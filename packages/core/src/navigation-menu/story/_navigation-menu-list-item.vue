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
        class="hover:bg-mauve3 focus:shadow-green7 text-[15px] leading-none p-3 outline-none rounded-[6px] no-underline block select-none transition-colors focus:shadow-[0_0_0_2px]"
      >
        <div class="color-green12 leading-[1.2] font-medium mb-[5px]">
          {{ props.title }}
        </div>
        <p class="text-mauve11 leading-[1.4]">
          <slot />
        </p>
      </a>
    </ANavigationMenuLink>
  </li>
</template>
