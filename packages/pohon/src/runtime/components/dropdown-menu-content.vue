<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type {
  ADropdownMenuContentEmits,
  ADropdownMenuContentProps,
} from 'akar';
import type { VNode } from 'vue';
import type theme from '#build/pohon/dropdown-menu';
import type { PAvatarProps, PDropdownMenuItem, PDropdownMenuSlots, PIconProps, PInputProps, PKbdProps } from '../types';
import type { ArrayOrNested, DynamicSlots, GetItemKeys, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';

type DropdownMenu = ComponentConfig<typeof theme, AppConfig, 'dropdownMenu'>;

export interface PDropdownMenuContentProps<T extends ArrayOrNested<PDropdownMenuItem>> extends Omit<ADropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
  items?: T;
  portal?: boolean | string | HTMLElement;
  sub?: boolean;
  labelKey: GetItemKeys<T>;
  descriptionKey: GetItemKeys<T>;
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
  size?: DropdownMenu['variants']['size'];
  filter?: boolean | Omit<PInputProps, 'modelValue' | 'defaultValue'>;
  filterFields?: Array<string>;
  ignoreFilter?: boolean;
  searchTerm?: string;
  class?: any;
  pohon: DropdownMenu['pohon'];
  pohonOverride?: DropdownMenu['slots'];
}

export interface PDropdownMenuContentEmits extends ADropdownMenuContentEmits {
  'update:searchTerm': [value: string];
}

type PDropdownMenuContentSlots<
  A extends ArrayOrNested<PDropdownMenuItem> = ArrayOrNested<PDropdownMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = Pick<PDropdownMenuSlots<A>, 'item' | 'item-leading' | 'item-label' | 'item-description' | 'item-trailing' | 'empty' | 'content-top' | 'content-bottom'> & {
  default?: (props?: {}) => Array<VNode>;
}
& DynamicSlots<MergeTypes<T>, 'label' | 'description', { active: boolean; index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active: boolean; index: number; pohon: DropdownMenu['pohon'] }>;

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PDropdownMenuItem>">
import { isString } from '@vinicunca/perkakas';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import { ADropdownMenu } from 'akar/namespaced';
import { defu } from 'defu';
import { computed, ref, toRef } from 'vue';
import { useAppConfig } from '#imports';
import { FieldGroupReset } from '../composables/use-field-group';
import { useFilter } from '../composables/use-filter';
import { useLocale } from '../composables/use-locale';
import { usePortal } from '../composables/use-portal';
import { getProp, isArrayOfArray, omit } from '../utils';
import { pickLinkProps } from '../utils/link';
import PAvatar from './avatar.vue';
import PDropdownMenuContent from './dropdown-menu-content.vue';
import PIcon from './icon.vue';
import PInput from './input.vue';
import PKbd from './kbd.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';

const props = defineProps<PDropdownMenuContentProps<T>>();
const emits = defineEmits<PDropdownMenuContentEmits>();
const slots = defineSlots<PDropdownMenuContentSlots<T>>();

const { t, dir } = useLocale();
const appConfig = useAppConfig();
const { filterGroups } = useFilter();

const _searchTerm = ref('');
const searchTerm = computed({
  get: () => props.searchTerm ?? _searchTerm.value,
  set: (value: string) => {
    _searchTerm.value = value;
    emits('update:searchTerm', value);
  },
});

const inputProps = toRef(() => defu(props.filter, { placeholder: t('dropdownMenu.search'), variant: 'none' }) as Omit<PInputProps, 'modelValue' | 'defaultValue'>);

const portalProps = usePortal(toRef(() => props.portal));
const contentProps = useForwardPropsEmits(
  reactiveOmit(
    props,
    'sub',
    'items',
    'portal',
    'labelKey',
    'descriptionKey',
    'checkedIcon',
    'loadingIcon',
    'externalIcon',
    'size',
    'filter',
    'filterFields',
    'ignoreFilter',
    'searchTerm',
    'class',
    'pohon',
    'pohonOverride',
  ),
  emits,
);
const getProxySlots = () => omit(slots, ['default']);

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: PDropdownMenuItem; active?: boolean; index: number }>();

const childrenIcon = computed(() => dir.value === 'rtl' ? appConfig.pohon.icons.chevronLeft : appConfig.pohon.icons.chevronRight);
const groups = computed(() => {
  if (!props.items?.length) {
    return [] as Array<Array<PDropdownMenuItem>>;
  }
  return (isArrayOfArray(props.items) ? props.items : [props.items]) as Array<Array<PDropdownMenuItem>>;
});
const isStructuralItem = (item: PDropdownMenuItem) => !!item.type && ['label', 'separator'].includes(item.type);

