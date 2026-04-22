<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PBadgeProps, PButtonProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/pricing-plan';

type PricingPlan = ComponentConfig<typeof theme, AppConfig, 'pricingPlan'>;

type PricingPlanFeature = {
  title: string;
  /**
   * @defaultValue appConfig.pohon.icons.success
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
};

export interface PPricingPlanProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  title?: string;
  description?: string;
  /**
   * Display a badge next to the title.
   * Can be a string or an object.
   * `{ color: 'primary', variant: 'subtle' }`{lang="ts-type"}
   */
  badge?: string | PBadgeProps;
  /**
   * The unit price period that appears next to the price.
   * Typically used to show the recurring interval.
   * @example "/month", "/year", "/seat/month"
   */
  billingCycle?: string;
  /**
   * Additional billing context that appears above the billing cycle.
   * Typically used to show the actual billing frequency.
   * @example "billed annually", "billed monthly", "per user, billed annually"
   */
  billingPeriod?: string;
  /**
   * The current price of the plan.
   * When used with `discount`, this becomes the original price.
   * @example "$99", "€99", "Free"
   */
  price?: string;
  /**
   * The discounted price of the plan.
   * When provided, the `price` prop will be displayed as strikethrough.
   * @example "$79", "€79"
   */
  discount?: string;
  /**
   * Display a list of features under the price.
   * Can be an array of strings or an array of objects.
   */
  features?: Array<string> | Array<PricingPlanFeature>;
  /**
   * Display a buy button at the bottom.
   * `{ size: 'lg', block: true }`{lang="ts-type"}
   * Use the `onClick` field to add a click handler.
   */
  button?: PButtonProps;
  /**
   * Display a tagline highlighting the pricing value proposition.
   * @example 'Pay once, own it forever'
   */
  tagline?: string;
  /**
   * Display terms at the bottom.
   * @example '14-day free trial'
   */
  terms?: string;
  /**
   * The orientation of the pricing plan.
   * @defaultValue 'vertical'
   */
  orientation?: PricingPlan['variants']['orientation'];
  /**
   * @defaultValue 'outline'
   */
  variant?: PricingPlan['variants']['variant'];
  /** Display a ring around the pricing plan to highlight it. */
  highlight?: boolean;
  /** Enlarge the plan to make it more prominent. */
  scale?: boolean;
  class?: any;
  pohon?: PricingPlan['slots'];
}

export interface PPricingPlanSlots {
  badge?: (props: { pohon: PricingPlan['pohon'] }) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  price?: (props?: {}) => Array<VNode>;
  discount?: (props?: {}) => Array<VNode>;
  billing?: (props: { pohon: PricingPlan['pohon'] }) => Array<VNode>;
  features?: (props?: {}) => Array<VNode>;
  button?: (props: { pohon: PricingPlan['pohon'] }) => Array<VNode>;
  header?: (props?: {}) => Array<VNode>;
  body?: (props?: {}) => Array<VNode>;
  footer?: (props?: {}) => Array<VNode>;
  tagline?: (props?: {}) => Array<VNode>;
  terms?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PBadge from './badge.vue';
import PButton from './button.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PPricingPlanProps>(), {
  orientation: 'vertical',
});
const slots = defineSlots<PPricingPlanSlots>();

const appConfig = useAppConfig() as PricingPlan['AppConfig'];
const pohonProp = useComponentPohon('pricingPlan', props);

const [DefinePriceTemplate, ReusePriceTemplate] = createReusableTemplate();

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pricingPlan || {}) })({
  orientation: props.orientation,
  variant: props.variant,
  highlight: props.highlight,
  scale: props.scale,
}));

const features = computed(() => props.features?.map((feature) => typeof feature === 'string' ? { title: feature } : feature));
</script>

