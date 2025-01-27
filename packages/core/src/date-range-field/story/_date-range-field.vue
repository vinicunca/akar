<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import type { ADateRangeFieldRootProps } from '..';
import { ALabel } from '~~/label';
import { ADateRangeFieldInput, ADateRangeFieldRoot } from '..';

const props = defineProps<{ dateFieldProps?: ADateRangeFieldRootProps; emits?: { 'onUpdate:modelValue'?: (data: DateValue) => void } }>();
</script>

<template>
  <ALabel
    for="date-field"
    data-testid="label"
  >
    ALabel
  </ALabel>
  <ADateRangeFieldRoot
    v-bind="props.dateFieldProps"
    id="date-field"
    v-slot="{ segments }"
    data-testid="input"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <ADateRangeFieldInput
      v-for="item in segments.start"
      :key="item.part"
      :part="item.part"
      :data-testid="item.part === 'literal' ? undefined : `start-${item.part}`"
      type="start"
    >
      {{ item.value }}
    </ADateRangeFieldInput>
    <ADateRangeFieldInput
      v-for="item in segments.end"
      :key="item.part"
      :part="item.part"
      :data-testid="item.part === 'literal' ? undefined : `end-${item.part}`"
      type="end"
    >
      {{ item.value }}
    </ADateRangeFieldInput>
  </ADateRangeFieldRoot>
</template>
