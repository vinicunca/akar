<script setup lang="ts">
import { ASeparator } from '.';
</script>

<template>
  <Story
    title="ASeparator/Demo"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <div class="mx-[15px] max-w-[300px] w-full">
        <div class="text-[15px] text-white font-medium leading-5">
          akar UI
        </div>
        <div class="text-[15px] text-white leading-5">
          An open-source UI component library.
        </div>
        <ASeparator
          decorative
          class="my-[15px] bg-[#d7cff9] data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
        />
        <div class="h-5 flex items-center">
          <div class="text-[15px] text-white leading-5">
            Blog
          </div>
          <ASeparator
            class="mx-[15px] bg-[#d7cff9] data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
            decorative
            orientation="vertical"
          />
          <div class="text-[15px] text-white leading-5">
            Docs
          </div>
          <ASeparator
            class="mx-[15px] bg-[#d7cff9] data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
            decorative
            orientation="vertical"
          />
          <div class="text-[15px] text-white leading-5">
            Source
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>
