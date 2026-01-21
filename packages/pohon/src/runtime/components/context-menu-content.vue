<script lang="ts">
import type theme from '#build/pohon/context-menu';
import type { AppConfig } from '@nuxt/schema';
import type {
  AContextMenuContentEmits as AkarContextMenuContentEmits,
  AContextMenuContentProps as AkarContextMenuContentProps,
} from 'akar';
import type {
  PAvatarProps,
  PContextMenuItem,
  PContextMenuSlots,
  PIconProps,
  PKbdProps,
} from '../types';
import type { ArrayOrNested, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';

type ContextMenu = ComponentConfig<typeof theme, AppConfig, 'contextMenu'>;

interface ContextMenuContentProps<T extends ArrayOrNested<PContextMenuItem>> extends Omit<AkarContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
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
  class?: any;
  pohon: ContextMenu['pohon'];
  pohonOverride?: ContextMenu['slots'];
}

interface ContextMenuContentEmits extends AkarContextMenuContentEmits {}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<PContextMenuItem>">
import { useAppConfig } from '#imports';
import { isString, omit } from '@vinicunca/perkakas';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'akar';
import { AContextMenu } from 'akar/namespaced';
import { computed, toRef } from 'vue';
import { useLocale } from '../composables/use-locale';
import { usePortal } from '../composables/use-portal';
import { getProp, isArrayOfArray } from '../utils';
import { pickLinkProps } from '../utils/link';
import PAvatar from './avatar.vue';
import PContextMenuContent from './context-menu-content.vue';
import PIcon from './icon.vue';
import PKbd from './kbd.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';

const props = defineProps<ContextMenuContentProps<T>>();
const emits = defineEmits<ContextMenuContentEmits>();
const slots = defineSlots<PContextMenuSlots<T>>();

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
    'descriptionKey',
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

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{
  item: PContextMenuItem;
  active?: boolean;
  index: number;
}>();

