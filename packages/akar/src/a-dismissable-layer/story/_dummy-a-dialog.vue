<script setup lang="ts">
import { ref } from 'vue';

import { AFocusGuards } from '~~/a-focus-guards';
import { AFocusScope } from '~~/a-focus-scope';

import { ADismissableLayer } from '../';

defineProps<{
  closeLabel?: string;
  openLabel?: string;
}>();

const open = ref(false);
</script>

<template>
  <button
    class="rounded bg-gray-500 py-2 focus:outline-blue-500 focus:outline"
    type="button"
    @click="open = !open"
  >
    {{ openLabel }}
  </button>

  <template v-if="open">
    <AFocusGuards>
      <Teleport to="body">
        <div
          class="pointer-events-none fixed bottom-0 left-0 right-0 top-0 bg-black/30"
        />
      </Teleport>

      <Teleport to="body">
        <ADismissableLayer
          disable-outside-pointer-events
          as-child
          @dismiss="open = false"
        >
          <AFocusScope
            trapped
            class="fixed left-1/2 top-1/2 min-h-[200px] min-w-[300px] flex items-start gap-4 rounded-lg bg-white bg-white p-8 shadow-xl -translate-x-1/2 -translate-y-1/2"
          >
            <slot />
            <button
              type="button"
              @click="open = false"
            >
              {{ closeLabel }}
            </button>
            <input
              type="text"
              value="Hello world"
            >
          </AFocusScope>
        </ADismissableLayer>
      </Teleport>
    </AFocusGuards>
  </template>
</template>
