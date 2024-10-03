<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits, useHideOthers } from '~~/shared';

import AMenuContentImpl, { type AMenuContentImplEmits, type AMenuRootContentTypeProps } from './a-menu-content-impl.vue';
import { injectAMenuContext } from './a-menu-root.vue';

const props = defineProps<AMenuRootContentModalProps>();
const emits = defineEmits<AMenuRootContentModalEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const menuContext = injectAMenuContext();

interface AMenuRootContentModalProps extends AMenuRootContentTypeProps {}
type AMenuRootContentModalEmits = AMenuContentImplEmits;

const { forwardRef, currentElement } = useForwardExpose();
useHideOthers(currentElement);
</script>

<template>
  <AMenuContentImpl
    v-bind="forwarded"
    :ref="forwardRef"
    :trap-focus="menuContext.open.value"
    :disable-outside-pointer-events="menuContext.open.value"
    :disable-outside-scroll="true"
    @dismiss="menuContext.onOpenChange(false)"
    @focus-outside.prevent="emits('focusOutside', $event)"
  >
    <slot />
  </AMenuContentImpl>
</template>
