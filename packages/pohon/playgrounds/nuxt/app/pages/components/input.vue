<script setup lang="ts">
import theme from '#build/pohon/input';
import { BaseMatrix, BaseNavbar, PInput, PSelect } from '#components';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const variants = Object.keys(theme.variants.variant);
const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size],
});

const value = ref('Model value');
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
    <PInput
      v-model="value"
      autofocus
      v-bind="props"
    />
    <PInput
      default-value="Default value"
      v-bind="props"
    />
    <PInput
      placeholder="Highlight"
      highlight
      v-bind="props"
    />
    <PInput
      placeholder="Disabled"
      disabled
      v-bind="props"
    />
    <PInput
      placeholder="Required"
      required
      v-bind="props"
    />
    <PInput
      placeholder="Search..."
      icon="i-lucide-search"
      v-bind="props"
    />
    <PInput
      placeholder="Search..."
      icon="i-lucide-search"
      trailing
      v-bind="props"
    />
    <PInput
      :avatar="{ src: 'https://github.com/praburangki.png' }"
      icon="i-lucide-search"
      placeholder="Search..."
      trailing
      v-bind="props"
    />
    <PInput
      placeholder="Loading..."
      loading
      v-bind="props"
    />
    <PInput
      placeholder="Loading..."
      loading
      trailing
      v-bind="props"
    />
    <PInput
      placeholder="Loading..."
      loading
      icon="i-lucide-search"
      trailing-icon="i-lucide-chevron-down"
      v-bind="props"
    />
    <PInput
      icon="i-lucide-calculator"
      type="number"
      :model-value="10"
      v-bind="props"
    />
    <PInput
      icon="i-lucide-folder"
      type="file"
      v-bind="props"
    />
    <PInput
      icon="i-lucide-calendar"
      type="date"
      :model-value="new Date().toISOString().substring(0, 10)"
      v-bind="props"
    />
    <PInput
      icon="i-lucide-lock"
      type="password"
      model-value="password"
      v-bind="props"
    />
  </BaseMatrix>
</template>
