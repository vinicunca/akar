<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{ id: string }>();
</script>

<template>
  <h3
    :id="id"
    class="text-xl font-semibold mb-1 mt-11 scroll-mt-[175px] lg:scroll-mt-[126px]"
  >
    <NuxtLink
      :href="`#${id}`"
      class="group"
    >
      <div class="pr-2 opacity-0 inline-flex h-7 transition-opacity absolute -ml-6 group-hover:opacity-100">
        <Icon
          icon="heroicons:hashtag-20-solid"
          class="color-green-400 my-auto h-4 w-4"
        />
      </div>

      <slot />
    </NuxtLink>
  </h3>
</template>
