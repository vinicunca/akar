<script setup lang="ts">
import theme from '#build/pohon/badge';
import { reactive } from 'vue';

const colors = Object.keys(theme.variants.color);
const variants = Object.keys(theme.variants.variant);
const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size],
});
</script>

<template>
  <BaseNavbar>
    <PSelect
      v-model="attrs.color"
      :items="colors"
      multiple
    />
    <PSelect
      v-model="attrs.variant"
      :items="variants"
      multiple
    />
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      multiple
    />
  </BaseNavbar>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PBadge
      label="Badge"
      v-bind="props"
    />
    <PBadge
      icon="i-lucide-rocket"
      label="Icon"
      v-bind="props"
    />
    <PBadge
      :avatar="{ src: 'https://github.com/praburangki.png' }"
      label="Avatar"
      v-bind="props"
    />
    <PBadge
      icon="i-lucide-rocket"
      v-bind="props"
    />
    <PBadge
      :avatar="{ src: 'https://github.com/praburangki.png' }"
      v-bind="props"
    />
  </BaseMatrix>
</template>
