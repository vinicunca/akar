<script setup lang="ts">
import { ref } from 'vue';
import {
  APopoverContent,
  APopoverPortal,
  APopoverRoot,
  APopoverTrigger,
} from '..';

const boundary = ref<HTMLElement>();
</script>

<template>
  <Story
    title="Popover/Boundary"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div
        ref="boundary"
        class="h-[200px] w-[200px] border border-3 border-red-600 border-dashed"
      >
        <APopoverRoot>
          <APopoverTrigger
            class="text-violet11 shadow-blackA7 h-[35px] w-[35px] inline-flex cursor-default items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
            aria-label="Update dimensions"
            as-child
          >
            <button>Open</button>
          </APopoverTrigger>
          <APopoverPortal>
            <APopoverContent
              :side-offset="5"
              :collision-boundary="boundary"
              :style="{
                boxSizing: 'border-box',
                borderRadius: '8px',
                padding: '8px',
                color: 'white',
                backgroundColor: 'black',
                width: 'var(--akar-popper-available-width)',
                height: 'var(--akar-popper-available-height)',
              }"
            >
              out of bound out of bound out of bound out of bound out of bound
              out of bound out of bound out of bound out of bound
            </APopoverContent>
          </APopoverPortal>
        </APopoverRoot>
      </div>
    </Variant>
  </Story>
</template>
