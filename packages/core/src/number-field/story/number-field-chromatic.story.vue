<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ANumberFieldDecrement, ANumberFieldIncrement, ANumberFieldInput, ANumberFieldRoot } from '..';

const value = ref(5);
</script>

<template>
  <Story
    title="NumberField/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Uncontrolled">
      <ANumberFieldRoot
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
        :default-value="5"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>

    <Variant title="Controlled">
      <ANumberFieldRoot
        v-model="value"
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>

    <Variant title="Decimal">
      <ANumberFieldRoot
        :default-value="0"
        :format-options="{
          signDisplay: 'exceptZero',
          minimumFractionDigits: 1,
          maximumFractionDigits: 2,
        }"
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>

    <Variant title="Percentage">
      <ANumberFieldRoot
        :default-value="0.05"
        :step="0.01"
        :format-options="{
          style: 'percent',
        }"
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>

    <Variant title="Currency values">
      <ANumberFieldRoot
        :default-value="5"
        :format-options="{
          style: 'currency',
          currency: 'EUR',
          currencyDisplay: 'code',
          currencySign: 'accounting',
        }"
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>

    <Variant title="Units">
      <ANumberFieldRoot
        :default-value="5"
        :format-options="{
          style: 'unit',
          unit: 'inch',
          unitDisplay: 'long',
        }"
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>

    <Variant title="Minimum">
      <ANumberFieldRoot
        :default-value="5"
        :min="0"
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>

    <Variant title="Maximum">
      <ANumberFieldRoot
        :default-value="5"
        :max="20"
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>

    <Variant title="Step (3)">
      <ANumberFieldRoot
        :step="3"
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>

    <Variant title="Step (3) + Minimum (2)">
      <ANumberFieldRoot
        :min="2"
        :step="3"
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>

    <Variant title="Step (3) + Minimum (2) + Maximum (21)">
      <ANumberFieldRoot
        :min="2"
        :max="21"
        :step="3"
        class="border-blackA9 bg-blackA7 text-sm text-white border rounded-md flex items-center"
      >
        <ANumberFieldDecrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:minus" />
        </ANumberFieldDecrement>
        <ANumberFieldInput class="p-1 bg-transparent w-20 tabular-nums focus:outline-0" />
        <ANumberFieldIncrement class="p-2 disabled:opacity-20">
          <Icon icon="radix-icons:plus" />
        </ANumberFieldIncrement>
      </ANumberFieldRoot>
    </Variant>
  </Story>
</template>
