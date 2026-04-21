<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type theme from '#build/pohon/dropdown-menu';
import type { AppConfig } from '@nuxt/schema';
import type { DropdownMenuContentEmits as RekaDropdownMenuContentEmits, DropdownMenuContentProps as RekaDropdownMenuContentProps } from 'akar';
import type { VNode } from 'vue';
import type { AAvatarProps, DropdownMenuItem, DropdownMenuSlots, InputProps, KbdProps, PIconProps } from '../types';
import type { ArrayOrNested, DynamicSlots, GetItemKeys, MergeTypes, NestedItem } from '../types/utils';
import type { ComponentConfig } from '../types/uv';

type DropdownMenu = ComponentConfig<typeof theme, AppConfig, 'dropdownMenu'>;

interface DropdownMenuContentProps<T extends ArrayOrNested<DropdownMenuItem>> extends Omit<RekaDropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
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
  filter?: boolean | Omit<InputProps, 'modelValue' | 'defaultValue'>;
  filterFields?: Array<string>;
  ignoreFilter?: boolean;
  searchTerm?: string;
  class?: any;
  pohon: DropdownMenu['pohon'];
  uiOverride?: DropdownMenu['slots'];
}

interface DropdownMenuContentEmits extends RekaDropdownMenuContentEmits {
  'update:searchTerm': [value: string];
}

type DropdownMenuContentSlots<
  A extends ArrayOrNested<DropdownMenuItem> = ArrayOrNested<DropdownMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = Pick<DropdownMenuSlots<A>, 'item' | 'item-leading' | 'item-label' | 'item-description' | 'item-trailing' | 'empty' | 'content-top' | 'content-bottom'> & {
  default?: (props?: {}) => Array<VNode>;
}
& DynamicSlots<MergeTypes<T>, 'label' | 'description', { active: boolean; index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active: boolean; index: number; pohon: DropdownMenu['pohon'] }>;

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<DropdownMenuItem>">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import { DropdownMenu } from 'akar/namespaced';
import { defu } from 'defu';
import { computed, ref, toRef } from 'vue';
import { useLocale } from '../composables/use-locale';
import { FieldGroupReset } from '../composables/useFieldGroup';
import { useFilter } from '../composables/useFilter';
import { usePortal } from '../composables/usePortal';
import { get, isArrayOfArray, omit } from '../utils';
import { pickLinkProps } from '../utils/link';
import PAvatar from './avatar.vue';
import UDropdownMenuContent from './DropdownMenuContent.vue';
import PIcon from './icon.vue';
import UInput from './Input.vue';
import UKbd from './Kbd.vue';
import ULink from './Link.vue';
import ULinkBase from './LinkBase.vue';

const props = defineProps<DropdownMenuContentProps<T>>();
const emits = defineEmits<DropdownMenuContentEmits>();
const slots = defineSlots<DropdownMenuContentSlots<T>>();

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

const inputProps = toRef(() => defu(props.filter, { placeholder: t('dropdownMenu.search'), variant: 'none' }) as Omit<InputProps, 'modelValue' | 'defaultValue'>);

const portalProps = usePortal(toRef(() => props.portal));
const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'labelKey', 'descriptionKey', 'checkedIcon', 'loadingIcon', 'externalIcon', 'size', 'filter', 'filterFields', 'ignoreFilter', 'searchTerm', 'class', 'pohon', 'uiOverride'), emits);
const getProxySlots = () => omit(slots, ['default']);

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: DropdownMenuItem; active?: boolean; index: number }>();

