<script setup lang="ts">
import { provide, ref } from 'vue'
import { ARovingFocusGroup, type ARovingFocusGroupProps } from '..'

interface Props extends ARovingFocusGroupProps {
  defaultValue?: string
}
const props = defineProps<Props>()

const value = ref(props.defaultValue ?? '')

provide('rovingFocusDemo', {
  value,
})
</script>

<template>
  <ARovingFocusGroup
    v-bind="props"
    class="inline-flex gap-4 p-2"
    :class="orientation === 'vertical' ? 'flex-col' : 'flex-row'"
  >
    <slot />
  </ARovingFocusGroup>
</template>
