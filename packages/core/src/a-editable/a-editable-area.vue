<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AEditableAreaProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

import { injectAEditableRootContext } from './a-editable-root.vue';

const props = withDefaults(
  defineProps<AEditableAreaProps>(),
  { as: 'div' },
);

const context = injectAEditableRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    :data-placeholder-shown="context.isEditing.value ? undefined : ''"
    :data-focus="context.isEditing.value ? '' : undefined"
    :data-focused="context.isEditing.value ? '' : undefined"
    :data-empty="context.isEmpty.value ? '' : undefined"
    :data-readonly="context.readonly.value ? '' : undefined"
    :data-disabled="context.disabled.value ? '' : undefined"
    :style="context.autoResize.value ? { display: 'inline-grid' } : undefined"
  >
    <slot />
  </APrimitive>
</template>
