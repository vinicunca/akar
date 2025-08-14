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
    class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
    for="test"
  >
    Test
  </label>
  <ACheckboxRoot
    v-bind="props"
    v-model="modelValue"
    name="test"
    class="shadow-blackA7 hover:bg-violet3 appearance-none outline-none rounded-[4px] bg-white flex h-[25px] w-[25px] shadow-[0_2px_10px] items-center justify-center focus-within:shadow-[0_0_0_2px_black]"
    aria-label="Test"
  >
    <ACheckboxIndicator
      data-testid="test-indicator"
      class="rounded bg-white flex h-full w-full items-center justify-center"
    >
      <Icon
        icon="radix-icons:check"
        class="text-black h-3 w-3"
      />
    </ACheckboxIndicator>
  </ACheckboxRoot>
</template>
