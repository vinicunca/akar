<script setup lang="ts">
import type { PToastProps } from 'pohon-ui';
import { useToast } from '#imports';

const props = defineProps<{
  color: PToastProps['color'];
}>();

const toast = useToast();

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    icon: 'i-lucide:wifi',
    color: props.color,
  });
}
</script>

<template>
  <PButton
    label="Show toast"
    color="neutral"
    variant="outline"
    @click="showToast"
  />
</template>
