<script setup lang="ts">
import type { AStepperRootEmits, AStepperRootProps } from '..';
import { Icon } from '@iconify/vue';
import { useForwardPropsEmits } from '~~/shared';
import { AStepperDescription, AStepperIndicator, AStepperItem, AStepperRoot, AStepperSeparator, AStepperTitle, AStepperTrigger } from '..';

const props = defineProps<AStepperRootProps>();
const emits = defineEmits<AStepperRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const steps = [{
  step: 1,
  title: 'Address',
  description: 'Add your address here',
  icon: 'radix-icons:home',
}, {
  step: 2,
  title: 'Shipping',
  description: 'Set your preferred shipping method',
  icon: 'radix-icons:archive',
}, {
  step: 3,
  title: 'Trade-in',
  description: 'Add any trade-in items you have',
  icon: 'radix-icons:update',
}, {
  step: 4,
  title: 'Payment',
  description: 'Add any payment information you have',
  icon: 'radix-icons:sketch-logo',
}, {
  step: 5,
  title: 'Checkout',
  description: 'Confirm your order',
  icon: 'radix-icons:check',
}];
</script>

<template>
  <AStepperRoot
    v-bind="forwarded"
    class="flex gap-2 data-[orientation=vertical]:flex-col"
  >
    <AStepperItem
      v-for="item in steps"
      :key="item.step"
      class="group p-1 flex basis-1/5 gap-2 cursor-pointer items-center data-[orientation=vertical]:flex-col data-[disabled]:pointer-events-none"
      :step="item.step"
    >
      <AStepperTrigger class="p-1 text-center rounded-md flex flex-col gap-2 items-center focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
        <AStepperIndicator
          class="text-grass11 group-data-[state=active]:bg-mauve12 group-data-[state=completed]:bg-green9 group-data-[state=active]:shadow-mauve12 group-data-[state=completed]:shadow-green9 rounded-full bg-white inline-flex shrink-0 h-10 w-10 shadow-[0_0_0_2px] items-center justify-center group-data-[disabled]:text-gray-400 group-data-[state=active]:text-white group-data-[state=completed]:text-white"
        >
          <Icon
            :icon="item.icon"
            class="h-6 w-6"
          />
        </AStepperIndicator>
        <div class="flex flex-col">
          <AStepperTitle class="text-base text-black font-medium">
            {{ item.title }}
          </AStepperTitle>
          <AStepperDescription class="text-sm text-black">
            {{ item.description }}
          </AStepperDescription>
        </div>
      </AStepperTrigger>
      <AStepperSeparator
        v-if="item.step !== steps[steps.length - 1].step"
        class="bg-green5 group-data-[state=completed]:bg-green9 h-px w-full group-data-[disabled]:bg-gray-300 group-data-[orientation=vertical]:h-[100px] group-data-[orientation=vertical]:w-px"
      />
    </AStepperItem>
  </AStepperRoot>
</template>
