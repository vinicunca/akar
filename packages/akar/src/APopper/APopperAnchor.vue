<script lang="ts">
import type { APrimitiveProps } from '~~/APrimitive';

import { useForwardExpose } from '~~/shared';

import type { Measurable } from './APopperRoot.vue';

export interface APopperAnchorProps extends APrimitiveProps {
  element?: Measurable;
}
</script>

<script setup lang="ts">
import { watch } from 'vue';

import {
  APrimitive,
} from '~~/APrimitive';

import { injectPopperRootContext } from './APopperRoot.vue';

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
