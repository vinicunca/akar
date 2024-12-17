<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';
import { useForwardExpose, useId } from '~~/shared';
import { injectATagsInputItemContext } from './tags-input-item.vue';

export interface ATagsInputItemTextProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/primitive';

const props = withDefaults(defineProps<ATagsInputItemTextProps>(), {
  as: 'span',
});

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
