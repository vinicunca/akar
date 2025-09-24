<script lang="ts">
import type theme from '#build/pohon/context-menu';
import type { AppConfig } from '@nuxt/schema';
import type { ContextMenuContentEmits as RekaContextMenuContentEmits, ContextMenuContentProps as RekaContextMenuContentProps } from 'akar';
import type { AvatarProps, ContextMenuItem, ContextMenuSlots, IconProps, KbdProps } from '../types';
import type { ArrayOrNested, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';

type ContextMenu = ComponentConfig<typeof theme, AppConfig, 'contextMenu'>;

interface ContextMenuContentProps<T extends ArrayOrNested<ContextMenuItem>> extends Omit<RekaContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
  items?: T;
  portal?: boolean | string | HTMLElement;
  sub?: boolean;
  labelKey: GetItemKeys<T>;
  /**
   * @IconifyIcon
   */
  checkedIcon?: IconProps['name'];
  /**
   * @IconifyIcon
   */
  loadingIcon?: IconProps['name'];
  /**
   * @IconifyIcon
   */
  externalIcon?: boolean | IconProps['name'];
  class?: any;
  pohon: { [K in keyof Required<ContextMenu['slots']>]: (props?: Record<string, any>) => string };
  uiOverride?: ContextMenu['slots'];
}

interface ContextMenuContentEmits extends RekaContextMenuContentEmits {}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<ContextMenuItem>">
import { useAppConfig } from '#imports';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import { ContextMenu } from 'akar/namespaced';
import { computed, toRef } from 'vue';
import { useLocale } from '../composables/use-locale';
import { usePortal } from '../composables/usePortal';
import { get, isArrayOfArray, omit } from '../utils';
import { pickLinkProps } from '../utils/link';
import PAvatar from './avatar.vue';
import UContextMenuContent from './context-menu-content.vue';
import PIcon from './icon.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';
import PKbd from './xKbd.vue';

const props = defineProps<ContextMenuContentProps<T>>();
const emits = defineEmits<ContextMenuContentEmits>();
const slots = defineSlots<ContextMenuSlots<T>>();

const { dir } = useLocale();
const appConfig = useAppConfig();

const portalProps = usePortal(toRef(() => props.portal));
const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'labelKey', 'checkedIcon', 'loadingIcon', 'externalIcon', 'class', 'ui', 'uiOverride'), emits);
const getProxySlots = () => omit(slots, ['default']);

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: ContextMenuItem; active?: boolean; index: number }>();

