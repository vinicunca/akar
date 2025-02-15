<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

export interface ANavigationMenuListProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { onMounted } from 'vue';
import { APrimitive } from '~~/primitive';
import { injectANavigationMenuContext } from './navigation-menu-root.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<ANavigationMenuListProps>(),
  {
    as: 'ul',
  },
);

const menuContext = injectANavigationMenuContext();
const { forwardRef, currentElement } = useForwardExpose();

onMounted(() => {
  menuContext.onIndicatorTrackChange(currentElement.value);
});
</script>

<template>
  <APrimitive
    :ref="forwardRef"
    style="position: relative"
  >
    <APrimitive
      v-bind="$attrs"
      :as-child="props.asChild"
      :as="as"
      :data-orientation="menuContext.orientation"
    >
      <slot />
    </APrimitive>
  </APrimitive>
</template>
