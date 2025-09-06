<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{ id: string }>();
</script>

<template>
  <h2
    :id="id"
    class="text-3xl font-semibold mb-2.5 mt-12 scroll-mt-[180px] lg:scroll-mt-[141px]"
  >
    <NuxtLink
      :href="`#${id}`"
      class="group"
    >
      <div class="my-auto py-2 pr-2 opacity-0 inline-flex transition-opacity absolute -ml-6 group-hover:opacity-100">
        <Icon
          icon="heroicons:hashtag-20-solid"
          class="color-green-400 h-5 w-5"
        />
      </div>

      <slot />
    </NuxtLink>
  </h2>
</template>
