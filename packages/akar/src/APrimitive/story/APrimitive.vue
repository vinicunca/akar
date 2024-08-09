<script lang="ts">
import type { APrimitiveProps } from '~~/APrimitive';
</script>

<script lang="ts" setup>
import { APrimitive } from '../APrimitive';

export interface ADialogCloseProps extends APrimitiveProps {}

const props = withDefaults(defineProps<ADialogCloseProps>(), {
  as: 'button',
});
</script>

<template>
  <Story>
    <Variant title="Setup histoire">
      <APrimitive
        v-bind="props"
        :type="as === 'button' ? 'button' : undefined"
      >
        <slot />
      </APrimitive>
    </Variant>
  </Story>
</template>
