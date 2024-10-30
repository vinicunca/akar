<script setup lang="ts">
import { computed, ref } from 'vue';

import type { GenericComponentInstance } from '~~/shared/types';

import { countryList } from '~~/shared';

import { AListboxContent, AListboxItem, AListboxRoot } from '..';

const options = computed(() => countryList.slice(0, 20));
const singleControl = ref();
const multipleControl = ref();

const listboxRef = ref<GenericComponentInstance<typeof AListboxRoot>>();
</script>

<template>
  <Story
    title="AListbox/Chromatic"
    :layout="{ type: 'grid', iframe: false, width: '50%' }"
  >
    <Variant title="Uncontrolled (Single)">
      <AListboxRoot class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9">
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Uncontrolled (Multiple)">
      <AListboxRoot
        :multiple="true"
        class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Controlled (Single)">
      <AListboxRoot
        v-model="singleControl"
        class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Controlled (Multiple)">
      <AListboxRoot
        v-model="multipleControl"
        :multiple="true"
        class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Object (Single)">
      <AListboxRoot class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9">
        <AListboxContent>
          <AListboxItem
            v-for="i in options.map(opt => ({ label: opt, value: opt.toLowerCase() }))"
            :key="i.value"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i.label }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Object (Multiple)">
      <AListboxRoot
        by="value"
        :multiple="true"
        class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options.map(opt => ({ label: opt, value: opt.toLowerCase() }))"
            :key="i.value"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i.label }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Replace behavior (Single)">
      <AListboxRoot
        :default-value="2"
        selection-behavior="replace"
        class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Replace behavior (Multiple)">
      <AListboxRoot
        multiple
        selection-behavior="replace"
        class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Highlight on hover">
      <AListboxRoot
        highlight-on-hover
        class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Highlight imperative">
      <button @click="listboxRef?.highlightItem('Anguilla')">
        Select "Anguilla"
      </button>
      <AListboxRoot
        ref="listboxRef"
        class="mx-auto h-72 w-48 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Orientation (Horizontal)">
      <AListboxRoot
        class="mx-auto h-full w-64 flex flex-col overflow-auto border rounded-lg bg-white p-1 text-green9"
        orientation="horizontal"
      >
        <AListboxContent class="flex flex-row">
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="w-full select-none rounded px-2 py-1 text-sm text-green9 data-[state=checked]:bg-green9 data-[state=checked]:text-white data-[disabled]:opacity-50 data-[highlighted]:outline-1 data-[highlighted]:outline-green9 focus:outline-green9 data-[highlighted]:outline focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>
  </Story>
</template>
