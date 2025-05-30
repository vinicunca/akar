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

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];

const data = ref({});

function handleChange(event: any) {
  const formData = new FormData(event.target);
  data.value = Object.fromEntries((formData as any).entries());
}
</script>

<template>
  <Story
    title="Select/Form"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="flex flex-col items-center">
        <form
          class="flex flex-col items-center p-12"
          @submit.prevent="handleChange"
        >
          <label for="fruit">Fruit</label>
          <ASelectRoot
            name="fruit"
            default-value="Apple"
          >
            <ASelectTrigger
              class="h-[35px] min-w-[160px] inline-flex items-center justify-between gap-[5px] rounded bg-white px-[15px] text-[13px] text-violet11 leading-none shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 data-[placeholder]:text-violet9 focus:shadow-[0_0_0_2px] focus:shadow-black"
              aria-label="Customise options"
            >
              <ASelectValue placeholder="Please select a fruit" />
              <Icon
                icon="radix-icons:chevron-down"
                class="h-4 w-4"
              />
            </ASelectTrigger>

            <ASelectPortal>
              <ASelectContent
                class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                :side-offset="5"
                position="popper"
              >
                <ASelectScrollUpButton
                  class="h-[25px] flex cursor-default items-center justify-center bg-white text-violet11"
                >
                  <Icon icon="radix-icons:chevron-up" />
                </ASelectScrollUpButton>

                <ASelectViewport class="p-[5px]">
                  <ASelectLabel
                    class="px-[25px] text-xs text-mauve11 leading-[25px]"
                  >
                    Fruits
                  </ASelectLabel>
                  <ASelectGroup>
                    <ASelectItem
                      v-for="(option, index) in options"
                      :key="index"
                      class="relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-violet11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none"
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
                    class="px-[25px] text-xs text-mauve11 leading-[25px]"
                  >
                    Vegetables
                  </ASelectLabel>
                  <ASelectGroup>
                    <ASelectItem
                      v-for="(option, index) in vegetables"
                      :key="index"
                      class="relative h-[25px] flex select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] text-violet11 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none"
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
                  class="h-[25px] flex cursor-default items-center justify-center bg-white text-violet11"
                >
                  <Icon icon="radix-icons:chevron-down" />
                </ASelectScrollDownButton>
              </ASelectContent>
            </ASelectPortal>
          </ASelectRoot>

          <button type="submit">
            Submit
          </button>
        </form>

        <pre class="whitespace-nowrap text-left">{{ data }}</pre>
      </div>
    </Variant>
  </Story>
</template>
