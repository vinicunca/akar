<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { PIconProps, PLinkProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/card';

type ProseCard = ComponentConfig<typeof theme, AppConfig, 'card', 'pohon.prose'>;

export interface ProseCardProps {
  to?: PLinkProps['to'];
  target?: PLinkProps['target'];
  icon?: PIconProps['name'];
  title?: string;
  description?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: ProseCard['variants']['color'];
  class?: any;
  pohon?: ProseCard['slots'];
}

export interface ProseCardSlots {
  default: (props?: object) => any;
  title: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { isString } from '@vinicunca/perkakas';
import { computed } from 'vue';
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';
import PLink from '../link.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ProseCardProps>();
const slots = defineSlots<ProseCardSlots>();

const appConfig = useAppConfig() as ProseCard['AppConfig'];
const pohonProp = useComponentPohon('prose.card', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.card || {}) })({
  color: props.color,
  to: !!props.to,
  title: !!props.title,
}));

const target = computed(() => props.target || (!!props.to && isString(props.to) && props.to.startsWith('http') ? '_blank' : undefined));

const ariaLabel = computed(() => (props.title || 'Card link').trim());
</script>

<template>
  <div :class="pohon.base({ class: props.class })">
    <PLink
      v-if="to"
      :aria-label="ariaLabel"
      v-bind="{ to, target, ...$attrs }"
      class="focus:outline-none"
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
      :class="pohon.icon({ class: pohonProp?.icon })"
    />
    <PIcon
      v-if="!!to && target === '_blank'"
      :name="appConfig.pohon.icons.external"
      :class="pohon.externalIcon({ class: pohonProp?.externalIcon })"
    />

    <p
      v-if="title || !!slots.title"
      :class="pohon.title({ class: pohonProp?.title })"
    >
      <slot
        name="title"
        mdc-unwrap="p"
      >
        {{ title }}
      </slot>
    </p>

    <div
      v-if="!!slots.default"
      :class="pohon.description({ class: pohonProp?.description })"
    >
      <slot>
        {{ description }}
      </slot>
    </div>
  </div>
</template>
