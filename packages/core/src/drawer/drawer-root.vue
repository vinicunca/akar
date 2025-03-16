<script setup lang="ts">
import type { WritableComputedRef } from 'vue';
import type { ADrawerRootEmits, ADrawerRootProps } from './drawer.controls';
import { useVModel } from '@vueuse/core';
import { computed, toRefs } from 'vue';
import { ADialogRoot } from '~~/dialog';
import { CLOSE_THRESHOLD, SCROLL_LOCK_TIMEOUT, TRANSITIONS } from './drawer.constants';
import { provideADrawerRootContext } from './drawer.context.ts';
import { useDrawer } from './drawer.controls';

const props = withDefaults(
  defineProps<ADrawerRootProps>(),
  {
    open: undefined,
    defaultOpen: undefined,
    fixed: undefined,
    dismissible: true,
    activeSnapPoint: undefined,
    snapPoints: undefined,
    shouldScaleBackground: undefined,
    setBackgroundColorOnScale: true,
    closeThreshold: CLOSE_THRESHOLD,
    fadeFromIndex: undefined,
    nested: false,
    modal: true,
    scrollLockTimeout: SCROLL_LOCK_TIMEOUT,
    direction: 'bottom',
    handleOnly: false,
  },
);

const emits = defineEmits<ADrawerRootEmits>();

defineSlots<{
  default: (props: {
    open: typeof isOpen.value;
  }) => any;
}>();

const fadeFromIndex = computed(() =>
  props.fadeFromIndex ?? (props.snapPoints && props.snapPoints.length - 1),
);

const openModel = useVModel(
  props,
  'open',
  emits,
  {
    defaultValue: props.defaultOpen,
    passive: (props.open === undefined) as false,
  },
) as WritableComputedRef<boolean>;

const activeSnapPointModel = useVModel(
  props,
  'activeSnapPoint',
  emits,
  {
    passive: (props.activeSnapPoint === undefined) as false,
  },
);

const emitHandlers = {
  emitDrag: (percentageDragged: number) => emits('drag', percentageDragged),
  emitRelease: (isOpen_: boolean) => emits('release', isOpen_),
  emitClose: () => emits('close'),
  emitOpenChange: (isOpen_: boolean) => {
    emits('update:open', isOpen_);

    setTimeout(() => {
      emits('animationEnd', isOpen_);
    }, TRANSITIONS.DURATION * 1000);
  },
};

const { closeDrawer, hasBeenOpened, modal, isOpen } = provideADrawerRootContext(
  useDrawer({
    ...emitHandlers,
    ...toRefs(props),
    activeSnapPoint: activeSnapPointModel,
    fadeFromIndex,
    open: openModel,
  }),
);

function handleOpenChange(isOpen_: boolean) {
  if (openModel.value !== undefined) {
    emitHandlers.emitOpenChange(isOpen_);
    return;
  }
  isOpen.value = isOpen_;

  if (isOpen_) {
    hasBeenOpened.value = true;
  } else {
    closeDrawer();
  }
}

defineExpose({
  isOpen,
});
</script>

<template>
  <ADialogRoot
    :open="isOpen"
    :modal="modal"
    @update:open="handleOpenChange"
  >
    <slot :open="isOpen" />
  </ADialogRoot>
</template>
