<script setup lang="ts">
import type { ASelectRootEmits, ASelectRootProps } from '..';
import { Icon } from '@iconify/vue';
import { useForwardPropsEmits } from '~~/shared';
import {
  ASelectContent,
  ASelectGroup,
  ASelectItem,
  ASelectItemIndicator,
  ASelectItemText,
  ASelectLabel,
  ASelectPortal,
  ASelectRoot,

  ASelectSeparator,
  ASelectTrigger,
  ASelectValue,
  ASelectViewport,
} from '..';

const props = withDefaults(defineProps<ASelectRootProps & { options?: Array<any> }>(), {
  options: () => ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'],
});
const emits = defineEmits<ASelectRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <div>
    <ASelectRoot
      v-bind="forwarded"
      name="test"
      aria-label="Fruits"
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

      <ASelectPortal to="#here">
        <ASelectContent
          class="will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[160px] overflow-hidden rounded bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          :side-offset="5"
          position="popper"
        >
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
          </ASelectViewport>
        </ASelectContent>
      </ASelectPortal>
    </ASelectRoot>

    <div id="here" />
  </div>
</template>
