<script lang="ts">
import type { ATeleportProps } from '../teleport';

export interface AMenuPortalProps extends ATeleportProps {}
</script>

<script setup lang="ts">
import { ATeleport } from '../teleport';

defineOptions({ name: 'AMenuPortal' });

const props = defineProps<AMenuPortalProps>();
</script>

<template>
  <ATeleport v-bind="props">
    <slot />
  </ATeleport>
</template>
