<script lang="ts">
import type { Ref } from 'vue';

import type { ADismissableLayerEmits, ADismissableLayerProps } from '~~/a-dismissable-layer';
import type { APopperContentProps } from '~~/a-popper';

import { createContext } from '~~/shared';

export type AComboboxContentImplEmits = ADismissableLayerEmits;

export interface AComboboxContentImplProps extends APopperContentProps, ADismissableLayerProps {
  /** The document.body will be lock, and scrolling will be disabled. */
  bodyLock?: boolean;
  /**
   * Allow component to be dismissableLayer.
   * @deprecated (Will be removed in version 2.0, use `AListbox` instead)
   */
  dismissable?: boolean;
  /**
   * The positioning mode to use, <br>
   * `inline` is the default and you can control the position using CSS. <br>
   * `popper` positions content in the same way as our other primitives, for example `Popover` or `DropdownMenu`.
   */
  position?: 'inline' | 'popper';
}

export const [
  injectAComboboxContentContext,
  provideAComboboxContentContext,
] = createContext<{
  position: Ref<'inline' | 'popper'>;
}>('AComboboxContent');
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

import { ADismissableLayer } from '~~/a-dismissable-layer';
import { AListboxContent } from '~~/a-listbox';
import { APopperContent } from '~~/a-popper';
import { APrimitive } from '~~/a-primitive';
import {
  useBodyScrollLock,
  useForwardExpose,
  useForwardProps,
  useHideOthers,
} from '~~/shared';

import { injectAComboboxRootContext } from './a-combobox-root.vue';

const props = withDefaults(
  defineProps<AComboboxContentImplProps>(),
  {
    position: 'inline',
    dismissable: true,
  },
);

const emits = defineEmits<AComboboxContentImplEmits>();

const { position } = toRefs(props);
const rootContext = injectAComboboxRootContext();

const { forwardRef } = useForwardExpose();

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

provideAComboboxContentContext({ position });
</script>

<template>
  <AListboxContent as-child>
    <ADismissableLayer
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @dismiss="rootContext.onOpenChange(false)"
      @focus-outside="(ev) => {
        // if clicking inside the combobox, prevent dismiss
        if (rootContext.parentElement.value?.contains(ev.target as Node)) ev.preventDefault()
        emits('focusOutside', ev)
      }"
      @interact-outside="emits('interactOutside', $event)"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @pointer-down-outside="(ev) => {
        // if clicking inside the combobox, prevent dismiss
        if (rootContext.parentElement.value?.contains(ev.target as Node)) ev.preventDefault()
        emits('pointerDownOutside', ev)
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
    </ADismissableLayer>
  </AListboxContent>
</template>
