<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PricingPlanProps, PricingPlanSlots } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/pricing-plans';

type PricingPlans = ComponentConfig<typeof theme, AppConfig, 'pricingPlans'>;

export interface PricingPlansProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  plans?: Array<PricingPlanProps>;
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

type ExtendSlotWithPlan<T extends PricingPlanProps, K extends keyof PricingPlanSlots>
  = PricingPlanSlots[K] extends (props: infer P) => Array<VNode>
    ? (props: P & { plan: T }) => Array<VNode>
    : PricingPlanSlots[K];

export type PricingPlansSlots<T extends PricingPlanProps = PricingPlanProps> = {
  [K in keyof PricingPlanSlots]?: ExtendSlotWithPlan<T, K>
} & {
  default?: (props?: {}) => Array<VNode>;
};

</script>

<script setup lang="ts" generic="T extends PricingPlanProps">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { omit } from '../utils';
import { uv } from '../utils/uv';
import UPricingPlan from './PricingPlan.vue';

const props = withDefaults(defineProps<PricingPlansProps>(), {
  orientation: 'horizontal',
  compact: false,
  scale: false,
});
const slots = defineSlots<PricingPlansSlots<T>>();

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
  <Primitive
    :as="as"
    :data-orientation="orientation"
    :class="pohon({ class: [pohonProp?.base, props.class], compact, scale, orientation })"
    :style="{ '--count': count }"
  >
    <slot>
      <UPricingPlan
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
      </UPricingPlan>
    </slot>
  </Primitive>
</template>
