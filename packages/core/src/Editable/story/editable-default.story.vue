<script lang="ts" setup>
import { AEditableArea, AEditableCancelTrigger, AEditableEditTrigger, AEditableInput, AEditablePreview, AEditableRoot, AEditableSubmitTrigger } from '..'
</script>

<template>
  <Story
    title="Editable/Default"
    :layout="{ type: 'single' }"
  >
    <Variant title="default">
      <AEditableRoot
        v-slot="{ isEditing }"
        placeholder="Enter text..."
        class="flex flex-col gap-4"
      >
        <AEditableArea class="text-green10">
          <AEditablePreview />
          <AEditableInput />
        </AEditableArea>
        <AEditableEditTrigger
          v-if="!isEditing"
          class="inline-flex items-center justify-center rounded font-medium text-[15px] px-[15px] leading-[35px] h-[35px] bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        />
        <div
          v-else
          class="flex gap-4"
        >
          <AEditableSubmitTrigger
            class="inline-flex items-center justify-center rounded font-medium text-[15px] px-[15px] leading-[35px] h-[35px] bg-grass9 text-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-grass8 focus:shadow-[0_0_0_2px] focus:shadow-black"
          />
          <AEditableCancelTrigger
            class="inline-flex items-center justify-center rounded font-medium text-[15px] px-[15px] leading-[35px] h-[35px] bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          />
        </div>
      </AEditableRoot>
    </Variant>
  </Story>
</template>
