<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import type { StringOrNumber } from '../shared/types';
import { useForwardExpose } from '../shared';

export interface ATabsContentProps extends APrimitiveProps {
  /** A unique value that associates the content with a trigger. */
  value: StringOrNumber;
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { APresence } from '../presence';
import { APrimitive } from '../primitive';
import { injectATabsRootContext } from './tabs-root.vue';
import { makeContentId, makeTriggerId } from './utils';

const props = defineProps<ATabsContentProps>();

const { forwardRef } = useForwardExpose();
const rootContext = injectATabsRootContext();
const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
const contentId = computed(() => makeContentId(rootContext.baseId, props.value));

const isSelected = computed(() => props.value === rootContext.modelValue.value);

const isMountAnimationPreventedRef = ref(isSelected.value);

onMounted(() => {
  rootContext.registerContent(props.value);

  requestAnimationFrame(() => {
    isMountAnimationPreventedRef.value = false;
  });
});

onBeforeUnmount(() => {
  rootContext.unregisterContent(props.value);
});
</script>

<template>
  <APresence
    v-slot="{ present }"
    :present="forceMount || isSelected"
    force-mount
  >
    <APrimitive
      :id="contentId"
      :ref="forwardRef"
      :as-child="asChild"
      :as="as"
      role="tabpanel"
      :data-state="isSelected ? 'active' : 'inactive'"
      :data-orientation="rootContext.orientation.value"
      :aria-labelledby="triggerId"
      :hidden="!present"
      tabindex="0"
      :style="{
        animationDuration: isMountAnimationPreventedRef ? '0s' : undefined,
      }"
    >
      <slot v-if="rootContext.unmountOnHide.value ? present : true" />
    </APrimitive>
  </APresence>
</template>
