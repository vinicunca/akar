<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

import { useForwardExpose } from '~~/shared';

import type { Measurable } from './a-popper-root.vue';

export interface APopperAnchorProps extends APrimitiveProps {
  element?: Measurable;
}
</script>

<script setup lang="ts">
import { watch } from 'vue';

import {
  APrimitive,
} from '~~/a-primitive';

import { injectPopperRootContext } from './a-popper-root.vue';

const props = defineProps<APopperAnchorProps>();

const { currentElement, forwardRef } = useForwardExpose();

const rootContext = injectPopperRootContext();

watch(currentElement, () => {
  rootContext.onAnchorChange(props.element ?? currentElement.value);
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
