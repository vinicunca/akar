<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/table';

type ProseTable = ComponentConfig<typeof theme, AppConfig, 'table', 'pohon.prose'>;

export interface ProseTableProps {
  class?: any;
  pohon?: ProseTable['slots'];
}

export interface ProseTableSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseTableProps>();
defineSlots<ProseTableSlots>();

const appConfig = useAppConfig() as ProseTable['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.table || {}) })());
</script>

<template>
  <div :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <table :class="pohon.base({ class: props.pohon?.base })">
      <slot />
    </table>
  </div>
</template>
