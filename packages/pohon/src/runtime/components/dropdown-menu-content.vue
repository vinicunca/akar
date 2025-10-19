<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type theme from '#build/pohon/dropdown-menu';
import type { AppConfig } from '@nuxt/schema';
import type {
  ADropdownMenuContentEmits as AkarDropdownMenuContentEmits,
  ADropdownMenuContentProps as AkarDropdownMenuContentProps,
} from 'akar';
import type { PAvatarProps, PDropdownMenuItem, PDropdownMenuSlots, PIconProps, PKbdProps } from '../types';
import type { ArrayOrNested, DynamicSlots, GetItemKeys, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';

type DropdownMenu = ComponentConfig<typeof theme, AppConfig, 'dropdownMenu'>;

interface DropdownMenuContentProps<T extends ArrayOrNested<PDropdownMenuItem>> extends Omit<AkarDropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
  items?: T;
  portal?: boolean | string | HTMLElement;
  sub?: boolean;
  labelKey: GetItemKeys<T>;
  /**
   * @IconifyIcon
   */
  checkedIcon?: PIconProps['name'];
  /**
   * @IconifyIcon
   */
  loadingIcon?: PIconProps['name'];
  /**
   * @IconifyIcon
   */
  externalIcon?: boolean | PIconProps['name'];
  class?: any;
  pohon: DropdownMenu['pohon'];
  pohonOverride?: DropdownMenu['slots'];
}

interface DropdownMenuContentEmits extends AkarDropdownMenuContentEmits {}

type DropdownMenuContentSlots<
  A extends ArrayOrNested<PDropdownMenuItem> = ArrayOrNested<PDropdownMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = Pick<PDropdownMenuSlots<A>, 'item' | 'item-leading' | 'item-label' | 'item-trailing' | 'content-top' | 'content-bottom'> & {
  default: (props?: object) => any;
}
& DynamicSlots<MergeTypes<T>, 'label', { active?: boolean; index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active?: boolean; index: number; pohon: DropdownMenu['pohon'] }>;

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PDropdownMenuItem>">
import { useAppConfig } from '#imports';
import { isString, omit } from '@vinicunca/perkakas';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import { ADropdownMenu } from 'akar/namespaced';
import { computed, toRef } from 'vue';
import { useLocale } from '../composables/use-locale';
import { usePortal } from '../composables/use-portal';
import { getProp, isArrayOfArray } from '../utils';
import { pickLinkProps } from '../utils/link';
import PAvatar from './avatar.vue';
import PDropdownMenuContent from './dropdown-menu-content.vue';
import PIcon from './icon.vue';
import PKbd from './kbd.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';

const props = defineProps<DropdownMenuContentProps<T>>();
const emits = defineEmits<DropdownMenuContentEmits>();
const slots = defineSlots<DropdownMenuContentSlots<T>>();

const { dir } = useLocale();
const appConfig = useAppConfig();

const portalProps = usePortal(toRef(() => props.portal));
const contentProps = useForwardPropsEmits(
  reactiveOmit(
    props,
    'sub',
    'items',
    'portal',
    'labelKey',
    'checkedIcon',
    'loadingIcon',
    'externalIcon',
    'class',
    'pohon',
    'pohonOverride',
  ),
  emits,
);
const getProxySlots = () => omit(slots, ['default']);

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: PDropdownMenuItem; active?: boolean; index: number }>();

