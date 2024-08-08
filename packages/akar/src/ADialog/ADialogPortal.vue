<script lang="ts">
import type { ATeleportProps } from '~~/ATeleport';

export interface ADialogPortalProps extends ATeleportProps {}
</script>

<script setup lang="ts">
import { ATeleportPrimitive } from '~~/ATeleport';

const props = defineProps<ADialogPortalProps>();
</script>

<template>
  <ATeleportPrimitive v-bind="props">
    <slot />
  </ATeleportPrimitive>
</template>
