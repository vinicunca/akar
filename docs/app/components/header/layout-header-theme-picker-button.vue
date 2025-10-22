<script setup lang="ts">
import { PButton } from '#components';

defineProps<{
  label: string;
  icon?: string;
  chip?: string;
  selected?: boolean;
}>();

const slots = defineSlots<{
  leading: () => any;
}>();
</script>

<template>
  <PButton
    size="sm"
    color="neutral"
    variant="outline"
    :icon="icon"
    :label="label"
    class="capitalize akar:(text-[11px] rounded-sm ring-ring)"
    :class="[selected ? 'bg-background-elevated' : 'hover:bg-background-elevated/50']"
  >
    <template
      v-if="chip || !!slots.leading"
      #leading
    >
      <slot name="leading">
        <span
          class="rounded-full bg-$color-light size-2 inline-block dark:bg-$color-dark"

          :style="{
            '--color-light': `var(--colors-${chip}-500)`,
            '--color-dark': `var(--colors-${chip}-400)`,
          }"
        />
      </slot>
    </template>
  </PButton>
</template>
