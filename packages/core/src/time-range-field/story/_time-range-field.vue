<script setup lang="ts">
import type { ATimeRangeFieldRootProps } from '..';
import type { TimeValue } from '../../shared/date';
import { ATimeRangeFieldInput, ATimeRangeFieldRoot } from '..';
import { ALabel } from '../../label';

const props = defineProps<{ timeRangeFieldProps?: ATimeRangeFieldRootProps; emits?: { 'onUpdate:modelValue'?: (data: TimeValue) => void } }>();
</script>

<template>
  <ALabel
    for="time-field"
    data-testid="label"
  >
    Label
  </ALabel>
  <ATimeRangeFieldRoot
    v-bind="props.timeRangeFieldProps"
    id="time-range-field"
    v-slot="{ segments, modelValue }"
    data-testid="input"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <ATimeRangeFieldInput
      v-for="(item, index) in segments.start"
      :key="`${item.part}-${index}`"
      :part="item.part"
      :data-testid="item.part === 'literal' ? undefined : `start-${item.part}`"
      type="start"
    >
      {{ item.value }}
    </ATimeRangeFieldInput>
    <ATimeRangeFieldInput
      v-for="(item, index) in segments.end"
      :key="`${item.part}-${index}`"
      :part="item.part"
      :data-testid="item.part === 'literal' ? undefined : `end-${item.part}`"
      type="end"
    >
      {{ item.value }}
    </ATimeRangeFieldInput>

    <span
      data-testid="value"
      tabindex="-1"
    >{{ modelValue }}</span>
  </ATimeRangeFieldRoot>
</template>
