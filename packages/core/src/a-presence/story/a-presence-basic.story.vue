<script setup lang="ts">
import { ref } from 'vue';

import { APresence } from '..';

const open = ref(false);
</script>

<template>
  <Story
    group="utilities"
    title="APresence/Basic"
    :layout="{ type: 'grid', width: '33%' }"
    auto-props-disabled
  >
    <Variant title="Basic">
      <div>
        <div>
          <button @click="open = !open">
            toggle
          </button>
        </div>

        <APresence :present="open">
          <div>Content</div>
        </APresence>
      </div>
    </Variant>
  </Story>
</template>
