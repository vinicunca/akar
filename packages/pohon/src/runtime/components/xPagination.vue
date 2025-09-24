<script lang="ts">
import type { PaginationRootProps, PaginationRootEmits } from 'akar'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/pagination'
import type { ButtonProps, IconProps } from '../types'
import type { ComponentConfig } from '../types/uv'

type Pagination = ComponentConfig<typeof theme, AppConfig, 'pagination'>

export interface PaginationProps extends Partial<Pick<PaginationRootProps, 'defaultPage' | 'disabled' | 'itemsPerPage' | 'page' | 'showEdges' | 'siblingCount' | 'total'>> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  /**
   * The icon to use for the first page control.
   * @defaultValue appConfig.pohon.icons.chevronDoubleLeft
   * @IconifyIcon
   */
  firstIcon?: IconProps['name']
  /**
   * The icon to use for the previous page control.
   * @defaultValue appConfig.pohon.icons.chevronLeft
   * @IconifyIcon
   */
  prevIcon?: IconProps['name']
  /**
   * The icon to use for the next page control.
   * @defaultValue appConfig.pohon.icons.chevronRight
   * @IconifyIcon
   */
  nextIcon?: IconProps['name']
  /**
   * The icon to use for the last page control.
   * @defaultValue appConfig.pohon.icons.chevronDoubleRight
   * @IconifyIcon
   */
  lastIcon?: IconProps['name']
  /**
   * The icon to use for the ellipsis control.
   * @defaultValue appConfig.pohon.icons.ellipsis
   * @IconifyIcon
   */
  ellipsisIcon?: IconProps['name']
  /**
   * The color of the pagination controls.
   * @defaultValue 'neutral'
   * @IconifyIcon
   */
  color?: ButtonProps['color']
  /**
   * The variant of the pagination controls.
   * @defaultValue 'outline'
   */
  variant?: ButtonProps['variant']
  /**
   * The color of the active pagination control.
   * @defaultValue 'primary'
   */
  activeColor?: ButtonProps['color']
  /**
   * The variant of the active pagination control.
   * @defaultValue 'solid'
   */
  activeVariant?: ButtonProps['variant']
  /**
   * Whether to show the first, previous, next, and last controls.
   * @defaultValue true
   */
  showControls?: boolean
  size?: ButtonProps['size']
  /**
   * A function to render page controls as links.
   * @param page The page number to navigate to.
   */
  to?: (page: number) => ButtonProps['to']
  class?: any
  pohon?: Pagination['slots']
}

export interface PaginationEmits extends PaginationRootEmits {}

export interface PaginationSlots {
  first(props?: object): any
  prev(props?: object): any
  next(props?: object): any
  last(props?: object): any
  ellipsis(props?: object): any
  item(props: {
    page: number
    pageCount: number
    item: {
      type: 'ellipsis'
    } | {
      type: 'page'
      value: number
    }
    index: number
  }): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { PaginationRoot, PaginationList, PaginationListItem, PaginationFirst, PaginationPrev, PaginationEllipsis, PaginationNext, PaginationLast, useForwardPropsEmits } from 'akar'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/use-locale'
import { uv } from '../utils/uv'
import PButton from './button.vue'

const props = withDefaults(defineProps<PaginationProps>(), {
  color: 'neutral',
  variant: 'outline',
  activeColor: 'primary',
  activeVariant: 'solid',
  showControls: true,
  showEdges: false,
  itemsPerPage: 10,
  siblingCount: 2,
  total: 0
})
const emits = defineEmits<PaginationEmits>()
const slots = defineSlots<PaginationSlots>()

const { dir } = useLocale()
const appConfig = useAppConfig() as Pagination['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultPage', 'disabled', 'itemsPerPage', 'page', 'showEdges', 'siblingCount', 'total'), emits)

const firstIcon = computed(() => props.firstIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.chevronDoubleRight : appConfig.pohon.icons.chevronDoubleLeft))
const prevIcon = computed(() => props.prevIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.chevronRight : appConfig.pohon.icons.chevronLeft))
const nextIcon = computed(() => props.nextIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.chevronLeft : appConfig.pohon.icons.chevronRight))
const lastIcon = computed(() => props.lastIcon || (dir.value === 'rtl' ? appConfig.pohon.icons.chevronDoubleLeft : appConfig.pohon.icons.chevronDoubleRight))

// eslint-disable-next-line vue/no-dupe-keys
const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.pagination || {}) })())
</script>

<template>
  <PaginationRoot v-slot="{ page, pageCount }" v-bind="rootProps" :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <PaginationList v-slot="{ items }" :class="pohon.list({ class: props.pohon?.list })">
      <PaginationFirst v-if="showControls || !!slots.first" as-child :class="pohon.first({ class: props.pohon?.first })">
        <slot name="first">
          <PButton :color="color" :variant="variant" :size="size" :icon="firstIcon" :to="to?.(1)" />
        </slot>
      </PaginationFirst>
      <PaginationPrev v-if="showControls || !!slots.prev" as-child :class="pohon.prev({ class: props.pohon?.prev })">
        <slot name="prev">
          <PButton :color="color" :variant="variant" :size="size" :icon="prevIcon" :to="page > 1 ? to?.(page - 1) : undefined" />
        </slot>
      </PaginationPrev>

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" as-child :value="item.value" :class="pohon.item({ class: props.pohon?.item })">
          <slot name="item" v-bind="{ item, index, page, pageCount }">
            <PButton
              :color="page === item.value ? activeColor : color"
              :variant="page === item.value ? activeVariant : variant"
              :size="size"
              :label="String(item.value)"
              :ui="{ label: pohon.label() }"
              :to="to?.(item.value)"
              square
            />
          </slot>
        </PaginationListItem>

        <PaginationEllipsis v-else :key="item.type" :index="index" as-child :class="pohon.ellipsis({ class: props.pohon?.ellipsis })">
          <slot name="ellipsis">
            <PButton :color="color" :variant="variant" :size="size" :icon="ellipsisIcon || appConfig.pohon.icons.ellipsis" />
          </slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext v-if="showControls || !!slots.next" as-child :class="pohon.next({ class: props.pohon?.next })">
        <slot name="next">
          <PButton :color="color" :variant="variant" :size="size" :icon="nextIcon" :to="page < pageCount ? to?.(page + 1) : undefined" />
        </slot>
      </PaginationNext>
      <PaginationLast v-if="showControls || !!slots.last" as-child :class="pohon.last({ class: props.pohon?.last })">
        <slot name="last">
          <PButton :color="color" :variant="variant" :size="size" :icon="lastIcon" :to="to?.(pageCount)" />
        </slot>
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
