<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectItemText,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,
  ASelectScrollDownButton,
  ASelectScrollUpButton,
  ASelectSeparator,
  ASelectTrigger,
  ASelectValue,
  ASelectViewport,
} from '..';

const fruit = ref('');

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];

const POSITION = ['item-aligned', 'popper'] as const;
</script>

<template>
  <ASelectRoot
    v-for="position in POSITION"
    :key="position"
    v-model="fruit"
    aria-label="Fruits"
  >
    <ASelectTrigger
      class="text-violet11 hover:bg-mauve3 h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none data-[placeholder]:text-violet9 focus:shadow-[0_0_0_2px] focus:shadow-black"
      aria-label="Customise options"
    >
      <ASelectValue placeholder="Please select a fruit">
        {{ fruit }}
      </ASelectValue>
      <Icon
        icon="radix-icons:chevron-down"
        class="h-4 w-4"
      />
    </ASelectTrigger>

    <ASelectPortal>
      <ASelectContent
        class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        :side-offset="5"
        :position="position"
      >
        <ASelectScrollUpButton
          class="text-violet11 h-[25px] flex cursor-default items-center justify-center bg-white"
        >
          <Icon icon="radix-icons:chevron-up" />
        </ASelectScrollUpButton>

        <ASelectViewport class="p-[5px]">
          <ASelectLabel
            class="text-mauve11 px-[25px] text-xs leading-[25px]"
          >
            Fruits
          </ASelectLabel>
          <ASelectGroup>
            <ASelectItem
              v-for="(option, index) in options"
              :key="index"
              class="text-violet11 data-[disabled]:text-mauve8 relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:outline-none"
              :value="option"
            >
              <ASelectItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <Icon icon="radix-icons:check" />
              </ASelectItemIndicator>
              <ASelectItemText>
                {{ option }}
              </ASelectItemText>
            </ASelectItem>
          </ASelectGroup>
          <ASelectSeparator class="m-[5px] h-[1px] bg-violet6" />
          <ASelectLabel
            class="text-mauve11 px-[25px] text-xs leading-[25px]"
          >
            Vegetables
          </ASelectLabel>
          <ASelectGroup>
            <ASelectItem
              v-for="(option, index) in vegetables"
              :key="index"
              class="text-violet11 data-[disabled]:text-mauve8 relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:outline-none"
              :value="option"
              :disabled="option === 'Courgette'"
            >
              <ASelectItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <Icon icon="radix-icons:check" />
              </ASelectItemIndicator>
              <ASelectItemText>
                {{ option }}
              </ASelectItemText>
            </ASelectItem>
          </ASelectGroup>
        </ASelectViewport>

        <ASelectScrollDownButton
          class="text-violet11 h-[25px] flex cursor-default items-center justify-center bg-white"
        >
          <Icon icon="radix-icons:chevron-down" />
        </ASelectScrollDownButton>
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>
</template>
