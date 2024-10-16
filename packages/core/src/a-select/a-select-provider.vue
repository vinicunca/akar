<script setup lang="ts">
import type { AcceptableValue } from '~~/shared/types';

import {
  ASelectContentDefaultContextValue,
  provideASelectContentContext,
} from './a-select-content-impl.vue';
import { type ASelectRootContext, provideASelectRootContext } from './a-select-root.vue';

const props = defineProps<{
  context: ASelectRootContext<AcceptableValue>;
}>();

provideASelectRootContext(props.context);
provideASelectContentContext(ASelectContentDefaultContextValue);
</script>

<template>
  <slot />
</template>
