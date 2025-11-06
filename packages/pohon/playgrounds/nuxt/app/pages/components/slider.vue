<script setup lang="ts">
import theme from '#build/pohon/slider';
import { ASliderRange, ASliderRoot, ASliderThumb, ASliderTrack } from 'akar';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const orientations = Object.keys(theme.variants.orientation);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
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
      v-model="orientation"
      :items="orientations"
    />
  </BaseNavbar>

  <ASliderRoot
    class="flex w-full select-none items-center relative touch-none"
    :max="100"
    :step="1"
  >
    <ASliderTrack class="rounded-full bg-background-accented grow h-[8px] relative overflow-hidden">
      <ASliderRange class="rounded-full bg-primary h-full absolute" />
    </ASliderTrack>
    <ASliderThumb
      class="rounded-full bg-background size-4 ring-2 ring-primary focus-visible:(outline-2 outline-primary/50 outline-offset-2)"
      aria-label="Volume"
    />
  </ASliderRoot>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
    :container-props="{ 'data-orientation': orientation }"
    container-class="gap-8 data-[orientation=horizontal]:w-48 data-[orientation=vertical]:h-48 data-[orientation=vertical]:flex-row"
  >
    <PSlider
      v-model="value"
      :orientation="orientation"
      v-bind="props"
    />
    <PSlider
      :default-value="50"
      :orientation="orientation"
      v-bind="props"
    />
    <PSlider
      inverted
      :orientation="orientation"
      v-bind="props"
    />
    <PSlider
      disabled
      :orientation="orientation"
      v-bind="props"
    />
    <PSlider
      :min="4"
      :max="12"
      :step="2"
      :model-value="6"
      :orientation="orientation"
      v-bind="props"
    />
    <PSlider
      :default-value="[0, 20]"
      :orientation="orientation"
      v-bind="props"
    />
    <PSlider
      :model-value="[0, 20]"
      :orientation="orientation"
      v-bind="props"
    />
    <PSlider
      :model-value="[0, 20, 80]"
      :orientation="orientation"
      v-bind="props"
    />
    <PSlider
      :model-value="[0, 80]"
      :min-steps-between-thumbs="20"
      :orientation="orientation"
      v-bind="props"
    />
  </BaseMatrix>
</template>
