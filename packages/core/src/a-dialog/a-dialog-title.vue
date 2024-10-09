<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

import { useForwardExpose } from '~~/shared';

export interface ADialogTitleProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

import { injectADialogRootContext } from './a-dialog-root.vue';

const props = withDefaults(
  defineProps<ADialogTitleProps>(),
  { as: 'h2' },
);
const rootContext = injectADialogRootContext();

useForwardExpose();
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="rootContext.titleId"
  >
    <slot />
  </APrimitive>
</template>
