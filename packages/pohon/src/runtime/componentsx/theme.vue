<script lang="ts">
import type { VNode } from 'vue';
import type { ThemeUI } from '../composables/use-component-pohon';
import { computed } from 'vue';
import { provideThemeContext } from '../composables/use-component-pohon';

export interface ThemeProps {
  pohon: ThemeUI;
}

export interface ThemeSlots {
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
const props = defineProps<ThemeProps>();

provideThemeContext({
  pohon: computed(() => props.ui),
});
</script>

<template>
  <slot />
</template>
