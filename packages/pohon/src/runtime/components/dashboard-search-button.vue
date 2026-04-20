<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/pohon/dashboard-search-button'
import type { PButtonProps, PButtonSlots, PIconProps, PKbdProps, PTooltipProps, PLinkPropsKeys } from '../types'
import type { ComponentConfig } from '../types/tv'

type DashboardSearchButton = ComponentConfig<typeof theme, AppConfig, 'dashboardSearchButton'>

export interface DashboardSearchPButtonProps extends Omit<PButtonProps, PLinkPropsKeys | 'icon' | 'label' | 'color' | 'variant'> {
  /**
   * The icon displayed in the button.
   * @defaultValue appConfig.pohon.icons.search
   * @IconifyIcon
   */
  icon?: PIconProps['name']
  /**
   * The label displayed in the button.
   * @defaultValue t('dashboardSearchButton.label')
   */
  label?: string
  /**
   * The color of the button.
   * @defaultValue 'neutral'
   */
  color?: PButtonProps['color']
  /**
   * The variant of the button.
   * Defaults to 'outline' when not collapsed, 'ghost' when collapsed.
   */
  variant?: PButtonProps['variant']
  /**
   * Whether the button is collapsed.
   * @defaultValue false
   */
  collapsed?: boolean
  /**
   * Display a tooltip on the button when is collapsed with the button label.
   * This has priority over the global `tooltip` prop.
   */
  tooltip?: boolean | PTooltipProps
  /**
   * The keyboard keys to display in the button.
   * `{ variant: 'subtle' }`{lang="ts-type"}
   * @defaultValue ['meta', 'k']
   */
  kbds?: PKbdProps['value'][] | PKbdProps[]
  pohon?: DashboardSearchButton['slots'] & PButtonProps['pohon']
  class?: any
}
</script>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useForwardProps } from 'reka-ui'
import { defu } from 'defu'
import { reactiveOmit, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { useLocale } from '../composables/use-locale'
import { useDashboard } from '../utils/dashboard'
import { omit, transformPohon } from '../utils'
import { tv } from '../utils/tv'
import PButton from './button.vue'
import PKbd from './kbd.vue'
import PTooltip from './tooltip.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DashboardSearchPButtonProps>(), {
  color: 'neutral',
  collapsed: false,
  tooltip: false,
  kbds: () => ['meta', 'k']
})
const slots = defineSlots<PButtonSlots>()

const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate()

const getProxySlots = () => omit(slots, ['trailing'])

const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'label', 'variant', 'collapsed', 'tooltip', 'kbds', 'class', 'ui'))
const tooltipProps = toRef(() => defu(typeof props.tooltip === 'boolean' ? {} : props.tooltip, { delayDuration: 0, content: { side: 'right' } }) as PTooltipProps)

const { t } = useLocale()
const appConfig = useAppConfig() as DashboardSearchButton['AppConfig']
const pohonProp = useComponentPohon('dashboardSearchButton', props)
const { toggleSearch } = useDashboard({ toggleSearch: () => {} })

const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.dashboardSearchButton || {}) })({
  collapsed: props.collapsed
}))
</script>

<template>
  <DefineButtonTemplate>
    <PButton
      :icon="icon || appConfig.pohon.icons.search"
      :label="label || t('dashboardSearchButton.label')"
      :variant="variant || (collapsed ? 'ghost' : 'outline')"
      v-bind="{
        ...buttonProps,
        ...(collapsed ? {
          'square': true,
          'aria-label': label || t('dashboardSearchButton.label')
        } : {}),
        ...$attrs
      }"
      :class="ui.base({ class: [pohonProp?.base, props.class] })"
      : pohon="transformPohon(ui, pohonProp)"
      @click="toggleSearch"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>

      <template #trailing="{ pohon: uiProxy }">
        <span data-slot="trailing" :class="ui.trailing({ class: pohonProp?.trailing })">
          <slot name="trailing" : pohon="uiProxy">
            <template v-if="kbds?.length">
              <PKbd v-for="(kbd, index) in kbds" :key="index" variant="subtle" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
            </template>
          </slot>
        </span>
      </template>
    </PButton>
  </DefineButtonTemplate>

  <PTooltip v-if="collapsed && tooltip" :text="label || t('dashboardSearchButton.label')" v-bind="tooltipProps">
    <ReuseButtonTemplate />
  </PTooltip>
  <ReuseButtonTemplate v-else />
</template>
