<script setup lang="ts">
import { AEditableArea, AEditableCancelTrigger, AEditableEditTrigger, AEditableInput, AEditablePreview, AEditableRoot, AEditableSubmitTrigger } from 'akar';
</script>

<template>
  <div class="w-[250px]">
    <AEditableRoot
      v-slot="{ isEditing }"
      default-value="Click to edit 'Akar'"
      placeholder="Enter text..."
      class="flex flex-col gap-4"
      auto-resize
    >
      <AEditableArea class="color-text w-[250px]">
        <AEditablePreview />
        <AEditableInput class="w-full placeholder:color-text-muted" />
      </AEditableArea>
      <AEditableEditTrigger
        v-if="!isEditing"
        class="text-sm color-primary leading-[35px] font-medium px-[15px] outline-none border border-border rounded-lg bg-white inline-flex h-[35px] w-max shadow-sm items-center justify-center hover:bg-stone-50 focus:shadow-[0_0_0_2px] focus:shadow-black"
      />
      <div
        v-else
        class="flex gap-2"
      >
        <AEditableSubmitTrigger
          class="text-sm color-primary leading-[35px] font-medium px-[15px] outline-none border border-border rounded-lg bg-white inline-flex h-[35px] shadow-sm items-center justify-center hover:bg-stone-50 focus:shadow-[0_0_0_2px] focus:shadow-black"
        />
        <AEditableCancelTrigger
          class="text-sm text-white leading-[35px] font-medium px-[15px] outline-none border border-border rounded-lg bg-error inline-flex h-[35px] shadow-sm items-center justify-center hover:bg-error-600 focus:shadow-[0_0_0_2px] focus:shadow-black"
        />
      </div>
    </AEditableRoot>
  </div>
</template>
