<script setup lang="ts">
import { ref } from 'vue';

import { ADismissableLayer, type PointerDownOutsideEvent } from '../';
// eslint-disable-next-line import/no-self-import
import ADismissableBox from './_a-dismissable-box.vue';

const open = ref(false);
const buttonRef = ref<HTMLElement>();

function handlePointerDownOutsideWithFocusScope(ev: PointerDownOutsideEvent) {
  if (ev.target === buttonRef.value) {
    ev.preventDefault();
  }
}
</script>

<template>
  <ADismissableLayer
    v-bind="{ ...$attrs }"
    class="rounded-xl bg-gray-100/10 p-4"
  >
    <button
      ref="buttonRef"
      type="button"
      class="bg-transparent"
      @click="open = !open"
    >
      {{ open ? "Close" : "Open" }} new layer
    </button>

    <ADismissableBox
      v-if="open"
      @dismiss="open = false"
      @focus-outside.prevent
      @pointer-down-outside="handlePointerDownOutsideWithFocusScope"
    />
  </ADismissableLayer>
</template>
..
