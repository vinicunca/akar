<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/tabs-item';

type ProseTabsItem = ComponentConfig<typeof theme, AppConfig, 'tabsItem', 'pohon.prose'>;

export interface ProseTabsItemProps {
  label: string;
  description?: string;
  class?: any;
  pohon?: { base?: any };
}

export interface ProseTabsItemSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseTabsItemProps>();
defineSlots<ProseTabsItemSlots>();

const appConfig = useAppConfig() as ProseTabsItem['AppConfig'];
const pohonProp = useComponentPohon('prose.tabs-item', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.tabsItem || {}) }));
</script>

<template>
  <div :class="pohon({ class: [pohonProp?.base, props.class] })">
    <slot>
      {{ description }}
    </slot>
  </div>
</template>
