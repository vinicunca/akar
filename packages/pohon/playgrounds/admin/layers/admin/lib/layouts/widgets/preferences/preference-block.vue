<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(
  defineProps<Props>(),
  {
    title: '',
  },
);
</script>

<template>
  <div class="py-4 flex flex-col gap-3">
    <h3 class="leading-none tracking-tight font-semibold">
      {{ title }}
    </h3>

    <slot />
  </div>
</template>
