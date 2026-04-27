<script setup lang="ts">
import theme from '#build/pohon/avatar'

const sizes = Object.keys(theme.variants.size)

const attrs = reactive({
  size: [theme.defaultVariants.size]
})
</script>

<template>
  <Navbar>
    <PSelect v-model="attrs.size" :items="sizes" multiple />
  </Navbar>

  <Matrix v-slot="props" :attrs="attrs">
    <PAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" v-bind="props" />
    <PAvatar icon="i-lucide-image" v-bind="props" />
    <PAvatar alt="Benjamin Canac" v-bind="props" />
    <PAvatar :text="props?.size" v-bind="props" />

    <PAvatarGroup v-bind="props" :max="2">
      <PChip inset text="1">
        <PAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
      </PChip>
      <PAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
      <PAvatar src="https://github.com/noook.png" alt="Neil Richter" />
    </PAvatarGroup>

    <PAvatarGroup v-bind="props" :max="4">
      <PAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
      <PAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
      <PAvatar src="https://github.com/noook.png" alt="Neil Richter" />
    </PAvatarGroup>
  </Matrix>
</template>
