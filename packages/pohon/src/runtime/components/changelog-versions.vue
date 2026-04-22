<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { SpringOptions, UseScrollOptions } from 'motion-v';
import type { VNode } from 'vue';
import type { PChangelogVersionProps, PChangelogVersionSlots } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/changelog-versions';

type ChangelogVersions = ComponentConfig<typeof theme, AppConfig, 'changelogVersions'>;

export interface PChangelogVersionsProps<T extends PChangelogVersionProps = PChangelogVersionProps> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  versions?: Array<T>;
  /**
   * Display an indicator bar on the left.
   * By default, the indicator will track the scroll of the page. (https://motion.dev/docs/vue-use-scroll#page-scroll)
   * @defaultValue true
   * @see https://motion.dev/docs/vue-use-scroll#api
   */
  indicator?: boolean | UseScrollOptions;
  /**
   * Enable scrolling motion effect on the indicator bar.
   * `{ damping: 30, restDelta: 0.001 }`{lang="ts-type"}
   * @defaultValue true
   * @see https://motion.dev/docs/vue-transitions#spring
   */
  indicatorMotion?: boolean | SpringOptions;
  class?: any;
  pohon?: ChangelogVersions['slots'];
}

type ExtendSlotWithVersion<T extends PChangelogVersionProps, K extends keyof PChangelogVersionSlots>
  = Required<PChangelogVersionSlots>[K] extends (props: infer P) => Array<VNode>
    ? (props: P & { version: T }) => Array<VNode>
    : Required<PChangelogVersionSlots>[K];

export type PChangelogVersionsSlots<T extends PChangelogVersionProps = PChangelogVersionProps> = {
  [K in keyof PChangelogVersionSlots]?: ExtendSlotWithVersion<T, K>
} & {
  default?: (props?: {}) => Array<VNode>;
  indicator?: (props?: {}) => Array<VNode>;
};

</script>

<script setup lang="ts" generic="T extends PChangelogVersionProps">
import { useAppConfig } from '#imports';
import { isObjectType } from '@vinicunca/perkakas';
import { APrimitive } from 'akar';
import { defu } from 'defu';
import { Motion, useScroll, useSpring, useTransform } from 'motion-v';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { omit } from '../utils';
import { uv } from '../utils/uv';
import PChangelogVersion from './changelog-version.vue';

const props = withDefaults(defineProps<PChangelogVersionsProps<T>>(), {
  indicator: true,
  indicatorMotion: true,
});
const slots = defineSlots<PChangelogVersionsSlots<T>>();

const getProxySlots = () => omit(slots, ['default', 'indicator']);

const appConfig = useAppConfig() as ChangelogVersions['AppConfig'];
const pohonProp = useComponentPohon('changelogVersions', props);

const springOptions = computed(() => defu(isObjectType(props.indicatorMotion) ? props.indicatorMotion : {}, { damping: 30, restDelta: 0.001 }));
const scrollOptions = computed(() => isObjectType(props.indicator) ? props.indicator : {});

const { scrollYProgress } = useScroll(scrollOptions.value);
const y = useSpring(scrollYProgress, springOptions);
const height = useTransform(() => `${Number(y.get()) * 100}%`);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.changelogVersions || {}) })());
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      v-if="!!props.indicator || !!slots.indicator"
      data-slot="indicator"
      :class="pohon.indicator({ class: pohonProp?.indicator })"
    >
      <slot name="indicator">
        <Motion
          v-if="!!props.indicatorMotion"
          data-slot="beam"
          :class="pohon.beam({ class: pohonProp?.beam })"
          :style="{ height }"
        />
      </slot>
    </div>

    <div
      v-if="versions?.length || !!slots.default"
      data-slot="container"
      :class="pohon.container({ class: pohonProp?.container })"
    >
      <slot>
        <PChangelogVersion
          v-for="(version, index) in versions"
          :key="index"
          :indicator="!!props.indicator"
          v-bind="(version as PChangelogVersionProps)"
        >
          <template
            v-for="(_, name) in getProxySlots()"
            #[name]="slotData"
          >
            <slot
              :name="name"
              v-bind="(slotData as any)"
              :version="version"
            />
          </template>
        </PChangelogVersion>
      </slot>
    </div>
  </APrimitive>
</template>
