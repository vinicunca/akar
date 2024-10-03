<script setup lang="ts">
import { useForwardPropsEmits } from '~~/shared';

import AMenuContentImpl, { type AMenuContentImplEmits, type AMenuRootContentTypeProps } from './a-menu-content-impl.vue';
import { injectAMenuContext } from './a-menu-root.vue';

const props = defineProps<AMenuRootContentNonModalProps>();
const emits = defineEmits<AMenuRootContentModalEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const menuContext = injectAMenuContext();

interface AMenuRootContentNonModalProps extends AMenuRootContentTypeProps {}
type AMenuRootContentModalEmits = AMenuContentImplEmits;
</script>

<template>
  <AMenuContentImpl
    v-bind="forwarded"
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    :disable-outside-scroll="false"
    @dismiss="menuContext.onOpenChange(false)"
  >
    <slot />
  </AMenuContentImpl>
</template>
