<script setup lang="ts">
import { PContextMenu } from '#components';
import { useToast } from '#imports';
import { useClipboard } from '@vueuse/core';
import { ref } from 'vue';

const logoRef = ref();

const toast = useToast();
const { copy } = useClipboard();

const items = [
  [{
    label: 'Copy logo as SVG',
    icon: 'i-simple-icons-nuxtdotjs',
    onSelect() {
      if (!logoRef.value) {
        return;
      }

      copy(logoRef.value.$el.outerHTML);

      toast.add({
        title: 'Akar logo copied as SVG',
        description: 'You can now paste it into your project',
        icon: 'i-lucide-circle-check',
        color: 'success',
      });
    },
  }],
  [{
    label: 'Browse design kit',
    icon: 'i-lucide-shapes',
    to: 'https://akar.vinicunca.dev/pohon/design-kit',
    target: '_blank',
  }],
];
</script>

<template>
  <PContextMenu :items="items">
    <NuxtLink
      to="/"
      class="text-highlighted text-xl font-bold flex shrink-0 gap-2 min-w-0 items-end focus-visible:outline-primary"
      aria-label="Nuxt UI"
    >
      <Logo
        ref="logoRef"
        class="shrink-0 h-6 w-auto"
      />
    </NuxtLink>
  </PContextMenu>
</template>
