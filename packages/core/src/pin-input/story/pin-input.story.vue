<script setup lang="ts">
import { ref } from 'vue'
import { APinInputInput, APinInputRoot } from '..'
import { ALabel } from '~~/label'

const value = ref<string[]>([])
</script>

<template>
  <Story
    title="PinInput/Default"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div>
        <ALabel for="otp">Input label</ALabel>

        <APinInputRoot
          id="otp"
          v-model="value"
          class="flex gap-2 items-center"
          @complete="e => console.log(e.join(''))"
        >
          <APinInputInput
            v-for="(id, index) in 5"
            :key="id"
            class="w-10 h-10 rounded text-center text-green10 placeholder:text-mauve5"
            :index="index"
          />
        </APinInputRoot>
      </div>
    </Variant>
  </Story>
</template>
