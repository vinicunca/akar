<script setup lang="ts">
import type { AComboboxInputProps, AComboboxRootProps } from '..';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { AComboboxAnchor, AComboboxContent, AComboboxGroup, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxLabel, AComboboxRoot, AComboboxTrigger, AComboboxViewport } from '..';

const props = defineProps<AComboboxRootProps & { input?: AComboboxInputProps }>();
const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];
const v = ref<any>(people[0]);
const open = ref(props.open);
</script>

<template>
  <AComboboxRoot
    v-bind="props"
    v-model="v"
    v-model:open="open"
    name="test"
  >
    <AComboboxAnchor class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 text-[13px] leading-none px-[15px] outline-none rounded bg-white inline-flex gap-[5px] h-[35px] min-w-[160px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between focus:shadow-[0_0_0_2px] focus:shadow-black">
      <AComboboxInput
        v-bind="props.input"
        class="text-grass11 outline-none bg-transparent placeholder-gray-400"
        placeholder="Placeholder..."
      />
      <AComboboxTrigger>
        <Icon
          icon="radix-icons:chevron-down"
          class="text-grass11 h-4 w-4"
        />
      </AComboboxTrigger>
    </AComboboxAnchor>
    <AComboboxContent class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 will-change-[opacity,transform] rounded bg-white min-w-[160px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] overflow-hidden">
      <AComboboxViewport class="p-[5px]">
        <AComboboxGroup>
          <AComboboxLabel class="text-mauve11 text-xs leading-[25px] px-[25px]">
            People
          </AComboboxLabel>

          <AComboboxItem
            v-for="(option, index) in people"
            :key="index"
            class="text-grass11 data-[highlighted]:bg-grass9 data-[disabled]:text-mauve8 data-[highlighted]:text-grass1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
            :value="option"
          >
            <AComboboxItemIndicator
              class="inline-flex w-[25px] items-center left-0 justify-center absolute"
            >
              <Icon icon="radix-icons:check" />
            </AComboboxItemIndicator>
            <span>
              {{ option.name }}
            </span>
          </AComboboxItem>
        </AComboboxGroup>
      </AComboboxViewport>
    </AComboboxContent>
  </AComboboxRoot>
</template>
