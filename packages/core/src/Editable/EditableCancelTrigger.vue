<script lang="ts">
import type { PrimitiveProps } from '@/Primitive';

export interface EditableCancelTriggerProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@/Primitive';
import { disabledAttr } from '@/shared';
import { injectEditableRootContext } from './EditableRoot.vue';

const props = withDefaults(defineProps<EditableCancelTriggerProps>(), { as: 'button' });

const context = injectEditableRootContext();

const disabled = computed(() => context.disabled.value || context.isSubmitting.value);
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="cancel"
    :aria-disabled="disabled ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabledAttr(disabled, props.as, props.asChild)"
    :type="as === 'button' ? 'button' : undefined"
    :hidden="context.isEditing.value ? undefined : ''"
    @click="context.cancel"
  >
    <slot>Cancel</slot>
  </Primitive>
</template>
