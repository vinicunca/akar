<script setup lang="ts">
import type { AStepperRootProps } from '..';
import { AStepperDescription, AStepperIndicator, AStepperItem, AStepperRoot, AStepperSeparator, AStepperTitle, AStepperTrigger } from '..';

const props = defineProps<{ stepperProps?: AStepperRootProps & { steps: Array<{ step: number; title: string; description: string; icon: string; isCompleted?: boolean }> }; emits?: { 'onUpdate:modelValue'?: (data: number) => void } }>();
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
    data-testid="stepper"
    v-bind="props.stepperProps"
  >
    <AStepperItem
      v-for="item in steps"
      :key="item.step"
      :step="item.step"
      :data-testid="`stepper-item-${item.step}`"
    >
      <AStepperTrigger :data-testid="`stepper-item-trigger-${item.step}`">
        <AStepperIndicator
          :data-testid="`stepper-item-indicator-${item.step}`"
        />
        <AStepperTitle :data-testid="`stepper-item-title-${item.step}`">
          {{ item.title }}
        </AStepperTitle>
        <AStepperDescription :data-testid="`stepper-item-description-${item.step}`">
          {{ item.description }}
        </AStepperDescription>
      </AStepperTrigger>
      <AStepperSeparator
        v-if="item.step !== steps[steps.length - 1].step"
        :data-testid="`stepper-item-separator-${item.step}`"
      />
    </AStepperItem>
  </AStepperRoot>
</template>
