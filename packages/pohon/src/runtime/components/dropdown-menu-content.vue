<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { DropdownMenuContentProps as RekaDropdownMenuContentProps, DropdownMenuContentEmits as RekaDropdownMenuContentEmits } from 'akar'
import type { AppConfig } from '@nuxt/schema'
import type theme from '#build/pohon/dropdown-menu'
import type { KbdProps, AvatarProps, DropdownMenuItem, DropdownMenuSlots, IconProps } from '../types'
import type { ArrayOrNested, GetItemKeys, NestedItem, DynamicSlots, MergeTypes } from '../types/utils'
import type { ComponentConfig } from '../types/uv'

type DropdownMenu = ComponentConfig<typeof theme, AppConfig, 'dropdownMenu'>

interface DropdownMenuContentProps<T extends ArrayOrNested<DropdownMenuItem>> extends Omit<RekaDropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
  items?: T
  portal?: boolean | string | HTMLElement
  sub?: boolean
  labelKey: GetItemKeys<T>
  /**
   * @IconifyIcon
   */
  checkedIcon?: IconProps['name']
  /**
   * @IconifyIcon
   */
  loadingIcon?: IconProps['name']
  /**
   * @IconifyIcon
   */
  externalIcon?: boolean | IconProps['name']
  class?: any
  pohon: { [K in keyof Required<DropdownMenu['slots']>]: (props?: Record<string, any>) => string }
  uiOverride?: DropdownMenu['slots']
}

interface DropdownMenuContentEmits extends RekaDropdownMenuContentEmits {}

type DropdownMenuContentSlots<
  A extends ArrayOrNested<DropdownMenuItem> = ArrayOrNested<DropdownMenuItem>,
  T extends NestedItem<A> = NestedItem<A>
> = Pick<DropdownMenuSlots<A>, 'item' | 'item-leading' | 'item-label' | 'item-trailing' | 'content-top' | 'content-bottom'> & {
  default(props?: object): any
} & DynamicSlots<MergeTypes<T>, 'leading' | 'label' | 'trailing', { active?: boolean, index: number }>

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<DropdownMenuItem>">
import { computed, toRef } from 'vue'
import { DropdownMenu } from 'akar/namespaced'
import { useForwardPropsEmits } from 'akar'
import { reactiveOmit, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/use-locale'
import { usePortal } from '../composables/usePortal'
import { omit, get, isArrayOfArray } from '../utils'
import { pickLinkProps } from '../utils/link'
import PLinkBase from './link-base.vue'
import PLink from './link.vue'
import PAvatar from './avatar.vue'
import PIcon from './icon.vue'
import UKbd from './xKbd.vue'
import UDropdownMenuContent from './dropdown-menu-content.vue'

const props = defineProps<DropdownMenuContentProps<T>>()
const emits = defineEmits<DropdownMenuContentEmits>()
const slots = defineSlots<DropdownMenuContentSlots<T>>()

const { dir } = useLocale()
const appConfig = useAppConfig()

const portalProps = usePortal(toRef(() => props.portal))
const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'labelKey', 'checkedIcon', 'loadingIcon', 'externalIcon', 'class', 'ui', 'uiOverride'), emits)
const getProxySlots = () => omit(slots, ['default'])

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: DropdownMenuItem, active?: boolean, index: number }>()

