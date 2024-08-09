<script lang="ts">
import type {
  ADismissableLayerEmits,
  ADismissableLayerProps,
} from '~~/ADismissableLayer';

import { useForwardExpose, useId } from '~~/shared';

export type ADialogContentImplEmits = {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event];
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: Event];
} & ADismissableLayerEmits;

export interface ADialogContentImplProps extends ADismissableLayerProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling transntion with Vue native transition or other animation libraries.
   */
  forceMount?: boolean;
  /**
   * When `true`, focus cannot escape the `Content` via keyboard,
   * pointer, or a programmatic focus.
   * @defaultValue false
   */
  trapFocus?: boolean;
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue';

import { ADismissableLayer } from '~~/ADismissableLayer';
import { AFocusScope } from '~~/AFocusScope';

import { injectADialogRootContext } from './ADialogRoot.vue';
import { getOpenState, useWarning } from './utils';

const props = defineProps<ADialogContentImplProps>();
const emits = defineEmits<ADialogContentImplEmits>();

const rootContext = injectADialogRootContext();
const { currentElement: contentElement, forwardRef } = useForwardExpose();

rootContext.titleId ||= useId(undefined, 'akar-dialog-title');
rootContext.descriptionId ||= useId(undefined, 'akar-dialog-description');

onMounted(() => {
  rootContext.contentElement = contentElement;

  // Preserve the `ADialogTrigger` element in case it was triggered programmatically
  if (document.activeElement !== document.body) {
    rootContext.triggerElement.value = document.activeElement as HTMLElement;
  }
});

if (process.env.NODE_ENV !== 'production') {
  useWarning({
    componentLink: 'dialog.html#title',
    contentElement: rootContext.contentElement,
    contentName: 'ADialogContent',
    descriptionId: rootContext.descriptionId,
    titleId: rootContext.titleId,
    titleName: 'ADialogTitle',
  });
}
</script>

<template>
  <AFocusScope
    as-child
    loop
    :trapped="props.trapFocus"
    @mount-auto-focus="emits('openAutoFocus', $event)"
    @unmount-auto-focus="emits('closeAutoFocus', $event)"
  >
    <ADismissableLayer
      :id="rootContext.contentId"
      :ref="forwardRef"
      :as="as"
      :as-child="asChild"
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      role="dialog"
      :aria-describedby="rootContext.descriptionId"
      :aria-labelledby="rootContext.titleId"
      :data-state="getOpenState(rootContext.open.value)"
      v-bind="$attrs"
      @dismiss="rootContext.onOpenChange(false)"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @focus-outside="emits('focusOutside', $event)"
      @interact-outside="emits('interactOutside', $event)"
      @pointer-down-outside="emits('pointerDownOutside', $event)"
    >
      <slot />
    </ADismissableLayer>
  </AFocusScope>
</template>
