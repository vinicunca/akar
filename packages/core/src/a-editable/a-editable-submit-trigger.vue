<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AEditableSubmitTriggerProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

import { injectAEditableRootContext } from './a-editable-root.vue';

const props = withDefaults(
  defineProps<AEditableSubmitTriggerProps>(),
  { as: 'button' },
);

const context = injectAEditableRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    aria-label="submit"
    :aria-disabled="context.disabled.value ? '' : undefined"
    :data-disabled="context.disabled.value ? '' : undefined"
    :disabled="context.disabled.value"
    :type="as === 'button' ? 'button' : undefined"
    :hidden="context.isEditing.value ? undefined : ''"
    @click="context.submit"
  >
    <slot>Submit</slot>
  </APrimitive>
</template>
