<script lang="ts">
import type {
  ADialogContentEmits,
  ADialogContentProps,
} from '~~/dialog';
import { createContext } from '~~/shared';

interface AlertDialogContentContext {
  onCancelElementChange: (el: HTMLElement | undefined) => void;
}

export const [
  injectAAlertDialogContentContext,
  provideAAlertDialogContentContext,
] = createContext<AlertDialogContentContext>('AlertDialogContent');

export type AAlertDialogContentEmits = ADialogContentEmits;
export interface AAlertDialogContentProps extends ADialogContentProps {}
</script>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { ADialogContent } from '~~/dialog';
import { useEmitAsProps, useForwardExpose } from '~~/shared';

const props = defineProps<AAlertDialogContentProps>();
const emits = defineEmits<AAlertDialogContentEmits>();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();

const cancelElement = ref<HTMLElement | undefined>();

provideAAlertDialogContentContext({
  onCancelElementChange: (el) => {
    cancelElement.value = el;
  },
});
</script>

<template>
  <ADialogContent
    v-bind="{ ...props, ...emitsAsProps }"
    role="alertdialog"
    @pointer-down-outside.prevent
    @interact-outside.prevent
    @open-auto-focus="
      () => {
        nextTick(() => {
          cancelElement?.focus({
            preventScroll: true,
          });
        });
      }
    "
  >
    <slot />
  </ADialogContent>
</template>
