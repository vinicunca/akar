<script lang="ts">
import type { ATeleportProps } from '~~/a-teleport';

export interface ADialogPortalProps extends ATeleportProps {}
</script>

<script setup lang="ts">
import { ATeleport } from '~~/a-teleport';

const props = defineProps<ADialogPortalProps>();
</script>

<template>
  <ATeleport v-bind="props">
    <slot />
  </ATeleport>
</template>
