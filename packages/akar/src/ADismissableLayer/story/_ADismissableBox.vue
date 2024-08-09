<script setup lang="ts">
import { ref } from 'vue';

import { ADismissableLayer } from '../';
// eslint-disable-next-line import/no-self-import
import ADismissableBox from './_ADismissableBox.vue';

const open = ref(false);
const buttonRef = ref<HTMLElement>();
</script>

<template>
  <ADismissableLayer
    v-bind="{ ...$attrs }"
    class="rounded-xl bg-gray-100/10 p-4"
  >
    <button
      ref="buttonRef"
      type="button"
      @click="open = !open"
    >
      {{ open ? "Close" : "Open" }} new layer
    </button>

    <ADismissableBox
      v-if="open"
      @dismiss="open = false"
      @focus-outside.prevent
      @pointer-down-outside="
        (ev) => {
          if (ev.target === buttonRef) {
            ev.preventDefault();
          }
        }
      "
    />
  </ADismissableLayer>
</template>
..
