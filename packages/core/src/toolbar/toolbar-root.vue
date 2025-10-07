<script lang="ts">
import type { Ref } from 'vue';
import type { APrimitiveProps } from '~~/primitive';
import type { DataOrientation, Direction } from '~~/shared/types';
import { createContext } from '~~/shared';

export interface AToolbarRootProps extends APrimitiveProps {
  /** The orientation of the toolbar */
  orientation?: DataOrientation;
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction;
  /** When `true`, keyboard navigation will loop from last tab to first, and vice versa. */
  loop?: boolean;
}

export interface AToolbarRootContext {
  orientation: Ref<DataOrientation>;
  dir: Ref<Direction>;
}

export const [
  injectAToolbarRootContext,
  provideAToolbarRootContext,
] = createContext<AToolbarRootContext>('AToolbarRoot');
</script>

<script setup lang="ts">
import { toRefs } from 'vue';
import { APrimitive } from '~~/primitive';
import { ARovingFocusGroup } from '~~/roving-focus';
import { useDirection, useForwardExpose } from '~~/shared';

const props = withDefaults(
  defineProps<AToolbarRootProps>(),
  {
    orientation: 'horizontal',
  },
);
const { orientation, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
const { forwardRef } = useForwardExpose();

provideAToolbarRootContext({ orientation, dir });
</script>

<template>
  <ARovingFocusGroup
    as-child
    :orientation="orientation"
    :dir="dir"
    :loop="loop"
  >
    <APrimitive
      :ref="forwardRef"
      role="toolbar"
      :aria-orientation="orientation"
      :as-child="asChild"
      :as="as"
    >
      <slot />
    </APrimitive>
  </ARovingFocusGroup>
</template>
