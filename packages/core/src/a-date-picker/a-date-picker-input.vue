<script lang="ts">
import type { ADateFieldInputProps } from '~~/a-date-field';

export interface ADatePickerInputProps extends ADateFieldInputProps {}
</script>

<script setup lang="ts">
import { ADateFieldInput } from '~~/a-date-field';

const props = defineProps<ADatePickerInputProps>();
</script>

<template>
  <ADateFieldInput v-bind="props">
    <slot />
  </ADateFieldInput>
</template>
