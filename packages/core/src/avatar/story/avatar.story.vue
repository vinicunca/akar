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
        class="bg-blackA3 align-middle rounded-full inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden"
      >
        <AAvatarImage
          class="rounded-[inherit] h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <AAvatarFallback
          class="text-violet11 text-[15px] leading-1 font-medium bg-white flex h-full w-full items-center justify-center"
          :delay-ms="600"
        >
          CT
        </AAvatarFallback>
      </AAvatarRoot>
      <AAvatarRoot
        class="bg-blackA3 align-middle rounded-full inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden"
      >
        <AAvatarImage
          class="rounded-[inherit] h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
          alt="Pedro Duarte"
        />
        <AAvatarFallback
          class="text-violet11 text-[15px] leading-1 font-medium bg-white flex h-full w-full items-center justify-center"
        >
          JD
        </AAvatarFallback>
      </AAvatarRoot>
      <AAvatarRoot
        class="bg-blackA3 align-middle rounded-full inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden"
      >
        <AAvatarImage
          class="rounded-[inherit] h-full w-full object-cover"
          src="https://vinicunca.dev/og.jpg"
          alt="Pedro Duarte"
        />
        <AAvatarFallback
          class="text-violet11 text-[15px] leading-1 font-medium bg-white flex h-full w-full items-center justify-center"
        >
          RD
        </AAvatarFallback>
      </AAvatarRoot>
      <AAvatarRoot
        class="bg-blackA3 align-middle rounded-full inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden"
      >
        <AAvatarFallback
          class="text-violet11 text-[15px] leading-1 font-medium bg-white flex h-full w-full items-center justify-center"
        >
          PD
        </AAvatarFallback>
      </AAvatarRoot>
      <AAvatarRoot
        class="bg-blackA3 align-middle rounded-full inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden"
        @click.prevent="rotateIndex"
      >
        <AAvatarImage
          class="rounded-[inherit] h-full w-full object-cover"
          :src="profile.src"
          :alt="profile.alt"
        />
        <AAvatarFallback
          class="text-violet11 text-[15px] leading-1 font-medium bg-white flex h-full w-full items-center justify-center"
          :delay-ms="600"
        >
          {{ profile.fallback }}
        </AAvatarFallback>
      </AAvatarRoot>
    </Variant>
  </Story>
</template>
