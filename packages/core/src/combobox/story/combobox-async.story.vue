<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useFetch } from '@vueuse/core';
import { ref } from 'vue';
import { AComboboxAnchor, AComboboxContent, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxRoot, AComboboxTrigger, AComboboxViewport } from '..';

const v = ref<Array<{ id: number }>>([]);

const { data, execute } = useFetch('https://jsonplaceholder.typicode.com/comments', {
  immediate: false,
  initialData: [],
}).get().json<Array<{ id: number }>>();

async function handleOpen(val: boolean) {
  if (val && data.value?.length === 0) {
    execute();
  }
}
</script>

<template>
  <Story
    title="Combobox/Async"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <AComboboxRoot
        v-model="v"
        @update:open="handleOpen"
        @update:model-value="v => {
          console.log(v)
        }"
      >
        <AComboboxAnchor class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
          <AComboboxInput
            class="text-grass11 bg-transparent outline-none placeholder-gray-400"
            placeholder="Test"
          />
          <AComboboxTrigger>
            <Icon
              icon="radix-icons:chevron-down"
              class="text-grass11 h-4 w-4"
            />
          </AComboboxTrigger>
        </AComboboxAnchor>

        <AComboboxContent class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <AComboboxViewport class="max-h-64 overflow-auto p-[5px]">
            <div
              v-if="!data?.length "
              class="py-2 text-center text-gray-400"
            >
              Loading
            </div>

            <AComboboxItem
              v-for="option in data"
              :key="option.id"
              class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1 relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
              :value="option"
            >
              <AComboboxItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <Icon icon="radix-icons:check" />
              </AComboboxItemIndicator>
              <span>
                {{ option.id }}
              </span>
            </AComboboxItem>
          </AComboboxViewport>
        </AComboboxContent>
      </AComboboxRoot>
    </Variant>
  </Story>
</template>
