<script setup lang="ts">
import theme from '#build/pohon/card';
import { reactive } from 'vue';

const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  variant: [theme.defaultVariants.variant],
});
</script>

<template>
  <BaseNavbar>
    <PSelect
      v-model="attrs.variant"
      :items="variants"
      multiple
    />
  </BaseNavbar>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PCard
      v-bind="props"
      class="w-80"
    >
      <template #header>
        <BasePlaceholder class="h-8" />
      </template>

      <BasePlaceholder class="h-24" />

      <template #footer>
        <BasePlaceholder class="h-8" />
      </template>
    </PCard>
  </BaseMatrix>
</template>
