<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface AToolbarSeparatorProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '~~/shared';
import BaseSeparator from '../shared/component/base-separator.vue';
import { injectAToolbarRootContext } from './toolbar-root.vue';

const props = defineProps<AToolbarSeparatorProps>();

const rootContext = injectAToolbarRootContext();
useForwardExpose();
</script>

<template>
  <BaseSeparator
    :orientation="rootContext.orientation.value"
    :as-child="props.asChild"
    :as="as"
  >
    <slot />
  </BaseSeparator>
</template>
