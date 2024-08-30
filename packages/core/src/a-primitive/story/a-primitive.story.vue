<script lang="ts" setup>
import type { APrimitiveProps } from '~~/a-primitive';

import { APrimitiveButtonExample } from '~~/a-primitive';

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
