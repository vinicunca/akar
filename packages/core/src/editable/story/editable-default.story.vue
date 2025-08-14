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
        <AEditableArea class="text-green10">
          <AEditablePreview />
          <AEditableInput />
        </AEditableArea>
        <AEditableEditTrigger
          v-if="!isEditing"
          class="text-violet11 shadow-blackA7 hover:bg-mauve3 text-[15px] leading-[35px] font-medium px-[15px] outline-none rounded bg-white inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
        />
        <div
          v-else
          class="flex gap-4"
        >
          <AEditableSubmitTrigger
            class="bg-grass9 shadow-blackA7 hover:bg-grass8 text-[15px] text-white leading-[35px] font-medium px-[15px] outline-none rounded inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
          />
          <AEditableCancelTrigger
            class="text-violet11 shadow-blackA7 hover:bg-mauve3 text-[15px] leading-[35px] font-medium px-[15px] outline-none rounded bg-white inline-flex h-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
          />
        </div>
      </AEditableRoot>
    </Variant>
  </Story>
</template>
