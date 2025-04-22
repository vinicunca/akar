<script setup lang="ts">
import type { ACheckboxRootProps } from '..';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ACheckboxIndicator, ACheckboxRoot } from '..';

const props = defineProps<ACheckboxRootProps>();
const modelValue = ref(props.modelValue);
</script>

<template>
  <label
    class="flex flex-row items-center gap-4 [&>.checkbox]:hover:bg-neutral-100"
    for="test"
  >
    Test
  </label>
  <ACheckboxRoot
    v-bind="props"
    v-model="modelValue"
    name="test"
    class="h-[25px] w-[25px] flex appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus-within:shadow-[0_0_0_2px_black]"
    aria-label="Test"
  >
    <ACheckboxIndicator
      data-testid="test-indicator"
      class="h-full w-full flex items-center justify-center rounded bg-white"
    >
      <Icon
        icon="radix-icons:check"
        class="h-3 w-3 text-black"
      />
    </ACheckboxIndicator>
  </ACheckboxRoot>
</template>
