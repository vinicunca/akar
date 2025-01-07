<script setup lang="ts">
import { computed, ref } from 'vue';
import { AAvatarFallback, AAvatarImage, AAvatarRoot } from '..';

const PROFILES = [
  {
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    alt: 'Colm Tuite',
    fallback: 'CT',
  },
  {
    src: '',
    alt: '',
    fallback: 'AD',
  },
];
const index = ref(0);
const profile = computed(() => {
  return PROFILES[index.value];
});
function rotateIndex() {
  if (index.value) {
    index.value = 0;
  } else {
    index.value = 1;
  }
}
</script>

<template>
  <Story title="Avatar/Demo">
    <Variant title="default">
      <AAvatarRoot
        class="bg-blackA3 h-[45px] w-[45px] inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle"
      >
        <AAvatarImage
          class="h-full w-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <AAvatarFallback
          class="text-violet11 h-full w-full flex items-center justify-center bg-white text-[15px] font-medium leading-1"
          :delay-ms="600"
        >
          CT
        </AAvatarFallback>
      </AAvatarRoot>
      <AAvatarRoot
        class="bg-blackA3 h-[45px] w-[45px] inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle"
      >
        <AAvatarImage
          class="h-full w-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
          alt="Pedro Duarte"
        />
        <AAvatarFallback
          class="text-violet11 h-full w-full flex items-center justify-center bg-white text-[15px] font-medium leading-1"
        >
          JD
        </AAvatarFallback>
      </AAvatarRoot>
      <AAvatarRoot
        class="bg-blackA3 h-[45px] w-[45px] inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle"
      >
        <AAvatarImage
          class="h-full w-full rounded-[inherit] object-cover"
          src="https://vinicunca.dev/og.jpg"
          alt="Pedro Duarte"
        />
        <AAvatarFallback
          class="text-violet11 h-full w-full flex items-center justify-center bg-white text-[15px] font-medium leading-1"
        >
          RD
        </AAvatarFallback>
      </AAvatarRoot>
      <AAvatarRoot
        class="bg-blackA3 h-[45px] w-[45px] inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle"
      >
        <AAvatarFallback
          class="text-violet11 h-full w-full flex items-center justify-center bg-white text-[15px] font-medium leading-1"
        >
          PD
        </AAvatarFallback>
      </AAvatarRoot>
      <AAvatarRoot
        class="bg-blackA3 h-[45px] w-[45px] inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle"
        @click.prevent="rotateIndex"
      >
        <AAvatarImage
          class="h-full w-full rounded-[inherit] object-cover"
          :src="profile.src"
          :alt="profile.alt"
        />
        <AAvatarFallback
          class="text-violet11 h-full w-full flex items-center justify-center bg-white text-[15px] font-medium leading-1"
          :delay-ms="600"
        >
          {{ profile.fallback }}
        </AAvatarFallback>
      </AAvatarRoot>
    </Variant>
  </Story>
</template>
