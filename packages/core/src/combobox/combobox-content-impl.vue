<script lang="ts">
import type { Ref } from 'vue';
import type { DismissableLayerEmits, DismissableLayerProps } from '~~/dismissable-layer';
import type { APopperContentProps } from '~~/popper';

import { createContext, useForwardExpose, useForwardProps, useHideOthers } from '~~/shared';
import { useBodyScrollLock } from '~~/shared/use-body-scroll-lock';

export type ComboboxContentImplEmits = DismissableLayerEmits;

export interface ComboboxContentImplProps extends APopperContentProps, DismissableLayerProps {
  /**
   * The positioning mode to use, <br>
   * `inline` is the default and you can control the position using CSS. <br>
   * `popper` positions content in the same way as our other primitives, for example `Popover` or `DropdownMenu`.
   */
  position?: 'inline' | 'popper';
  /** The document.body will be lock, and scrolling will be disabled. */
  bodyLock?: boolean;
}

export const [
  injectComboboxContentContext,
  provideComboboxContentContext,
] = createContext<{
  position: Ref<'inline' | 'popper'>;
}>('AComboboxContent');
</script>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs } from 'vue';
import { DismissableLayer } from '~~/dismissable-layer';
import { AListboxContent } from '~~/listbox';
import { APopperContent } from '~~/popper';
import { APrimitive } from '~~/primitive';
import { injectAComboboxRootContext } from './combobox-root.vue';

const props = withDefaults(defineProps<ComboboxContentImplProps>(), {
  position: 'inline',
});
const emits = defineEmits<ComboboxContentImplEmits>();

const { position } = toRefs(props);
const rootContext = injectAComboboxRootContext();

const { forwardRef, currentElement } = useForwardExpose();
useBodyScrollLock(props.bodyLock);
useHideOthers(rootContext.parentElement);

const pickedProps = computed(() => {
  if (props.position === 'popper') {
    return props;
  } else {
    return {};
  }
});

const forwardedProps = useForwardProps(pickedProps.value);

const popperStyle = {
  // Ensure border-box for floating-ui calculations
  'boxSizing': 'border-box',
  '--akar-combobox-content-transform-origin':
        'var(--akar-popper-transform-origin)',
  '--akar-combobox-content-available-width':
        'var(--akar-popper-available-width)',
  '--akar-combobox-content-available-height':
        'var(--akar-popper-available-height)',
  '--akar-combobox-trigger-width': 'var(--akar-popper-anchor-width)',
  '--akar-combobox-trigger-height': 'var(--akar-popper-anchor-height)',
};

provideComboboxContentContext({ position });

// Handle case where input position within the content
const isInputWithinContent = ref(false);
onMounted(() => {
  if (rootContext.inputElement.value) {
    isInputWithinContent.value = currentElement.value.contains(rootContext.inputElement.value);
    if (isInputWithinContent.value) {
      rootContext.inputElement.value.focus();
    }
  }
});

onUnmounted(() => {
  if (isInputWithinContent.value) {
    rootContext.triggerElement.value?.focus();
  }
});
</script>

<template>
  <AListboxContent as-child>
    <DismissableLayer
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @dismiss="rootContext.onOpenChange(false)"
      @focus-outside="(event) => {
        // if clicking inside the combobox, prevent dismiss
        if (rootContext.parentElement.value?.contains(event.target as Node)) event.preventDefault()
        emits('focusOutside', event)
      }"
      @interact-outside="emits('interactOutside', $event)"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @pointer-down-outside="(event) => {
        // if clicking inside the combobox, prevent dismiss
        if (rootContext.parentElement.value?.contains(event.target as Node)) event.preventDefault()
        emits('pointerDownOutside', event)
      }"
    >
      <component
        :is="position === 'popper' ? APopperContent : APrimitive"
        v-bind="{ ...$attrs, ...forwardedProps }"
        :id="rootContext.contentId"
        :ref="forwardRef"
        :data-state="rootContext.open.value ? 'open' : 'closed'"
        :style="{
          // flex layout so we can place the scroll buttons properly
          display: 'flex',
          flexDirection: 'column',
          // reset the outline by default as the content MAY get focused
          outline: 'none',
          ...(position === 'popper' ? popperStyle : {}),
        }"
      >
        <slot />
      </component>
    </DismissableLayer>
  </AListboxContent>
</template>
