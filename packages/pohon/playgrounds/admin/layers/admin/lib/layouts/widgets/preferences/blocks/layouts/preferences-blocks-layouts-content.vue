<script setup lang="ts">
import type { Component } from 'vue';

import { useI18n } from '#imports';

import { computed } from 'vue';

import { ContentCompact, ContentWide } from '../../icons';

const { t } = useI18n();

const modelValue = defineModel<string>({ default: 'wide' });

const components: Record<string, Component> = {
  compact: ContentCompact,
  wide: ContentWide,
};

const PRESET = computed(() => [
  {
    name: t('preferences.wide'),
    type: 'wide',
  },
  {
    name: t('preferences.compact'),
    type: 'compact',
  },
]);

function activeClass(theme: string): Array<string> {
  return theme === modelValue.value ? ['outline-box-active'] : [];
}
</script>

<template>
  <div class="flex gap-5 w-full">
    <template
      v-for="theme in PRESET"
      :key="theme.name"
    >
      <button
        class="flex flex-col w-[100px]"
        @click="modelValue = theme.type"
      >
        <div
          :class="activeClass(theme.type)"
          class="outline-box flex items-center justify-center"
        >
          <component :is="components[theme.type]" />
        </div>
        <div class="text-xs color-text-muted mt-2 text-center">
          {{ theme.name }}
        </div>
      </button>
    </template>
  </div>
</template>
