<script setup lang="ts">
import { ref } from 'vue';

import { useEmitAsProps } from '~~/shared';

import type { ADismissableLayerEmits } from '..';

import { ADismissableLayer } from '..';

defineProps<{
  closeLabel?: string;
  openLabel?: string;
  outsideLabel?: string;

  preventEscapeKeyDownEvent?: boolean;
  preventFocusOutsideEvent?: boolean;
  preventPointerDownOutsideEvent?: boolean;
}>();

const emits = defineEmits<ADismissableLayerEmits>();

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

    <ADismissableLayer
      v-if="open"
      id="layer"
      v-bind="useEmitAsProps(emits)"
      @dismiss="handleDismiss"
      @escape-key-down="(ev) => {
        if (preventEscapeKeyDownEvent)
          ev.preventDefault()
      }"
      @pointer-down-outside="(ev) => {
        console.log(ev)
        if (preventPointerDownOutsideEvent)
          ev.preventDefault()
      }"
      @focus-outside="(ev) => {
        if (preventFocusOutsideEvent)
          ev.preventDefault()
      }"
    >
      <div>Content</div>
      <button
        type="button"
        @click="open = false"
      >
        {{ closeLabel }}
      </button>
    </ADismissableLayer>

    <button id="outside">
      {{ outsideLabel }}
    </button>
  </div>
</template>
