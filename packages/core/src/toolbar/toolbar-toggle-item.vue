<script lang="ts">
import type { AToggleGroupItemProps } from '../toggle-group';

export interface AToolbarToggleItemProps extends AToggleGroupItemProps {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../shared';
import { AToggleGroupItem } from '../toggle-group';
import ToolbarButton from './toolbar-button.vue';

const props = defineProps<AToolbarToggleItemProps>();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <ToolbarButton as-child>
    <AToggleGroupItem
      v-bind="props"
      :ref="forwardRef"
    >
      <slot />
    </AToggleGroupItem>
  </ToolbarButton>
</template>
