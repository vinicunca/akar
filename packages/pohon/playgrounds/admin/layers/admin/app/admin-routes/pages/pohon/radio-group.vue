<script setup lang="ts">
import theme from '#build/pohon/radio-group';
import { ARadioGroupIndicator, ARadioGroupItem, ARadioGroupRoot } from 'akar';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);
const indicators = Object.keys(theme.variants.indicator);
const orientations = Object.keys(theme.variants.orientation);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
  indicator: [theme.defaultVariants.indicator],
});

const orientation = ref('vertical' as keyof typeof theme.variants.orientation);

const items = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];
const itemsLiteral = [
  'Option 1',
  'Option 2',
  'Option 3',
];
const itemsWithDescription = [
  { value: '1', label: 'Option 1', description: 'Description 1' },
  { value: '2', label: 'Option 2', description: 'Description 2' },
  { value: '3', label: 'Option 3', description: 'Description 3' },
];

const radioStateSingle = ref('1');
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
    <PSelect
      v-model="attrs.indicator"
      :items="indicators"
      multiple
    />
    <PSelect
      v-model="orientation"
      :items="orientations"
    />
  </BaseNavbar>

  <ARadioGroupRoot
    v-model="radioStateSingle"
    class="flex flex-col gap-x-2 gap-y-1"
    aria-label="View density"
  >
    <div
      v-for="item in items"
      :key="item.value"
      class="text-sm flex flex-row items-start"
    >
      <div class="flex h-5 items-center">
        <ARadioGroupItem
          :id="item.value"
          class="rounded-full size-4 ring ring-ring-accented ring-inset overflow-hidden focus-visible:(outline-2 outline-primary outline-offset-2)"
          :value="item.value"
        >
          <ARadioGroupIndicator
            class="bg-primary flex size-full items-center justify-center after:(rounded-full bg-background size-1.5 content-empty)"
          />
        </ARadioGroupItem>
      </div>

      <div class="ms-2 w-full">
        <label
          :for="item.value"
          class="color-text font-medium block"
        >
          {{ item.label }}
        </label>
      </div>
    </div>
  </ARadioGroupRoot>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PRadioGroup
      :items="items"
      default-value="1"
      :orientation="orientation"
      v-bind="props"
    />
    <PRadioGroup
      :items="itemsLiteral"
      default-value="Option 1"
      :orientation="orientation"
      v-bind="props"
    />
    <PRadioGroup
      :items="itemsWithDescription"
      :orientation="orientation"
      v-bind="props"
    />
    <PRadioGroup
      :items="items"
      disabled
      :orientation="orientation"
      v-bind="props"
    />
    <PRadioGroup
      :items="items"
      legend="Legend"
      :orientation="orientation"
      v-bind="props"
    />
    <PRadioGroup
      :items="items"
      legend="Legend"
      required
      :orientation="orientation"
      v-bind="props"
    />
    <PRadioGroup
      :items="items"
      :orientation="orientation"
      v-bind="props"
    >
      <template #legend>
        <span class="font-bold italic">
          With slots
        </span>
      </template>
      <template #label="{ item }">
        <span class="italic">
          {{ item.label }}
        </span>
      </template>
    </PRadioGroup>
  </BaseMatrix>
</template>
