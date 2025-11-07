<script lang="ts" setup>
import theme from '#build/pohon/button';
import { BaseMatrix, BaseNavbar, PButton, PSelect } from '#components';
import { sleep } from '@vinicunca/perkakas';
import { reactive } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size],
});

function onClick() {
  return sleep(5000);
}
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
    <PButton
      label="Button"
      v-bind="props"
    />
    <PButton
      label="Link"
      to="/"
      v-bind="props"
    />
    <PButton
      label="Disabled"
      disabled
      v-bind="props"
    />
    <PButton
      label="Disabled link"
      to="#"
      disabled
      v-bind="props"
    />
    <PButton
      label="Loading"
      loading
      v-bind="props"
    />
    <PButton
      label="Loading"
      loading
      trailing
      v-bind="props"
    />
    <PButton
      label="Loading auto"
      loading-auto
      v-bind="props"
      @click="onClick"
    />
    <PButton
      label="Icon"
      icon="i-lucide:rocket"
      v-bind="props"
    />
    <PButton
      label="Icon"
      icon="i-lucide:chevron-down"
      trailing
      v-bind="props"
    />
    <PButton
      label="Avatar"
      :avatar="{ src: 'https://github.com/praburangki.png' }"
      v-bind="props"
    />
    <PButton
      icon="i-lucide:rocket"
      v-bind="props"
      square
    />
    <PButton
      :avatar="{ src: 'https://github.com/praburangki.png' }"
      v-bind="props"
      square
    />
  </BaseMatrix>
</template>
