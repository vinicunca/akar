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
          class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
        >
          <ACheckboxRoot
            v-model="checkboxOne"
            class="shadow-blackA7 hover:bg-violet3 appearance-none outline-none rounded-[4px] bg-white flex h-[25px] w-[25px] shadow-[0_2px_10px] items-center justify-center focus-within:shadow-[0_0_0_2px_black]"
          >
            <ACheckboxIndicator
              class="rounded bg-white flex h-full w-full items-center justify-center"
            >
              <Icon
                v-if="checkboxOne === 'indeterminate'"
                icon="radix-icons:divider-horizontal"
                class="text-black h-4 w-4"
              />
              <Icon
                v-else-if="checkboxOne"
                icon="radix-icons:check"
                class="text-black h-4 w-4"
              />
            </ACheckboxIndicator>
          </ACheckboxRoot>
          <span class="select-none">Checkbox</span>
        </label>
        <label
          class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
        >
          <ACheckboxRoot
            disabled
            class="focus-within-within:outline focus-within-within:outline-2 focus-within-within:outline-[#00000066] data-[disabled]:bg-mauve9 rounded bg-white flex h-6 aspect-square shadow items-center justify-center"
          >
            <ACheckboxIndicator
              class="rounded bg-white flex h-full w-full items-center justify-center"
            >
              <Icon
                icon="radix-icons:check"
                class="text-black h-3 w-3"
              />
            </ACheckboxIndicator>
          </ACheckboxRoot>
          <span class="select-none">Disabled Checkbox</span>
        </label>
        <label
          class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
        >
          <ACheckboxRoot
            v-model="checkboxThree"
            required
            class="shadow-blackA7 hover:bg-violet3 appearance-none outline-none rounded-[4px] bg-white flex h-[25px] w-[25px] shadow-[0_2px_10px] items-center justify-center focus-within:shadow-[0_0_0_2px_black]"
          >
            <ACheckboxIndicator
              class="rounded bg-white flex h-full w-full items-center justify-center"
            >
              <Icon
                icon="radix-icons:check"
                class="text-black h-3 w-3"
              />
            </ACheckboxIndicator>
          </ACheckboxRoot>
          <span class="select-none">Required Checkbox</span>
        </label>
      </div>
    </Variant>
  </Story>
</template>
