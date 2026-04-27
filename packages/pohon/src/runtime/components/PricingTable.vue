<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PPricingPlanProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/pricing-table';

type PricingTable = ComponentConfig<typeof theme, AppConfig, 'pricingTable'>;

type DynamicSlots<T extends { id: string }, S extends string | undefined = undefined> = {
  [K in T['id'] as K extends string
    ? S extends string
      ? (K | `${K}-${S}`)
      : K
    : never
  ]?: (props: { tier: Extract<T, { id: K extends `${infer Base}-${S}` ? Base : K }> }) => Array<VNode>
};

type FeatureDynamicSlots<T extends PPricingTableSectionFeature, S extends string | undefined = undefined> = {
  [K in (T['id'] extends string ? T['id'] : string) as K extends string
    ? S extends string
      ? (`feature-${K}` | `feature-${K}-${S}`)
      : `feature-${K}`
    : never
  ]?: (props: { feature: T; tier: PPricingTableTier; section: PPricingTableSection }) => Array<VNode>
};

type SectionDynamicSlots<T extends PPricingTableSection, S extends string | undefined = undefined> = {
  [K in (T['id'] extends string ? T['id'] : string) as K extends string
    ? S extends string
      ? (`section-${K}` | `section-${K}-${S}`)
      : `section-${K}`
    : never
  ]?: (props: { section: T }) => Array<VNode>
};

export type PPricingTableTier = Pick<PPricingPlanProps, 'title' | 'description' | 'badge' | 'billingCycle' | 'billingPeriod' | 'price' | 'discount' | 'button' | 'highlight'> & {
  id: string;
  [key: string]: any;
};

export type PPricingTableSectionFeature<T extends PPricingTableTier = PPricingTableTier> = {
  id?: string;
  title: string;
  tiers?: {
    [K in Extract<T['id'], string>]: boolean | number | string
  } & Record<string, boolean | number | string>;
};

export interface PPricingTableSection<T extends PPricingTableTier = PPricingTableTier> {
  id?: string;
  title: string;
  features: Array<PPricingTableSectionFeature<T>>;
}

export interface PPricingTableProps<T extends PPricingTableTier = PPricingTableTier> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The caption to display above the table.
   * @defaultValue t('pricingTable.caption')
   */
  caption?: string;
  /**
   * The pricing tiers to display in the table.
   * Each tier represents a pricing plan with its own title, description, price, and features.
   */
  tiers: Array<T>;
  /**
   * The sections of features to display in the table.
   * Each section contains a title and a list of features with their availability in each tier.
   */
  sections: Array<PPricingTableSection<T>>;
  class?: any;
  pohon?: PricingTable['slots'];
}

type SlotProps<T extends PPricingTableTier> = (props: { tier: T }) => Array<VNode>;

export type PPricingTableSlots<T extends PPricingTableTier = PPricingTableTier> = {
  'caption'?: (props?: {}) => Array<VNode>;
  'tier'?: SlotProps<T>;
  'tier-title'?: SlotProps<T>;
  'tier-description'?: SlotProps<T>;
  'tier-badge'?: SlotProps<T>;
  'tier-button'?: SlotProps<T>;
  'tier-billing'?: SlotProps<T>;
  'tier-discount'?: SlotProps<T>;
  'tier-price'?: SlotProps<T>;
  'section-title'?: (props: { section: PPricingTableSection<T> }) => Array<VNode>;
  'feature-title'?: (props: { feature: PPricingTableSectionFeature<T>; section: PPricingTableSection<T> }) => Array<VNode>;
  'feature-value'?: (props: { feature: PPricingTableSectionFeature<T>; tier: T; section: PPricingTableSection<T> }) => Array<VNode>;
} & DynamicSlots<T, 'title' | 'description' | 'badge' | 'button' | 'billing' | 'discount' | 'price'>
& FeatureDynamicSlots<PPricingTableSectionFeature<T>, 'title' | 'value'>
& SectionDynamicSlots<PPricingTableSection<T>, 'title'>;

</script>

<script setup lang="ts" generic="T extends PPricingTableTier">
import { isBoolean, isString } from '@vinicunca/perkakas';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PBadge from './Badge.vue';
import PButton from './Button.vue';
import PIcon from './Icon.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<PPricingTableProps<T>>();
const slots = defineSlots<PPricingTableSlots<T>>();

