<script setup lang="ts">
import type { ACollapsibleRootEmits, ACollapsibleRootProps } from '..';
import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from '..';
import { useForwardPropsEmits } from '../../shared';

const props = defineProps<ACollapsibleRootProps>();
const emits = defineEmits<ACollapsibleRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ACollapsibleRoot
    v-bind="forwarded"
  >
    <ACollapsibleTrigger>Trigger</ACollapsibleTrigger>
    <ACollapsibleContent>Content</ACollapsibleContent>
  </ACollapsibleRoot>
</template>
