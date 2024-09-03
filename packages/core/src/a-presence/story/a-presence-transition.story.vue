<script setup lang="ts">
import { ref } from 'vue';

import { APresence } from '..';

const isOpen = ref(false);
</script>

<template>
  <Story
    group="utilities"
    title="APresence/Transition"
    :layout="{ type: 'grid', width: '33%' }"
    auto-props-disabled
  >
    <Variant title="With Vue Transition">
      <div>
        <button @click="isOpen = !isOpen">
          Toggle content
        </button>

        <APresence
          :present="isOpen"
          force-mount
        >
          <div>Content</div>
        </APresence>
        <!-- <Transition>
        </Transition> -->
      </div>
    </Variant>
  </Story>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
