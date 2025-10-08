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
        class="flex gap-2 items-center"
        type="number"
        :otp="true"
        @complete="e => console.log(e.join(''))"
      >
        <APinInputInput
          v-for="(id, index) in 5"
          :key="id"
          class="color-green10 placeholder:text-mauve5 text-center rounded h-10 w-10"
          :index="index"
        />
      </APinInputRoot>
    </Variant>
  </Story>
</template>
