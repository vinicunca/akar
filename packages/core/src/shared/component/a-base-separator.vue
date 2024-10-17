<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

import type { DataOrientation } from '../types';

export interface ABaseSeparatorProps extends APrimitiveProps {
  /**
   * Whether or not the component is purely decorative. <br>When `true`, accessibility-related attributes
   * are updated so that that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean;
  /**
   * Orientation of the component.
   *
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: DataOrientation;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from '~~/a-primitive';

const props = withDefaults(
  defineProps<BaseSeparatorProps>(),
  {
    orientation: 'horizontal',
  },
);

const ORIENTATIONS = ['horizontal', 'vertical'] as const;

function isValidOrientation(orientation: any): orientation is DataOrientation {
  return ORIENTATIONS.includes(orientation);
}

const computedOrientation = computed(() =>
  isValidOrientation(props.orientation) ? props.orientation : 'horizontal',
);

// `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
const ariaOrientation = computed(() =>
  computedOrientation.value === 'vertical' ? props.orientation : undefined,
);

const semanticProps = computed(() =>
  props.decorative
    ? { role: 'none' }
    : { 'aria-orientation': ariaOrientation.value, 'role': 'separator' },
);
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    :data-orientation="computedOrientation"
    v-bind="semanticProps"
  >
    <slot />
  </APrimitive>
</template>
