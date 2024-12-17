<script lang="ts">
import { ADateRangeFieldInput, type ADateRangeFieldInputProps } from '..';

export interface ADateRangePickerInputProps extends ADateRangeFieldInputProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADateRangePickerInputProps>();
</script>

<template>
  <ADateRangeFieldInput v-bind="props">
    <slot />
  </ADateRangeFieldInput>
</template>
