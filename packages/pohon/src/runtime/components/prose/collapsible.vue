<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { IconProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/collapsible';

type ProseCollapsible = ComponentConfig<typeof theme, AppConfig, 'collapsible', 'pohon.prose'>;

export interface PProseCollapsibleProps {
  /**
   * The icon displayed to toggle the collapsible.
   * @defaultValue appConfig.ui.icons.chevronDown
   */
  icon?: IconProps['name'];
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
import { transformUI } from '../../utils';
import { tv } from '../../utils/tv';
import UCollapsible from '../Collapsible.vue';
import UIcon from '../Icon.vue';

const props = defineProps<PProseCollapsibleProps>();
defineSlots<ProseCollapsibleSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as ProseCollapsible['AppConfig'];

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.prose?.collapsible || {}) })());
</script>

<template>
  <UCollapsible
    :unmount-on-hide="false"
    :class="props.class"
    :ui="transformUI(ui)"
  >
    <template #default="{ open }">
      <button :class="ui.trigger({ class: props.pohon?.trigger })">
        <UIcon
          :name="icon || appConfig.ui.icons.chevronDown"
          :class="ui.triggerIcon({ class: props.pohon?.triggerIcon })"
        />

        <span :class="ui.triggerLabel({ class: props.pohon?.triggerLabel })">
          {{ open ? (props.closeText || t('prose.collapsible.closeText')) : (props.openText || t('prose.collapsible.openText')) }} {{ props.name || t('prose.collapsible.name') }}
        </span>
      </button>
    </template>

    <template #content>
      <slot />
    </template>
  </UCollapsible>
</template>
