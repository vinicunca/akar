<script setup lang="ts">
import { AColorSwatch } from '..';

const swatchClass = 'w-8 h-8 rounded ring-1 ring-inset ring-black/15 dark:ring-white/15 bg-[var(--akar-color-swatch-color)]';
</script>

<template>
  <Story
    title="ColorSwatch/Demo"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Default">
      <AColorSwatch
        color="#E5484D"
        :class="swatchClass"
      />
    </Variant>

    <Variant title="Various Colors">
      <div class="flex gap-2">
        <AColorSwatch
          v-for="color in ['#E5484D', '#D6409F', '#8E4EC6', '#0090FF', '#30A46C', '#F76B15', '#FFE629']"
          :key="color"
          :color="color"
          :class="swatchClass"
        />
      </div>
    </Variant>

    <Variant title="Transparent / No Color">
      <div class="flex gap-2 items-center">
        <AColorSwatch
          color="#ff000000"
          :class="swatchClass"
        />
        <AColorSwatch
          color=""
          :class="swatchClass"
        />
      </div>
    </Variant>

    <Variant title="With Alpha">
      <div class="flex gap-2">
        <AColorSwatch
          v-for="alpha in ['ff', 'cc', '80', '33']"
          :key="alpha"
          :color="`#E5484D${alpha}`"
          :class="swatchClass"
        />
      </div>
    </Variant>

    <Variant title="Custom Label">
      <AColorSwatch
        color="#E5484D"
        label="Brand Red"
        :class="swatchClass"
      />
    </Variant>

    <Variant title="Color Object (HSL)">
      <AColorSwatch
        :color="{ space: 'hsl', h: 220, s: 90, l: 56, alpha: 1 }"
        :class="swatchClass"
      />
    </Variant>

    <Variant title="Various Sizes">
      <div class="flex gap-2 items-center">
        <AColorSwatch
          color="#0090FF"
          class="rounded-sm bg-[var(--akar-color-swatch-color)] h-4 w-4 ring-1 ring-black/15 ring-inset dark:ring-white/15"
        />
        <AColorSwatch
          color="#0090FF"
          :class="swatchClass"
        />
        <AColorSwatch
          color="#0090FF"
          class="rounded-lg bg-[var(--akar-color-swatch-color)] h-12 w-12 ring-1 ring-black/15 ring-inset dark:ring-white/15"
        />
      </div>
    </Variant>
  </Story>
</template>
