<script lang="ts" setup>
import type { APrimitiveProps } from '~~/a-primitive';

import { APrimitive } from '~~/a-primitive';

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
../a-primitive
~~/a-primitive
