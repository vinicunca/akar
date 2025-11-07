<script setup lang="ts">
import { ref } from 'vue';
import { ALabel } from '../label';
import { APinInputInput, APinInputRoot } from '..';

const value = ref<Array<string>>([]);
</script>

<template>
  <Story
    title="PinInput/Default"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div>
        <ALabel for="otp">
          Input label
        </ALabel>

        <APinInputRoot
          id="otp"
          v-model="value"
          class="flex gap-2 items-center"
          @complete="e => console.log(e.join(''))"
        >
          <APinInputInput
            v-for="(id, index) in 5"
            :key="id"
            class="color-green10 placeholder:text-mauve5 text-center rounded h-10 w-10"
            :index="index"
          />
        </APinInputRoot>
      </div>
    </Variant>
  </Story>
</template>
