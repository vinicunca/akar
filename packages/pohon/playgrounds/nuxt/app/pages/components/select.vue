<script setup lang="ts">
import type { PAvatarProps, PSelectItem } from 'pohon-ui';
import { useFetch } from '#app';
import theme from '#build/pohon/select';
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
} from 'akar';

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

const statuses = [{
  label: 'Backlog',
  value: 'backlog',
  description: 'Issues that have been identified but not yet prioritized',
  icon: 'i-lucide-circle-help',
}, {
  label: 'Todo',
  value: 'todo',
  description: 'Issues that are ready to be worked on',
  icon: 'i-lucide-circle-plus',
}, {
  label: 'In Progress',
  value: 'in_progress',
  description: 'Issues that are currently being worked on',
  icon: 'i-lucide-circle-arrow-up',
}, {
  label: 'Done',
  value: 'done',
  description: 'Issues that have been completed successfully',
  icon: 'i-lucide-circle-check',
}, {
  label: 'Canceled',
  value: 'canceled',
  description: 'Issues that have been cancelled or rejected',
  icon: 'i-lucide-circle-x',
}] satisfies Array<PSelectItem>;

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  transform: (data: Array<any>) => {
    return data?.map((user) => ({ label: user.name, value: String(user.id), avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || [];
  },
  lazy: true,
});

function getStatusIcon(value: string) {
  return statuses.find((status) => status.value === value)?.icon || 'i-lucide-user';
}

function getUserAvatar(value: string) {
  return users.value?.find((user) => user.value === value)?.avatar || {};
}

const value = ref('Apple');
const valueMultiple = ref([fruits[0]!, vegetables[0]!]);
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

  <ASelectRoot>
    <ASelectTrigger
      class="group text-sm color-text-highlighted px-2.5 py-1.5 pe-9 rounded-md bg-background inline-flex gap-1.5 ring ring-ring-accented ring-inset transition-colors-280 items-center relative focus:(outline-none ring-2 ring-primary ring-inset)"
      aria-label="Customise options"
    >
      <ASelectValue
        class="pointer-events-none truncate"
        placeholder="ASelect a fruit..."
      />
      <span class="pe-2.5 flex items-center end-0 inset-y-0 absolute">
        <span
          class="i-lucide:chevron-down color-text-dimmed shrink-0 size-5"
        />
      </span>
    </ASelectTrigger>

    <ASelectPortal>
      <ASelectContent
        class="rounded-md bg-white flex flex-col max-h-60 w-$akar-select-trigger-width pointer-events-auto ring ring-ring shadow-lg origin-$akar-select-content-transform-origin overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:animate-duration-280 data-[state=open]:animate-duration-280 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:data-[side=bottom]:slide-in-top-5% data-[state=closed]:data-[side=bottom]:slide-out-top-5%"
        :side-offset="5"
      >
        <ASelectViewport class="p-[5px]">
          <ASelectGroup class="p-1 isolate">
            <ASelectLabel class="text-xs color-text-highlighted font-semibold p-1.5 gap-1.5">
              Fruits
            </ASelectLabel>

            <ASelectItem
              v-for="(option, index) in fruits"
              :key="index"
              class="group text-sm p-1.5 outline-none flex gap-1.5 w-full cursor-pointer select-none transition-colors-280 items-center relative data-[state=checked]:color-primary before:(rounded-md content-empty transition-colors-280 inset-px absolute -z-1) data-[disabled]:(opacity-75 cursor-not-allowed) data-[highlighted]:not-[[data-state=checked]]:color-black data-[state=checked]:before:bg-background-elevated data-[highlighted]:not-[[data-state=checked]]:before:bg-primary/30"
              :value="option"
            >
              <ASelectItemText class="flex flex-1 flex-col min-w-0">
                {{ option }}
              </ASelectItemText>

              <span class="ms-auto inline-flex gap-1.5 items-center">
                <ASelectItemIndicator class="shrink-0 size-5">
                  <i class="i-lucide:check" />
                </ASelectItemIndicator>
              </span>
            </ASelectItem>
          </ASelectGroup>
          <ASelectSeparator class="my-1 bg-border h-px -mx-1" />
          <ASelectGroup class="p-1 isolate">
            <ASelectLabel class="text-xs color-text-highlighted font-semibold p-1.5 gap-1.5">
              Vegetables
            </ASelectLabel>
            <ASelectItem
              v-for="(option, index) in vegetables"
              :key="index"
              class="group text-sm p-1.5 outline-none flex gap-1.5 w-full cursor-pointer select-none transition-colors-280 items-center relative data-[state=checked]:color-primary before:(rounded-md content-empty transition-colors-280 inset-px absolute -z-1) data-[disabled]:(opacity-75 cursor-not-allowed) data-[highlighted]:not-[[data-state=checked]]:color-black data-[state=checked]:before:bg-background-elevated data-[highlighted]:not-[[data-state=checked]]:before:bg-primary/30"
              :value="option"
              :disabled="option === 'Courgette'"
            >
              <ASelectItemText class="flex flex-1 flex-col min-w-0">
                {{ option }}
              </ASelectItemText>

              <span class="ms-auto inline-flex gap-1.5 items-center">
                <ASelectItemIndicator class="shrink-0 size-5">
                  <i class="i-lucide:check" />
                </ASelectItemIndicator>
              </span>
            </ASelectItem>
          </ASelectGroup>
        </ASelectViewport>
      </ASelectContent>
    </ASelectPortal>
  </ASelectRoot>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
  >
    <PSelect
      v-model="value"
      :items="items"
      autofocus
      v-bind="props"
    />
    <PSelect
      :default-value="value"
      :items="items"
      v-bind="props"
    />
    <PSelect
      v-model="valueMultiple"
      multiple
      placeholder="Multiple"
      :items="items"
      v-bind="props"
    />
    <PSelect
      :default-value="valueMultiple"
      multiple
      placeholder="Multiple"
      :items="items"
      v-bind="props"
    />
    <PSelect
      placeholder="Highlight"
      highlight
      :items="items"
      v-bind="props"
    />
    <PSelect
      placeholder="Disabled"
      disabled
      :items="items"
      v-bind="props"
    />
    <PSelect
      placeholder="Required"
      required
      :items="items"
      v-bind="props"
    />
    <PSelect
      placeholder="Search..."
      icon="i-lucide-search"
      :items="items"
      v-bind="props"
    />
    <PSelect
      placeholder="Search..."
      trailing-icon="i-lucide-search"
      :items="items"
      v-bind="props"
    />
    <PSelect
      placeholder="Search..."
      :avatar="{ src: 'https://github.com/praburangki.png' }"
      :items="items"
      v-bind="props"
    />
    <PSelect
      placeholder="Loading..."
      loading
      :items="items"
      v-bind="props"
    />
    <PSelect
      placeholder="Loading..."
      loading
      trailing
      :items="items"
      v-bind="props"
    />
    <PSelect
      placeholder="Loading..."
      loading
      icon="i-lucide-search"
      trailing-icon="i-lucide-arrow-right"
      :items="items"
      v-bind="props"
    />
    <PSelect
      placeholder="Search status..."
      icon="i-lucide-search"
      trailing-icon="i-lucide-chevrons-up-down"
      :items="statuses"
      v-bind="props"
    >
      <template #leading="{ modelValue, pohon }">
        <PIcon
          v-if="modelValue"
          :name="getStatusIcon(modelValue)"
          :class="pohon.leadingIcon()"
        />
      </template>
    </PSelect>
    <PSelect
      placeholder="Search users..."
      icon="i-lucide-user"
      ignore-filter
      :loading="status === 'pending'"
      :items="users"
      v-bind="props"
    >
      <template #leading="{ modelValue, pohon }">
        <PAvatar
          v-if="modelValue"
          :size="(pohon.itemLeadingAvatarSize() as PAvatarProps['size'])"
          v-bind="getUserAvatar(modelValue)"
        />
      </template>
    </PSelect>
  </BaseMatrix>
</template>
