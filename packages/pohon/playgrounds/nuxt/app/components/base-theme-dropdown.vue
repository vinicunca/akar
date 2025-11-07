<script setup lang="ts">
import type { PDropdownMenuItem } from 'pohon-ui';
import { useAppConfig } from '#app';
import { PButton, PDropdownMenu } from '#components';
import { computed } from 'vue';
import { NEUTRALS_COLORS, UNO_THEME_COLORS } from '~/themes/constant';

const appConfig = useAppConfig();

const items = computed<Array<PDropdownMenuItem>>(() => {
  return [
    {
      label: 'Primary',
      chip: appConfig.pohon.colors.primary,
      children: UNO_THEME_COLORS.map((color) => ({
        label: color,
        chip: color,
        checked: appConfig.pohon.colors.primary === color,
        type: 'checkbox',
        onSelect: (event) => {
          event.preventDefault();

          appConfig.pohon.colors.primary = color;
        },
      })),
    },
    {
      label: 'Neutral',
      chip: appConfig.pohon.colors.neutral,
      children: NEUTRALS_COLORS.map((color) => ({
        label: color,
        chip: color,
        type: 'checkbox',
        checked: appConfig.pohon.colors.neutral === color,
        onSelect: (event) => {
          event.preventDefault();

          appConfig.pohon.colors.neutral = color;
        },
      })),
    },
  ];
});
</script>

<template>
  <PDropdownMenu
    :items="items"
    :content="{ side: 'right', align: 'start' }"
  >
    <PButton
      icon="i-lucide:swatch-book"
      color="neutral"
      variant="ghost"
      class="data-[state=open]:bg-background-elevated"
      aria-label="Switch theme"
    />

    <template #item-leading="{ item }">
      <span
        :style="{
          '--chip-light': `var(--colors-${item.chip}-500)`,
          '--chip-dark': `var(--colors-${item.chip}-400)`,
        }"
        class="ms-0.5 rounded-full bg-$chip-light size-2 dark:bg-$chip-dark"
      />
    </template>
  </PDropdownMenu>
</template>
