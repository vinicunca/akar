<script lang="ts">
import type { PrimitiveProps } from '@/Primitive';

export interface EditableSubmitTriggerProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@/Primitive';
import { disabledAttr } from '@/shared';
import { injectEditableRootContext } from './EditableRoot.vue';

const props = withDefaults(defineProps<EditableSubmitTriggerProps>(), { as: 'button' });

const context = injectEditableRootContext();

const disabled = computed(() => context.disabled.value || context.isSubmitting.value);
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="submit"
    :aria-disabled="disabled ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabledAttr(disabled, props.as, props.asChild)"
    :type="as === 'button' ? 'button' : undefined"
    :hidden="context.isEditing.value ? undefined : ''"
    @click="context.submit"
  >
    <slot>Submit</slot>
  </Primitive>
</template>
