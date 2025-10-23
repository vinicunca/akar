<script lang="ts" setup>
import { ALabel, ASwitchRoot, ASwitchThumb } from 'akar';
import { ref } from 'vue';

defineProps<{
  previewClasses?: any;
  codeClasses?: any;
}>();

const isCodeView = ref(false);
</script>

<template>
  <div class="my-5 pt-2 border-t border-border border-dashed">
    <div class="flex w-full justify-end">
      <div class="mb-4 flex items-center">
        <ALabel
          for="view-code"
          class="font-700 cursor-pointer"
        >
          View code
        </ALabel>
        <ASwitchRoot
          id="view-code"
          v-model="isCodeView"
          class="ml-2 rounded-full flex h-5 w-[34px] transition relative data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary/50"
          aria-label="View code"
        >
          <ASwitchThumb
            class="text-xs my-auto will-change-transform rounded-full bg-white flex h-4 w-4 shadow-xl translate-x-0.5 transition-transform items-center justify-center data-[state=checked]:translate-x-full"
          />
        </ASwitchRoot>
      </div>
    </div>

    <div class="relative">
      <slot />

      <div
        v-if="!isCodeView"
        class="not-prose p-4 border border-border-muted bg-background-elevated flex items-center justify-center relative"
        :class="previewClasses"
      >
        <slot name="preview" />
      </div>

      <div
        v-else
        class="border border-border-muted rounded-md rounded-xl max-h-[50vh] overflow-auto"
        :class="codeClasses"
      >
        <slot name="code" />
      </div>
    </div>
  </div>
</template>
