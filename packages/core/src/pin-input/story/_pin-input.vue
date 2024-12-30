<script setup lang="ts">
import { ref } from 'vue';
import { ALabel } from '~~/label';
import { useEmitAsProps } from '~~/shared';
import { APinInputInput, APinInputRoot, type APinInputRootEmits, type APinInputRootProps } from '..';

const props = defineProps<APinInputRootProps>();
const emits = defineEmits<APinInputRootEmits>();

const value = ref<Array<string>>([]);
</script>

<template>
  <ALabel for="otp">
    Test label
  </ALabel>

  <APinInputRoot
    v-bind="{ ...props, ...useEmitAsProps(emits) }"
    v-model="value"
    placeholder="*"
    class="flex items-center gap-2"
  >
    <APinInputInput
      v-for="(id, index) in 5"
      :key="id"
      class="text-green10 placeholder:text-mauve5 h-10 w-10 rounded text-center"
      :index="index"
    />
  </APinInputRoot>

  <button @click="value = []">
    Reset value
  </button>
</template>
