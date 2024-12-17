<script setup lang="ts">
import type { AMenuItemEmits } from '..';
import { AMenuGroup, AMenuItem, AMenuLabel, AMenuSeparator } from '..';
import MenuWithAnchor from './_menu-with-anchor.vue';

const emits = defineEmits<AMenuItemEmits>();

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
  <MenuWithAnchor>
    <AMenuGroup
      v-for="(foodGroup, index) in foodGroups"
      :key="index"
    >
      <AMenuLabel
        v-if="foodGroup.label"
        class="my-2 h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3] px-[10px] text-black text-gray-400 leading-[1]"
      >
        {{ foodGroup.label }}
      </AMenuLabel>
      <AMenuItem
        v-for="(food, i) in foodGroup.foods"
        :key="i"
        class="h-[25px] flex cursor-default select-none items-center justify-between whitespace-nowrap rounded-[3px] px-[10px] text-black leading-[1] outline-none data-[highlighted]:bg-black data-[disabled]:text-gray-100 data-[highlighted]:text-white"
        @select="emits('select', $event)"
      >
        {{ food.label }}
      </AMenuItem>
      <AMenuSeparator v-if="index < foodGroups.length - 1" />
    </AMenuGroup>
  </MenuWithAnchor>
</template>
