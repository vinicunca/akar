<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ACalendarGridProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { APrimitive } from '~~/a-primitive';

import { injectACalendarRootContext } from './a-calendar-root.vue';

const props = withDefaults(
  defineProps<ACalendarGridProps>(),
  { as: 'table' },
);

const rootContext = injectACalendarRootContext();
const disabled = computed(() => rootContext.disabled.value ? true : undefined);
const readonly = computed(() => rootContext.readonly.value ? true : undefined);
</script>

<template>
  <APrimitive
    v-bind="props"
    tabindex="-1"
    role="grid"
    :aria-readonly="readonly"
    :aria-disabled="disabled"
    :data-readonly="readonly && ''"
    :data-disabled="disabled && ''"
  >
    <slot />
  </APrimitive>
</template>
