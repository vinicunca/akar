<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AVisuallyHiddenProps extends APrimitiveProps {
  feature?: 'focusable' | 'fully-hidden';
}
</script>

<script lang="ts" setup>
import { APrimitive } from '~~/a-primitive';

withDefaults(
  defineProps<AVisuallyHiddenProps>(),
  { as: 'span', feature: 'focusable' },
);
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    :aria-hidden="feature === 'focusable' ? 'true' : undefined"
    :data-hidden="feature === 'fully-hidden' ? '' : undefined"
    :tabindex="feature === 'fully-hidden' ? -1 : undefined"
    :style="{
      // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
      position: 'absolute',
      border: 0,
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      clipPath: 'inset(50%)',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
    }"
  >
    <slot />
  </APrimitive>
</template>
