<script lang="ts">
import type { ADialogCloseProps } from '../dialog';

export interface AAlertDialogCancelProps extends ADialogCloseProps {}
</script>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ADialogClose } from '../dialog';
import { useForwardExpose } from '../shared';
import { injectAAlertDialogContentContext } from './alert-dialog-content.vue';

const props = withDefaults(
  defineProps<AAlertDialogCancelProps>(),
  { as: 'button' },
);

const contentContext = injectAAlertDialogContentContext();
const { forwardRef, currentElement } = useForwardExpose();

onMounted(() => {
  contentContext.onCancelElementChange(currentElement.value);
});
</script>

<template>
  <ADialogClose
    v-bind="props"
    :ref="forwardRef"
  >
    <slot />
  </ADialogClose>
</template>
