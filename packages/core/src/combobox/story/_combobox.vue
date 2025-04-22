<script setup lang="ts">
import type { AComboboxRootEmits, AComboboxRootProps } from '..';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { useFilter, useForwardPropsEmits } from '~~/shared';
import { AComboboxAnchor, AComboboxContent, AComboboxGroup, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxLabel, AComboboxRoot, AComboboxSeparator, AComboboxTrigger, AComboboxViewport } from '..';

const props = defineProps<AComboboxRootProps>();
const emits = defineEmits<AComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
const v = ref<any>(props.multiple ? [] : '');

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];

const open = ref(props.open);

const query = ref('');
const { contains } = useFilter({ sensitivity: 'base' });
const filteredOptions = computed(() => options.filter((p) => contains({ string: p, substring: query.value })));
const filteredVege = computed(() => vegetables.filter((p) => contains({ string: p, substring: query.value })));
</script>

<template>
  <AComboboxRoot
    v-bind="forwarded"
    v-model="v"
    v-model:open="open"
    name="test"
  >
    <AComboboxAnchor class="h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] text-grass11 leading-none shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 data-[placeholder]:text-grass9 focus:shadow-[0_0_0_2px] focus:shadow-black">
      <AComboboxInput
        class="bg-transparent text-grass11 outline-none placeholder-gray-400"
        placeholder="Placeholder..."
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
            Fruits
          </AComboboxLabel>

          <AComboboxItem
            v-for="(option, index) in filteredOptions"
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
              {{ option }}
            </span>
          </AComboboxItem>
          <AComboboxSeparator class="m-[5px] h-[1px] bg-grass6" />
        </AComboboxGroup>

        <AComboboxGroup>
          <AComboboxLabel
            class="px-[25px] text-xs text-mauve11 leading-[25px]"
          >
            Vegetables
          </AComboboxLabel>
          <AComboboxItem
            v-for="(option, index) in filteredVege"
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
              {{ option }}
            </span>
          </AComboboxItem>
        </AComboboxGroup>
      </AComboboxViewport>
    </AComboboxContent>
  </AComboboxRoot>
</template>
