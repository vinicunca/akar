<script setup lang="ts">
import type { DateValue } from '@internationalized/date';

import { ALabel } from '~~/a-label';

import type { ADateFieldRootProps } from '..';

import { ADateFieldInput, ADateFieldRoot } from '..';

const props = defineProps<{ dateFieldProps?: ADateFieldRootProps; emits?: { 'onUpdate:modelValue'?: (data: DateValue) => void } }>();
</script>

<template>
  <ALabel
    for="date-field"
    data-testid="label"
  >
    ALabel
  </ALabel>
  <ADateFieldRoot
    v-bind="props.dateFieldProps"
    id="date-field"
    v-slot="{ segments, modelValue }"
    data-testid="input"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <ADateFieldInput
      v-for="item in segments"
      :key="item.part"
      :part="item.part"
      :data-testid="item.part === 'literal' ? undefined : item.part"
    >
      {{ item.value }}
    </ADateFieldInput>

    <span
      data-testid="value"
      tabindex="-1"
      disabled
    >{{ modelValue }}</span>
  </ADateFieldRoot>
</template>
