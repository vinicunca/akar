<script lang="ts" setup>
import { AEditableArea, AEditableCancelTrigger, AEditableEditTrigger, AEditableInput, AEditablePreview, AEditableRoot, AEditableSubmitTrigger } from '..';
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
        <AEditableArea class="color-green10">
          <AEditablePreview />
          <AEditableInput />
        </AEditableArea>
        <AEditableEditTrigger
          v-if="!isEditing"
          class="h-[35px] inline-flex items-center justify-center rounded bg-white px-[15px] text-[15px] text-violet11 font-medium leading-[35px] shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        />
        <div
          v-else
          class="flex gap-4"
        >
          <AEditableSubmitTrigger
            class="h-[35px] inline-flex items-center justify-center rounded bg-grass9 px-[15px] text-[15px] text-white font-medium leading-[35px] shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-grass8 focus:shadow-[0_0_0_2px] focus:shadow-black"
          />
          <AEditableCancelTrigger
            class="h-[35px] inline-flex items-center justify-center rounded bg-white px-[15px] text-[15px] text-violet11 font-medium leading-[35px] shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          />
        </div>
      </AEditableRoot>
    </Variant>
  </Story>
</template>