<template>
  <DefinePriceTemplate>
    <div
      v-if="discount || price || !!slots.discount || !!slots.price || billingCycle || billingPeriod || !!slots.billing"
      data-slot="priceWrapper"
      :class="pohon.priceWrapper({ class: pohonProp?.priceWrapper })"
    >
      <div
        v-if="(discount && price) || !!slots.discount"
        data-slot="discount"
        :class="pohon.discount({ class: pohonProp?.discount })"
      >
        <slot name="discount">
          {{ price }}
        </slot>
      </div>

      <div
        v-if="(discount || price) || !!slots.price"
        data-slot="price"
        :class="pohon.price({ class: pohonProp?.price })"
      >
        <slot name="price">
          {{ discount || price }}
        </slot>
      </div>

      <div
        v-if="billingCycle || billingPeriod || !!slots.billing"
        data-slot="billing"
        :class="pohon.billing({ class: pohonProp?.billing })"
      >
        <slot
          name="billing"
          :pohon="pohon"
        >
          <span
            data-slot="billingPeriod"
            :class="pohon.billingPeriod({ class: pohonProp?.billingPeriod })"
          >
            {{ billingPeriod || '&nbsp;' }}
          </span>

          <span
            v-if="billingCycle"
            data-slot="billingCycle"
            :class="pohon.billingCycle({ class: pohonProp?.billingCycle })"
          >
            {{ billingCycle }}
          </span>
        </slot>
      </div>
    </div>
  </DefinePriceTemplate>

  <APrimitive
    :as="as"
    v-bind="$attrs"
    :data-orientation="orientation"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      v-if="!!slots.header && orientation === 'vertical'"
      data-slot="header"
      :class="pohon.header({ class: pohonProp?.header })"
    >
      <slot name="header" />
    </div>

    <div
      data-slot="body"
      :class="pohon.body({ class: pohonProp?.body })"
    >
      <slot name="body">
        <div
          data-slot="titleWrapper"
          :class="pohon.titleWrapper({ class: pohonProp?.titleWrapper })"
        >
          <div
            v-if="title || !!slots.title"
            data-slot="title"
            :class="pohon.title({ class: pohonProp?.title })"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </div>

          <slot
            name="badge"
            :pohon="pohon"
          >
            <PBadge
              v-if="badge"
              color="primary"
              variant="subtle"
              v-bind="typeof badge === 'string' ? { label: badge } : badge"
              data-slot="badge"
              :class="pohon.badge({ class: pohonProp?.badge })"
            />
          </slot>
        </div>

        <div
          v-if="description || !!slots.description"
          data-slot="description"
          :class="pohon.description({ class: pohonProp?.description })"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>

        <ReusePriceTemplate v-if="orientation === 'vertical'" />

        <ul
          v-if="features?.length || !!slots.features"
          data-slot="features"
          :class="pohon.features({ class: pohonProp?.features })"
        >
          <slot name="features">
            <li
              v-for="(feature, index) in features"
              :key="index"
              data-slot="feature"
              :class="pohon.feature({ class: pohonProp?.feature })"
            >
              <PIcon
                :name="feature.icon || appConfig.pohon.icons.success"
                data-slot="featureIcon"
                :class="pohon.featureIcon({ class: pohonProp?.featureIcon })"
              />

              <span
                data-slot="featureTitle"
                :class="pohon.featureTitle({ class: pohonProp?.featureTitle })"
              >{{ feature.title }}</span>
            </li>
          </slot>
        </ul>
      </slot>
    </div>

    <div
      v-if="(terms || !!slots.terms) || (button || !!slots.button) || orientation === 'horizontal' || (tagline || !!slots.tagline) || !!slots.footer"
      data-slot="footer"
      :class="pohon.footer({ class: pohonProp?.footer })"
    >
      <slot name="footer">
        <div
          v-if="tagline || !!slots.tagline"
          data-slot="tagline"
          :class="pohon.tagline({ class: pohonProp?.tagline })"
        >
          <slot name="tagline">
            {{ tagline }}
          </slot>
        </div>

        <ReusePriceTemplate v-if="orientation === 'horizontal'" />

        <slot
          name="button"
          :pohon="pohon"
        >
          <PButton
            v-if="button"
            v-bind="{ block: true, size: 'lg', ...button }"
            data-slot="button"
            :class="pohon.button({ class: pohonProp?.button })"
            @click="button?.onClick"
          />
        </slot>

        <div
          v-if="terms || !!slots.terms"
          data-slot="terms"
          :class="pohon.terms({ class: pohonProp?.terms })"
        >
          <slot name="terms">
            {{ terms }}
          </slot>
        </div>
      </slot>
    </div>
  </APrimitive>
</template>
