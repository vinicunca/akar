<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PIconProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/collapsible';

type ProseCollapsible = ComponentConfig<typeof theme, AppConfig, 'collapsible', 'pohon.prose'>;

export interface ProseCollapsibleProps {
  /**
   * The icon displayed to toggle the collapsible.
   * @defaultValue appConfig.pohon.icons.chevronDown
   */
  icon?: PIconProps['name'];
  /**
   * The name displayed in the trigger label.
   * @defaultValue t('prose.collapsible.name')
   */
  name?: string;
  /**
   * The text displayed when the collapsible is open.
   * @defaultValue t('prose.collapsible.openText')
   */
  openText?: string;
  /**
   * The text displayed when the collapsible is closed.
   * @defaultValue t('prose.collapsible.closeText')
   */
  closeText?: string;
  class?: any;
  pohon?: ProseCollapsible['slots'];
}

export interface ProseCollapsibleSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useLocale } from '../../composables/use-locale';
import { transformPohon } from '../../utils';
import { uv } from '../../utils/uv';
import PCollapsible from '../collapsible.vue';
import PIcon from '../icon.vue';

const props = defineProps<ProseCollapsibleProps>();
defineSlots<ProseCollapsibleSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as ProseCollapsible['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.collapsible || {}) })());
</script>

<template>
  <PCollapsible
    :unmount-on-hide="false"
    :class="props.class"
    :pohon="transformPohon(pohon)"
  >
    <template #default="{ open }">
      <button :class="pohon.trigger({ class: props.pohon?.trigger })">
        <PIcon
          :name="icon || appConfig.pohon.icons.chevronDown"
          :class="pohon.triggerIcon({ class: props.pohon?.triggerIcon })"
        />

        <span :class="pohon.triggerLabel({ class: props.pohon?.triggerLabel })">
          {{ open ? (props.closeText || t('prose.collapsible.closeText')) : (props.openText || t('prose.collapsible.openText')) }} {{ props.name || t('prose.collapsible.name') }}
        </span>
      </button>
    </template>

    <template #content>
      <slot />
    </template>
  </PCollapsible>
</template>
