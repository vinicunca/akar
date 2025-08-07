<script setup lang="ts">
import { ASwitchRoot, ASwitchThumb } from 'akar';
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
    class="border border-muted-foreground/10 rounded-full bg-muted flex flex-shrink-0 h-6 w-11 relative"
    :aria-label="switchTitle"
  >
    <ASwitchThumb
      class="text-xs color-muted-foreground my-auto will-change-transform border border-muted rounded-full bg-background flex h-5 w-5 translate-x-0.5 items-center justify-center data-[state=checked]:translate-x-5 !transition-transform"
    >
      <i
        v-if="isDark"
        class="i-lucide:moon-star"
      />
      <i
        v-else
        class="i-lucide:sun"
      />
    </ASwitchThumb>
  </ASwitchRoot>
</template>
