<script lang="ts" setup>
import DocsTopbar from '../components/docs-topbar.vue';
</script>

<template>
  <div class="w-full">
    <div
      class="pointer-events-none absolute inset-0 left-0 top-0 z-0 h-max w-full flex justify-center overflow-hidden"
    >
      <div class="w-[108rem] flex flex-none justify-end">
        <img
          class="max-w-none w-[90rem] flex-none"
          decoding="async"
          src="/new-bg.png"
          alt="backdrop"
        >
      </div>
    </div>

    <DocsTopbar />
  </div>
</template>
