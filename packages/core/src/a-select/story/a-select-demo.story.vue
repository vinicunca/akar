<script setup lang="ts">
import { ref } from 'vue'
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
} from '..'
import ASelectItemWrapper from './_a-select-item.vue'

const fruit = ref(['Apple'])

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']

const POSITION = ['item-aligned', 'popper'] as const
</script>

<template>
  <Story
    title="ASelect/Demo"
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
            class="min-w-[160px] inline-flex items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
            aria-label="Customise options"
          >
            <ASelectValue placeholder="Please select a fruit" />
            <i
              class="i-i-radix-icons:chevron-down h-4 w-4"
            />
          </ASelectTrigger>

          <ASelectPortal>
            <Transition>
              <ASelectContent
                class="min-w-[160px] bg-white overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                :side-offset="5"
                :position="position"
              >
                <ASelectScrollUpButton
                  class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                >
                  <i class="i-radix-icons:chevron-up" />
                </ASelectScrollUpButton>

                <ASelectViewport class="p-[5px]">
                  <ASelectLabel
                    class="px-[25px] text-xs leading-[25px] text-mauve11"
                  >
                    Fruits
                  </ASelectLabel>
                  <ASelectGroup>
                    <ASelectItemWrapper :options="options" />
                  </ASelectGroup>
                  <ASelectSeparator class="h-[1px] bg-violet6 m-[5px]" />
                  <ASelectLabel
                    class="px-[25px] text-xs leading-[25px] text-mauve11"
                  >
                    Vegetables
                  </ASelectLabel>
                  <ASelectGroup>
                    <ASelectItem
                      v-for="(option, index) in vegetables"
                      :key="index"
                      class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                      :value="option"
                      :disabled="option === 'Courgette'"
                    >
                      <ASelectItemIndicator
                        class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                      >
                        <i class="i-radix-icons:check" />
                      </ASelectItemIndicator>
                      <ASelectItemText>
                        {{ option }}
                      </ASelectItemText>
                    </ASelectItem>
                  </ASelectGroup>
                </ASelectViewport>

                <ASelectScrollDownButton
                  class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"
                >
                  <i class="i-i-radix-icons:chevron-down" />
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
  transition: opacity .3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
