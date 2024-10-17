<script setup lang="ts">
import { useVModel } from '@vueuse/core';

import {
  AMenuAnchor,
  AMenuContent,
  AMenuPortal,
  type AMenuProps,
  AMenuRoot,
} from '..';

interface Props extends AMenuProps {}
const props = withDefaults(
  defineProps<Props>(),
  {
    open: true,
  },
);

const open = useVModel(
  props,
  'open',
);
</script>

<template>
  <AMenuRoot
    :open="open"
    :modal="false"
  >
    <AMenuAnchor :style="{ display: 'inline-block' }" />
    <AMenuPortal>
      <AMenuContent
        class="box-border inline-block min-w-[130px] border border-gray-100 rounded-[6px] bg-white p-[5px] text-[13px] font-sans shadow-md focus-within:border-black"
        align="start"
        @close-auto-focus.prevent
      >
        <slot />
      </AMenuContent>
    </AMenuPortal>
  </AMenuRoot>
</template>
