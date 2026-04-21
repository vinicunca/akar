<script lang="ts">
import type theme from '#build/pohon/context-menu';
import type { AppConfig } from '@nuxt/schema';
import type { ContextMenuContentEmits as RekaContextMenuContentEmits, ContextMenuContentProps as RekaContextMenuContentProps } from 'akar';
import type { AAvatarProps, ContextMenuItem, ContextMenuSlots, KbdProps, PIconProps } from '../types';
import type { ArrayOrNested, GetItemKeys } from '../types/utils';
import type { ComponentConfig } from '../types/uv';

type ContextMenu = ComponentConfig<typeof theme, AppConfig, 'contextMenu'>;

interface ContextMenuContentProps<T extends ArrayOrNested<ContextMenuItem>> extends Omit<RekaContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
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
import { FieldGroupReset } from '../composables/useFieldGroup';
import { usePortal } from '../composables/usePortal';
import { get, isArrayOfArray, omit } from '../utils';
import { pickLinkProps } from '../utils/link';
import PAvatar from './avatar.vue';
import UContextMenuContent from './ContextMenuContent.vue';
import PIcon from './icon.vue';
import UKbd from './Kbd.vue';
import ULink from './Link.vue';
import ULinkBase from './LinkBase.vue';

const props = defineProps<ContextMenuContentProps<T>>();
const emits = defineEmits<ContextMenuContentEmits>();
const slots = defineSlots<ContextMenuSlots<T>>();

const { dir } = useLocale();
const appConfig = useAppConfig();

const portalProps = usePortal(toRef(() => props.portal));
const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'labelKey', 'descriptionKey', 'checkedIcon', 'loadingIcon', 'externalIcon', 'class', 'pohon', 'uiOverride'), emits);
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
      :pohon="pohon"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof ContextMenuSlots<T>)"
        :item="item"
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
        v-if="(get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof ContextMenuSlots<T>]) || (get(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description` : 'item-description') as keyof ContextMenuSlots<T>])"
        data-slot="itemWrapper"
        :class="pohon.itemWrapper({ class: [uiOverride?.itemWrapper, item.pohon?.itemWrapper] })"
      >
        <span
          data-slot="itemLabel"
          :class="pohon.itemLabel({ class: [uiOverride?.itemLabel, item.pohon?.itemLabel], active })"
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
            :name="typeof externalIcon === 'string' ? externalIcon : appConfig.pohon.icons.external"
            data-slot="itemLabelExternalIcon"
            :class="pohon.itemLabelExternalIcon({ class: [uiOverride?.itemLabelExternalIcon, item.pohon?.itemLabelExternalIcon], color: item?.color, active })"
          />
        </span>

        <span
          v-if="get(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description` : 'item-description') as keyof ContextMenuSlots<T>]"
          data-slot="itemDescription"
          :class="pohon.itemDescription({ class: [uiOverride?.itemDescription, item.pohon?.itemDescription] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-description` : 'item-description') as keyof ContextMenuSlots<T>)"
            :item="item"
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
          :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof ContextMenuSlots<T>)"
          :item="item"
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

        <ContextMenu.ItemIndicator as-child>
          <PIcon
            :name="checkedIcon || appConfig.pohon.icons.check"
            data-slot="itemTrailingIcon"
            :class="pohon.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.pohon?.itemTrailingIcon], color: item?.color })"
          />
        </ContextMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <ContextMenu.Portal v-bind="portalProps">
    <FieldGroupReset>
      <component
        :is="sub ? ContextMenu.SubContent : ContextMenu.Content"
        data-slot="content"
        :class="pohon.content({ class: [uiOverride?.content, props.class] })"
        v-bind="contentProps"
      >
        <slot
          name="content-top"
          :sub="sub ?? false"
        />

        <div
          role="presentation"
          data-slot="viewport"
          :class="pohon.viewport({ class: uiOverride?.viewport })"
        >
          <ContextMenu.Group
            v-for="(group, groupIndex) in groups"
            :key="`group-${groupIndex}`"
            data-slot="group"
            :class="pohon.group({ class: uiOverride?.group })"
          >
            <template
              v-for="(item, index) in group"
              :key="`group-${groupIndex}-${index}`"
            >
              <ContextMenu.Label
                v-if="item.type === 'label'"
                data-slot="label"
                :class="pohon.label({ class: [uiOverride?.label, item.pohon?.label, item.class] })"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="index"
                />
              </ContextMenu.Label>
              <ContextMenu.Separator
                v-else-if="item.type === 'separator'"
                data-slot="separator"
                :class="pohon.separator({ class: [uiOverride?.separator, item.pohon?.separator, item.class] })"
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
                  data-slot="item"
                  :class="pohon.item({ class: [uiOverride?.item, item.pohon?.item, item.class], color: item?.color })"
                >
                  <ReuseItemTemplate
                    :item="item"
                    :index="index"
                  />
                </ContextMenu.SubTrigger>

                <UContextMenuContent
                  sub
                  :class="item.pohon?.content"
                  :pohon="pohon"
                  :pohon-override="uiOverride"
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
                data-slot="item"
                :class="pohon.item({ class: [uiOverride?.item, item.pohon?.item, item.class], color: item?.color })"
                @update:model-value="item.onUpdateChecked"
                @select="item.onSelect"
              >
                <ReuseItemTemplate
                  :item="item"
                  :index="index"
                />
              </ContextMenu.CheckboxItem>
              <ULink
                v-else
                v-slot="{ active, ...slotProps }"
                v-bind="pickLinkProps(item as Omit<ContextMenuItem, 'type'>)"
                custom
              >
                <ContextMenu.Item
                  as-child
                  :disabled="item.disabled"
                  :text-value="get(item, props.labelKey as string)"
                  @select="item.onSelect"
                >
                  <ULinkBase
                    v-bind="slotProps"
                    data-slot="item"
                    :class="pohon.item({ class: [uiOverride?.item, item.pohon?.item, item.class], active, color: item?.color })"
                  >
                    <ReuseItemTemplate
                      :item="item"
                      :active="active"
                      :index="index"
                    />
                  </ULinkBase>
                </ContextMenu.Item>
              </ULink>
            </template>
          </ContextMenu.Group>
        </div>

        <slot />

        <slot
          name="content-bottom"
          :sub="sub ?? false"
        />
      </component>
    </FieldGroupReset>
  </ContextMenu.Portal>
</template>
