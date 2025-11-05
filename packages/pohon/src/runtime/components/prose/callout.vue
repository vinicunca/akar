<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PIconProps, PLinkProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/callout';

type ProseCallout = ComponentConfig<typeof theme, AppConfig, 'callout', 'pohon.prose'>;

export interface ProseCalloutProps {
  to?: PLinkProps['to'];
  target?: PLinkProps['target'];
  icon?: PIconProps['name'];
  /**
   * @defaultValue 'neutral'
   */
  color?: ProseCallout['variants']['color'];
  class?: any;
  pohon?: ProseCallout['slots'];
}

export interface ProseCalloutSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { isString } from '@vinicunca/perkakas';
import { computed } from 'vue';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';
import PLink from '../link.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ProseCalloutProps>();
defineSlots<ProseCalloutSlots>();

const appConfig = useAppConfig() as ProseCallout['AppConfig'];

const pohon = computed(() => uv({
  extend: uv(theme),
  ...(appConfig.pohon?.prose?.callout || {}),
})({
  color: props.color,
  to: !!props.to,
}));

const target = computed(() => props.target || (!!props.to && isString(props.to) && props.to.startsWith('http') ? '_blank' : undefined));
</script>

<template>
  <div :class="pohon.base({ class: props.class })">
    <PLink
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
    </PLink>

    <PIcon
      v-if="icon"
      :name="icon"
      :class="pohon.icon({ class: props.pohon?.icon })"
    />
    <PIcon
      v-if="!!to && target === '_blank'"
      :name="appConfig.pohon.icons.external"
      :class="pohon.externalIcon({ class: props.pohon?.externalIcon })"
    />

    <slot mdc-unwrap="p" />
  </div>
</template>
