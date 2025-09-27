<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { IconProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/code-collapse';

type ProseCodeCollapse = ComponentConfig<typeof theme, AppConfig, 'codeCollapse', 'pohon.prose'>;

export interface ProseCodeCollapseProps {
  /**
   * The icon displayed to toggle the code.
   * @defaultValue appConfig.pohon.icons.chevronDown
   */
  icon?: IconProps['name'];
  /**
   * The name displayed in the trigger label.
   * @defaultValue t('prose.codeCollapse.name')
   */
  name?: string;
  /**
   * The text displayed when the code is collapsed.
   * @defaultValue t('prose.codeCollapse.openText')
   */
  openText?: string;
  /**
   * The text displayed when the code is expanded.
   * @defaultValue t('prose.codeCollapse.closeText')
   */
  closeText?: string;
  class?: any;
  pohon?: ProseCodeCollapse['slots'];
}

export interface ProseCodeCollapseSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useLocale } from '../../composables/use-locale';
import { uv } from '../../utils/uv';
import PButton from '../button.vue';

const props = defineProps<ProseCodeCollapseProps>();
defineSlots<ProseCodeCollapseSlots>();

const open = defineModel<boolean>('open', { default: false });

const { t } = useLocale();
const appConfig = useAppConfig() as ProseCodeCollapse['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.codeCollapse || {}) })({
  open: open.value,
}));
</script>

<template>
  <div :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <slot />

    <div :class="pohon.footer({ class: props.pohon?.footer })">
      <PButton
        :icon="icon || appConfig.pohon.icons.chevronDown"
        color="neutral"
        variant="outline"
        :data-state="open ? 'open' : 'closed'"
        :label="`${open ? (props.closeText || t('prose.codeCollapse.closeText')) : (props.openText || t('prose.codeCollapse.openText'))} ${props.name || t('prose.codeCollapse.name')}`"
        :class="pohon.trigger({ class: props.pohon?.trigger })"
        :pohon="{ leadingIcon: pohon.triggerIcon({ class: props.pohon?.triggerIcon }) }"
        @click="open = !open"
      />
    </div>
  </div>
</template>
