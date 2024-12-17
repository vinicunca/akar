<script setup lang="ts">
import { ref } from 'vue';
import APresence from '../presence';
import AToggle from './_toggle.vue';

defineOptions({
  inheritAttrs: false,
});
const open = ref(false);
const node = ref<HTMLElement>();
</script>

<template>
  <div class="h-64">
    <AToggle
      v-model:open="open"
      :node="node"
    />
    <APresence :present="open">
      <div
        v-bind="$attrs"
        ref="node"
        :data-state="open ? 'open' : 'closed'"
      >
        Content
      </div>
    </APresence>
  </div>
</template>
