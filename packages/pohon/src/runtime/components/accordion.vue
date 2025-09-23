<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { AAccordionRootEmits, AAccordionRootProps } from 'akar';
import type { IconProps } from '../types';
import type { DynamicSlots, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/accordion';

type Accordion = ComponentConfig<typeof theme, AppConfig, 'accordion'>;

export interface AccordionItem {
  label?: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  /**
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name'];
  slot?: string;
  content?: string;
  /** A unique value for the accordion item. Defaults to the index. */
  value?: string;
  disabled?: boolean;
  class?: any;
  pohon?: Pick<Accordion['slots'], 'item' | 'header' | 'trigger' | 'leadingIcon' | 'label' | 'trailingIcon' | 'content' | 'body'>;
  [key: string]: any;
}

export interface AccordionProps<T extends AccordionItem = AccordionItem> extends Pick<AAccordionRootProps, 'collapsible' | 'defaultValue' | 'modelValue' | 'type' | 'disabled' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: AAccordionRootProps['as'];
  items?: Array<T>;
  /**
   * The icon displayed on the right side of the trigger.
   * @defaultValue appConfig.ui.icons.chevronDown
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name'];
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  class?: any;
  pohon?: Accordion['slots'];
}

export interface AccordionEmits extends AAccordionRootEmits {}

type SlotProps<T extends AccordionItem> = (props: { item: T; index: number; open: boolean }) => any;

export type AccordionSlots<T extends AccordionItem = AccordionItem> = {
  leading: SlotProps<T>;
  default: SlotProps<T>;
  trailing: SlotProps<T>;
  content: SlotProps<T>;
  body: SlotProps<T>;
} & DynamicSlots<T, 'body', { index: number; open: boolean }>;
</script>

<script setup lang="ts" generic="T extends AccordionItem">
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
  defineProps<AccordionProps<T>>(),
  {
    type: 'single',
    collapsible: true,
    unmountOnHide: true,
    labelKey: 'label',
  },
);
const emits = defineEmits<AccordionEmits>();
const slots = defineSlots<AccordionSlots<T>>();

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
  >
    <AAccordionItem
      v-for="(item, index) in props.items"
      v-slot="{ open }"
      :key="index"
      :value="item.value || String(index)"
      :disabled="item.disabled"
      :class="pohon.item({
        class: [props.pohon?.item, item.ui?.item, item.class],
      })"
    >
      <AAccordionHeader
        as="div"
        :class="pohon.header({ class: [props.pohon?.header, item.ui?.header] })"
      >
        <AAccordionTrigger
          :class="pohon.trigger({
            class: [props.pohon?.trigger, item.ui?.trigger], disabled: item.disabled,
          })"
        >
          <slot
            name="leading"
            :item="item"
            :index="index"
            :open="open"
          >
            <PIcon
              v-if="item.icon"
              :name="item.icon"
              :class="pohon.leadingIcon({ class: [props.pohon?.leadingIcon, item?.ui?.leadingIcon] })"
            />
          </slot>

          <span
            v-if="getProp({ object: item, path: props.labelKey as string }) || !!slots.default"
            :class="pohon.label({ class: [props.pohon?.label, item.ui?.label] })"
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
          >
            <PIcon
              :name="item.trailingIcon || trailingIcon || appConfig.pohon.icons.chevronDown"
              :class="pohon.trailingIcon({ class: [props.pohon?.trailingIcon, item.ui?.trailingIcon] })"
            />
          </slot>
        </AAccordionTrigger>
      </AAccordionHeader>

      <AAccordionContent
        v-if="item.content || !!slots.content || (item.slot && !!slots[item.slot as keyof AccordionSlots<T>]) || !!slots.body || (item.slot && !!slots[`${item.slot}-body` as keyof AccordionSlots<T>])"
        :class="pohon.content({ class: [props.pohon?.content, item.ui?.content] })"
      >
        <slot
          :name="(item.slot || 'content') as keyof AccordionSlots<T>"
          :item="item as Extract<T, { slot: string; }>"
          :index="index"
          :open="open"
        >
          <div :class="pohon.body({ class: [props.pohon?.body, item.ui?.body] })">
            <slot
              :name="(item.slot ? `${item.slot}-body` : 'body') as keyof AccordionSlots<T>"
              :item="item as Extract<T, { slot: string; }>"
              :index="index"
              :open="open"
            >
              {{ item.content }}
            </slot>
          </div>
        </slot>
      </AAccordionContent>
    </AAccordionItem>
  </AAccordionRoot>
</template>
