<script setup lang="ts">
import type { AcceptableValue } from '~~/shared/types';
import type { SelectRootContext } from './select-root.vue';
import { provideSelectContentContext, SelectContentDefaultContextValue } from './select-content-impl.vue';
import { provideSelectRootContext } from './select-root.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  context: SelectRootContext<AcceptableValue>;
}>();

provideSelectRootContext(props.context);
provideSelectContentContext(SelectContentDefaultContextValue);
</script>

<template>
  <slot />
</template>
