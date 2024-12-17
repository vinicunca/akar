<script lang="ts">
export interface AComboboxAnchorProps extends APopperAnchorProps {}
</script>

<script setup lang="ts">
import { APopperAnchor, type APopperAnchorProps } from '~~/popper';
import { APrimitive } from '~~/primitive';
import { useForwardExpose } from '~~/shared';

defineProps<AComboboxAnchorProps>();

const { forwardRef } = useForwardExpose();
</script>

<template>
  <APopperAnchor
    as-child
    :reference="reference"
  >
    <APrimitive
      :ref="forwardRef"
      :as-child="asChild"
      :as="as"
      v-bind="$attrs"
    >
      <slot />
    </APrimitive>
  </APopperAnchor>
</template>
