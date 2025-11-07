<script setup lang="ts">
import type { MenuContentImplEmits, MenuRootContentTypeProps } from './menu-content-impl.vue';
import { useForwardPropsEmits } from '../shared';
import MenuContentImpl from './menu-content-impl.vue';
import { injectAMenuContext } from './menu-root.vue';

const props = defineProps<MenuRootContentNonModalProps>();
const emits = defineEmits<MenuRootContentModalEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const menuContext = injectAMenuContext();

interface MenuRootContentNonModalProps extends MenuRootContentTypeProps {}
type MenuRootContentModalEmits = MenuContentImplEmits;
</script>

<template>
  <MenuContentImpl
    v-bind="forwarded"
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    :disable-outside-scroll="false"
    @dismiss="menuContext.onOpenChange(false)"
  >
    <slot />
  </MenuContentImpl>
</template>
