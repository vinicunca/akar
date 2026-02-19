<script setup lang="ts">
import theme from '#build/pohon/field-group';
import { reactive, ref } from 'vue';

const sizes = Object.keys(theme.variants.size);
const orientations = Object.keys(theme.variants.orientation);

const attrs = reactive({
  size: ['md' as keyof typeof theme.variants.size],
});

const orientation = ref('horizontal' as keyof typeof theme.variants.orientation);
</script>

<template>
  <BaseNavbar>
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

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PFieldGroup
      :orientation="orientation"
      v-bind="props"
    >
      <PButton
        color="neutral"
        variant="outline"
      >
        Button
      </PButton>
    </PFieldGroup>

    <PFieldGroup
      :orientation="orientation"
      v-bind="props"
    >
      <PInput placeholder="Search..." />
    </PFieldGroup>

    <PFieldGroup
      :orientation="orientation"
      v-bind="props"
    >
      <PButton
        color="neutral"
        variant="outline"
      >
        Button
      </PButton>
      <PButton
        color="neutral"
        variant="subtle"
      >
        Button
      </PButton>
      <PButton
        color="neutral"
        variant="outline"
      >
        Button
      </PButton>
    </PFieldGroup>

    <PFieldGroup
      :orientation="orientation"
      v-bind="props"
    >
      <PButton
        color="neutral"
        variant="outline"
      >
        Button
      </PButton>
      <PInput placeholder="Search..." />
    </PFieldGroup>

    <PFieldGroup
      :orientation="orientation"
      v-bind="props"
    >
      <PInput placeholder="Search..." />
      <PButton
        color="neutral"
        variant="outline"
      >
        Button
      </PButton>
    </PFieldGroup>

    <PFieldGroup
      :orientation="orientation"
      v-bind="props"
    >
      <PBadge
        color="neutral"
        variant="outline"
        size="lg"
        label="https://"
      />
      <PInput
        color="neutral"
        variant="outline"
        placeholder="www.example.com"
      />
    </PFieldGroup>
  </BaseMatrix>
</template>
