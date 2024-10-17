<script lang="ts">
import { useId } from 'vue';

import type { APrimitiveProps } from '~~/a-primitive';

export interface ATagsInputItemTextProps extends APrimitiveProps {}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';
import { useForwardExpose } from '~~/shared';

import { injectATagsInputItemContext } from './a-tags-input-item.vue';

const props = withDefaults(defineProps<ATagsInputItemTextProps>(), {
  as: 'span',
});

const itemContext = injectATagsInputItemContext();
useForwardExpose();

itemContext.textId ||= useId();
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="itemContext.textId"
  >
    <slot>{{ itemContext.displayValue.value }}</slot>
  </APrimitive>
</template>
