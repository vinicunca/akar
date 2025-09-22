<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{ id: string }>();
</script>

<template>
  <h1
    :id="id"
    class="tracking-tight font-bold mb-2 mt-12 scroll-mt-[205px] !text-4xl lg:scroll-mt-[156px]"
  >
    <NuxtLink
      :href="`#${id}`"
      class="group"
    >
      <div class="py-2 pr-2 opacity-0 inline-flex h-10 transition-opacity absolute -ml-6 group-hover:opacity-100">
        <Icon
          icon="heroicons:hashtag-20-solid"
          class="color-green-400 my-auto h-5 w-5"
        />
      </div>

      <slot />
    </NuxtLink>
  </h1>
</template>
