<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { computed } from 'vue';
import HeroCodeGroup from './hero-code-group.vue';
import HeroContainer from './hero-container.vue';

const props = withDefaults(defineProps<{
  name: string;
  dir: string;
  files?: string;
  type?: 'demo' | 'example';
}>(), { type: 'demo' });

const cssFramework = useStorage<'css' | 'unocss'>('cssFramework', 'unocss');
const parsedFiles = computed(() => JSON.parse(decodeURIComponent(props.files ?? ''))[cssFramework.value]);
</script>

<template>
  <HeroContainer
    :dir="dir"
    :name="name"
    :files="parsedFiles"
    :css-framework="cssFramework"
    :type="type"
  >
    <slot />

    <template #codeSlot>
      <HeroCodeGroup
        v-model="cssFramework"
        :type="type"
      >
        <slot name="unocss" />
        <slot name="css" />
      </HeroCodeGroup>
    </template>
  </HeroContainer>
</template>