const childrenIcon = computed(() => dir.value === 'rtl' ? appConfig.pohon.icons.chevronLeft : appConfig.pohon.icons.chevronRight);
const groups = computed<Array<Array<PDropdownMenuItem>>>(() => {
  if (props.items?.length) {
    return isArrayOfArray(props.items)
      ? props.items
      : [props.items];
  }

  return [];
},
);
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot
      :name="((item.slot || 'item') as keyof DropdownMenuContentSlots<T>)"
      :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
      :index="index"
      :pohon="pohon"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof DropdownMenuContentSlots<T>)"
        :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
        :active="active"
        :index="index"
        :pohon="pohon"
      >
        <PIcon
          v-if="item.loading"
          :name="loadingIcon || appConfig.pohon.icons.loading"
          :class="pohon.itemLeadingIcon({ class: [pohonOverride?.itemLeadingIcon, item.pohon?.itemLeadingIcon], color: item?.color, loading: true })"
        />
        <PIcon
          v-else-if="item.icon"
          :name="item.icon"
          :class="pohon.itemLeadingIcon({ class: [pohonOverride?.itemLeadingIcon, item.pohon?.itemLeadingIcon], color: item?.color, active })"
        />
        <PAvatar
          v-else-if="item.avatar"
          :size="((item.pohon?.itemLeadingAvatarSize || pohonOverride?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="item.avatar"
          :class="pohon.itemLeadingAvatar({ class: [pohonOverride?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar], active })"
        />
      </slot>

      <span
        v-if="getProp({ object: item, path: props.labelKey as string }) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof DropdownMenuContentSlots<T>]"
        :class="pohon.itemLabel({ class: [pohonOverride?.itemLabel, item.pohon?.itemLabel], active })"
      >
        <slot
          :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof DropdownMenuContentSlots<T>)"
          :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
          :active="active"
          :index="index"
        >
          {{ getProp({ object: item, path: props.labelKey as string }) }}
        </slot>

        <PIcon
          v-if="item.target === '_blank' && externalIcon !== false"
          :name="isString(externalIcon) ? externalIcon : appConfig.pohon.icons.external"
          :class="pohon.itemLabelExternalIcon({
            class: [pohonOverride?.itemLabelExternalIcon, item.pohon?.itemLabelExternalIcon],
            color: item?.color,
            active,
          })"
        />
      </span>

      <span :class="pohon.itemTrailing({ class: [pohonOverride?.itemTrailing, item.pohon?.itemTrailing] })">
        <slot
          :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof DropdownMenuContentSlots<T>)"
          :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
          :active="active"
          :index="index"
          :pohon="pohon"
        >
          <PIcon
            v-if="item.children?.length"
            :name="childrenIcon"
            :class="pohon.itemTrailingIcon({ class: [pohonOverride?.itemTrailingIcon, item.pohon?.itemTrailingIcon], color: item?.color, active })"
          />
          <span
            v-else-if="item.kbds?.length"
            :class="pohon.itemTrailingKbds({ class: [pohonOverride?.itemTrailingKbds, item.pohon?.itemTrailingKbds] })"
          >
            <PKbd
              v-for="(kbd, kbdIndex) in item.kbds"
              :key="kbdIndex"
              :size="((item.pohon?.itemTrailingKbdsSize || pohonOverride?.itemTrailingKbdsSize || pohon.itemTrailingKbdsSize()) as PKbdProps['size'])"
              v-bind="isString(kbd) ? { value: kbd } : kbd"
            />
          </span>
        </slot>

        <ADropdownMenu.ItemIndicator as-child>
          <PIcon
            :name="checkedIcon || appConfig.pohon.icons.check"
            :class="pohon.itemTrailingIcon({ class: [pohonOverride?.itemTrailingIcon, item.pohon?.itemTrailingIcon], color: item?.color })"
          />
        </ADropdownMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <ADropdownMenu.Portal v-bind="portalProps">
    <component
      :is="sub ? ADropdownMenu.SubContent : ADropdownMenu.Content"
      :class="props.class"
      v-bind="contentProps"
    >
      <slot name="content-top" />

      <div
        role="presentation"
        :class="pohon.viewport({ class: pohonOverride?.viewport })"
      >
        <ADropdownMenu.Group
          v-for="(group, groupIndex) in groups"
          :key="`group-${groupIndex}`"
          :class="pohon.group({ class: pohonOverride?.group })"
        >
          <template
            v-for="(item, index) in group"
            :key="`group-${groupIndex}-${index}`"
          >
            <ADropdownMenu.Label
              v-if="item.type === 'label'"
              :class="pohon.label({ class: [pohonOverride?.label, item.pohon?.label, item.class] })"
            >
              <ReuseItemTemplate
                :item="item"
                :index="index"
              />
            </ADropdownMenu.Label>
            <ADropdownMenu.Separator
              v-else-if="item.type === 'separator'"
              :class="pohon.separator({ class: [pohonOverride?.separator, item.pohon?.separator, item.class] })"
            />
            <ADropdownMenu.Sub
              v-else-if="item?.children?.length"
              :open="item.open"
              :default-open="item.defaultOpen"
            >
              <ADropdownMenu.SubTrigger
                as="button"
                type="button"
                :disabled="item.disabled"
                :text-value="getProp({ object: item, path: props.labelKey as string })"
                :class="pohon.item({ class: [pohonOverride?.item, item.pohon?.item, item.class], color: item?.color })"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="index"
                />
              </ADropdownMenu.SubTrigger>

              <PDropdownMenuContent
                sub
                :class="props.class"
                :pohon="pohon"
                :pohon-override="pohonOverride"
                :portal="portal"
                :items="(item.children as T)"
                align="start"
                :align-offset="-4"
                :side-offset="3"
                :label-key="labelKey"
                :checked-icon="checkedIcon"
                :loading-icon="loadingIcon"
                :external-icon="externalIcon"
                v-bind="item.content"
              >
                <template
                  v-for="(_, name) in getProxySlots()"
                  #[name]="slotData"
                >
                  <slot
                    :name="(name as keyof DropdownMenuContentSlots<T>)"
                    v-bind="slotData"
                  />
                </template>
              </PDropdownMenuContent>
            </ADropdownMenu.Sub>
            <ADropdownMenu.CheckboxItem
              v-else-if="item.type === 'checkbox'"
              :model-value="item.checked"
              :disabled="item.disabled"
              :text-value="getProp({ object: item, path: props.labelKey as string })"
              :class="pohon.item({ class: [pohonOverride?.item, item.pohon?.item, item.class], color: item?.color })"
              @update:model-value="item.onUpdateChecked"
              @select="item.onSelect"
            >
              <ReuseItemTemplate
                :item="item"
                :index="index"
              />
            </ADropdownMenu.CheckboxItem>
            <ADropdownMenu.Item
              v-else
              as-child
              :disabled="item.disabled"
              :text-value="getProp({ object: item, path: props.labelKey as string })"
              @select="item.onSelect"
            >
              <PLink
                v-slot="{ active, ...slotProps }"
                v-bind="pickLinkProps(item as Omit<PDropdownMenuItem, 'type'>)"
                custom
              >
                <PLinkBase
                  v-bind="slotProps"
                  :class="pohon.item({ class: [pohonOverride?.item, item.pohon?.item, item.class], color: item?.color, active })"
                >
                  <ReuseItemTemplate
                    :item="item"
                    :active="active"
                    :index="index"
                  />
                </PLinkBase>
              </PLink>
            </ADropdownMenu.Item>
          </template>
        </ADropdownMenu.Group>
      </div>

      <slot />

      <slot name="content-bottom" />
    </component>
  </ADropdownMenu.Portal>
</template>
