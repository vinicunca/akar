<script setup lang="ts">
import type { AAutocompleteRootEmits, AAutocompleteRootProps } from '..';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
  AAutocompleteAnchor,
  AAutocompleteContent,
  AAutocompleteEmpty,
  AAutocompleteGroup,
  AAutocompleteInput,
  AAutocompleteItem,
  AAutocompleteLabel,
  AAutocompleteRoot,
  AAutocompleteSeparator,
  AAutocompleteTrigger,
  AAutocompleteViewport,
} from '..';
import { useForwardPropsEmits } from '../../shared';

const props = defineProps<AAutocompleteRootProps>();
const emits = defineEmits<AAutocompleteRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
const v = ref<string>(props.defaultValue ?? '');

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];

const open = ref(props.open);
</script>

<template>
  <AAutocompleteRoot
    v-bind="forwarded"
    v-model="v"
    v-model:open="open"
    name="test"
  >
    <AAutocompleteAnchor class="text-grass11 hover:bg-mauve3 data-[placeholder]:text-grass9 text-[13px] leading-none px-[15px] outline-none rounded bg-white inline-flex gap-[5px] h-[35px] min-w-[160px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between focus:shadow-[0_0_0_2px] focus:shadow-black">
      <AAutocompleteInput
        class="text-grass11 outline-none bg-transparent placeholder-gray-400"
        placeholder="Placeholder..."
      />
      <AAutocompleteTrigger>
        <Icon
          icon="radix-icons:chevron-down"
          class="text-grass11 h-4 w-4"
        />
      </AAutocompleteTrigger>
    </AAutocompleteAnchor>
    <AAutocompleteContent class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-2 will-change-[opacity,transform] rounded bg-white min-w-[160px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] overflow-hidden">
      <AAutocompleteViewport class="p-[5px]">
        <AAutocompleteEmpty class="text-grass11 text-[13px] leading-none px-[25px] py-[8px]">
          No results found
        </AAutocompleteEmpty>

        <AAutocompleteGroup>
          <AAutocompleteLabel class="text-mauve11 text-xs leading-[25px] px-[25px]">
            Fruits
          </AAutocompleteLabel>

          <AAutocompleteItem
            v-for="(option, index) in options"
            :key="index"
            class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
            :value="option"
          >
            <span>
              {{ option }}
            </span>
          </AAutocompleteItem>
          <AAutocompleteSeparator class="bg-grass6 m-[5px] h-[1px]" />
        </AAutocompleteGroup>

        <AAutocompleteGroup>
          <AAutocompleteLabel
            class="text-mauve11 text-xs leading-[25px] px-[25px]"
          >
            Vegetables
          </AAutocompleteLabel>
          <AAutocompleteItem
            v-for="(option, index) in vegetables"
            :key="index"
            class="text-grass11 data-[disabled]:text-mauve8 data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
            :value="option"
          >
            <span>
              {{ option }}
            </span>
          </AAutocompleteItem>
        </AAutocompleteGroup>
      </AAutocompleteViewport>
    </AAutocompleteContent>
  </AAutocompleteRoot>
</template>
