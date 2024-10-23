<script setup lang="ts">
import { ref } from 'vue';

import ASwitchRoot from './a-switch-root.vue';
import ASwitchThumb from './a-switch-thumb.vue';

const checked = ref(false);
</script>

<template>
  <p>{{ checked ? "checked" : "unchecked" }}</p>
  <div>
    <label for="airplane-mode">Airplane mode</label>
    <ASwitchRoot
      id="airplane-mode"
      v-model="checked"
      aria-label="Airplane mode"
      data-testId="root"
      name="test"
      value="true"
    >
      <ASwitchThumb data-testId="thumb" />
    </ASwitchRoot>
  </div>
</template>
