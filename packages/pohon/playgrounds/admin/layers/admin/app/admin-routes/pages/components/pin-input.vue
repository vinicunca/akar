<script setup lang="ts">
import theme from '#build/pohon/pin-input';
import { APinInputInput, APinInputRoot } from 'akar';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
});

function onComplete(e: Array<string>) {
  console.log(e);
}

const value = ref<Array<string>>([]);
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
  </BaseNavbar>

  <APinInputRoot
    v-model="value"
    placeholder="○"
    class="inline-flex gap-1.5 items-center relative"
    @complete="onComplete"
  >
    <APinInputInput
      v-for="(id, index) in 5"
      :key="id"
      :index="index"
      class="text-sm color-text-highlighted text-center border-0 rounded-md bg-background size-8 ring ring-ring-accented ring-inset transition-colors-280 placeholder:color-text-dimmed focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
    />
  </APinInputRoot>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PPinInput
      placeholder="○"
      autofocus
      v-bind="props"
      @complete="onComplete"
    />
    <PPinInput
      placeholder="○"
      highlight
      v-bind="props"
    />
    <PPinInput
      placeholder="○"
      disabled
      v-bind="props"
    />
    <PPinInput
      placeholder="○"
      required
      v-bind="props"
    />
  </BaseMatrix>
</template>
