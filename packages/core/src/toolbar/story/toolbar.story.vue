<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
  AToolbarButton,
  AToolbarLink,
  AToolbarRoot,
  AToolbarSeparator,
  AToolbarToggleGroup,
  AToolbarToggleItem,
} from '..';

const toggleStateSingle = ref('center');
const toggleStateMultiple = ref([]);
</script>

<template>
  <Story
    title="AToolbar/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <AToolbarRoot
        class="shadow-blackA7 p-[10px] rounded-md bg-white flex min-w-max w-full shadow-[0_2px_10px]"
        aria-label="Formatting options"
      >
        <AToolbarToggleGroup
          v-model="toggleStateMultiple"
          type="multiple"
          aria-label="Text formatting"
        >
          <AToolbarToggleItem
            class="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 text-[13px] leading-none ml-0.5 px-[5px] outline-none rounded bg-white inline-flex flex-shrink-0 flex-grow-0 basis-auto h-[25px] items-center justify-center first:ml-0 focus:shadow-[0_0_0_2px] focus:relative"
            value="bold"
            aria-label="Bold"
          >
            <Icon icon="radix-icons:font-bold" />
          </AToolbarToggleItem>
          <AToolbarToggleItem
            class="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 text-[13px] leading-none ml-0.5 px-[5px] outline-none rounded bg-white inline-flex flex-shrink-0 flex-grow-0 basis-auto h-[25px] items-center justify-center first:ml-0 focus:shadow-[0_0_0_2px] focus:relative"
            value="italic"
            aria-label="Italic"
          >
            <Icon icon="radix-icons:font-italic" />
          </AToolbarToggleItem>
          <AToolbarToggleItem
            class="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 text-[13px] leading-none ml-0.5 px-[5px] outline-none rounded bg-white inline-flex flex-shrink-0 flex-grow-0 basis-auto h-[25px] items-center justify-center first:ml-0 focus:shadow-[0_0_0_2px] focus:relative"
            value="strikethrough"
            aria-label="Strike through"
          >
            <Icon icon="radix-icons:strikethrough" />
          </AToolbarToggleItem>
        </AToolbarToggleGroup>
        <AToolbarSeparator class="bg-mauve6 mx-[10px] w-[1px]" />
        <AToolbarToggleGroup
          v-model="toggleStateSingle"
          type="single"
          aria-label="Text Alignment"
        >
          <AToolbarToggleItem
            class="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 text-[13px] leading-none ml-0.5 px-[5px] outline-none rounded bg-white inline-flex flex-shrink-0 flex-grow-0 basis-auto h-[25px] items-center justify-center first:ml-0 focus:shadow-[0_0_0_2px] focus:relative"
            value="left"
            aria-label="Left Aligned"
          >
            <Icon icon="radix-icons:text-align-left" />
          </AToolbarToggleItem>
          <AToolbarToggleItem
            class="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 text-[13px] leading-none ml-0.5 px-[5px] outline-none rounded bg-white inline-flex flex-shrink-0 flex-grow-0 basis-auto h-[25px] items-center justify-center first:ml-0 focus:shadow-[0_0_0_2px] focus:relative"
            value="center"
            aria-label="Center Aligned"
          >
            <Icon icon="radix-icons:text-align-center" />
          </AToolbarToggleItem>
          <AToolbarToggleItem
            class="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 text-[13px] leading-none ml-0.5 px-[5px] outline-none rounded bg-white inline-flex flex-shrink-0 flex-grow-0 basis-auto h-[25px] items-center justify-center first:ml-0 focus:shadow-[0_0_0_2px] focus:relative"
            value="right"
            aria-label="Right Aligned"
          >
            <Icon icon="radix-icons:text-align-right" />
          </AToolbarToggleItem>
        </AToolbarToggleGroup>
        <AToolbarSeparator class="bg-mauve6 mx-[10px] w-[1px]" />
        <AToolbarLink
          class="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 text-[13px] leading-none ml-0.5 px-[5px] outline-none rounded bg-transparent bg-white inline-flex flex-shrink-0 flex-grow-0 basis-auto h-[25px] items-center justify-center first:ml-0 hover:bg-transparent hover:cursor-pointer focus:shadow-[0_0_0_2px] focus:relative"
          href="#"
          target="_blank"
          style="margin-right: 10"
        >
          Edited 2 hours ago
        </AToolbarLink>
        <AToolbarButton
          class="bg-violet9 hover:bg-violet10 focus:shadow-violet7 text-[13px] text-white leading-none px-[10px] outline-none rounded inline-flex flex-shrink-0 flex-grow-0 basis-auto h-[25px] items-center justify-center focus:shadow-[0_0_0_2px] focus:relative"
          style="margin-left: auto"
        >
          Share
        </AToolbarButton>
      </AToolbarRoot>
    </Variant>
  </Story>
</template>
