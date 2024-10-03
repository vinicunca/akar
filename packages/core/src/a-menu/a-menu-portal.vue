<script lang="ts">
import type { ATeleportProps } from '~~/a-teleport';

export interface AMenuPortalProps extends ATeleportProps {}
</script>

<script setup lang="ts">
import { ATeleport } from '~~/a-teleport';

const props = defineProps<AMenuPortalProps>();
</script>

<template>
  <ATeleport v-bind="props">
    <slot />
  </ATeleport>
</template>
