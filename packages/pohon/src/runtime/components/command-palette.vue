<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { ListboxRootProps, ListboxRootEmits } from 'akar'
import type { FuseResult } from 'fuse.js'
import type { AppConfig } from '@nuxt/schema'
import type { UseFuseOptions } from '@vueuse/integrations/useFuse'
import theme from '#build/pohon/command-palette'
import type { UseComponentIconsProps } from '../composables/use-component-icons'
import type { AvatarProps, ButtonProps, ChipProps, KbdProps, InputProps, LinkProps, IconProps } from '../types'
import type { GetItemKeys } from '../types/utils'
import type { ComponentConfig } from '../types/uv'

type CommandPalette = ComponentConfig<typeof theme, AppConfig, 'commandPalette'>

export interface CommandPaletteItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  prefix?: string
  label?: string
  suffix?: string
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name']
  avatar?: AvatarProps
  chip?: ChipProps
  kbds?: KbdProps['value'][] | KbdProps[]
  active?: boolean
  loading?: boolean
  disabled?: boolean
  slot?: string
  /**
   * The placeholder to display when the item has children.
   */
  placeholder?: string
  children?: CommandPaletteItem[]
  onSelect?(e?: Event): void
  class?: any
  pohon?: Pick<CommandPalette['slots'], 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChipSize' | 'itemLeadingChip' | 'itemLabel' | 'itemLabelPrefix' | 'itemLabelBase' | 'itemLabelSuffix' | 'itemTrailing' | 'itemTrailingKbds' | 'itemTrailingKbdsSize' | 'itemTrailingHighlightedIcon' | 'itemTrailingIcon'>
  [key: string]: any
}

export interface CommandPaletteGroup<T extends CommandPaletteItem = CommandPaletteItem> {
  id: string
  label?: string
  slot?: string
  items?: T[]
  /**
   * Whether to filter group items with [useFuse](https://vueuse.org/integrations/useFuse).
   * When `true`, items will not be filtered which is useful for custom filtering (useAsyncData, useFetch, etc.).
   * @defaultValue false
   */
  ignoreFilter?: boolean
  /** Filter group items after the search happened. */
  postFilter?: (searchTerm: string, items: T[]) => T[]
  /**
   * The icon displayed when an item is highlighted.
   * @IconifyIcon
   */
  highlightedIcon?: IconProps['name']
}

export interface CommandPaletteProps<G extends CommandPaletteGroup<T> = CommandPaletteGroup<any>, T extends CommandPaletteItem = CommandPaletteItem> extends Pick<ListboxRootProps, 'multiple' | 'disabled' | 'modelValue' | 'defaultValue' | 'highlightOnHover' | 'selectionBehavior'>, Pick<UseComponentIconsProps, 'loading' | 'loadingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * The icon displayed in the input.
   * @defaultValue appConfig.pohon.icons.search
   * @IconifyIcon
   */
  icon?: IconProps['name']
  /**
   * The icon displayed when an item is selected.
   * @defaultValue appConfig.pohon.icons.check
   * @IconifyIcon
   */
  selectedIcon?: IconProps['name']
  /**
   * The icon displayed when an item has children.
   * @defaultValue appConfig.pohon.icons.chevronRight
   * @IconifyIcon
   */
  trailingIcon?: IconProps['name']
  /**
   * The placeholder text for the input.
   * @defaultValue t('commandPalette.placeholder')
   */
  placeholder?: InputProps['placeholder']
  /**
   * Automatically focus the input when component is mounted.
   * @defaultValue true
   */
  autofocus?: boolean
  /**
   * Display a close button in the input (useful when inside a Modal for example).
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue false
   */
  close?: boolean | Partial<ButtonProps>
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: IconProps['name']
  /**
   * Display a button to navigate back in history.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
   * @defaultValue true
   */
  back?: boolean | ButtonProps
  /**
   * The icon displayed in the back button.
   * @defaultValue appConfig.pohon.icons.arrowLeft
   * @IconifyIcon
   */
  backIcon?: IconProps['name']
  groups?: G[]
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse).
   * @defaultValue {
      fuseOptions: {
        ignoreLocation: true,
        threshold: 0.1,
        keys: ['label', 'suffix']
      },
      resultLimit: 12,
      matchAllWhenSearchEmpty: true
    }
   */
  fuse?: UseFuseOptions<T>
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>
  class?: any
  pohon?: CommandPalette['slots']
}

export type CommandPaletteEmits<T extends CommandPaletteItem = CommandPaletteItem> = ListboxRootEmits<T> & {
  'update:open': [value: boolean]
}

