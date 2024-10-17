<script lang="ts">
import type { ATeleportProps } from '~~/a-teleport';

export interface ATooltipPortalProps extends ATeleportProps {}
</script>

<script setup lang="ts">
import { ATeleport } from '~~/a-teleport';

const props = defineProps<ATooltipPortalProps>();
</script>

<template>
  <ATeleport v-bind="props">
    <slot />
  </ATeleport>
</template>
