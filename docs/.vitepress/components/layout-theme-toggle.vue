<script setup lang="ts">
import { ASwitchRoot, ASwitchThumb } from '@vinicunca/akar';
import { useData } from 'vitepress';
import { ref, watchPostEffect } from 'vue';

const { isDark } = useData();

const switchTitle = ref('');

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? 'Switch to light theme'
    : 'Switch to dark theme';
});
</script>

<template>
  <ASwitchRoot
    id="theme-toggle"
    v-model="isDark"
    class="relative h-6 w-11 flex flex-shrink-0 border border-muted-foreground/10 rounded-full bg-muted"
    :aria-label="switchTitle"
  >
    <ASwitchThumb
      class="my-auto h-5 w-5 flex translate-x-0.5 items-center justify-center border border-muted rounded-full bg-background text-xs text-muted-foreground will-change-transform data-[state=checked]:translate-x-5 !transition-transform"
    >
      <i
        :class="[
          isDark ? 'i-lucide:moon-star' : 'i-lucide:sun',
        ]"
      />
    </ASwitchThumb>
  </ASwitchRoot>
</template>
