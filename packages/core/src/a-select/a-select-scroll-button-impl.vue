<script setup lang="ts">
import { onBeforeUnmount, ref, watchEffect } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useCollection } from '~~/collection';

import { injectASelectContentContext } from './a-select-content-impl.vue';

export type ASelectScrollButtonImplEmits = {
  autoScroll: [];
};

const emits = defineEmits<ASelectScrollButtonImplEmits>();
const { getItems } = useCollection();

const contentContext = injectASelectContentContext();
const autoScrollTimerRef = ref<null | number>(null);

function clearAutoScrollTimer() {
  if (autoScrollTimerRef.value !== null) {
    window.clearInterval(autoScrollTimerRef.value);
    autoScrollTimerRef.value = null;
  }
}

watchEffect(() => {
  const activeItem = getItems().map((i) => i.ref).find(
    (item) => item === document.activeElement,
  );

  activeItem?.scrollIntoView({ block: 'nearest' });
});

function handlePointerDown() {
  if (autoScrollTimerRef.value === null) {
    autoScrollTimerRef.value = window.setInterval(() => {
      emits('autoScroll');
    }, 50);
  }
}

function handlePointerMove() {
  contentContext.onItemLeave?.();
  if (autoScrollTimerRef.value === null) {
    autoScrollTimerRef.value = window.setInterval(() => {
      emits('autoScroll');
    }, 50);
  }
}

onBeforeUnmount(() => clearAutoScrollTimer());
</script>

<template>
  <APrimitive
    aria-hidden="true"
    :style="{
      flexShrink: 0,
    }"
    v-bind="$parent?.$props"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerleave="
      () => {
        clearAutoScrollTimer();
      }
    "
  >
    <slot />
  </APrimitive>
</template>
