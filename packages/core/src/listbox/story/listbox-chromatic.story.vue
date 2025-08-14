<script setup lang="ts">
import type { GenericComponentInstance } from '~~/shared/types';
import { computed, ref } from 'vue';
import { countryList } from '~~/shared/constant';
import { AListboxContent, AListboxItem, AListboxRoot } from '..';

const options = computed(() => countryList.slice(0, 20));
const singleControl = ref();
const multipleControl = ref();

const listboxRef = ref<GenericComponentInstance<typeof AListboxRoot>>();
</script>

<template>
  <Story
    title="Listbox/Chromatic"
    :layout="{ type: 'grid', iframe: false, width: '50%' }"
  >
    <Variant title="Uncontrolled (Single)">
      <AListboxRoot class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto">
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Uncontrolled (Multiple)">
      <AListboxRoot
        :multiple="true"
        class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Controlled (Single)">
      <AListboxRoot
        v-model="singleControl"
        class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
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
        class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Object (Single)">
      <AListboxRoot class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto">
        <AListboxContent>
          <AListboxItem
            v-for="i in options.map(opt => ({ label: opt, value: opt.toLowerCase() }))"
            :key="i.value"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
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
        class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options.map(opt => ({ label: opt, value: opt.toLowerCase() }))"
            :key="i.value"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
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
        class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
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
        class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Highlight on hover">
      <AListboxRoot
        highlight-on-hover
        class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
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
        class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-72 w-48 overflow-auto"
      >
        <AListboxContent>
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>

    <Variant title="Orientation (Horizontal)">
      <AListboxRoot
        class="text-green9 mx-auto p-1 border rounded-lg bg-white flex flex-col h-full w-64 overflow-auto"
        orientation="horizontal"
      >
        <AListboxContent class="flex flex-row">
          <AListboxItem
            v-for="i in options"
            :key="i"
            :value="i"
            class="text-green9 data-[state=checked]:bg-green9 data-[highlighted]:outline-green9 focus:outline-green9 text-sm px-2 py-1 rounded w-full select-none data-[state=checked]:text-white data-[highlighted]:outline-1 data-[highlighted]:outline data-[disabled]:opacity-50 focus:ring-0"
          >
            {{ i }}
          </AListboxItem>
        </AListboxContent>
      </AListboxRoot>
    </Variant>
  </Story>
</template>
