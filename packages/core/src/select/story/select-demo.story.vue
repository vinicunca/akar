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
import SelectItemWrapper from './_SelectItem.vue';

const fruit = ref(['Apple']);

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];

const POSITION = ['item-aligned', 'popper'] as const;
</script>

<template>
  <Story
    title="Select/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="flex gap-4">
        <ASelectRoot
          v-for="position in POSITION"
          :key="position"
          v-model="fruit"
          multiple
        >
          <ASelectTrigger
            class="text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 text-[13px] leading-none px-[15px] outline-none rounded bg-white inline-flex gap-[5px] h-[35px] min-w-[160px] shadow-[0_2px_10px] shadow-black/10 items-center justify-between focus:shadow-[0_0_0_2px] focus:shadow-black"
            aria-label="Customise options"
          >
            <ASelectValue placeholder="Please select a fruit" />
            <Icon
              icon="radix-icons:chevron-down"
              class="h-4 w-4"
            />
          </ASelectTrigger>

          <ASelectPortal>
            <Transition>
              <ASelectContent
                class="rounded bg-white min-w-[160px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] overflow-hidden"
                :side-offset="5"
                :position="position"
              >
                <ASelectScrollUpButton
                  class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center"
                >
                  <Icon icon="radix-icons:chevron-up" />
                </ASelectScrollUpButton>

                <ASelectViewport class="p-[5px]">
                  <ASelectLabel
                    class="text-mauve11 text-xs leading-[25px] px-[25px]"
                  >
                    Fruits
                  </ASelectLabel>
                  <ASelectGroup>
                    <SelectItemWrapper :options="options" />
                  </ASelectGroup>
                  <ASelectSeparator class="bg-violet6 m-[5px] h-[1px]" />
                  <ASelectLabel
                    class="text-mauve11 text-xs leading-[25px] px-[25px]"
                  >
                    Vegetables
                  </ASelectLabel>
                  <ASelectGroup>
                    <ASelectItem
                      v-for="(option, index) in vegetables"
                      :key="index"
                      class="text-violet11 data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 text-[13px] leading-none pl-[25px] pr-[35px] rounded-[3px] flex h-[25px] select-none items-center relative data-[highlighted]:outline-none data-[disabled]:pointer-events-none"
                      :value="option"
                      :disabled="option === 'Courgette'"
                    >
                      <ASelectItemIndicator
                        class="inline-flex w-[25px] items-center left-0 justify-center absolute"
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
                  class="text-violet11 bg-white flex h-[25px] cursor-default items-center justify-center"
                >
                  <Icon icon="radix-icons:chevron-down" />
                </ASelectScrollDownButton>
              </ASelectContent>
            </Transition>
          </ASelectPortal>
        </ASelectRoot>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
