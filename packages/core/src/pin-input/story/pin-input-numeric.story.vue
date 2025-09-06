<script setup lang="ts">
import { ref } from 'vue';
import { APinInputInput, APinInputRoot } from '..';

const value = ref<Array<number>>([]);
</script>

<template>
  <Story
    title="PinInput/Numeric"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <APinInputRoot
        v-model="value"
        class="flex items-center gap-2"
        type="number"
        :otp="true"
        @complete="e => console.log(e.join(''))"
      >
        <APinInputInput
          v-for="(id, index) in 5"
          :key="id"
          class="h-10 w-10 rounded text-center color-green10 placeholder:text-mauve5"
          :index="index"
        />
      </APinInputRoot>
    </Variant>
  </Story>
</template>
