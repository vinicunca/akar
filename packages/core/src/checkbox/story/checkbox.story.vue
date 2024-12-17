<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ACheckboxIndicator, ACheckboxRoot } from '..';

const checkboxOne = ref<'indeterminate' | boolean>('indeterminate');
const checkboxThree = ref(false);
</script>

<template>
  <Story
    title="Checkbox/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="flex flex-col gap-2.5">
        <label
          class="flex flex-row items-center gap-4 [&>.checkbox]:hover:bg-neutral-100"
        >
          <ACheckboxRoot
            v-model="checkboxOne"
            class="shadow-blackA7 h-[25px] w-[25px] flex appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none hover:bg-violet3 focus-within:shadow-[0_0_0_2px_black]"
          >
            <ACheckboxIndicator
              class="h-full w-full flex items-center justify-center rounded bg-white"
            >
              <Icon
                v-if="checkboxOne === 'indeterminate'"
                icon="radix-icons:divider-horizontal"
                class="h-4 w-4 text-black"
              />
              <Icon
                v-else-if="checkboxOne"
                icon="radix-icons:check"
                class="h-4 w-4 text-black"
              />
            </ACheckboxIndicator>
          </ACheckboxRoot>
          <span class="select-none">Checkbox</span>
        </label>
        <label
          class="flex flex-row items-center gap-4 [&>.checkbox]:hover:bg-neutral-100"
        >
          <ACheckboxRoot
            disabled
            class="data-[disabled]:bg-mauve9 focus-within-within:outline focus-within-within:outline-2 focus-within-within:outline-[#00000066] aspect-square h-6 flex items-center justify-center rounded bg-white shadow"
          >
            <ACheckboxIndicator
              class="h-full w-full flex items-center justify-center rounded bg-white"
            >
              <Icon
                icon="radix-icons:check"
                class="h-3 w-3 text-black"
              />
            </ACheckboxIndicator>
          </ACheckboxRoot>
          <span class="select-none">Disabled Checkbox</span>
        </label>
        <label
          class="flex flex-row items-center gap-4 [&>.checkbox]:hover:bg-neutral-100"
        >
          <ACheckboxRoot
            v-model="checkboxThree"
            required
            class="shadow-blackA7 h-[25px] w-[25px] flex appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none hover:bg-violet3 focus-within:shadow-[0_0_0_2px_black]"
          >
            <ACheckboxIndicator
              class="h-full w-full flex items-center justify-center rounded bg-white"
            >
              <Icon
                icon="radix-icons:check"
                class="h-3 w-3 text-black"
              />
            </ACheckboxIndicator>
          </ACheckboxRoot>
          <span class="select-none">Required Checkbox</span>
        </label>
      </div>
    </Variant>
  </Story>
</template>