type SlotProps<T> = (props: { item: T, index: number }) => any

export type CommandPaletteSlots<G extends CommandPaletteGroup<T> = CommandPaletteGroup<any>, T extends CommandPaletteItem = CommandPaletteItem> = {
  'empty'(props: { searchTerm?: string }): any
  'footer'(props: { pohon: { [K in keyof Required<CommandPalette['slots']>]: (props?: Record<string, any>) => string } }): any
  'back'(props: { pohon: { [K in keyof Required<CommandPalette['slots']>]: (props?: Record<string, any>) => string } }): any
  'close'(props: { pohon: { [K in keyof Required<CommandPalette['slots']>]: (props?: Record<string, any>) => string } }): any
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': SlotProps<T>
  'item-trailing': SlotProps<T>
} & Record<string, SlotProps<G>> & Record<string, SlotProps<T>>

</script>

<script setup lang="ts" generic="G extends CommandPaletteGroup<T>, T extends CommandPaletteItem">
import { computed, ref, useTemplateRef } from 'vue'
import { ListboxRoot, ListboxFilter, ListboxContent, ListboxGroup, ListboxGroupLabel, ListboxItem, ListboxItemIndicator, useForwardProps, useForwardPropsEmits } from 'akar'
import { defu } from 'defu'
import { reactivePick } from '@vueuse/core'
import { useFuse } from '@vueuse/integrations/useFuse'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/use-locale'
import { omit, get } from '../utils'
import { uv } from '../utils/uv'
import { highlight } from '../utils/fuse'
import { pickLinkProps } from '../utils/link'
import PIcon from './icon.vue'
import PAvatar from './avatar.vue'
import PButton from './button.vue'
import UChip from './Chip.vue'
import PLinkBase from './link-base.vue'
import PLink from './link.vue'
import UInput from './xInput.vue'
import UKbd from './xKbd.vue'

const props = withDefaults(defineProps<CommandPaletteProps<G, T>>(), {
  modelValue: '',
  labelKey: 'label',
  autofocus: true,
  back: true
})
const emits = defineEmits<CommandPaletteEmits<T>>()
const slots = defineSlots<CommandPaletteSlots<G, T>>()

const searchTerm = defineModel<string>('searchTerm', { default: '' })

const { t } = useLocale()
const appConfig = useAppConfig() as CommandPalette['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'disabled', 'multiple', 'modelValue', 'defaultValue', 'highlightOnHover'), emits)
const inputProps = useForwardProps(reactivePick(props, 'loading'))

// eslint-disable-next-line vue/no-dupe-keys
const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.commandPalette || {}) })())

const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    ignoreLocation: true,
    threshold: 0.1,
    keys: [props.labelKey, 'suffix']
  },
  resultLimit: 12,
  matchAllWhenSearchEmpty: true
}) as UseFuseOptions<T>)

const history = ref<(CommandPaletteGroup & { placeholder?: string })[]>([])

const placeholder = computed(() => history.value[history.value.length - 1]?.placeholder || props.placeholder || t('commandPalette.placeholder'))

const groups = computed(() => history.value?.length ? [history.value[history.value.length - 1] as G] : props.groups)

const items = computed(() => groups.value?.filter((group) => {
  if (!group.id) {
    console.warn(`[@nuxt/ui] CommandPalette group is missing an \`id\` property`)
    return false
  }
  if (group.ignoreFilter) {
    return false
  }
  return true
})?.flatMap(group => group.items?.map(item => ({ ...item, group: group.id })) || []) || [])

const { results: fuseResults } = useFuse<typeof items.value[number]>(searchTerm, items, fuse)

function getGroupWithItems(group: G, items: (T & { matches?: FuseResult<T>['matches'] })[]) {
  if (group?.postFilter && typeof group.postFilter === 'function') {
    items = group.postFilter(searchTerm.value, items)
  }

  return {
    ...group,
    items: items.slice(0, fuse.value.resultLimit).map((item) => {
      return {
        ...item,
        labelHtml: highlight<T>(item, searchTerm.value, props.labelKey),
        suffixHtml: highlight<T>(item, searchTerm.value, undefined, [props.labelKey])
      }
    })
  }
}

