<script setup lang="ts">
import type { APopperAnchorProps } from '../popper';
import { APopperAnchor } from '../popper';

interface MenuAnchorProps extends APopperAnchorProps {}

const props = defineProps<MenuAnchorProps>();
</script>

<template>
  <APopperAnchor v-bind="props">
    <slot />
  </APopperAnchor>
</template>
