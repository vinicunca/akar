<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { IconProps, PLinkProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/callout';

type ProseCallout = ComponentConfig<typeof theme, AppConfig, 'callout', 'ui.prose'>;

export interface ProseCalloutProps {
  to?: PLinkProps['to'];
  target?: PLinkProps['target'];
  icon?: IconProps['name'];
  /**
   * @defaultValue 'neutral'
   */
  color?: ProseCallout['variants']['color'];
  class?: any;
  pohon?: ProseCallout['slots'];
}

export interface ProseCalloutSlots {
  default: (props?: {}) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { computed } from 'vue';
import { tv } from '../../utils/tv';
import UIcon from '../Icon.vue';
import ULink from '../Link.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ProseCalloutProps>();
defineSlots<ProseCalloutSlots>();

const appConfig = useAppConfig() as ProseCallout['AppConfig'];

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.prose?.callout || {}) })({
  color: props.color,
  to: !!props.to,
}));

const target = computed(() => props.target || (!!props.to && isString(props.to) && props.to.startsWith('http') ? '_blank' : undefined));
</script>

<template>
  <div :class="ui.base({ class: props.class })">
    <ULink
      v-if="to"
      v-bind="{ to, target, ...$attrs }"
      class="focus:outline-none"
      tabindex="-1"
      raw
    >
      <span
        class="inset-0 absolute"
        aria-hidden="true"
      />
    </ULink>

    <UIcon
      v-if="icon"
      :name="icon"
      :class="ui.icon({ class: props.pohon?.icon })"
    />
    <UIcon
      v-if="!!to && target === '_blank'"
      :name="appConfig.ui.icons.external"
      :class="ui.externalIcon({ class: props.pohon?.externalIcon })"
    />

    <slot mdc-unwrap="p" />
  </div>
</template>
