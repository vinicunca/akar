<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PPricingPlanProps, PPricingPlanSlots } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/pricing-plans';

type PricingPlans = ComponentConfig<typeof theme, AppConfig, 'pricingPlans'>;

export interface PPricingPlansProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  plans?: Array<PPricingPlanProps>;
  /**
   * The orientation of the pricing plans.
   * @defaultValue 'horizontal'
   */
  orientation?: PricingPlans['variants']['orientation'];
  /**
   * When `true`, the plans will be displayed without gap.
   * @defaultValue false
   */
  compact?: boolean;
  /**
   * When `true`, the plans will be displayed with a larger gap.
   * Useful when one plan is scaled. Doesn't work with `compact`.
   * @defaultValue false
   */
  scale?: boolean;
  class?: any;
  pohon?: { base?: any };
}

type ExtendSlotWithPlan<T extends PPricingPlanProps, K extends keyof PPricingPlanSlots>
  = PPricingPlanSlots[K] extends (props: infer P) => Array<VNode>
    ? (props: P & { plan: T }) => Array<VNode>
    : PPricingPlanSlots[K];

export type PPricingPlansSlots<T extends PPricingPlanProps = PPricingPlanProps> = {
  [K in keyof PPricingPlanSlots]?: ExtendSlotWithPlan<T, K>
} & {
  default?: (props?: {}) => Array<VNode>;
};

</script>

<script setup lang="ts" generic="T extends PPricingPlanProps">
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { omit } from '../utils';
import { uv } from '../utils/uv';
import PPricingPlan from './PricingPlan.vue';

const props = withDefaults(defineProps<PPricingPlansProps>(), {
  orientation: 'horizontal',
  compact: false,
  scale: false,
});
const slots = defineSlots<PPricingPlansSlots<T>>();

const getProxySlots = () => omit(slots, ['default']);

const appConfig = useAppConfig() as PricingPlans['AppConfig'];
const pohonProp = useComponentPohon('pricingPlans', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pricingPlans || {}) }));

const count = computed(() => props.plans?.length || slots.default?.()?.flatMap(mapSlot).filter(Boolean)?.length || 3);

function mapSlot(slot: any) {
  if (typeof slot.type === 'symbol') {
    if (slot.children && Array.isArray(slot.children)) {
      return slot.children.map(mapSlot);
    }

    return;
  }

  return slot;
}
</script>

<template>
  <APrimitive
    :as="as"
    :data-orientation="orientation"
    :class="pohon({ class: [pohonProp?.base, props.class], compact, scale, orientation })"
    :style="{ '--count': count }"
  >
    <slot>
      <PPricingPlan
        v-for="(plan, index) in plans"
        :key="index"
        :orientation="orientation === 'vertical' ? 'horizontal' : 'vertical'"
        v-bind="plan"
      >
        <template
          v-for="(_, name) in getProxySlots()"
          #[name]="slotData"
        >
          <slot
            :name="name"
            v-bind="(slotData as any)"
            :plan="plan"
          />
        </template>
      </PPricingPlan>
    </slot>
  </APrimitive>
</template>