const filteredGroups = computed(() => {
  const groupsById = fuseResults.value.reduce((acc, result) => {
    const { item, matches } = result
    if (!item.group) {
      return acc
    }

    acc[item.group] ||= []
    acc[item.group]?.push({ ...item, matches })

    return acc
  }, {} as Record<string, (T & { matches?: FuseResult<T>['matches'] })[]>)

  const fuseGroups = Object.entries(groupsById).map(([id, items]) => {
    const group = groups.value?.find(group => group.id === id)
    if (!group) {
      return
    }

    return getGroupWithItems(group, items)
  }).filter(group => !!group)

  const nonFuseGroups = groups.value
    ?.map((group, index) => ({ ...group, index }))
    ?.filter(group => group.ignoreFilter && group.items?.length)
    ?.map(group => ({ ...getGroupWithItems(group, group.items || []), index: group.index })) || []

  return nonFuseGroups.reduce((acc, group) => {
    acc.splice(group.index, 0, group)
    return acc
  }, [...fuseGroups])
})

const listboxRootRef = useTemplateRef('listboxRootRef')

function navigate(item: T) {
  if (!item.children?.length) {
    return
  }

  history.value.push({
    id: `history-${history.value.length}`,
    label: item.label,
    slot: item.slot,
    placeholder: item.placeholder,
    items: item.children
  } as any)

  searchTerm.value = ''

  listboxRootRef.value?.highlightFirstItem()
}

function navigateBack() {
  if (!history.value.length) {
    return
  }

  history.value.pop()

  searchTerm.value = ''

  listboxRootRef.value?.highlightFirstItem()
}

function onBackspace() {
  if (!searchTerm.value) {
    navigateBack()
  }
}

