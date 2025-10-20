<script lang="ts" setup>
import { useRoute } from '#app';
import { PButton, PFieldGroup } from '#components';
import { useClipboard } from '@vueuse/core';

const route = useRoute();
const { copy, copied } = useClipboard();

async function copyPage() {
  copy(await $fetch<string>(`/raw${route.path}.md`));
}
</script>

<template>
  <PFieldGroup>
    <PButton
      label="Copy page"
      :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
      color="neutral"
      variant="outline"
      :pohon="{
        leadingIcon: [copied ? 'color-primary' : 'color-neutral', 'size-3.5'],
      }"
      @click="copyPage"
    />
  </PFieldGroup>
</template>
