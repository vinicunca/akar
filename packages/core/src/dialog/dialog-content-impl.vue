<script lang="ts">
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
} from '~~/dismissable-layer';

export type DialogContentImplEmits = DismissableLayerEmits & {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: Event];
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event];
};

export interface DialogContentImplProps extends DismissableLayerProps {
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
import { DismissableLayer } from '~~/dismissable-layer';
import { AFocusScope } from '~~/focus-scope';
import { getOpenState } from '~~/menu/utils';
import { getActiveElement, useForwardExpose, useId } from '~~/shared';
import { injectDialogRootContext } from './dialog-root.vue';
import { useWarning } from './utils';

const props = defineProps<DialogContentImplProps>();
const emits = defineEmits<DialogContentImplEmits>();

const rootContext = injectDialogRootContext();
const { forwardRef, currentElement: contentElement } = useForwardExpose();

rootContext.titleId ||= useId(undefined, 'akar-dialog-title');
rootContext.descriptionId ||= useId(undefined, 'akar-dialog-description');

onMounted(() => {
  rootContext.contentElement = contentElement;

  // Preserve the `ADialogTrigger` element in case it was triggered programmatically
  if (getActiveElement() !== document.body) {
    rootContext.triggerElement.value = getActiveElement() as HTMLElement;
  }
});

if (process.env.NODE_ENV !== 'production') {
  useWarning({
    titleName: 'ADialogTitle',
    contentName: 'ADialogContent',
    componentLink: 'dialog.html#title',
    titleId: rootContext.titleId,
    descriptionId: rootContext.descriptionId,
    contentElement,
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
    <DismissableLayer
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
    </DismissableLayer>
  </AFocusScope>
</template>
