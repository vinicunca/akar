<script lang="ts">
import type { ATeleportProps } from '../teleport';

export interface APopoverPortalProps extends ATeleportProps {}
</script>

<script setup lang="ts">
import { ATeleport } from '../teleport';

const props = defineProps<APopoverPortalProps>();
</script>

<template>
  <ATeleport v-bind="props">
    <slot />
  </ATeleport>
</template>
