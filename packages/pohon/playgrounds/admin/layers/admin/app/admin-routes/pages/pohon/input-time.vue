<script setup lang="ts">
import theme from '#build/pohon/input-time';
import { Time } from '@internationalized/date';
import { reactive, shallowRef } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
});

const value = shallowRef(new Time(12, 30));
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
    <PInputTime
      v-model="value"
      autofocus
      v-bind="props"
    />
    <PInputTime
      :default-value="new Time(12, 30)"
      v-bind="props"
    />
    <PInputTime
      highlight
      v-bind="props"
    />
    <PInputTime
      disabled
      v-bind="props"
    />
    <PInputTime
      required
      v-bind="props"
    />
    <PInputTime
      icon="i-lucide-clock"
      v-bind="props"
    />
    <PInputTime
      icon="i-lucide-clock"
      trailing
      v-bind="props"
    />
    <PInputTime
      :avatar="{ src: 'https://github.com/praburangki.png' }"
      icon="i-lucide-clock"
      trailing
      v-bind="props"
    />
    <PInputTime
      loading
      v-bind="props"
    />
    <PInputTime
      loading
      trailing
      v-bind="props"
    />
    <PInputTime
      loading
      icon="i-lucide-clock"
      trailing-icon="i-lucide-chevron-down"
      v-bind="props"
    />
  </BaseMatrix>
</template>
