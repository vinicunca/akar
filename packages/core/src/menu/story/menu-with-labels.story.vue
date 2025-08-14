<script setup lang="ts">
import { AMenuGroup, AMenuItem, AMenuLabel, AMenuSeparator } from '..';
import MenuWithAnchor from './_MenuWithAnchor.vue';

function handleSelect(text: string) {
  // eslint-disable-next-line no-console
  console.log({ text });
}

const foodGroups: Array<{
  label?: string;
  foods: Array<{ value: string; label: string; disabled?: boolean }>;
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
    title="Menu/WithLabels"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <MenuWithAnchor>
        <AMenuGroup
          v-for="(foodGroup, index) in foodGroups"
          :key="index"
        >
          <AMenuLabel
            v-if="foodGroup.label"
            class="text-gray-400 leading-[1] my-2 px-[10px] rounded-[3] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between"
          >
            {{ foodGroup.label }}
          </AMenuLabel>
          <AMenuItem
            v-for="(food, foodIndex) in foodGroup.foods"
            :key="foodIndex"
            class="text-black leading-[1] px-[10px] outline-none rounded-[3px] flex h-[25px] cursor-default select-none whitespace-nowrap items-center justify-between data-[disabled]:text-gray-100 data-[highlighted]:text-white data-[highlighted]:bg-black"
            @select="handleSelect(food.value)"
          >
            {{ food.label }}
          </AMenuItem>
          <AMenuSeparator v-if="index < foodGroups.length - 1" />
        </AMenuGroup>
      </MenuWithAnchor>
    </Variant>
  </Story>
</template>
