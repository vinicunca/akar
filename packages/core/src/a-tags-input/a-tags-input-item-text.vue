<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface ATagsInputItemTextProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose, useId } from '~~/shared';

import { injectATagsInputItemContext } from './a-tags-input-item.vue';

const props = withDefaults(
  defineProps<ATagsInputItemTextProps>(),
  {
    as: 'span',
  },
);

const itemContext = injectATagsInputItemContext();
useForwardExpose();

itemContext.textId ||= useId(undefined, 'akar-tags-input-item-text');
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="itemContext.textId"
  >
    <slot>{{ itemContext.displayValue.value }}</slot>
  </APrimitive>
</template>
