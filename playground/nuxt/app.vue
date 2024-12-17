<script setup lang="ts">
import Card from './components/Card.vue';
</script>

<template>
  <div>
    <!-- <AConfigProvider :use-id="fn"> -->
    <div class="w-full flex flex-col items-center">
      <div class="max-w-6xl w-full flex flex-col gap-4 pb-40 pt-40 lg:grid lg:grid-cols-3">
        <Card>
          <!-- <Accordion /> -->
        </Card>
      </div>
    </div>
    <!-- </AConfigProvider> -->

    <UApp>
      <NuxtPage />
    </UApp>
  </div>
</template>
