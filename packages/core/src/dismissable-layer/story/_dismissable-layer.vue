<script setup lang="ts">
import type { DismissableLayerEmits } from '..';
import { ref } from 'vue';
import { useEmitAsProps } from '../../shared';
import { DismissableLayer } from '..';

defineProps<{
  openLabel?: string;
  closeLabel?: string;
  outsideLabel?: string;

  preventEscapeKeyDownEvent?: boolean;
  preventPointerDownOutsideEvent?: boolean;
  preventFocusOutsideEvent?: boolean;
}>();

const emits = defineEmits<DismissableLayerEmits>();

const open = ref(false);

function handleDismiss() {
  open.value = false;
}
</script>

<template>
  <div class="flex flex-col">
    <button @click="open = !open">
      {{ openLabel }}
    </button>

    <DismissableLayer
      v-if="open"
      id="layer"
      v-bind="useEmitAsProps(emits)"
      @dismiss="handleDismiss"
      @escape-key-down="(event) => {
        if (preventEscapeKeyDownEvent)
          event.preventDefault()
      }"
      @pointer-down-outside="(event) => {
        console.log(event)
        if (preventPointerDownOutsideEvent)
          event.preventDefault()
      }"
      @focus-outside="(event) => {
        if (preventFocusOutsideEvent)
          event.preventDefault()
      }"
    >
      <div>Content</div>
      <button
        type="button"
        @click="open = false"
      >
        {{ closeLabel }}
      </button>
    </DismissableLayer>

    <button id="outside">
      {{ outsideLabel }}
    </button>
  </div>
</template>