const childrenIcon = computed(() => dir.value === 'rtl' ? appConfig.pohon.icons.chevronLeft : appConfig.pohon.icons.chevronRight);
const groups = computed(() => {
  if (!props.items?.length) {
    return [] as Array<Array<DropdownMenuItem>>;
  }
  return (isArrayOfArray(props.items) ? props.items : [props.items]) as Array<Array<DropdownMenuItem>>;
});
const isStructuralItem = (item: DropdownMenuItem) => !!item.type && ['label', 'separator'].includes(item.type);

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
          data-slot="itemLeadingIcon"
          :class="pohon.itemLeadingIcon({ class: [uiOverride?.itemLeadingIcon, item.pohon?.itemLeadingIcon], color: item?.color, loading: true })"
        />
        <PIcon
          v-else-if="item.icon"
          :name="item.icon"
          data-slot="itemLeadingIcon"
          :class="pohon.itemLeadingIcon({ class: [uiOverride?.itemLeadingIcon, item.pohon?.itemLeadingIcon], color: item?.color, active })"
        />
        <PAvatar
          v-else-if="item.avatar"
          :size="((item.pohon?.itemLeadingAvatarSize || uiOverride?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as AAvatarProps['size'])"
          v-bind="item.avatar"
          data-slot="itemLeadingAvatar"
          :class="pohon.itemLeadingAvatar({ class: [uiOverride?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar], active })"
        />
      </slot>

      <span
        v-if="(get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof DropdownMenuSlots<T>]) || (get(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description` : 'item-description') as keyof DropdownMenuSlots<T>])"
        data-slot="itemWrapper"
        :class="pohon.itemWrapper({ class: [uiOverride?.itemWrapper, item.pohon?.itemWrapper] })"
      >
        <span
          data-slot="itemLabel"
          :class="pohon.itemLabel({ class: [uiOverride?.itemLabel, item.pohon?.itemLabel], active })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof DropdownMenuContentSlots<T>)"
            :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
            :active="active"
            :index="index"
          >
            {{ get(item, props.labelKey as string) }}
          </slot>

          <PIcon
            v-if="item.target === '_blank' && externalIcon !== false"
            :name="typeof externalIcon === 'string' ? externalIcon : appConfig.pohon.icons.external"
            data-slot="itemLabelExternalIcon"
            :class="pohon.itemLabelExternalIcon({ class: [uiOverride?.itemLabelExternalIcon, item.pohon?.itemLabelExternalIcon], color: item?.color, active })"
          />
        </span>

        <span
          v-if="get(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description` : 'item-description') as keyof DropdownMenuContentSlots<T>]"
          data-slot="itemDescription"
          :class="pohon.itemDescription({ class: [uiOverride?.itemDescription, item.pohon?.itemDescription] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-description` : 'item-description') as keyof DropdownMenuContentSlots<T>)"
            :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
            :active="active"
            :index="index"
          >
            {{ get(item, props.descriptionKey as string) }}
          </slot>
        </span>
      </span>

      <span
        data-slot="itemTrailing"
        :class="pohon.itemTrailing({ class: [uiOverride?.itemTrailing, item.pohon?.itemTrailing] })"
      >
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
            data-slot="itemTrailingIcon"
            :class="pohon.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.pohon?.itemTrailingIcon], color: item?.color, active })"
          />
          <span
            v-else-if="item.kbds?.length"
            data-slot="itemTrailingKbds"
            :class="pohon.itemTrailingKbds({ class: [uiOverride?.itemTrailingKbds, item.pohon?.itemTrailingKbds] })"
          >
            <UKbd
              v-for="(kbd, kbdIndex) in item.kbds"
              :key="kbdIndex"
              :size="((item.pohon?.itemTrailingKbdsSize || uiOverride?.itemTrailingKbdsSize || pohon.itemTrailingKbdsSize()) as KbdProps['size'])"
              v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
            />
          </span>
        </slot>

        <DropdownMenu.ItemIndicator as-child>
          <PIcon
            :name="checkedIcon || appConfig.pohon.icons.check"
            data-slot="itemTrailingIcon"
            :class="pohon.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.pohon?.itemTrailingIcon], color: item?.color })"
          />
        </DropdownMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <DropdownMenu.Portal v-bind="portalProps">
    <FieldGroupReset>
      <component
        :is="sub ? DropdownMenu.SubContent : DropdownMenu.Content"
        data-slot="content"
        :class="pohon.content({ class: [uiOverride?.content, props.class] })"
        v-bind="contentProps"
      >
        <DropdownMenu.Filter
          v-if="!!filter"
          v-model="searchTerm"
          as-child
        >
          <UInput
            autofocus
            autocomplete="off"
            :size="size"
            v-bind="inputProps"
            data-slot="input"
            :class="pohon.input({ class: uiOverride?.input })"
            @change.stop
          />
        </DropdownMenu.Filter>

        <slot
          name="content-top"
          :sub="sub ?? false"
        />

        <div
          v-if="!searchTerm || hasFilteredItems"
          role="presentation"
          data-slot="viewport"
          :class="pohon.viewport({ class: uiOverride?.viewport })"
        >
          <DropdownMenu.Group
            v-for="(group, groupIndex) in filteredGroups"
            :key="`group-${groupIndex}`"
            data-slot="group"
            :class="pohon.group({ class: uiOverride?.group })"
          >
            <template
              v-for="(item, index) in group"
              :key="`group-${groupIndex}-${index}`"
            >
              <DropdownMenu.Label
                v-if="item.type === 'label'"
                data-slot="label"
                :class="pohon.label({ class: [uiOverride?.label, item.pohon?.label, item.class] })"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="index"
                />
              </DropdownMenu.Label>
              <DropdownMenu.Separator
                v-else-if="item.type === 'separator'"
                data-slot="separator"
                :class="pohon.separator({ class: [uiOverride?.separator, item.pohon?.separator, item.class] })"
              />
              <DropdownMenu.Sub
                v-else-if="item?.children?.length"
                :open="item.open"
                :default-open="item.defaultOpen"
              >
                <DropdownMenu.SubTrigger
                  as="button"
                  type="button"
                  :disabled="item.disabled"
                  :text-value="get(item, props.labelKey as string)"
                  data-slot="item"
                  :class="pohon.item({ class: [uiOverride?.item, item.pohon?.item, item.class], color: item?.color })"
                >
                  <ReuseItemTemplate
                    :item="item"
                    :index="index"
                  />
                </DropdownMenu.SubTrigger>

                <UDropdownMenuContent
                  sub
                  :class="item.pohon?.content"
                  :pohon="pohon"
                  :pohon-override="uiOverride"
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
                      :name="(name as keyof DropdownMenuContentSlots<T>)"
                      v-bind="slotData"
                    />
                  </template>
                </UDropdownMenuContent>
              </DropdownMenu.Sub>
              <DropdownMenu.CheckboxItem
                v-else-if="item.type === 'checkbox'"
                :model-value="item.checked"
                :disabled="item.disabled"
                :text-value="get(item, props.labelKey as string)"
                data-slot="item"
                :class="pohon.item({ class: [uiOverride?.item, item.pohon?.item, item.class], color: item?.color })"
                @update:model-value="item.onUpdateChecked"
                @select="item.onSelect"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="index"
                />
              </DropdownMenu.CheckboxItem>
              <ULink
                v-else
                v-slot="{ active, ...slotProps }"
                v-bind="pickLinkProps(item as Omit<DropdownMenuItem, 'type'>)"
                custom
              >
                <DropdownMenu.Item
                  as-child
                  :disabled="item.disabled"
                  :text-value="get(item, props.labelKey as string)"
                  @select="item.onSelect"
                >
                  <ULinkBase
                    v-bind="slotProps"
                    data-slot="item"
                    :class="pohon.item({ class: [uiOverride?.item, item.pohon?.item, item.class], color: item?.color, active })"
                  >
                    <ReuseItemTemplate
                      :item="item"
                      :active="active"
                      :index="index"
                    />
                  </ULinkBase>
                </DropdownMenu.Item>
              </ULink>
            </template>
          </DropdownMenu.Group>
        </div>

        <div
          v-if="searchTerm && !hasFilteredItems"
          data-slot="empty"
          :class="pohon.empty({ class: uiOverride?.empty })"
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
  </DropdownMenu.Portal>
</template>