const { t } = useLocale();
const appConfig = useAppConfig() as PricingTable['AppConfig'];
const pohonProp = useComponentPohon('pricingTable', props);

function formatSlotName(item: { id?: string; title: string }): string {
  if (item.id) {
    return item.id;
  }

  return item.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pricingTable || {}) })());

const [DefineTierTemplate, ReuseTierTemplate] = createReusableTemplate<{ tier: PPricingTableTier }>({
  props: {
    tier: Object,
  },
});
const [DefineFeatureTemplate, ReuseFeatureTemplate] = createReusableTemplate<{ tier: PPricingTableTier; feature: PPricingTableSectionFeature<T> }>({
  props: {
    tier: Object,
    feature: Object,
  },
});
</script>

<template>
  <DefineTierTemplate v-slot="{ tier }">
    <div
      data-slot="tierWrapper"
      :class="pohon.tierWrapper({ class: pohonProp?.tierWrapper })"
    >
      <slot
        :name="(tier.id as keyof PPricingTableSlots<T>)"
        :tier="(tier as T)"
      >
        <slot
          name="tier"
          :tier="(tier as T)"
        >
          <div
            data-slot="tierTitleWrapper"
            :class="pohon.tierTitleWrapper({ class: pohonProp?.tierTitleWrapper })"
          >
            <div
              data-slot="tierTitle"
              :class="pohon.tierTitle({ class: pohonProp?.tierTitle })"
            >
              <slot
                :name="(`${tier.id}-title` as keyof PPricingTableSlots<T>)"
                :tier="tier"
              >
                <slot
                  name="tier-title"
                  :tier="(tier as T)"
                >
                  {{ tier.title }}
                </slot>
              </slot>
            </div>

            <slot
              :name="(`${tier.id}-badge` as keyof PPricingTableSlots<T>)"
              :tier="tier"
            >
              <slot
                name="tier-badge"
                :tier="(tier as T)"
              >
                <PBadge
                  v-if="tier.badge"
                  color="primary"
                  variant="subtle"
                  v-bind="isString(tier.badge) ? { label: tier.badge } : tier.badge"
                  data-slot="tierBadge"
                  :class="pohon.tierBadge({ class: pohonProp?.tierBadge })"
                />
              </slot>
            </slot>
          </div>

          <div
            data-slot="tierDescription"
            :class="pohon.tierDescription({ class: pohonProp?.tierDescription })"
          >
            <slot
              :name="(`${tier.id}-description` as keyof PPricingTableSlots<T>)"
              :tier="tier"
            >
              <slot
                name="tier-description"
                :tier="(tier as T)"
              >
                {{ tier.description }}
              </slot>
            </slot>
          </div>

          <div
            data-slot="tierPriceWrapper"
            :class="pohon.tierPriceWrapper({ class: pohonProp?.tierPriceWrapper })"
          >
            <div
              v-if="(tier.discount && tier.price) || !!slots[(`${tier.id}-discount` as keyof PPricingTableSlots<T>)] || !!slots['tier-discount']"
              data-slot="tierDiscount"
              :class="pohon.tierDiscount({ class: pohonProp?.tierDiscount })"
            >
              <slot
                :name="(`${tier.id}-discount` as keyof PPricingTableSlots<T>)"
                :tier="tier"
              >
                <slot
                  name="tier-discount"
                  :tier="(tier as T)"
                >
                  {{ tier.price }}
                </slot>
              </slot>
            </div>

            <div
              v-if="(tier.discount || tier.price) || !!slots[(`${tier.id}-price` as keyof PPricingTableSlots<T>)] || !!slots['tier-price']"
              data-slot="tierPrice"
              :class="pohon.tierPrice({ class: pohonProp?.tierPrice })"
            >
              <slot
                :name="(`${tier.id}-price` as keyof PPricingTableSlots<T>)"
                :tier="tier"
              >
                <slot
                  name="tier-price"
                  :tier="(tier as T)"
                >
                  {{ tier.discount || tier.price }}
                </slot>
              </slot>
            </div>

            <div
              v-if="tier.billingCycle || tier.billingPeriod || !!slots[(`${tier.id}-billing` as keyof PPricingTableSlots<T>)] || !!slots['tier-billing']"
              data-slot="tierBilling"
              :class="pohon.tierBilling({ class: pohonProp?.tierBilling })"
            >
              <slot
                :name="(`${tier.id}-billing` as keyof PPricingTableSlots<T>)"
                :tier="tier"
              >
                <slot
                  name="tier-billing"
                  :tier="(tier as T)"
                >
                  <span
                    data-slot="tierBillingPeriod"
                    :class="pohon.tierBillingPeriod({ class: pohonProp?.tierBillingPeriod })"
                  >
                    {{ tier.billingPeriod || '&nbsp;' }}
                  </span>

                  <span
                    v-if="tier.billingCycle"
                    data-slot="tierBillingCycle"
                    :class="pohon.tierBillingCycle({ class: pohonProp?.tierBillingCycle })"
                  >
                    {{ tier.billingCycle }}
                  </span>
                </slot>
              </slot>
            </div>
          </div>

          <div
            v-if="!!slots[(`${tier.id}-button` as keyof PPricingTableSlots<T>)] || !!slots['tier-button'] || tier.button"
            data-slot="tierButton"
            :class="pohon.tierButton({ class: pohonProp?.tierButton })"
          >
            <slot
              :name="(`${tier.id}-button` as keyof PPricingTableSlots<T>)"
              :tier="tier"
            >
              <slot
                name="tier-button"
                :tier="(tier as T)"
              >
                <PButton
                  v-if="tier.button"
                  block
                  size="lg"
                  v-bind="tier.button"
                />
              </slot>
            </slot>
          </div>
        </slot>
      </slot>
    </div>
  </DefineTierTemplate>

  <DefineFeatureTemplate v-slot="{ feature, tier }">
    <template v-if="feature.tiers?.[tier.id]">
      <PIcon
        v-if="isBoolean(feature.tiers[tier.id])"
        :name="appConfig.pohon.icons.success"
        data-slot="tierFeatureIcon"
        :class="pohon.tierFeatureIcon({ class: pohonProp?.tierFeatureIcon, active: true })"
      />
      <template v-else>
        {{ feature.tiers[tier.id] }}
      </template>
    </template>

    <PIcon
      v-else
      :name="appConfig.pohon.icons.minus"
      data-slot="tierFeatureIcon"
      :class="pohon.tierFeatureIcon({ class: pohonProp?.tierFeatureIcon })"
    />
  </DefineFeatureTemplate>

  <APrimitive
    :as="as"
    v-bind="$attrs"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <table
      data-slot="table"
      :class="pohon.table({ class: pohonProp?.table })"
    >
      <caption
        v-if="caption || !!slots.caption"
        data-slot="caption"
        :class="pohon.caption({ class: [pohonProp?.caption] })"
      >
        <slot name="caption">
          {{ caption || t('pricingTable.caption') }}
        </slot>
      </caption>

      <thead
        data-slot="thead"
        :class="pohon.thead({ class: pohonProp?.thead })"
      >
        <tr
          data-slot="tr"
          :class="pohon.tr({ class: pohonProp?.tr })"
        >
          <td />

          <th
            v-for="(tier, index) in tiers"
            :key="index"
            scope="col"
            data-slot="tier"
            :class="pohon.tier({ class: pohonProp?.tier, highlight: tier.highlight })"
          >
            <ReuseTierTemplate :tier="tier" />
          </th>
        </tr>
      </thead>

      <tbody
        data-slot="tbody"
        :class="pohon.tbody({ class: pohonProp?.tbody })"
      >
        <template
          v-for="(section, sectionIndex) in sections"
          :key="sectionIndex"
        >
          <tr
            data-slot="tr"
            :class="pohon.tr({ class: pohonProp?.tr, section: sectionIndex > 0 })"
          >
            <th
              scope="row"
              data-slot="th"
              :class="pohon.th({ class: pohonProp?.th })"
            >
              <div
                v-if="section.title || !!slots['section-title'] || !!slots[(`section-${formatSlotName(section)}-title` as keyof PPricingTableSlots<T>)]"
                data-slot="sectionTitle"
                :class="pohon.sectionTitle({ class: pohonProp?.sectionTitle })"
              >
                <slot
                  :name="(`section-${formatSlotName(section)}-title` as keyof PPricingTableSlots<T>)"
                  :section="section"
                >
                  <slot
                    name="section-title"
                    :section="section"
                  >
                    {{ section.title }}
                  </slot>
                </slot>
              </div>
            </th>

            <td
              v-for="(tier, index) in tiers"
              :key="`${sectionIndex}-tier-${index}`"
              data-slot="td"
              :class="pohon.td({ class: pohonProp?.td, highlight: tier.highlight })"
            />
          </tr>

          <tr
            v-for="(feature, featureIndex) in section.features"
            :key="`${sectionIndex}-feature-${featureIndex}`"
          >
            <th
              scope="row"
              data-slot="th"
              :class="pohon.th({ class: pohonProp?.th })"
            >
              <div
                data-slot="featureTitle"
                :class="pohon.featureTitle({ class: pohonProp?.featureTitle })"
              >
                <slot
                  :name="(`feature-${formatSlotName(feature)}-title` as keyof PPricingTableSlots<T>)"
                  :feature="feature"
                  :section="section"
                >
                  <slot
                    name="feature-title"
                    :feature="feature"
                    :section="section"
                  >
                    {{ feature.title }}
                  </slot>
                </slot>
              </div>
            </th>

            <td
              v-for="(tier, index) in tiers"
              :key="`${sectionIndex}-feature-${featureIndex}-tier-${index}`"
              data-slot="td"
              :class="pohon.td({ class: pohonProp?.td, highlight: tier.highlight })"
            >
              <div
                data-slot="featureValue"
                :class="pohon.featureValue({ class: pohonProp?.featureValue })"
              >
                <slot
                  :name="(`feature-${formatSlotName(feature)}-value` as keyof PPricingTableSlots<T>)"
                  :feature="feature"
                  :tier="(tier as T)"
                  :section="section"
                >
                  <slot
                    name="feature-value"
                    :feature="feature"
                    :tier="(tier as T)"
                    :section="section"
                  >
                    <ReuseFeatureTemplate
                      :tier="tier"
                      :feature="feature"
                    />
                  </slot>
                </slot>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <ul
      data-slot="list"
      :class="pohon.list({ class: pohonProp?.list })"
    >
      <li
        v-for="(tier, index) in tiers"
        :key="index"
        data-slot="item"
        :class="pohon.item({ class: pohonProp?.item, highlight: tier.highlight })"
      >
        <ReuseTierTemplate :tier="tier" />

        <div
          v-for="(section, sectionIndex) in sections"
          :key="`section-${sectionIndex}`"
          data-slot="section"
          :class="pohon.section({ class: pohonProp?.section })"
        >
          <div
            v-if="section.title"
            data-slot="sectionTitle"
            :class="pohon.sectionTitle({ class: pohonProp?.sectionTitle })"
          >
            <slot
              :name="(`section-${formatSlotName(section)}-title` as keyof PPricingTableSlots<T>)"
              :section="section"
            >
              <slot
                name="section-title"
                :section="section"
              >
                {{ section.title }}
              </slot>
            </slot>
          </div>

          <div
            v-for="(feature, featureIndex) in section.features"
            :key="`section-${sectionIndex}-feature-${featureIndex}`"
            data-slot="feature"
            :class="pohon.feature({ class: pohonProp?.feature })"
          >
            <div
              data-slot="featureTitle"
              :class="pohon.featureTitle({ class: pohonProp?.featureTitle })"
            >
              <slot
                :name="(`feature-${formatSlotName(feature)}-title` as keyof PPricingTableSlots<T>)"
                :feature="feature"
                :section="section"
              >
                <slot
                  name="feature-title"
                  :feature="feature"
                  :section="section"
                >
                  {{ feature.title }}
                </slot>
              </slot>
            </div>

            <div
              data-slot="featureValue"
              :class="pohon.featureValue({ class: pohonProp?.featureValue })"
            >
              <slot
                :name="(`feature-${formatSlotName(feature)}-value` as keyof PPricingTableSlots<T>)"
                :feature="feature"
                :tier="(tier as T)"
                :section="section"
              >
                <slot
                  name="feature-value"
                  :feature="feature"
                  :tier="(tier as T)"
                  :section="section"
                >
                  <ReuseFeatureTemplate
                    :tier="tier"
                    :feature="feature"
                  />
                </slot>
              </slot>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </APrimitive>
</template>
