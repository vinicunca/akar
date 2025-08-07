<script setup lang="ts">
import type { SidebarItem } from '../composables/use-sidebar';
import { useCurrentElement } from '@vueuse/core';
import { computed, watch } from 'vue';
import { useSidebarControl } from '../composables/use-sidebar';

const props = defineProps<{
  item: SidebarItem;
}>();
const { isActiveLink } = useSidebarControl(computed(() => props.item));

const elRef = useCurrentElement();

watch(isActiveLink, () => {
  if (isActiveLink.value && elRef.value instanceof HTMLElement) {
    elRef.value.scrollIntoView({
      block: 'center',
    });
  }
}, { immediate: true });
</script>

<template>
  <div
    class="text-sm color-muted-foreground rounded-lg flex items-center hover:bg-card"
    :class="{ 'is-active !bg-primary/10 !text-primary font-semibold': isActiveLink }"
  >
    <a
      :href="item.link"
      class="px-4 inline-flex h-[2.15rem] w-full items-center"
      v-html="item.text"
    />
  </div>
</template>
