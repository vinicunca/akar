<script setup lang="ts">
import { ACheckboxIndicator, ACheckboxRoot } from 'akar';
import { ref } from 'vue';

const checkboxOne = ref(true);
</script>

<template>
  <div class="flex flex-row items-start relative">
    <div class="flex h-5 items-center">
      <ACheckboxRoot
        v-model="checkboxOne"
        class="rounded-sm size-4 ring ring-ring-accented ring-inset overflow-hidden focus-visible:(outline-2 outline-primary outline-offset-2)"
      >
        <ACheckboxIndicator class="color-text-inverted bg-primary flex size-full items-center justify-center">
          <i
            class="i-lucide:check shrink-0 size-full"
          />
        </ACheckboxIndicator>
      </ACheckboxRoot>
    </div>

    <div class="text-sm ms-2 w-full">
      <label class="color-text font-medium block">
        Accept terms and conditions.
      </label>
    </div>
  </div>
</template>
