<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { ACollapsibleContent, ACollapsibleRoot, ACollapsibleTrigger } from '..';

const rootOpen = ref(false);
const rootDisabled = ref(false);
</script>

<template>
  <Story
    title="Collapsible/Demo"
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
            class="text-violet11 shadow-blackA7 data-[state=open]:bg-violet3 hover:bg-violet3 outline-none rounded-full inline-flex h-[25px] w-[25px] cursor-default shadow-[0_2px_10px] items-center justify-center data-[state=closed]:bg-white focus:shadow-[0_0_0_2px] focus:shadow-black"
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
          class="shadow-blackA7 my-[10px] p-[10px] rounded bg-white shadow-[0_2px_10px]"
        >
          <span class="text-violet11 text-[15px] leading-[25px]">akar</span>
        </div>

        <ACollapsibleContent class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
          <div
            class="shadow-blackA7 my-[10px] p-[10px] rounded bg-white shadow-[0_2px_10px]"
          >
            <span class="text-violet11 text-[15px] leading-[25px]">vuejs/core</span>
          </div>
          <div
            class="shadow-blackA7 my-[10px] p-[10px] rounded bg-white shadow-[0_2px_10px]"
          >
            <span class="text-violet11 text-[15px] leading-[25px]">@radix-ui/primitives</span>
          </div>
        </ACollapsibleContent>
      </ACollapsibleRoot>
    </Variant>
  </Story>
</template>
