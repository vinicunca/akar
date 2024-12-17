<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { computed } from 'vue';
import { injectAEditableRootContext } from './editable-root.vue';

export interface AEditablePreviewProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

const props = withDefaults(defineProps<AEditablePreviewProps>(), { as: 'span' });

const context = injectAEditableRootContext();

const placeholder = computed(() => context.placeholder.value?.preview);

function handleFocus() {
  if (context.activationMode.value === 'focus') {
    context.edit();
  }
}
function handleDoubleClick() {
  if (context.activationMode.value === 'dblclick') {
    context.edit();
  }
}
</script>

<template>
  <APrimitive
    v-bind="props"
    tabindex="0"
    :data-placeholder-shown="context.isEditing.value ? undefined : ''"
    :hidden="context.autoResize.value ? undefined : context.isEditing.value"
    :style="context.autoResize.value ? {
      whiteSpace: 'pre',
      userSelect: 'none',
      gridArea: '1 / 1 / auto / auto',
      visibility: context.isEditing.value ? 'hidden' : undefined,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    } : undefined"
    @focusin="handleFocus"
    @dblclick="handleDoubleClick"
  >
    <slot>
      {{ context.modelValue.value || placeholder }}
    </slot>
  </APrimitive>
</template>
