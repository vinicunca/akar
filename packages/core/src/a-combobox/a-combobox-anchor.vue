<script lang="ts">
import type { APopperAnchorProps } from '~~/a-popper';

export interface AComboboxAnchorProps extends APopperAnchorProps {}
</script>

<script setup lang="ts">
import { APopperAnchor } from '~~/a-popper';
import { APrimitive } from '~~/a-primitive';
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
