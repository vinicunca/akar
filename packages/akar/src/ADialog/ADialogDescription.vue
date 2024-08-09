<script lang="ts">
import type { APrimitiveProps } from '~~/APrimitive';

import { useForwardExpose } from '~~/shared';

export interface ADialogDescriptionProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/APrimitive';

import { injectADialogRootContext } from './ADialogRoot.vue';

const props = withDefaults(defineProps<ADialogDescriptionProps>(), { as: 'p' });

useForwardExpose();
const rootContext = injectADialogRootContext();
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="rootContext.descriptionId"
  >
    <slot />
  </APrimitive>
</template>
