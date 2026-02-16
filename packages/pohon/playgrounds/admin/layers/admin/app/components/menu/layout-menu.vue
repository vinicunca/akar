<script lang="ts" setup>
import type { PNavigationMenuProps } from 'pohon-ui';

const props = defineProps<PNavigationMenuProps>();
</script>

<template>
  <PNavigationMenu
    orientation="vertical"
    :items="props.items"
    :type="props.type"
    expand-based-on-route
  />
</template>
