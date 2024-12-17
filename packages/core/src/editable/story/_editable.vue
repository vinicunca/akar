<script lang="ts" setup>
import type { AEditableRootProps } from '..'
import { AEditableArea, AEditableCancelTrigger, AEditableEditTrigger, AEditableInput, AEditablePreview, AEditableRoot, AEditableSubmitTrigger } from '..'

const props = defineProps<{ editableProps?: AEditableRootProps, emits?: { 'onUpdate:modelValue'?: (data: string) => void } }>()
</script>

<template>
  <AEditableRoot
    data-testid="root"
    v-bind="props.editableProps"
    v-on="{ 'update:modelValue': props.emits?.['onUpdate:modelValue'] }"
  >
    <AEditableArea data-testid="area">
      <AEditablePreview data-testid="preview" />
      <AEditableInput data-testid="input" />
    </AEditableArea>
    <AEditableEditTrigger data-testid="edit" />
    <AEditableSubmitTrigger data-testid="submit" />
    <AEditableCancelTrigger data-testid="cancel" />
  </AEditableRoot>
</template>
