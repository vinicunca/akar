<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface AEditableEditTriggerProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';
import { injectAEditableRootContext } from './editable-root.vue';

const props = withDefaults(defineProps<AEditableEditTriggerProps>(), { as: 'button' });

const context = injectAEditableRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-label="edit"
    :aria-disabled="context.disabled.value ? '' : undefined"
    :data-disabled="context.disabled.value ? '' : undefined"
    :disabled="context.disabled.value"
    :type="as === 'button' ? 'button' : undefined"
    :hidden="context.isEditing.value ? '' : undefined"
    @click="context.edit"
  >
    <slot>Edit</slot>
  </APrimitive>
</template>
