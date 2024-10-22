<script setup lang="ts">
import { ref } from 'vue'
import { APinInputInput, APinInputRoot, type APinInputRootEmits, type APinInputRootProps } from '..'
import { ALabel } from '~~/a-label'
import { useEmitAsProps } from '~~/shared'

const props = defineProps<APinInputRootProps>()
const emits = defineEmits<APinInputRootEmits>()

const value = ref<string[]>([])
</script>

<template>
  <ALabel for="otp">Test label</ALabel>
  <APinInputRoot
    v-bind="{ ...props, ...useEmitAsProps(emits) }"
    v-model="value"
    class="flex gap-2 items-center"
  >
    <APinInputInput
      v-for="(id, index) in 5"
      :key="id"
      class="w-10 h-10 rounded text-center text-green10 placeholder:text-mauve5"
      :index="index"
    />
  </APinInputRoot>
</template>
