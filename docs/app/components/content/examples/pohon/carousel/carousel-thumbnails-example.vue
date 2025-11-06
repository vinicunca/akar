<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6',
];

const carousel = useTemplateRef('carousel');
const activeIndex = ref(0);

function onClickPrev() {
  activeIndex.value--;
}
function onClickNext() {
  activeIndex.value++;
}
function onSelect(index: number) {
  activeIndex.value = index;
}

function select(index: number) {
  activeIndex.value = index;

  carousel.value?.emblaApi?.scrollTo(index);
}
</script>

<template>
  <div class="flex-1 w-full">
    <PCarousel
      ref="carousel"
      v-slot="{ item }"
      arrows
      :items="items"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="mx-auto max-w-xs w-full"
      @select="onSelect"
    >
      <img
        :src="item"
        width="320"
        height="320"
        class="rounded-lg"
      >
    </PCarousel>

    <div class="mx-auto pt-4 flex gap-1 max-w-xs justify-between">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="size-11 transition-opacity hover:opacity-100"
        :class="[activeIndex === index ? 'opacity-100' : 'opacity-25']"
        @click="select(index)"
      >
        <img
          :src="item"
          width="44"
          height="44"
          class="rounded-lg"
        >
      </div>
    </div>
  </div>
</template>