const childrenIcon = computed(() => dir.value === 'rtl' ? appConfig.pohon.icons.chevronLeft : appConfig.pohon.icons.chevronRight);
const groups = computed<Array<Array<ContextMenuItem>>>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : [],
);
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot
      :name="((item.slot || 'item') as keyof ContextMenuSlots<T>)"
      :item="item"
      :index="index"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof ContextMenuSlots<T>)"
        :item="item"
        :active="active"
        :index="index"
      >
        <PIcon
          v-if="item.loading"
          :name="loadingIcon || appConfig.pohon.icons.loading"
          :class="pohon.itemLeadingIcon({ class: [uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })"
        />
        <PIcon
          v-else-if="item.icon"
          :name="item.icon"
          :class="pohon.itemLeadingIcon({ class: [uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })"
        />
        <PAvatar
          v-else-if="item.avatar"
          :size="((item.ui?.itemLeadingAvatarSize || uiOverride?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as AvatarProps['size'])"
          v-bind="item.avatar"
          :class="pohon.itemLeadingAvatar({ class: [uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })"
        />
      </slot>

      <span
        v-if="get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof ContextMenuSlots<T>]"
        :class="pohon.itemLabel({ class: [uiOverride?.itemLabel, item.ui?.itemLabel], active })"
      >
        <slot
          :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof ContextMenuSlots<T>)"
          :item="item"
          :active="active"
          :index="index"
        >
          {{ get(item, props.labelKey as string) }}
        </slot>

        <PIcon
          v-if="item.target === '_blank' && externalIcon !== false"
          :name="isString(externalIcon) ? externalIcon : appConfig.pohon.icons.external"
          :class="pohon.itemLabelExternalIcon({ class: [uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })"
        />
      </span>

      <span :class="pohon.itemTrailing({ class: [uiOverride?.itemTrailing, item.ui?.itemTrailing] })">
        <slot
          :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof ContextMenuSlots<T>)"
          :item="item"
          :active="active"
          :index="index"
        >
          <PIcon
            v-if="item.children?.length"
            :name="childrenIcon"
            :class="pohon.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })"
          />
          <span
            v-else-if="item.kbds?.length"
            :class="pohon.itemTrailingKbds({ class: [uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })"
          >
            <PKbd
              v-for="(kbd, kbdIndex) in item.kbds"
              :key="kbdIndex"
              :size="((item.ui?.itemTrailingKbdsSize || uiOverride?.itemTrailingKbdsSize || pohon.itemTrailingKbdsSize()) as KbdProps['size'])"
              v-bind="isString(kbd) ? { value: kbd } : kbd"
            />
          </span>
        </slot>

        <ContextMenu.ItemIndicator as-child>
          <PIcon
            :name="checkedIcon || appConfig.pohon.icons.check"
            :class="pohon.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })"
          />
        </ContextMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <ContextMenu.Portal v-bind="portalProps">
    <component
      :is="sub ? ContextMenu.SubContent : ContextMenu.Content"
      :class="props.class"
      v-bind="contentProps"
    >
      <slot name="content-top" />

      <div
        role="presentation"
        :class="pohon.viewport({ class: uiOverride?.viewport })"
      >
        <ContextMenu.Group
          v-for="(group, groupIndex) in groups"
          :key="`group-${groupIndex}`"
          :class="pohon.group({ class: uiOverride?.group })"
        >
          <template
            v-for="(item, index) in group"
            :key="`group-${groupIndex}-${index}`"
          >
            <ContextMenu.Label
              v-if="item.type === 'label'"
              :class="pohon.label({ class: [uiOverride?.label, item.ui?.label, item.class] })"
            >
              <ReuseItemTemplate
                :item="item"
                :index="index"
              />
            </ContextMenu.Label>
            <ContextMenu.Separator
              v-else-if="item.type === 'separator'"
              :class="pohon.separator({ class: [uiOverride?.separator, item.ui?.separator, item.class] })"
            />
            <ContextMenu.Sub
              v-else-if="item?.children?.length"
              :open="item.open"
              :default-open="item.defaultOpen"
            >
              <ContextMenu.SubTrigger
                as="button"
                type="button"
                :disabled="item.disabled"
                :text-value="get(item, props.labelKey as string)"
                :class="pohon.item({ class: [uiOverride?.item, item.ui?.item, item.class], color: item?.color })"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="index"
                />
              </ContextMenu.SubTrigger>

              <UContextMenuContent
                sub
                :class="props.class"
                :ui="ui"
                :ui-override="uiOverride"
                :portal="portal"
                :items="(item.children as T)"
                :align-offset="-4"
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
                    :name="(name as keyof ContextMenuSlots<T>)"
                    v-bind="slotData"
                  />
                </template>
              </UContextMenuContent>
            </ContextMenu.Sub>
            <ContextMenu.CheckboxItem
              v-else-if="item.type === 'checkbox'"
              :model-value="item.checked"
              :disabled="item.disabled"
              :text-value="get(item, props.labelKey as string)"
              :class="pohon.item({ class: [uiOverride?.item, item.ui?.item, item.class], color: item?.color })"
              @update:model-value="item.onUpdateChecked"
              @select="item.onSelect"
            >
              <ReuseItemTemplate
                :item="item"
                :index="index"
              />
            </ContextMenu.CheckboxItem>
            <ContextMenu.Item
              v-else
              as-child
              :disabled="item.disabled"
              :text-value="get(item, props.labelKey as string)"
              @select="item.onSelect"
            >
              <PLink
                v-slot="{ active, ...slotProps }"
                v-bind="pickLinkProps(item as Omit<ContextMenuItem, 'type'>)"
                custom
              >
                <PLinkBase
                  v-bind="slotProps"
                  :class="pohon.item({ class: [uiOverride?.item, item.ui?.item, item.class], active, color: item?.color })"
                >
                  <ReuseItemTemplate
                    :item="item"
                    :active="active"
                    :index="index"
                  />
                </PLinkBase>
              </PLink>
            </ContextMenu.Item>
          </template>
        </ContextMenu.Group>
      </div>

      <slot />

      <slot name="content-bottom" />
    </component>
  </ContextMenu.Portal>
</template>
