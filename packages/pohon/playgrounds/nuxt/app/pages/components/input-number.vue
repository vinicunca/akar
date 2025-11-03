<script setup lang="ts">
import theme from '#build/pohon/input-number';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);
const orientations = Object.keys(theme.variants.orientation);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
});

const orientation = ref('horizontal' as keyof typeof theme.variants.orientation);

const value = ref(50);
</script>

<template>
  <BaseNavbar>
    <PSelect
      v-model="attrs.color"
      :items="colors"
      multiple
    />
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      multiple
    />
    <PSelect
      v-model="attrs.variant"
      :items="variants"
      multiple
    />
    <PSelect
      v-model="orientation"
      :items="orientations"
    />
  </BaseNavbar>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PInputNumber
      v-model="value"
      :orientation="orientation"
      v-bind="props"
    />
    <PInputNumber
      :default-value="75"
      :orientation="orientation"
      v-bind="props"
    />
    <PInputNumber
      placeholder="Highlight"
      highlight
      :orientation="orientation"
      v-bind="props"
    />
    <PInputNumber
      placeholder="Disabled"
      disabled
      :orientation="orientation"
      v-bind="props"
    />
    <PInputNumber
      placeholder="Required"
      required
      :orientation="orientation"
      v-bind="props"
    />
  </BaseMatrix>
</template>
