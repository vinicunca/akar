<script setup lang="ts">
import { APrimitiveSlot } from 'akar';
</script>

<template>
  <APrimitiveSlot class="nuxt-only">
    <slot name="nuxt" />
  </APrimitiveSlot>

  <APrimitiveSlot class="vue-only">
    <slot name="vue" />
  </APrimitiveSlot>
</template>
