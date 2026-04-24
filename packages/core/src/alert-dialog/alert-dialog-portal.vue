<script lang="ts">
import type { ATeleportProps } from '../teleport';

export interface AAlertDialogPortalProps extends ATeleportProps {}
</script>

<script setup lang="ts">
import { ATeleport } from '../teleport';

defineOptions({ name: 'AAlertDialogPortal' });

const props = defineProps<AAlertDialogPortalProps>();
</script>

<template>
  <ATeleport v-bind="props">
    <slot />
  </ATeleport>
</template>
