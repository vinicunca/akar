<script setup lang="ts">
import { reactive, ref } from 'vue';
import theme from '#build/pohon/color-picker';

const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  size: [theme.defaultVariants.size],
});

const colorHex = ref('#9C27B0');

function handleColorChange(event: Event) {
  colorHex.value = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <BaseNavbar>
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      multiple
    />

    <PFieldGroup>
      <PButton
        color="neutral"
        variant="outline"
        square
      >
        <span
          :style="{ backgroundColor: colorHex }"
          class="rounded-sm inline-flex size-5"
        />
      </PButton>
      <PInput
        :model-value="colorHex"
        @change="handleColorChange"
      />
    </PFieldGroup>
  </BaseNavbar>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PColorPicker
      v-model="colorHex"
      v-bind="props"
    />
  </BaseMatrix>
</template>
