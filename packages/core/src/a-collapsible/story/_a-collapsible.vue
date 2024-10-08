<script setup lang="ts">
import { useForwardPropsEmits } from '~~/shared';

import type { ACollapsibleRootEmits, ACollapsibleRootProps } from '..';

import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from '..';

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
