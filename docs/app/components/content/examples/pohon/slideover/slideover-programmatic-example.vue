<script setup lang="ts">
import { useOverlay, useToast } from '#imports';
import { ref } from 'vue';
import SlideoverExample from './slideover-example.vue';

const count = ref(0);

const toast = useToast();
const overlay = useOverlay();

const slideover = overlay.create(SlideoverExample);

async function open() {
  const instance = slideover.open({
    count: count.value,
  });

  const shouldIncrement = await instance.result;

  if (shouldIncrement) {
    count.value++;

    toast.add({
      title: `Success: ${shouldIncrement}`,
      color: 'success',
      id: 'slideover-success',
    });

    // Update the count
    slideover.patch({
      count: count.value,
    });
    return;
  }

  toast.add({
    title: `Dismissed: ${shouldIncrement}`,
    color: 'error',
    id: 'slideover-dismiss',
  });
}
</script>

<template>
  <PButton
    label="Open"
    color="neutral"
    variant="subtle"
    @click="open"
  />
</template>
