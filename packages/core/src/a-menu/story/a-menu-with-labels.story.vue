<script setup lang="ts">
import { AMenuGroup, AMenuItem, AMenuLabel, AMenuSeparator } from '..';
import AMenuWithAnchor from './_a-menu-with-anchor.vue';

function handleSelect(text: string) {
  // eslint-disable-next-line no-console
  console.log({ text });
}

const foodGroups: Array<{
  foods: Array<{ disabled?: boolean; label: string; value: string }>;
  label?: string;
}> = [
  {
    label: 'Fruits',
    foods: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'blueberry', label: 'Blueberry' },
      { value: 'grapes', label: 'Grapes' },
      { value: 'pineapple', label: 'Pineapple' },
    ],
  },
  {
    label: 'Vegetables',
    foods: [
      { value: 'aubergine', label: 'Aubergine' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'carrot', label: 'Carrot', disabled: true },
      { value: 'courgette', label: 'Courgette' },
      { value: 'leek', label: 'Leek' },
    ],
  },
  {
    label: 'Meat',
    foods: [
      { value: 'beef', label: 'Beef' },
      { value: 'beef-with-sauce', label: 'Beef with sauce' },
      { value: 'chicken', label: 'Chicken' },
      { value: 'lamb', label: 'Lamb' },
      { value: 'pork', label: 'Pork' },
    ],
  },
  {
    foods: [
      { value: 'candies', label: 'Candies' },
      { value: 'chocolates', label: 'Chocolates' },
    ],
  },
];
</script>

<template>
  <Story
    group="utilities"
    title="AMenu/WithLabels"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <AMenuWithAnchor>
        <AMenuGroup
          v-for="(foodGroup, index) in foodGroups"
          :key="index"
        >
          <AMenuLabel
            v-if="foodGroup.label"
            class="my-2 h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3] px-[10px] text-gray-400 leading-[1]"
          >
            {{ foodGroup.label }}
          </AMenuLabel>
          <AMenuItem
            v-for="(food, foodIndex) in foodGroup.foods"
            :key="foodIndex"
            class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
            @select="handleSelect(food.value)"
          >
            {{ food.label }}
          </AMenuItem>
          <AMenuSeparator v-if="index < foodGroups.length - 1" />
        </AMenuGroup>
      </AMenuWithAnchor>
    </Variant>
  </Story>
</template>
