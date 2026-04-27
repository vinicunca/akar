<script setup lang="ts">
import { useFocusGuards } from '../shared';

defineOptions({ name: 'AFocusGuards' });

useFocusGuards();
</script>

<template>
  <slot />
</template>
