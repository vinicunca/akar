<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PIconProps, LinkProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/callout';

type ProseCallout = ComponentConfig<typeof theme, AppConfig, 'callout', 'pohon.prose'>;

export interface ProseCalloutProps {
  to?: LinkProps['to'];
  target?: LinkProps['target'];
  icon?: PIconProps['name'];
  /**
   * @defaultValue 'neutral'
   */
  color?: ProseCallout['variants']['color'];
  class?: any;
  pohon?: ProseCallout['slots'];
}

export interface ProseCalloutSlots {
  default: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';
import ULink from '../Link.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ProseCalloutProps>();
defineSlots<ProseCalloutSlots>();

const appConfig = useAppConfig() as ProseCallout['AppConfig'];
const pohonProp = useComponentPohon('prose.callout', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.callout || {}) })({
  color: props.color,
  to: !!props.to,
}));

const target = computed(() => props.target || (!!props.to && typeof props.to === 'string' && props.to.startsWith('http') ? '_blank' : undefined));
</script>

<template>
  <div :class="pohon.base({ class: [pohonProp?.base, props.class] })">
    <ULink
      v-if="to"
      v-bind="{ to, target, ...$attrs }"
      class="focus:outline-none"
      raw
    >
      <span
        class="inset-0 absolute"
        aria-hidden="true"
      />
    </ULink>

    <PIcon
      v-if="icon"
      :name="icon"
      :class="pohon.icon({ class: pohonProp?.icon })"
    />
    <PIcon
      v-if="!!to && target === '_blank'"
      :name="appConfig.pohon.icons.external"
      :class="pohon.externalIcon({ class: pohonProp?.externalIcon })"
    />

    <slot mdc-unwrap="p" />
  </div>
</template>
