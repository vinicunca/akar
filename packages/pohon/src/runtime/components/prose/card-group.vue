<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/card-group';

type ProseCardGroup = ComponentConfig<typeof theme, AppConfig, 'cardGroup', 'pohon.prose'>;

export interface ProseCardGroupProps {
  class?: any;
}

export interface ProseCardGroupSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseCardGroupProps>();
defineSlots<ProseCardGroupSlots>();

const appConfig = useAppConfig() as ProseCardGroup['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.prose?.cardGroup || {}),
  }),
);
</script>

<template>
  <div :class="pohon({ class: props.class })">
    <slot />
  </div>
</template>
