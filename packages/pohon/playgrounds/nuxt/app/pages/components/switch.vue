<script setup lang="ts">
import theme from '#build/pohon/switch';
import { ASwitchRoot, ASwitchThumb } from 'akar';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
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
      v-model="attrs.size"
      :items="sizes"
      multiple
    />
  </BaseNavbar>

  <div class="flex items-start relative">
    <div class="flex h-5 items-center">
      <ASwitchRoot
        id="airplane-mode"
        v-model="value"
        class="border-2 border-transparent rounded-full inline-flex shrink-0 w-9 transition-colors-280 items-center focus-visible:(outline-2 outline-primary outline-offset-2) data-[state=checked]:bg-primary data-[state=unchecked]:bg-background-accented"
      >
        <ASwitchThumb
          class="group rounded-full bg-background flex size-4 pointer-events-none ring-0 shadow-lg transition-transform-280 items-center justify-center data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 data-[state=checked]:rtl:-translate-x-4 data-[state=unchecked]:rtl:-translate-x-0"
        />
      </ASwitchRoot>
    </div>

    <div class="text-sm ms-2">
      <label
        class="color-text font-medium block"
        for="airplane-mode"
      >
        Airplane mode
      </label>
    </div>
  </div>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PSwitch
      v-model="value"
      label="Model value"
      v-bind="props"
    />
    <PSwitch
      label="Default value"
      :default-value="true"
      v-bind="props"
    />
    <PSwitch
      label="Required"
      required
      v-bind="props"
    />
    <PSwitch
      label="Disabled"
      disabled
      v-bind="props"
    />
    <PSwitch
      label="Icon"
      :default-value="true"
      checked-icon="i-lucide-check"
      unchecked-icon="i-lucide-x"
      v-bind="props"
    />
    <PSwitch
      label="Loading"
      loading
      :default-value="true"
      v-bind="props"
    />
    <PSwitch
      label="Loading icon"
      loading
      loading-icon="i-lucide-loader"
      :default-value="true"
      v-bind="props"
    />
    <PSwitch
      label="Description"
      description="This is a description"
      v-bind="props"
    />
  </BaseMatrix>
</template>
