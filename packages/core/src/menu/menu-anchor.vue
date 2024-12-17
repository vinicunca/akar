<script setup lang="ts">
import { APopperAnchor, type APopperAnchorProps } from '~~/popper';

interface MenuAnchorProps extends APopperAnchorProps {}

const props = defineProps<MenuAnchorProps>();
</script>

<template>
  <APopperAnchor v-bind="props">
    <slot />
  </APopperAnchor>
</template>
