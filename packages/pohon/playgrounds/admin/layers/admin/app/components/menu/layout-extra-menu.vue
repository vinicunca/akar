<script lang="ts" setup>
import type { PNavigationMenuProps } from 'pohon-ui';

const props = defineProps<PNavigationMenuProps>();
console.log('🚀 ~ props:', props.items);
</script>

<template>
  <PDashboardMenu
    orientation="vertical"
    :items="props.items"
    :type="props.type"
    :collapsed="props.collapsed"
    expand-based-on-route
  />
</template>
