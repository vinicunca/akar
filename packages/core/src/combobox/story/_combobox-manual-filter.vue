<script setup lang="ts">
import type { AComboboxInputProps, AComboboxRootProps } from '..';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { useFilter } from '~~/shared';
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

const query = ref('');
const { startsWith } = useFilter({ sensitivity: 'base' });
const filteredPeople = computed(() => people.filter((p) => startsWith({
  string: p.name,
  substring: query.value,
})));
</script>

<template>
  <AComboboxRoot
    v-bind="props"
    v-model="v"
    v-model:open="open"
    name="test"
  >
    <AComboboxAnchor class="h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] text-grass11 leading-none shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 data-[placeholder]:text-grass9 focus:shadow-[0_0_0_2px] focus:shadow-black">
      <AComboboxInput
        v-bind="props.input"
        class="bg-transparent text-grass11 outline-none placeholder-gray-400"
        placeholder="Placeholder..."
        @change="(ev: InputEvent) => query = (ev.target as HTMLInputElement)?.value"
      />
      <AComboboxTrigger>
        <Icon
          icon="radix-icons:chevron-down"
          class="h-4 w-4 text-grass11"
        />
      </AComboboxTrigger>
    </AComboboxAnchor>
    <AComboboxContent class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
      <AComboboxViewport class="p-[5px]">
        <AComboboxGroup>
          <AComboboxLabel class="px-[25px] text-xs text-mauve11 leading-[25px]">
            People
          </AComboboxLabel>

          <AComboboxItem
            v-for="(option, index) in filteredPeople"
            :key="index"
            class="relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-grass11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-grass9 data-[disabled]:text-mauve8 data-[highlighted]:text-grass1 data-[highlighted]:outline-none"
            :value="option"
          >
            <AComboboxItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
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
