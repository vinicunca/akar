<script setup lang="ts">
import type { PAvatarProps, PInputMenuItem } from 'pohon-ui';
import { useFetch } from '#app';
import theme from '#build/pohon/input-menu';
import { refDebounced } from '@vueuse/core';

import { AComboboxAnchor, AComboboxContent, AComboboxEmpty, AComboboxGroup, AComboboxInput, AComboboxItem, AComboboxItemIndicator, AComboboxLabel, AComboboxPortal, AComboboxRoot, AComboboxSeparator, AComboboxTrigger, AComboboxViewport } from 'akar';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
});

const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];

const items = [[{ label: 'Fruits', type: 'label' as const }, ...fruits], [{ label: 'Vegetables', type: 'label' as const }, ...vegetables]];

const statuses = [
  {
    label: 'Backlog',
    value: 'backlog',
    description: 'Issues that have been identified but not yet prioritized',
    icon: 'i-lucide:circle-help',
  },
  {
    label: 'Todo',
    value: 'todo',
    description: 'Issues that are ready to be worked on',
    icon: 'i-lucide:circle-plus',
  },
  {
    label: 'In Progress',
    value: 'in_progress',
    description: 'Issues that are currently being worked on',
    icon: 'i-lucide:circle-arrow-up',
  },
  {
    label: 'Done',
    value: 'done',
    description: 'Issues that have been completed successfully',
    icon: 'i-lucide:circle-check',
  },
  {
    label: 'Canceled',
    value: 'canceled',
    description: 'Issues that have been cancelled or rejected',
    icon: 'i-lucide:circle-x',
  },
] satisfies Array<PInputMenuItem>;

const searchTerm = ref('');
const searchTermDebounced = refDebounced(searchTerm, 200);

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  params: { q: searchTermDebounced },
  transform: (data: Array<any>) => {
    return data?.map((user) => ({ id: user.id, label: user.name, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || [];
  },
  lazy: true,
});

const value = ref('Apple');
const valueMultiple = ref([fruits[0]!, vegetables[0]!]);

const options = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Orange' },
      { name: 'Honeydew' },
      { name: 'Grapes' },
      { name: 'Watermelon' },
      { name: 'Cantaloupe' },
      { name: 'Pear' },
    ],
  },
  {
    name: 'Vegetable',
    children: [
      { name: 'Cabbage' },
      { name: 'Broccoli' },
      { name: 'Carrots' },
      { name: 'Lettuce' },
      { name: 'Spinach' },
      { name: 'Bok Choy' },
      { name: 'Cauliflower' },
      { name: 'Potatoes' },
    ],
  },
];
</script>

