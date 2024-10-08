<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from '..';

const rootOpen = ref(false);
const rootDisabled = ref(false);
</script>

<template>
  <Story
    title="ACollapsible/Demo"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <ACollapsibleRoot
        v-model:open="rootOpen"
        class="w-[300px]"
        :disabled="rootDisabled"
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <span class="text-[15px] text-white leading-[25px]">
            @peduarte starred 3 repos
          </span>
          <ACollapsibleTrigger
            class="h-[25px] w-[25px] inline-flex cursor-default items-center justify-center rounded-full text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none data-[state=closed]:bg-white data-[state=open]:bg-violet3 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            <Icon
              v-if="rootOpen"
              icon="radix-icons:cross-2"
              class="h-3.5 w-3.5"
            />
            <Icon
              v-else
              icon="radix-icons:row-spacing"
              class="h-3.5 w-3.5"
            />
          </ACollapsibleTrigger>
        </div>

        <div
          class="my-[10px] rounded bg-white p-[10px] shadow-[0_2px_10px] shadow-blackA7"
        >
          <span class="text-[15px] text-violet11 leading-[25px]">radix-vue/radix-vue</span>
        </div>

        <ACollapsibleContent class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
          <div
            class="my-[10px] rounded bg-white p-[10px] shadow-[0_2px_10px] shadow-blackA7"
          >
            <span class="text-[15px] text-violet11 leading-[25px]">vuejs/core</span>
          </div>
          <div
            class="my-[10px] rounded bg-white p-[10px] shadow-[0_2px_10px] shadow-blackA7"
          >
            <span class="text-[15px] text-violet11 leading-[25px]">@radix-ui/primitives</span>
          </div>
        </ACollapsibleContent>
      </ACollapsibleRoot>
    </Variant>
  </Story>
</template>
