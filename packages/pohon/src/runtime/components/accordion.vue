<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AAccordionRootEmits, AAccordionRootProps } from 'akar';
import type { PIconProps } from '../types';
import type { DynamicSlots, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/accordion';

type Accordion = ComponentConfig<typeof theme, AppConfig, 'accordion'>;

export interface PAccordionItem {
  label?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * @IconifyIcon
   */
  trailingIcon?: PIconProps['name'];
  slot?: string;
  content?: string;
  /** A unique value for the accordion item. Defaults to the index. */
  value?: string;
  disabled?: boolean;
  class?: any;
  pohon?: Pick<Accordion['slots'], 'item' | 'header' | 'trigger' | 'leadingIcon' | 'label' | 'trailingIcon' | 'content' | 'body'>;
  [key: string]: any;
}

export interface PAccordionProps<T extends PAccordionItem = PAccordionItem> extends Pick<AAccordionRootProps, 'collapsible' | 'defaultValue' | 'modelValue' | 'type' | 'disabled' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  items?: Array<T>;
  /**
   * The icon displayed on the right side of the trigger.
   * @defaultValue appConfig.pohon.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: PIconProps['name'];
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  class?: any;
  pohon?: Accordion['slots'];
}

export interface PAccordionEmits extends AAccordionRootEmits {}

type SlotProps<T extends PAccordionItem> = (props: { item: T; index: number; open: boolean; pohon: Accordion['pohon'] }) => any;

export type PAccordionSlots<T extends PAccordionItem = PAccordionItem> = {
  leading: SlotProps<T>;
  default: (props: { item: T; index: number; open: boolean }) => any;
  trailing: SlotProps<T>;
  content: SlotProps<T>;
  body: SlotProps<T>;
} & DynamicSlots<T, 'body', { index: number; open: boolean; pohon: Accordion['pohon'] }>;
</script>

<script setup lang="ts" generic="T extends PAccordionItem">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import {
  AAccordionContent,
  AAccordionHeader,
  AAccordionItem,
  AAccordionRoot,
  AAccordionTrigger,
  useForwardPropsEmits,
} from 'akar';
import { computed } from 'vue';
import { getProp } from '../utils';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

const props = withDefaults(
  defineProps<PAccordionProps<T>>(),
  {
    type: 'single',
    collapsible: true,
    unmountOnHide: true,
    labelKey: 'label',
  },
);
const emits = defineEmits<PAccordionEmits>();
const slots = defineSlots<PAccordionSlots<T>>();

const appConfig = useAppConfig() as Accordion['AppConfig'];

const rootProps = useForwardPropsEmits(
  reactivePick(
    props,
    'as',
    'collapsible',
    'defaultValue',
    'disabled',
    'modelValue',
    'unmountOnHide',
  ),
  emits,
);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig?.pohon.accordion || {}),
  })({
    disabled: props.disabled,
  }),
);
</script>

<template>
  <AAccordionRoot
    v-bind="rootProps"
    :type="type"
    :class="pohon.root({
      class: [props.pohon?.root, props.class],
    })"
    data-pohon="accordion-root"
  >
    <AAccordionItem
      v-for="(item, index) in props.items"
      v-slot="{ open }"
      :key="index"
      :value="item.value || String(index)"
      :disabled="item.disabled"
      :class="pohon.item({
        class: [props.pohon?.item, item.pohon?.item, item.class],
      })"
      data-pohon="accordion-item"
    >
      <AAccordionHeader
        as="div"
        :class="pohon.header({ class: [props.pohon?.header, item.pohon?.header] })"
        data-pohon="accordion-header"
      >
        <AAccordionTrigger
          :class="pohon.trigger({
            class: [props.pohon?.trigger, item.pohon?.trigger], disabled: item.disabled,
          })"
          data-pohon="accordion-trigger"
        >
          <slot
            name="leading"
            :item="item"
            :index="index"
            :open="open"
            :pohon="pohon"
          >
            <PIcon
              v-if="item.icon"
              :name="item.icon"
              :class="pohon.leadingIcon({ class: [props.pohon?.leadingIcon, item?.pohon?.leadingIcon] })"
              data-pohon="accordion-leading-icon"
            />
          </slot>

          <span
            v-if="getProp({ object: item, path: props.labelKey as string }) || !!slots.default"
            :class="pohon.label({ class: [props.pohon?.label, item.pohon?.label] })"
            data-pohon="accordion-label"
          >
            <slot
              :item="item"
              :index="index"
              :open="open"
            >{{ getProp({ object: item, path: props.labelKey as string }) }}</slot>
          </span>

          <slot
            name="trailing"
            :item="item"
            :index="index"
            :open="open"
            :pohon="pohon"
          >
            <PIcon
              :name="item.trailingIcon || trailingIcon || appConfig.pohon.icons.chevronDown"
              :class="pohon.trailingIcon({ class: [props.pohon?.trailingIcon, item.pohon?.trailingIcon] })"
              data-pohon="accordion-trailing-icon"
            />
          </slot>
        </AAccordionTrigger>
      </AAccordionHeader>

      <AAccordionContent
        v-if="item.content || !!slots.content || (item.slot && !!slots[item.slot as keyof PAccordionSlots<T>]) || !!slots.body || (item.slot && !!slots[`${item.slot}-body` as keyof PAccordionSlots<T>])"
        :class="pohon.content({ class: [props.pohon?.content, item.pohon?.content] })"
        data-pohon="accordion-content"
      >
        <slot
          :name="((item.slot || 'content') as keyof PAccordionSlots<T>)"
          :item="item as Extract<T, { slot: string; }>"
          :index="index"
          :open="open"
          :pohon="pohon"
        >
          <div
            :class="pohon.body({ class: [props.pohon?.body, item.pohon?.body] })"
            data-pohon="accordion-body"
          >
            <slot
              :name="((item.slot ? `${item.slot}-body` : 'body') as keyof PAccordionSlots<T>)"
              :item="(item as Extract<T, { slot: string; }>)"
              :index="index"
              :open="open"
              :pohon="pohon"
            >
              {{ item.content }}
            </slot>
          </div>
        </slot>
      </AAccordionContent>
    </AAccordionItem>
  </AAccordionRoot>
</template>
