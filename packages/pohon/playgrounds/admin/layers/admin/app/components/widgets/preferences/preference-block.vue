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
  <div class="py-4 gap-3 grid">
    <h3 class="leading-none tracking-tight font-semibold">
      {{ title }}
    </h3>

    <slot />
  </div>
</template>
