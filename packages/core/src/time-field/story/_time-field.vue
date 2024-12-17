<script setup lang="ts">
import type { TimeValue } from '~~/shared/date'
import type { ATimeFieldRootProps } from '..'
import { ATimeFieldInput, ATimeFieldRoot } from '..'
import { ALabel } from '~~/label'

const props = defineProps<{ timeFieldProps?: ATimeFieldRootProps, emits?: { 'onUpdate:modelValue'?: (data: TimeValue) => void } }>()
</script>

<template>
  <ALabel
    for="time-field"
    data-testid="label"
  >
    ALabel</ALabel>
  <ATimeFieldRoot
    v-bind="props.timeFieldProps"
    id="time-field"
    v-slot="{ segments, modelValue }"
    data-testid="input"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <ATimeFieldInput
      v-for="item in segments"
      :key="item.part"
      :part="item.part"
      :data-testid="item.part === 'literal' ? undefined : item.part"
    >
      {{ item.value }}
    </ATimeFieldInput>

    <span
      data-testid="value"
      tabindex="-1"
      disabled
    >{{ modelValue }}</span>
  </ATimeFieldRoot>
</template>