const childrenIcon = computed(() => dir.value === 'rtl' ? appConfig.pohon.icons.chevronLeft : appConfig.pohon.icons.chevronRight)
const groups = computed<DropdownMenuItem[][]>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : []
)
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot :name="((item.slot || 'item') as keyof DropdownMenuContentSlots<T>)" :item="(item as Extract<NestedItem<T>, { slot: string; }>)" :index="index">
      <slot :name="((item.slot ? `${item.slot}-leading`: 'item-leading') as keyof DropdownMenuContentSlots<T>)" :item="(item as Extract<NestedItem<T>, { slot: string; }>)" :active="active" :index="index">
        <PIcon v-if="item.loading" :name="loadingIcon || appConfig.pohon.icons.loading" :class="pohon.itemLeadingIcon({ class: [uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })" />
        <PIcon v-else-if="item.icon" :name="item.icon" :class="pohon.itemLeadingIcon({ class: [uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })" />
        <PAvatar v-else-if="item.avatar" :size="((item.ui?.itemLeadingAvatarSize || uiOverride?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" :class="pohon.itemLeadingAvatar({ class: [uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })" />
      </slot>

      <span v-if="get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label`: 'item-label') as keyof DropdownMenuContentSlots<T>]" :class="pohon.itemLabel({ class: [uiOverride?.itemLabel, item.ui?.itemLabel], active })">
        <slot :name="((item.slot ? `${item.slot}-label`: 'item-label') as keyof DropdownMenuContentSlots<T>)" :item="(item as Extract<NestedItem<T>, { slot: string; }>)" :active="active" :index="index">
          {{ get(item, props.labelKey as string) }}
        </slot>

        <PIcon v-if="item.target === '_blank' && externalIcon !== false" :name="typeof externalIcon === 'string' ? externalIcon : appConfig.pohon.icons.external" :class="pohon.itemLabelExternalIcon({ class: [uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })" />
      </span>

      <span :class="pohon.itemTrailing({ class: [uiOverride?.itemTrailing, item.ui?.itemTrailing] })">
        <slot :name="((item.slot ? `${item.slot}-trailing`: 'item-trailing') as keyof DropdownMenuContentSlots<T>)" :item="(item as Extract<NestedItem<T>, { slot: string; }>)" :active="active" :index="index">
          <PIcon v-if="item.children?.length" :name="childrenIcon" :class="pohon.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })" />
          <span v-else-if="item.kbds?.length" :class="pohon.itemTrailingKbds({ class: [uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })">
            <UKbd v-for="(kbd, kbdIndex) in item.kbds" :key="kbdIndex" :size="((item.ui?.itemTrailingKbdsSize || uiOverride?.itemTrailingKbdsSize || pohon.itemTrailingKbdsSize()) as KbdProps['size'])" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
          </span>
        </slot>

        <DropdownMenu.ItemIndicator as-child>
          <PIcon :name="checkedIcon || appConfig.pohon.icons.check" :class="pohon.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })" />
        </DropdownMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <DropdownMenu.Portal v-bind="portalProps">
    <component :is="sub ? DropdownMenu.SubContent : DropdownMenu.Content" :class="props.class" v-bind="contentProps">
      <slot name="content-top" />

      <div role="presentation" :class="pohon.viewport({ class: uiOverride?.viewport })">
        <DropdownMenu.Group v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="pohon.group({ class: uiOverride?.group })">
          <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
            <DropdownMenu.Label v-if="item.type === 'label'" :class="pohon.label({ class: [uiOverride?.label, item.ui?.label, item.class] })">
              <ReuseItemTemplate :item="item" :index="index" />
            </DropdownMenu.Label>
            <DropdownMenu.Separator v-else-if="item.type === 'separator'" :class="pohon.separator({ class: [uiOverride?.separator, item.ui?.separator, item.class] })" />
            <DropdownMenu.Sub v-else-if="item?.children?.length" :open="item.open" :default-open="item.defaultOpen">
              <DropdownMenu.SubTrigger
                as="button"
                type="button"
                :disabled="item.disabled"
                :text-value="get(item, props.labelKey as string)"
                :class="pohon.item({ class: [uiOverride?.item, item.ui?.item, item.class], color: item?.color })"
              >
                <ReuseItemTemplate :item="item" :index="index" />
              </DropdownMenu.SubTrigger>

              <UDropdownMenuContent
                sub
                :class="props.class"
                :ui="ui"
                :ui-override="uiOverride"
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
                <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
                  <slot :name="(name as keyof DropdownMenuContentSlots<T>)" v-bind="slotData" />
                </template>
              </UDropdownMenuContent>
            </DropdownMenu.Sub>
            <DropdownMenu.CheckboxItem
              v-else-if="item.type === 'checkbox'"
              :model-value="item.checked"
              :disabled="item.disabled"
              :text-value="get(item, props.labelKey as string)"
              :class="pohon.item({ class: [uiOverride?.item, item.ui?.item, item.class], color: item?.color })"
              @update:model-value="item.onUpdateChecked"
              @select="item.onSelect"
            >
              <ReuseItemTemplate :item="item" :index="index" />
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.Item
              v-else
              as-child
              :disabled="item.disabled"
              :text-value="get(item, props.labelKey as string)"
              @select="item.onSelect"
            >
              <PLink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item as Omit<DropdownMenuItem, 'type'>)" custom>
                <PLinkBase v-bind="slotProps" :class="pohon.item({ class: [uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })">
                  <ReuseItemTemplate :item="item" :active="active" :index="index" />
                </PLinkBase>
              </PLink>
            </DropdownMenu.Item>
          </template>
        </DropdownMenu.Group>
      </div>

      <slot />

      <slot name="content-bottom" />
    </component>
  </DropdownMenu.Portal>
</template>
