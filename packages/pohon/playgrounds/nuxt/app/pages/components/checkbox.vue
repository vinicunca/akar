<script setup lang="ts">
import theme from '#build/pohon/checkbox';
import { ACheckboxIndicator, ACheckboxRoot } from 'akar';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const variants = Object.keys(theme.variants.variant);
const sizes = Object.keys(theme.variants.size);
const indicators = Object.keys(theme.variants.indicator);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size],
  indicator: [theme.defaultVariants.indicator],
});

const value = ref(true);
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
  </BaseNavbar>

  <div class="flex flex-row items-start relative">
    <div class="flex h-5 items-center">
      <ACheckboxRoot
        v-model="value"
        class="rounded-sm size-4 ring ring-ring-accented ring-inset overflow-hidden focus-visible:(outline-2 outline-primary outline-offset-2)"
      >
        <ACheckboxIndicator class="color-text-inverted bg-primary flex size-full items-center justify-center">
          <i
            class="i-lucide:check shrink-0 size-full"
          />
        </ACheckboxIndicator>
      </ACheckboxRoot>
    </div>

    <div class="text-sm ms-2 w-full">
      <label class="color-text font-medium block">
        Accept terms and conditions.
      </label>
    </div>
  </div>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PCheckbox
      v-model="value"
      label="Model value"
      v-bind="props"
    />
    <PCheckbox
      label="Default value"
      v-bind="props"
      :default-value="true"
    />
    <PCheckbox
      label="Indeterminate"
      v-bind="props"
      default-value="indeterminate"
    />
    <PCheckbox
      label="Icon"
      icon="i-lucide-heart"
      v-bind="props"
      :model-value="true"
    />
    <PCheckbox
      label="Required"
      v-bind="props"
      required
    />
    <PCheckbox
      label="Disabled"
      v-bind="props"
      disabled
    />
    <PCheckbox
      label="Description"
      description="This is a description"
      v-bind="props"
    />
  </BaseMatrix>
</template>
