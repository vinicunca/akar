<script lang="ts">
import type { ReferenceElement } from '@floating-ui/vue';
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface APopperAnchorProps extends APrimitiveProps {
  /**
   *  The reference (or anchor) element that is being referred to for positioning.
   *
   *  If not provided will use the current component as anchor.
   */
  reference?: ReferenceElement;
}
</script>

<script setup lang="ts">
import { watchPostEffect } from 'vue';
import {
  APrimitive,
} from '~~/primitive';
import { injectAPopperRootContext } from './popper-root.vue';

const props = defineProps<APopperAnchorProps>();

const { forwardRef, currentElement } = useForwardExpose();

const rootContext = injectAPopperRootContext();

watchPostEffect(() => {
  rootContext.onAnchorChange(props.reference ?? currentElement.value);
});
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </APrimitive>
</template>
