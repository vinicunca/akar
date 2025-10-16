<script setup lang="ts">
import theme from '#build/pohon/avatar';
import { PSelect } from '#components';
import { reactive } from 'vue';

const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  size: [theme.defaultVariants.size],
});
</script>

<template>
  <BaseNavbar>
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      multiple
    />
  </BaseNavbar>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PAvatar
      src="https://github.com/praburangki.png"
      alt="Prabu Rangki"
      v-bind="props"
    />
    <PAvatar
      icon="i-lucide-image"
      v-bind="props"
    />
    <PAvatar
      alt="Prabu Rangki"
      v-bind="props"
    />
    <PAvatar
      :text="props?.size"
      v-bind="props"
    />

    <PAvatarGroup
      v-bind="props"
      :max="2"
    >
      <PChip
        inset
        text="1"
      >
        <PAvatar
          src="https://github.com/praburangki.png"
          alt="Prabu Rangki"
        />
      </PChip>
      <PAvatar
        src="https://github.com/wahyu-ivan.png"
        alt="Wahyu Ganteng"
      />
      <PAvatar
        src="https://github.com/GunawanAhmad.png"
        alt="Gun One"
      />
    </PAvatarGroup>

    <PAvatarGroup
      v-bind="props"
      :max="4"
    >
      <PAvatar
        src="https://github.com/praburangki.png"
        alt="Prabu Rangki"
      />
      <PAvatar
        src="https://github.com/wahyu-ivan.png"
        alt="Wahyu Ganteng"
      />
      <PAvatar
        src="https://github.com/GunawanAhmad.png"
        alt="Gun One"
      />
    </PAvatarGroup>
  </BaseMatrix>
</template>
