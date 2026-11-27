<script setup vapor lang="ts">
import { useForwardExpose } from '#akar';
import ForwardExposeCounter from './ForwardExposeCounter.vue';

const { forwardRef } = useForwardExpose();
</script>

<template>
  <ForwardExposeCounter :ref="forwardRef" />
</template>
