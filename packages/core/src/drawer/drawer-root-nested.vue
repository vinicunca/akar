<script setup lang="ts">
import type { ADrawerRootEmits, ADrawerRootProps } from './drawer.controls';
import { useForwardPropsEmits } from '~~/shared';
import ADrawerRoot from './drawer-root.vue';
import { injectADrawerRootContext } from './drawer.context';

const props = defineProps<ADrawerRootProps>();
const emits = defineEmits<ADrawerRootEmits>();

const {
  onNestedDrag,
  onNestedOpenChange,
  onNestedRelease,
} = injectADrawerRootContext();

function onClose() {
  onNestedOpenChange(false);
}

function onDrag(percent: number) {
  onNestedDrag(percent);
}

function onOpenChange(isOpen: boolean) {
  if (isOpen) {
    onNestedOpenChange(isOpen);
  }

  emits('update:open', isOpen);
}

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ADrawerRoot
    v-bind="forwarded"
    nested
    @close="onClose"
    @drag="onDrag"
    @release="onNestedRelease"
    @update:open="onOpenChange"
  >
    <slot />
  </ADrawerRoot>
</template>
