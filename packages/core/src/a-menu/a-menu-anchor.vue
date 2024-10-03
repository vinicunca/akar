<script setup lang="ts">
import { APopperAnchor, type APopperAnchorProps } from '~~/a-popper';

interface AMenuAnchorProps extends APopperAnchorProps {}

const props = defineProps<AMenuAnchorProps>();
</script>

<template>
  <APopperAnchor v-bind="props">
    <slot />
  </APopperAnchor>
</template>
