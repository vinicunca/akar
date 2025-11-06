<script setup lang="ts">
const items = [
  'https://picsum.photos/468/468?random=1',
  'https://picsum.photos/468/468?random=2',
  'https://picsum.photos/468/468?random=3',
  'https://picsum.photos/468/468?random=4',
  'https://picsum.photos/468/468?random=5',
  'https://picsum.photos/468/468?random=6',
];
</script>

<template>
  <PCarousel
    v-slot="{ item }"
    :items="items"
    :pohon="{ item: 'akar:basis-1/3' }"
  >
    <img
      :src="item"
      width="234"
      height="234"
      class="rounded-lg"
    >
  </PCarousel>
</template>
