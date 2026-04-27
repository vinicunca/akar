<script setup lang="ts">
import { ref } from 'vue';
import { AColorSwatchPickerItem, AColorSwatchPickerItemIndicator, AColorSwatchPickerItemSwatch, AColorSwatchPickerRoot } from '..';

const colors = [
  '#E5484D',
  '#D6409F',
  '#8E4EC6',
  '#0090FF',
  '#30A46C',
  '#F76B15',
  '#FFE629',
];

const selectedColor = ref('#0090FF');
const selectedMultiple = ref(['#E5484D', '#30A46C']);
</script>

<template>
  <Story
    title="ColorSwatchPicker/Demo"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Default">
      <AColorSwatchPickerRoot
        aria-label="Pick a color"
        class="flex gap-2"
      >
        <AColorSwatchPickerItem
          v-for="color in colors"
          :key="color"
          :value="color"
          class="relative"
        >
          <AColorSwatchPickerItemSwatch
            class="peer rounded bg-[var(--akar-color-swatch-color)] h-8 w-8 cursor-pointer ring-1 ring-black/15 ring-inset dark:ring-white/15"
          />
          <AColorSwatchPickerItemIndicator class="rounded-full bg-white size-1 bottom-1 right-1 absolute peer-data-[color-contrast=dark]:bg-black" />
        </AColorSwatchPickerItem>
      </AColorSwatchPickerRoot>
    </Variant>

    <Variant title="Controlled">
      <div class="flex flex-col gap-3">
        <AColorSwatchPickerRoot
          v-model="selectedColor"
          aria-label="Pick a color"
          class="flex gap-2"
        >
          <AColorSwatchPickerItem
            v-for="color in colors"
            :key="color"
            :value="color"
            class="relative"
          >
            <AColorSwatchPickerItemSwatch
              class="peer rounded bg-[var(--akar-color-swatch-color)] h-8 w-8 cursor-pointer ring-1 ring-black/15 ring-inset dark:ring-white/15"
            />
            <AColorSwatchPickerItemIndicator class="rounded-full bg-white size-1 bottom-1 right-1 absolute peer-data-[color-contrast=dark]:bg-black" />
          </AColorSwatchPickerItem>
        </AColorSwatchPickerRoot>
        <p class="text-sm text-gray-600">
          Selected: {{ selectedColor }}
        </p>
      </div>
    </Variant>

    <Variant title="Multiple Selection">
      <div class="flex flex-col gap-3">
        <AColorSwatchPickerRoot
          v-model="selectedMultiple"
          multiple
          aria-label="Pick colors"
          class="flex gap-2"
        >
          <AColorSwatchPickerItem
            v-for="color in colors"
            :key="color"
            :value="color"
            class="relative"
          >
            <AColorSwatchPickerItemSwatch
              class="peer rounded bg-[var(--akar-color-swatch-color)] h-8 w-8 cursor-pointer ring-1 ring-black/15 ring-inset dark:ring-white/15"
            />
            <AColorSwatchPickerItemIndicator class="rounded-full bg-white size-1 bottom-1 right-1 absolute peer-data-[color-contrast=dark]:bg-black" />
          </AColorSwatchPickerItem>
        </AColorSwatchPickerRoot>
        <p class="text-sm text-gray-600">
          Selected: {{ selectedMultiple.join(', ') }}
        </p>
      </div>
    </Variant>

    <Variant title="With Default Value">
      <AColorSwatchPickerRoot
        default-value="#8E4EC6"
        aria-label="Pick a color"
        class="flex gap-2"
      >
        <AColorSwatchPickerItem
          v-for="color in colors"
          :key="color"
          :value="color"
          class="relative"
        >
          <AColorSwatchPickerItemSwatch
            class="peer rounded bg-[var(--akar-color-swatch-color)] h-8 w-8 cursor-pointer ring-1 ring-black/15 ring-inset dark:ring-white/15"
          />
          <AColorSwatchPickerItemIndicator class="rounded-full bg-white size-1 bottom-1 right-1 absolute peer-data-[color-contrast=dark]:bg-black" />
        </AColorSwatchPickerItem>
      </AColorSwatchPickerRoot>
    </Variant>

    <Variant title="Disabled">
      <AColorSwatchPickerRoot
        disabled
        aria-label="Pick a color"
        class="opacity-50 flex gap-2"
      >
        <AColorSwatchPickerItem
          v-for="color in colors"
          :key="color"
          :value="color"
          class="relative"
        >
          <AColorSwatchPickerItemSwatch
            class="peer rounded bg-[var(--akar-color-swatch-color)] h-8 w-8 ring-1 ring-black/15 ring-inset dark:ring-white/15"
          />
          <AColorSwatchPickerItemIndicator class="rounded-full bg-white size-1 bottom-1 right-1 absolute peer-data-[color-contrast=dark]:bg-black" />
        </AColorSwatchPickerItem>
      </AColorSwatchPickerRoot>
    </Variant>
  </Story>
</template>
