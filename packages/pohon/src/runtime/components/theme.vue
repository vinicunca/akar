<script lang="ts">
import type { ThemePohon } from '../composables/use-component-pohon';
import { computed } from 'vue';
import { provideThemeContext } from '../composables/use-component-pohon';

export interface PThemeProps {
  pohon: ThemePohon;
}

export interface PThemeSlots {
  default: (props?: {}) => any;
}
</script>

<script setup lang="ts">
const props = defineProps<PThemeProps>();

provideThemeContext({
  pohon: computed(() => props.pohon),
});
</script>

<template>
  <slot />
</template>
