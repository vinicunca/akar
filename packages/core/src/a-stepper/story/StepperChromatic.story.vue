<script setup lang="ts">
import AStepper from './_DummyAStepper.vue'
import { ref } from 'vue'

const defaultValue = ref(2)
const modelValue = ref(defaultValue)
</script>

<template>
  <Story
    title="AStepper/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Uncontrolled">
      <AStepper :default-value="defaultValue" />
    </Variant>

    <Variant title="Controlled">
      <AStepper v-model="modelValue" />
    </Variant>

    <Variant title="Empty default">
      <AStepper />
    </Variant>

    <Variant title="Default value">
      <AStepper :default-value="defaultValue" />
    </Variant>

    <Variant title="Linear">
      <AStepper linear />
    </Variant>

    <Variant title="Free">
      <AStepper :linear="false" />
    </Variant>

    <Variant title="Vertical">
      <AStepper orientation="vertical" />
    </Variant>
  </Story>
</template>