<template>
  <BaseNavbar>
    <PSelect
      v-model="attrs.color"
      :items="colors"
      multiple
    />
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      multiple
    />
    <PSelect
      v-model="attrs.variant"
      :items="variants"
      multiple
    />
  </BaseNavbar>

  <AComboboxRoot
    class="inline-flex items-center relative"
  >
    <AComboboxAnchor
      class="text-sm color-text-highlighted px-2.5 py-1.5 pe-9 border-0 rounded-md bg-background gap-1.5 w-full ring ring-ring-accented ring-inset transition-colors-280 placeholder:color-text-dimmed focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed focus-visible:(ring-2 ring-primary ring-inset)"
      as-child
    >
      <AComboboxInput
        placeholder="Placeholder..."
      />
      <AComboboxTrigger class="group pe-2.5 flex items-center end-0 inset-y-0 absolute disabled:opacity-75 disabled:cursor-not-allowed">
        <i
          class="i-lucide:chevron-down color-text-dimmed shrink-0 size-5"
        />
      </AComboboxTrigger>
    </AComboboxAnchor>

    <AComboboxPortal>
      <AComboboxContent
        side="bottom"
        :side-offset="8"
        position="popper"
        class="rounded-md bg-background flex flex-col max-h-60 w-$akar-combobox-trigger-width pointer-events-auto ring ring-ring shadow-lg origin-$akar-combobox-content-transform-origin overflow-hidden data-[state=closed]:(animate-out fade-out-0 zoom-out-95) data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
      >
        <AComboboxViewport class="flex-1 relative overflow-y-auto scroll-py-1">
          <AComboboxEmpty class="color-text-muted text-center" />
          <template
            v-for="(group, index) in options"
            :key="group.name"
          >
            <AComboboxGroup class="p-1 isolate">
              <AComboboxSeparator
                v-if="index !== 0"
                class="my-1 bg-border h-px -mx-1"
              />
              <AComboboxLabel class="text-xs color-text-highlighted font-semibold p-1.5 gap-1.5">
                {{ group.name }}
              </AComboboxLabel>
              <AComboboxItem
                v-for="option in group.children"
                :key="option.name"
                :value="option.name"
                class="group text-sm color-text p-1.5 outline-none flex gap-1.5 w-full cursor-pointer select-none transition-colors-280 items-start relative before:(rounded-md content-empty transition-colors-280 inset-px absolute -z-1) data-[disabled]:(opacity-75 cursor-not-allowed) data-[highlighted]:not-[[data-disabled]]:color-text-highlighted data-[highlighted]:not-[[data-disabled]]:before:bg-background-elevated/50"
              >
                <span class="flex flex-1 flex-col min-w-0">
                  {{ option.name }}
                </span>

                <span class="ms-auto inline-flex gap-1.5 items-center">
                  <AComboboxItemIndicator
                    as-child
                  >
                    <i class="i-lucide:check shrink-0 size-5" />
                  </AComboboxItemIndicator>
                </span>
              </AComboboxItem>
            </AComboboxGroup>
          </template>
        </AComboboxViewport>
      </AComboboxContent>
    </AComboboxPortal>
  </AComboboxRoot>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PInputMenu
      v-model="value"
      :items="items"
      autofocus
      v-bind="props"
    />
    <PInputMenu
      :default-value="value"
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      v-model="valueMultiple"
      multiple
      placeholder="Multiple"
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      :default-value="valueMultiple"
      multiple
      placeholder="Multiple"
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      placeholder="Highlight"
      highlight
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      placeholder="Disabled"
      disabled
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      placeholder="Required"
      required
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      placeholder="Search..."
      icon="i-lucide:search"
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      placeholder="Search..."
      trailing-icon="i-lucide:search"
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      placeholder="Search..."
      :avatar="{ src: 'https://github.com/praburangki.png' }"
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      placeholder="Loading..."
      loading
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      placeholder="Loading..."
      loading
      trailing
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      placeholder="Loading..."
      loading
      icon="i-lucide:search"
      trailing-icon="i-lucide:arrow-right"
      :items="items"
      v-bind="props"
    />
    <PInputMenu
      placeholder="Search status..."
      icon="i-lucide:search"
      trailing-icon="i-lucide:chevrons-up-down"
      :items="statuses"
      v-bind="props"
    >
      <template #leading="{ modelValue, pohon }">
        <PIcon
          v-if="modelValue"
          :name="modelValue.icon"
          :class="pohon.leadingIcon()"
        />
      </template>
    </PInputMenu>
    <PInputMenu
      v-model:search-term="searchTerm"
      placeholder="Search users..."
      icon="i-lucide:user"
      ignore-filter
      :items="users"
      :loading="status === 'pending'"
      v-bind="props"
    >
      <template #leading="{ modelValue, pohon }">
        <PAvatar
          v-if="modelValue"
          :size="(pohon.itemLeadingAvatarSize() as PAvatarProps['size'])"
          v-bind="modelValue.avatar"
        />
      </template>
    </PInputMenu>
    <PInputMenu
      icon="i-lucide:layout-list"
      placeholder="Search virtualized..."
      virtualize
      :items="[Array(1000).fill(0).map((_, i) => ({ label: `item-${i}`, value: i }))]"
      v-bind="props"
    />
  </BaseMatrix>
</template>
