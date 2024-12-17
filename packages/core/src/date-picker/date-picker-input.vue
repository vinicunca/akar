<script lang="ts">
import { ADateFieldInput, type ADateFieldInputProps } from '..';

export interface ADatePickerInputProps extends ADateFieldInputProps {}
</script>

<script setup lang="ts">
const props = defineProps<ADatePickerInputProps>();
</script>

<template>
  <ADateFieldInput v-bind="props">
    <slot />
  </ADateFieldInput>
</template>
