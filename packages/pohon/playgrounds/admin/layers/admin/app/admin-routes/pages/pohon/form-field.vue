<script setup lang="ts">
import theme from '#build/pohon/form-field';
import { reactive } from 'vue';

const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  size: [theme.defaultVariants.size],
});

const feedbacks = [
  {},
  { required: true },
  { description: 'This is a description' },
  { error: 'This is an error' },
  { hint: 'This is a hint' },
  { help: 'Help! I need somebody!' },
];
</script>

<template>
  <BaseNavbar>
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      placeholder="Size"
      multiple
    />
  </BaseNavbar>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <template
      v-for="(feedback, index) in feedbacks"
      :key="index"
    >
      <PFormField
        label="Email"
        name="email"
        v-bind="{ ...feedback, ...props }"
      >
        <PInput placeholder="john@lennon.com" />
      </PFormField>
    </template>
  </BaseMatrix>
</template>
