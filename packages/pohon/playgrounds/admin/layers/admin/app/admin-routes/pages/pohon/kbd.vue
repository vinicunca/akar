<script setup lang="ts">
import theme from '#build/pohon/kbd';
import { kbdKeysMap } from '#imports';
import { reactive } from 'vue';

const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);
const colors = Object.keys(theme.variants.color);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size],
});

const kbdKeys = Object.keys(kbdKeysMap);
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
    <PKbd
      v-for="(kdbKey, index) in kbdKeys"
      :key="index"
      :value="kdbKey"
      v-bind="props"
    />
  </BaseMatrix>
</template>
