<script lang="ts">
import type { APrimitiveProps } from '../primitive';
import { useForwardExpose } from '../shared';

export interface ATabsListProps extends APrimitiveProps {
  /** When `true`, keyboard navigation will loop from last tab to first, and vice versa. */
  loop?: boolean;
}
</script>

<script setup lang="ts">
import { toRefs } from 'vue';
import { APrimitive } from '../primitive';
import { ARovingFocusGroup } from '../roving-focus';
import { injectATabsRootContext } from './tabs-root.vue';

const props = withDefaults(defineProps<ATabsListProps>(), {
  loop: true,
});
const { loop } = toRefs(props);

const { forwardRef, currentElement } = useForwardExpose();
const context = injectATabsRootContext();

context.tabsList = currentElement;
</script>

<template>
  <ARovingFocusGroup
    as-child
    :orientation="context.orientation.value"
    :dir="context.dir.value"
    :loop="loop"
  >
    <APrimitive
      :ref="forwardRef"
      role="tablist"
      :as-child="asChild"
      :as="as"
      :aria-orientation="context.orientation.value"
    >
      <slot />
    </APrimitive>
  </ARovingFocusGroup>
</template>