const filteredGroups = computed(() => {
  if (!props.filter || props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }

  const fields = Array.isArray(props.filterFields) && props.filterFields.length ? props.filterFields : [props.labelKey] as Array<string>;

  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: isStructuralItem,
  });
});
const hasFilteredItems = computed(() => filteredGroups.value.some((group) => group.some((item) => !isStructuralItem(item))));
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot
      :name="((item.slot || 'item') as keyof PDropdownMenuContentSlots<T>)"
      :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
      :index="index"
      :pohon="pohon"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof PDropdownMenuContentSlots<T>)"
        :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
        :active="active"
        :index="index"
        :pohon="pohon"
      >
        <PIcon
          v-if="item.loading"
          :name="loadingIcon || appConfig.pohon.icons.loading"
          data-slot="itemLeadingIcon"
          :class="pohon.itemLeadingIcon({ class: [pohonOverride?.itemLeadingIcon, item.pohon?.itemLeadingIcon], color: item?.color, loading: true })"
        />
        <PIcon
          v-else-if="item.icon"
          :name="item.icon"
          data-slot="itemLeadingIcon"
          :class="pohon.itemLeadingIcon({ class: [pohonOverride?.itemLeadingIcon, item.pohon?.itemLeadingIcon], color: item?.color, active })"
        />
        <PAvatar
          v-else-if="item.avatar"
          :size="((item.pohon?.itemLeadingAvatarSize || pohonOverride?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="item.avatar"
          data-slot="itemLeadingAvatar"
          :class="pohon.itemLeadingAvatar({ class: [pohonOverride?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar], active })"
        />
      </slot>

      <span
        v-if="(getProp(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof PDropdownMenuSlots<T>]) || (getProp(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description` : 'item-description') as keyof PDropdownMenuSlots<T>])"
        data-slot="itemWrapper"
        :class="pohon.itemWrapper({ class: [pohonOverride?.itemWrapper, item.pohon?.itemWrapper] })"
      >
        <span
          data-slot="itemLabel"
          :class="pohon.itemLabel({ class: [pohonOverride?.itemLabel, item.pohon?.itemLabel], active })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof PDropdownMenuContentSlots<T>)"
            :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
            :active="active"
            :index="index"
          >
            {{ getProp(item, props.labelKey as string) }}
          </slot>

          <PIcon
            v-if="item.target === '_blank' && externalIcon !== false"
            :name="isString(externalIcon) ? externalIcon : appConfig.pohon.icons.external"
            data-slot="itemLabelExternalIcon"
            :class="pohon.itemLabelExternalIcon({ class: [pohonOverride?.itemLabelExternalIcon, item.pohon?.itemLabelExternalIcon], color: item?.color, active })"
          />
        </span>

        <span
          v-if="getProp(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description` : 'item-description') as keyof PDropdownMenuContentSlots<T>]"
          data-slot="itemDescription"
          :class="pohon.itemDescription({ class: [pohonOverride?.itemDescription, item.pohon?.itemDescription] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-description` : 'item-description') as keyof PDropdownMenuContentSlots<T>)"
            :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
            :active="active"
            :index="index"
          >
            {{ getProp(item, props.descriptionKey as string) }}
          </slot>
        </span>
      </span>

      <span
        data-slot="itemTrailing"
        :class="pohon.itemTrailing({ class: [pohonOverride?.itemTrailing, item.pohon?.itemTrailing] })"
      >
        <slot
          :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PDropdownMenuContentSlots<T>)"
          :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
          :active="active"
          :index="index"
          :pohon="pohon"
        >
          <PIcon
            v-if="item.children?.length"
            :name="childrenIcon"
            data-slot="itemTrailingIcon"
            :class="pohon.itemTrailingIcon({ class: [pohonOverride?.itemTrailingIcon, item.pohon?.itemTrailingIcon], color: item?.color, active })"
          />
          <span
            v-else-if="item.kbds?.length"
            data-slot="itemTrailingKbds"
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
            data-slot="itemTrailingIcon"
            :class="pohon.itemTrailingIcon({ class: [pohonOverride?.itemTrailingIcon, item.pohon?.itemTrailingIcon], color: item?.color })"
          />
        </ADropdownMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <ADropdownMenu.Portal v-bind="portalProps">
    <FieldGroupReset>
      <component
        :is="sub ? ADropdownMenu.SubContent : ADropdownMenu.Content"
        data-slot="content"
        :class="pohon.content({ class: [pohonOverride?.content, props.class] })"
        v-bind="contentProps"
      >
        <ADropdownMenu.Filter
          v-if="!!filter"
          v-model="searchTerm"
          as-child
        >
          <PInput
            autofocus
            autocomplete="off"
            :size="size"
            v-bind="inputProps"
            data-slot="input"
            :class="pohon.input({ class: pohonOverride?.input })"
            @change.stop
          />
        </ADropdownMenu.Filter>

        <slot
          name="content-top"
          :sub="sub ?? false"
        />

        <div
          v-if="!searchTerm || hasFilteredItems"
          role="presentation"
          data-slot="viewport"
          :class="pohon.viewport({ class: pohonOverride?.viewport })"
        >
          <ADropdownMenu.Group
            v-for="(group, groupIndex) in filteredGroups"
            :key="`group-${groupIndex}`"
            data-slot="group"
            :class="pohon.group({ class: pohonOverride?.group })"
          >
            <template
              v-for="(item, index) in group"
              :key="`group-${groupIndex}-${index}`"
            >
              <ADropdownMenu.Label
                v-if="item.type === 'label'"
                data-slot="label"
                :class="pohon.label({ class: [pohonOverride?.label, item.pohon?.label, item.class] })"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="index"
                />
              </ADropdownMenu.Label>
              <ADropdownMenu.Separator
                v-else-if="item.type === 'separator'"
                data-slot="separator"
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
                  :text-value="getProp(item, props.labelKey as string)"
                  data-slot="item"
                  :class="pohon.item({ class: [pohonOverride?.item, item.pohon?.item, item.class], color: item?.color })"
                >
                  <ReuseItemTemplate
                    :item="item"
                    :index="index"
                  />
                </ADropdownMenu.SubTrigger>

                <PDropdownMenuContent
                  sub
                  :class="item.pohon?.content"
                  :pohon="pohon"
                  :pohon-override="pohonOverride"
                  :portal="portal"
                  :items="(item.children as T)"
                  align="start"
                  :align-offset="-4"
                  :side-offset="3"
                  :label-key="labelKey"
                  :description-key="descriptionKey"
                  :checked-icon="checkedIcon"
                  :loading-icon="loadingIcon"
                  :external-icon="externalIcon"
                  :size="size"
                  :filter="item.filter"
                  :filter-fields="item.filterFields || filterFields"
                  :ignore-filter="item.ignoreFilter ?? ignoreFilter"
                  v-bind="item.content"
                >
                  <template
                    v-for="(_, name) in getProxySlots()"
                    #[name]="slotData"
                  >
                    <slot
                      :name="(name as keyof PDropdownMenuContentSlots<T>)"
                      v-bind="slotData"
                    />
                  </template>
                </PDropdownMenuContent>
              </ADropdownMenu.Sub>
              <ADropdownMenu.CheckboxItem
                v-else-if="item.type === 'checkbox'"
                :model-value="item.checked"
                :disabled="item.disabled"
                :text-value="getProp(item, props.labelKey as string)"
                data-slot="item"
                :class="pohon.item({ class: [pohonOverride?.item, item.pohon?.item, item.class], color: item?.color })"
                @update:model-value="item.onUpdateChecked"
                @select="item.onSelect"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="index"
                />
              </ADropdownMenu.CheckboxItem>
              <PLink
                v-else
                v-slot="{ active, ...slotProps }"
                v-bind="pickLinkProps(item as Omit<PDropdownMenuItem, 'type'>)"
                custom
              >
                <ADropdownMenu.Item
                  as-child
                  :disabled="item.disabled"
                  :text-value="getProp(item, props.labelKey as string)"
                  @select="item.onSelect"
                >
                  <PLinkBase
                    v-bind="slotProps"
                    data-slot="item"
                    :class="pohon.item({ class: [pohonOverride?.item, item.pohon?.item, item.class], color: item?.color, active })"
                  >
                    <ReuseItemTemplate
                      :item="item"
                      :active="active"
                      :index="index"
                    />
                  </PLinkBase>
                </ADropdownMenu.Item>
              </PLink>
            </template>
          </ADropdownMenu.Group>
        </div>

        <div
          v-if="searchTerm && !hasFilteredItems"
          data-slot="empty"
          :class="pohon.empty({ class: pohonOverride?.empty })"
        >
          <slot
            name="empty"
            :search-term="searchTerm"
          >
            {{ t('dropdownMenu.noMatch', { searchTerm }) }}
          </slot>
        </div>

        <slot />

        <slot
          name="content-bottom"
          :sub="sub ?? false"
        />
      </component>
    </FieldGroupReset>
  </ADropdownMenu.Portal>
</template>
