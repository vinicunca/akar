<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: undefined,
    required: false,
  },
});
</script>

<template>
  <NuxtLink
    :to="href"
    :target="target"
    class="color-sky-500 underline-offset-3 hover:underline"
  >
    <slot />
  </NuxtLink>
</template>
