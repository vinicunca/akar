<script setup lang="ts">
import type { PDropdownMenuItem } from 'pohon-ui';

const appConfig = useAppConfig();

const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const neutrals = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'taupe', 'mauve', 'mist', 'olive'];

const items = computed<Array<PDropdownMenuItem>>(() => [{
  label: 'Primary',
  chip: appConfig.pohon.colors.primary,
  children: colors.map((color) => ({
    label: color,
    chip: color,
    checked: appConfig.pohon.colors.primary === color,
    type: 'checkbox',
    onSelect: (e) => {
      e.preventDefault();

      appConfig.pohon.colors.primary = color;
    },
  })),
}, {
  label: 'Neutral',
  chip: appConfig.pohon.colors.neutral === 'neutral' ? 'old-neutral' : appConfig.pohon.colors.neutral,
  children: neutrals.map((color) => ({
    label: color,
    chip: color === 'neutral' ? 'old-neutral' : color,
    type: 'checkbox',
    checked: appConfig.pohon.colors.neutral === color,
    onSelect: (e) => {
      e.preventDefault();

      appConfig.pohon.colors.neutral = color;
    },
  })),
}]);
</script>

<template>
  <PDropdownMenu
    :items="items"
    :content="{ side: 'right', align: 'start' }"
  >
    <PButton
      icon="i-lucide-swatch-book"
      color="neutral"
      variant="ghost"
      class="data-[state=open]:bg-elevated"
      aria-label="Switch theme"
    />

    <template #item-leading="{ item }">
      <div class="inline-flex items-center justify-center shrink-0 size-5">
        <span
          class="rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2"
          :style="{
            '--chip-light': `var(--color-${(item as any).chip}-500)`,
            '--chip-dark': `var(--color-${(item as any).chip}-400)`,
          }"
        />
      </div>
    </template>
  </PDropdownMenu>
</template>