const childrenIcon = computed(() =>
  dir.value === 'rtl'
    ? appConfig.pohon.icons.chevronLeft
    : appConfig.pohon.icons.chevronRight,
);
const groups = computed<Array<Array<PContextMenuItem>>>(() => {
  if (props.items?.length) {
    return isArrayOfArray(props.items)
      ? props.items
      : [props.items];
  }

  return [];
});
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot
      :name="((item.slot || 'item') as keyof PContextMenuSlots<T>)"
      :item="item"
      :index="index"
      :pohon="pohon"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof PContextMenuSlots<T>)"
        :item="item"
        :active="active"
        :index="index"
        :pohon="pohon"
      >
        <PIcon
          v-if="item.loading"
          :name="loadingIcon || appConfig.pohon.icons.loading"
          :class="pohon.itemLeadingIcon({
            class: [pohonOverride?.itemLeadingIcon, item.pohon?.itemLeadingIcon],
            color: item?.color,
            loading: true,
          })"
          data-pohon="context-menu-item-leading-icon"
        />
        <PIcon
          v-else-if="item.icon"
          :name="item.icon"
          :class="pohon.itemLeadingIcon({
            class: [pohonOverride?.itemLeadingIcon, item.pohon?.itemLeadingIcon],
            color: item?.color,
            active,
          })"
          data-pohon="context-menu-item-leading-icon"
        />
        <PAvatar
          v-else-if="item.avatar"
          :size="((item.pohon?.itemLeadingAvatarSize || pohonOverride?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="item.avatar"
          :class="pohon.itemLeadingAvatar({
            class: [pohonOverride?.itemLeadingAvatar, item.pohon?.itemLeadingAvatar],
            active,
          })"
          data-pohon="context-menu-item-leading-avatar"
        />
      </slot>

      <span
        v-if="(getProp({ object: item, path: props.labelKey as string }) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof PContextMenuSlots<T>]) || (getProp({ object: item, path: props.descriptionKey as string }) || !!slots[(item.slot ? `${item.slot}-description` : 'item-description') as keyof PContextMenuSlots<T>])"
        :class="pohon.itemWrapper({ class: [pohonOverride?.itemWrapper, item.pohon?.itemWrapper] })"
        data-pohon="context-menu-item-wrapper"
      >
        <span
          :class="pohon.itemLabel({ class: [pohonOverride?.itemLabel, item.pohon?.itemLabel], active })"
          data-pohon="context-menu-item-label"
        >
          <slot
            :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof PContextMenuSlots<T>)"
            :item="item"
            :active="active"
            :index="index"
          >
            {{ getProp({ object: item, path: props.labelKey as string }) }}
          </slot>

          <PIcon
            v-if="item.target === '_blank' && externalIcon !== false"
            :name="typeof externalIcon === 'string' ? externalIcon : appConfig.pohon.icons.external"
            :class="pohon.itemLabelExternalIcon({ class: [pohonOverride?.itemLabelExternalIcon, item.pohon?.itemLabelExternalIcon], color: item?.color, active })"
            data-pohon="context-menu-item-label-external-icon"
          />
        </span>

        <span
          v-if="getProp({ object: item, path: props.descriptionKey as string }) || !!slots[(item.slot ? `${item.slot}-description` : 'item-description') as keyof PContextMenuSlots<T>]"
          :class="pohon.itemDescription({ class: [pohonOverride?.itemDescription, item.pohon?.itemDescription] })"
          data-pohon="context-menu-item-description"
        >
          <slot
            :name="((item.slot ? `${item.slot}-description` : 'item-description') as keyof PContextMenuSlots<T>)"
            :item="item"
            :active="active"
            :index="index"
          >
            {{ getProp({ object: item, path: props.descriptionKey as string }) }}
          </slot>
        </span>
      </span>

      <span
        :class="pohon.itemTrailing({ class: [pohonOverride?.itemTrailing, item.pohon?.itemTrailing] })"
        data-pohon="context-menu-item-trailing"
      >
        <slot
          :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof PContextMenuSlots<T>)"
          :item="item"
          :active="active"
          :index="index"
          :pohon="pohon"
        >
          <PIcon
            v-if="item.children?.length"
            :name="childrenIcon"
            :class="pohon.itemTrailingIcon({ class: [pohonOverride?.itemTrailingIcon, item.pohon?.itemTrailingIcon], color: item?.color, active })"
            data-pohon="context-menu-item-trailing-icon"
          />
          <span
            v-else-if="item.kbds?.length"
            :class="pohon.itemTrailingKbds({ class: [pohonOverride?.itemTrailingKbds, item.pohon?.itemTrailingKbds] })"
            data-pohon="context-menu-item-trailing-kbds"
          >
            <PKbd
              v-for="(kbd, kbdIndex) in item.kbds"
              :key="kbdIndex"
              :size="((item.pohon?.itemTrailingKbdsSize || pohonOverride?.itemTrailingKbdsSize || pohon.itemTrailingKbdsSize()) as PKbdProps['size'])"
              v-bind="isString(kbd) ? { value: kbd } : kbd"
            />
          </span>
        </slot>

        <AContextMenu.ItemIndicator as-child>
          <PIcon
            :name="checkedIcon || appConfig.pohon.icons.check"
            :class="pohon.itemTrailingIcon({ class: [pohonOverride?.itemTrailingIcon, item.pohon?.itemTrailingIcon], color: item?.color })"
            data-pohon="context-menu-item-trailing-icon"
          />
        </AContextMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <AContextMenu.Portal v-bind="portalProps">
    <component
      :is="sub ? AContextMenu.SubContent : AContextMenu.Content"
      :class="pohon.content({ class: [pohonOverride?.content, props.class] })"
      data-pohon="context-menu-content"
      v-bind="contentProps"
    >
      <slot
        name="content-top"
        :sub="sub ?? false"
      />

      <div
        role="presentation"
        :class="pohon.viewport({ class: pohonOverride?.viewport })"
        data-pohon="context-menu-viewport"
      >
        <AContextMenu.Group
          v-for="(group, groupIndex) in groups"
          :key="`group-${groupIndex}`"
          :class="pohon.group({ class: pohonOverride?.group })"
          data-pohon="context-menu-group"
        >
          <template
            v-for="(item, index) in group"
            :key="`group-${groupIndex}-${index}`"
          >
            <AContextMenu.Label
              v-if="item.type === 'label'"
              :class="pohon.label({ class: [pohonOverride?.label, item.pohon?.label, item.class] })"
              data-pohon="context-menu-label"
            >
              <ReuseItemTemplate
                :item="item"
                :index="index"
              />
            </AContextMenu.Label>
            <AContextMenu.Separator
              v-else-if="item.type === 'separator'"
              :class="pohon.separator({ class: [pohonOverride?.separator, item.pohon?.separator, item.class] })"
              data-pohon="context-menu-separator"
            />
            <AContextMenu.Sub
              v-else-if="item?.children?.length"
              :open="item.open"
              :default-open="item.defaultOpen"
            >
              <AContextMenu.SubTrigger
                as="button"
                type="button"
                :disabled="item.disabled"
                :text-value="getProp({ object: item, path: props.labelKey as string })"
                :class="pohon.item({ class: [pohonOverride?.item, item.pohon?.item, item.class], color: item?.color })"
                data-pohon="context-menu-item"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="index"
                />
              </AContextMenu.SubTrigger>

              <PContextMenuContent
                sub
                :class="item.pohon?.content"
                :pohon="pohon"
                :pohon-override="pohonOverride"
                :portal="portal"
                :items="(item.children as T)"
                :align-offset="-4"
                :label-key="labelKey"
                :description-key="descriptionKey"
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
                    :name="(name as keyof PContextMenuSlots<T>)"
                    v-bind="slotData"
                  />
                </template>
              </PContextMenuContent>
            </AContextMenu.Sub>
            <AContextMenu.CheckboxItem
              v-else-if="item.type === 'checkbox'"
              :model-value="item.checked"
              :disabled="item.disabled"
              :text-value="getProp({ object: item, path: props.labelKey as string })"
              :class="pohon.item({ class: [pohonOverride?.item, item.pohon?.item, item.class], color: item?.color })"
              data-pohon="context-menu-item"
              @update:model-value="item.onUpdateChecked"
              @select="item.onSelect"
            >
              <ReuseItemTemplate
                :item="item"
                :index="index"
              />
            </AContextMenu.CheckboxItem>

            <PLink
              v-else
              v-slot="{ active, ...slotProps }"
              v-bind="pickLinkProps(item as Omit<PContextMenuItem, 'type'>)"
              custom
            >
              <AContextMenu.Item
                as-child
                :disabled="item.disabled"
                :text-value="getProp({ object: item, path: props.labelKey as string })"
                @select="item.onSelect"
              >
                <PLinkBase
                  v-bind="slotProps"
                  :class="pohon.item({ class: [pohonOverride?.item, item.pohon?.item, item.class], active, color: item?.color })"
                  data-pohon="context-menu-item"
                >
                  <ReuseItemTemplate
                    :item="item"
                    :active="active"
                    :index="index"
                  />
                </PLinkBase>
              </AContextMenu.Item>
            </PLink>
          </template>
        </AContextMenu.Group>
      </div>

      <slot />

      <slot
        name="content-bottom"
        :sub="sub ?? false"
      />
    </component>
  </AContextMenu.Portal>
</template>
