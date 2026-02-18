<script lang="ts" setup>
import type { PNavigationMenuProps } from 'pohon-ui';

const props = defineProps<PNavigationMenuProps>();
</script>

<template>
  <PNavigationMenu
    orientation="vertical"
    :items="props.items"
    :type="props.type"
    :collapsed="props.collapsed"
    expand-based-on-route
  />

  <!-- <PDashboardMenu
    :navigation="props.items"
    :collapsed="props.collapsed"
  /> -->
</template>
