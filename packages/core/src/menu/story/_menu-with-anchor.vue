<script setup lang="ts">
import type { AMenuProps } from '..';
import { useVModel } from '@vueuse/core';
import {
  AMenuAnchor,
  AMenuContent,
  AMenuPortal,
  AMenuRoot,
} from '..';

interface Props extends AMenuProps {}
const props = withDefaults(defineProps<Props>(), {
  open: true,
});

const open = useVModel(props, 'open');
</script>

<template>
  <AMenuRoot
    :open="open"
    :modal="false"
  >
    <AMenuAnchor :style="{ display: 'inline-block' }" />
    <AMenuPortal>
      <AMenuContent
        class="text-[13px] font-sans p-[5px] border border-gray-100 rounded-[6px] bg-white min-w-[130px] inline-block shadow-md box-border focus-within:border-black"
        align="start"
        @close-auto-focus.prevent
      >
        <slot />
      </AMenuContent>
    </AMenuPortal>
  </AMenuRoot>
</template>
