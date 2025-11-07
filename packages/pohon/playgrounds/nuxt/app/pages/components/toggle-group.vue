<script setup lang="ts">
import theme from '#build/pohon/input-tags';
import { ATagsInputInput, ATagsInputItem, ATagsInputItemDelete, ATagsInputItemText, ATagsInputRoot } from 'akar';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
});

const tags = ref(['Vue', 'Nuxt']);

const modelValue = ref(['Apple', 'Banana']);
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

  <ATagsInputRoot
    v-model="modelValue"
    class="text-sm color-text-highlighted px-2.5 py-1.5 rounded-md bg-background inline-flex flex-wrap gap-1.5 ring ring-ring-accented ring-inset transition-colors-280 items-center relative has-focus-visible:(ring-2 ring-primary ring-inset)"
  >
    <ATagsInputItem
      v-for="item in modelValue"
      :key="item"
      :value="item"
      class="text-xs color-text font-medium px-1.5 py-0.5 rounded-sm bg-background-elevated inline-flex gap-0.5 wrap-anywhere ring ring-ring-accented ring-inset items-center data-[state='active']:bg-background-accented data-[disabled]:(opacity-75 cursor-not-allowed)"
    >
      <ATagsInputItemText />
      <ATagsInputItemDelete class="color-text-dimmed rounded-xs inline-flex transition-colors-280 items-center hover:(color-text bg-background-accented/75) disabled:pointer-events-none">
        <i class="i-lucide:x shrink-0 size-3.5" />
      </ATagsInputItemDelete>
    </ATagsInputItem>

    <ATagsInputInput
      placeholder="Fruits..."
      class="border-0 bg-transparent flex-1 placeholder:color-text-dimmed focus:outline-none disabled:(opacity-75 cursor-not-allowed)"
    />
  </ATagsInputRoot>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PInputTags
      v-model="tags"
      placeholder="Enter tags..."
      autofocus
      v-bind="props"
    />
    <PInputTags
      :default-value="['TypeScript']"
      placeholder="Enter tags..."
      v-bind="props"
    />
    <PInputTags
      placeholder="Highlight"
      highlight
      v-bind="props"
    />
    <PInputTags
      placeholder="Disabled"
      disabled
      v-bind="props"
    />
    <PInputTags
      placeholder="Required"
      required
      v-bind="props"
    />
    <PInputTags
      placeholder="Search..."
      icon="i-lucide:search"
      v-bind="props"
    />
    <PInputTags
      placeholder="Search..."
      icon="i-lucide:search"
      trailing
      v-bind="props"
    />
    <PInputTags
      :avatar="{ src: 'https://github.com/vuejs.png' }"
      icon="i-lucide:search"
      trailing
      placeholder="Search..."
      v-bind="props"
    />
    <PInputTags
      placeholder="Loading..."
      loading
      v-bind="props"
    />
    <PInputTags
      placeholder="Loading..."
      loading
      trailing
      v-bind="props"
    />
    <PInputTags
      placeholder="Loading..."
      loading
      icon="i-lucide:search"
      trailing-icon="i-lucide:chevron-down"
      v-bind="props"
    />
  </BaseMatrix>
</template>
