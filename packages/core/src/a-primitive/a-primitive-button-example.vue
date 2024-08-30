<script lang="ts" setup>
import { APrimitive, type APrimitiveProps } from './a-primitive';

const props = withDefaults(defineProps<APrimitiveProps>(), {
  as: 'button',
});

function handleClick() {
  // eslint-disable-next-line no-alert
  window.alert('primitive button clicked');
}
</script>

<template>
  <APrimitive
    v-bind="props"
    :type="as === 'button' ? 'button' : undefined"
    v-on="{ click: handleClick }"
  >
    <slot />
  </APrimitive>
</template>
