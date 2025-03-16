<script setup lang="ts">
import { ADialogOverlay } from '../dialog';
import { injectADrawerRootContext } from './drawer.context';

const {
  overlayRef,
  hasSnapPoints,
  isOpen,
  shouldFade,
} = injectADrawerRootContext();
</script>

<template>
  <ADialogOverlay
    ref="overlayRef"
    data-akar-overlay=""
    :data-akar-snap-points="isOpen && hasSnapPoints ? 'true' : 'false'"
    :data-akar-snap-points-overlay="isOpen && shouldFade ? 'true' : 'false'"
  />
</template>
