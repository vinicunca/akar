<script setup vapor lang="ts">
import { useForwardExpose } from '#akar';
import ForwardExposeInner from './ForwardExposeInner.vue';

const { forwardRef } = useForwardExpose();
</script>

<template>
  <ForwardExposeInner :ref="forwardRef" />
</template>
