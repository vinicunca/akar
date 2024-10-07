<script lang="ts">
import { useMounted } from '@vueuse/core';

import type { APrimitiveProps } from '~~/a-primitive';

export interface ASliderThumbImplProps extends APrimitiveProps {
  index: number;
}
</script>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue';

import { APrimitive } from '~~/a-primitive';
import { useCollection } from '~~/collection';
import { useForwardExpose, useSize } from '~~/shared';

import { injectASliderRootContext } from './a-slider-root.vue';
import { convertValueToPercentage, getLabel, getThumbInBoundsOffset, injectASliderOrientationContext } from './utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ASliderThumbImplProps>();

const rootContext = injectASliderRootContext();
const orientationContext = injectASliderOrientationContext();

const { ACollectionItem } = useCollection();
const { forwardRef, currentElement: thumbElement } = useForwardExpose();

const value = computed(() =>
  rootContext.modelValue?.value?.[props.index],
);

const label = computed(() =>
  getLabel({
    index: props.index,
    totalValues: rootContext.modelValue?.value?.length ?? 0,
  }),
);

const percent = computed(() =>
  value.value === undefined
    ? 0
    : convertValueToPercentage({
      value: value.value,
      min: rootContext.min.value ?? 0,
      max: rootContext.max.value ?? 100,
    }),
);

const size = useSize(thumbElement);

const orientationSize = computed(() => size[orientationContext.size].value);

const thumbInBoundsOffset = computed(() => orientationSize.value
  ? getThumbInBoundsOffset({
    direction: orientationContext.direction,
    left: percent.value,
    width: orientationSize.value,
  })
  : 0);

function handleFocus() {
  rootContext.valueIndexToChangeRef.value = props.index;
}

const isMounted = useMounted();

onMounted(() => {
  rootContext.thumbElements.value.push(thumbElement.value);
});

onUnmounted(() => {
  const idx = rootContext.thumbElements.value.findIndex(
    (i) => i === thumbElement.value,
  ) ?? -1;

  rootContext.thumbElements.value.splice(idx, 1);
});
</script>

<template>
  <ACollectionItem>
    <APrimitive
      v-bind="$attrs"
      :ref="forwardRef"
      role="slider"
      data-akar-collection-item
      :tabindex="rootContext.disabled.value ? undefined : 0"
      :aria-label="$attrs['aria-label'] || label"
      :data-disabled="rootContext.disabled.value ? '' : undefined"
      :data-orientation="rootContext.orientation.value"
      :aria-valuenow="value"
      :aria-valuemin="rootContext.min.value"
      :aria-valuemax="rootContext.max.value"
      :aria-orientation="rootContext.orientation.value"
      :as-child="asChild"
      :as="as"
      :style="{
        transform: 'var(--akar-slider-thumb-transform)',
        position: 'absolute',
        [orientationContext.startEdge]: `calc(${percent}% + ${thumbInBoundsOffset}px)`,
        /**
         * There will be no value on initial render while we work out the index so we hide thumbs
         * without a value, otherwise SSR will render them in the wrong position before they
         * snap into the correct position during hydration which would be visually jarring for
         * slower connections.
         */
        display: !isMounted && value === undefined ? 'none' : undefined,
      }"
      @focus="handleFocus"
    >
      <slot />
    </APrimitive>
  </ACollectionItem>
</template>
