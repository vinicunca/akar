<script lang="ts">
import type { APrimitiveProps } from '~~/APrimitive';

import { useForwardExpose } from '~~/shared';

export interface ADialogTitleProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/APrimitive';

import { injectADialogRootContext } from './ADialogRoot.vue';

const props = withDefaults(defineProps<ADialogTitleProps>(), { as: 'h2' });
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