function onSelect(e: Event, item: T) {
  if (item.children?.length) {
    e.preventDefault()

    navigate(item)
  } else {
    item.onSelect?.(e)
  }
}
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <ListboxRoot v-bind="rootProps" ref="listboxRootRef" :selection-behavior="selectionBehavior" :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <ListboxFilter v-model="searchTerm" as-child>
      <UInput
        :placeholder="placeholder"
        variant="none"
        :autofocus="autofocus"
        v-bind="inputProps"
        :loading-icon="loadingIcon"
        :icon="icon || appConfig.pohon.icons.search"
        :class="pohon.input({ class: props.pohon?.input })"
        @keydown.backspace="onBackspace"
      >
        <template v-if="history?.length && (back || !!slots.back)" #leading>
          <slot name="back" :ui="ui">
            <PButton
              :icon="backIcon || appConfig.pohon.icons.arrowLeft"
              color="neutral"
              variant="link"
              :aria-label="t('commandPalette.back')"
              v-bind="(typeof back === 'object' ? back as Partial<ButtonProps> : {})"
              :class="pohon.back({ class: props.pohon?.back })"
              @click="navigateBack"
            />
          </slot>
        </template>

        <template v-if="close || !!slots.close" #trailing>
          <slot name="close" :ui="ui">
            <PButton
              v-if="close"
              :icon="closeIcon || appConfig.pohon.icons.close"
              color="neutral"
              variant="ghost"
              :aria-label="t('commandPalette.close')"
              v-bind="(typeof close === 'object' ? close as Partial<ButtonProps> : {})"
              :class="pohon.close({ class: props.pohon?.close })"
              @click="emits('update:open', false)"
            />
          </slot>
        </template>
      </UInput>
    </ListboxFilter>

    <ListboxContent :class="pohon.content({ class: props.pohon?.content })">
      <div v-if="filteredGroups?.length" role="presentation" :class="pohon.viewport({ class: props.pohon?.viewport })">
        <ListboxGroup v-for="group in filteredGroups" :key="`group-${group.id}`" :class="pohon.group({ class: props.pohon?.group })">
          <ListboxGroupLabel v-if="get(group, props.labelKey as string)" :class="pohon.label({ class: props.pohon?.label })">
            {{ get(group, props.labelKey as string) }}
          </ListboxGroupLabel>

          <ListboxItem
            v-for="(item, index) in group.items"
            :key="`group-${group.id}-${index}`"
            :value="omit(item, ['matches' as any, 'group' as any, 'onSelect', 'labelHtml', 'suffixHtml', 'children'])"
            :disabled="item.disabled"
            as-child
            @select="onSelect($event, item)"
          >
            <PLink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item)" custom>
              <PLinkBase v-bind="slotProps" :class="pohon.item({ class: [props.pohon?.item, item.ui?.item, item.class], active: active || item.active })">
                <slot :name="((item.slot || group.slot || 'item') as keyof CommandPaletteSlots<G, T>)" :item="(item as any)" :index="index">
                  <slot :name="((item.slot ? `${item.slot}-leading` : group.slot ? `${group.slot}-leading` : `item-leading`) as keyof CommandPaletteSlots<G, T>)" :item="(item as any)" :index="index">
                    <PIcon v-if="item.loading" :name="loadingIcon || appConfig.pohon.icons.loading" :class="pohon.itemLeadingIcon({ class: [props.pohon?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })" />
                    <PIcon v-else-if="item.icon" :name="item.icon" :class="pohon.itemLeadingIcon({ class: [props.pohon?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })" />
                    <PAvatar v-else-if="item.avatar" :size="((item.ui?.itemLeadingAvatarSize || props.pohon?.itemLeadingAvatarSize || pohon.itemLeadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" :class="pohon.itemLeadingAvatar({ class: [props.pohon?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })" />
                    <UChip
                      v-else-if="item.chip"
                      :size="((item.ui?.itemLeadingChipSize || props.pohon?.itemLeadingChipSize || pohon.itemLeadingChipSize()) as ChipProps['size'])"
                      inset
                      standalone
                      v-bind="item.chip"
                      :class="pohon.itemLeadingChip({ class: [props.pohon?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })"
                    />
                  </slot>

                  <span v-if="item.labelHtml || get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label` : group.slot ? `${group.slot}-label` : `item-label`) as keyof CommandPaletteSlots<G, T>]" :class="pohon.itemLabel({ class: [props.pohon?.itemLabel, item.ui?.itemLabel], active: active || item.active })">
                    <slot :name="((item.slot ? `${item.slot}-label` : group.slot ? `${group.slot}-label` : `item-label`) as keyof CommandPaletteSlots<G, T>)" :item="(item as any)" :index="index">
                      <span v-if="item.prefix" :class="pohon.itemLabelPrefix({ class: [props.pohon?.itemLabelPrefix, item.ui?.itemLabelPrefix] })">{{ item.prefix }}</span>

                      <span :class="pohon.itemLabelBase({ class: [props.pohon?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })" v-html="item.labelHtml || get(item, props.labelKey as string)" />

                      <span :class="pohon.itemLabelSuffix({ class: [props.pohon?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })" v-html="item.suffixHtml || item.suffix" />
                    </slot>
                  </span>

                  <span :class="pohon.itemTrailing({ class: [props.pohon?.itemTrailing, item.ui?.itemTrailing] })">
                    <slot :name="((item.slot ? `${item.slot}-trailing` : group.slot ? `${group.slot}-trailing` : `item-trailing`) as keyof CommandPaletteSlots<G, T>)" :item="(item as any)" :index="index">
                      <PIcon
                        v-if="item.children && item.children.length > 0"
                        :name="trailingIcon || appConfig.pohon.icons.chevronRight"
                        :class="pohon.itemTrailingIcon({ class: [props.pohon?.itemTrailingIcon, item.ui?.itemTrailingIcon] })"
                      />

                      <span v-else-if="item.kbds?.length" :class="pohon.itemTrailingKbds({ class: [props.pohon?.itemTrailingKbds, item.ui?.itemTrailingKbds] })">
                        <UKbd v-for="(kbd, kbdIndex) in item.kbds" :key="kbdIndex" :size="((item.ui?.itemTrailingKbdsSize || props.pohon?.itemTrailingKbdsSize || pohon.itemTrailingKbdsSize()) as KbdProps['size'])" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
                      </span>

                      <PIcon v-else-if="group.highlightedIcon" :name="group.highlightedIcon" :class="pohon.itemTrailingHighlightedIcon({ class: [props.pohon?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })" />
                    </slot>

                    <ListboxItemIndicator v-if="!item.children?.length" as-child>
                      <PIcon :name="selectedIcon || appConfig.pohon.icons.check" :class="pohon.itemTrailingIcon({ class: [props.pohon?.itemTrailingIcon, item.ui?.itemTrailingIcon] })" />
                    </ListboxItemIndicator>
                  </span>
                </slot>
              </PLinkBase>
            </PLink>
          </ListboxItem>
        </ListboxGroup>
      </div>

      <div v-else :class="pohon.empty({ class: props.pohon?.empty })">
        <slot name="empty" :search-term="searchTerm">
          {{ searchTerm ? t('commandPalette.noMatch', { searchTerm }) : t('commandPalette.noData') }}
        </slot>
      </div>
    </ListboxContent>

    <div v-if="!!slots.footer" :class="pohon.footer({ class: props.pohon?.footer })">
      <slot name="footer" :ui="ui" />
    </div>
  </ListboxRoot>
</template>
