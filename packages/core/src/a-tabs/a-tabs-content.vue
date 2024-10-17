<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';
import type { StringOrNumber } from '~~/shared';

export interface ATabsContentProps extends APrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
  /** A unique value that associates the content with a trigger. */
  value: StringOrNumber;
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { APresence } from '~~/a-presence';
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectATabsRootContext } from './a-tabs-root.vue';
import { makeContentId, makeTriggerId } from './utils';

const props = defineProps<ATabsContentProps>();

const { forwardRef } = useForwardExpose();
const rootContext = injectATabsRootContext();

const triggerId = computed(() => makeTriggerId({ baseId: rootContext.baseId, value: props.value }));
const contentId = computed(() => makeContentId({ baseId: rootContext.baseId, value: props.value }));

const isSelected = computed(() => props.value === rootContext.modelValue.value);

const isMountAnimationPreventedRef = ref(isSelected.value);

onMounted(() => {
  requestAnimationFrame(() => {
    isMountAnimationPreventedRef.value = false;
  });
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
