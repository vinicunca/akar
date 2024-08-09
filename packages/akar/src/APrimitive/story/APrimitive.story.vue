<script lang="ts">
import type { APrimitiveProps } from '~~/APrimitive';
</script>

<script lang="ts" setup>
import { APrimitiveButtonExample } from '../';

export interface ADialogCloseProps extends APrimitiveProps {}
</script>

<template>
  <Story
    group="utilities"
    title="Akar Primitive/Button"
  >
    <Variant>
      <h4 class="color-white">
        Akar Primitive as Button Example
      </h4>
      <APrimitiveButtonExample>
        Primitive button
      </APrimitiveButtonExample>
    </Variant>
  </Story>
</template>
