<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { NuxtError } from '#app'
import theme from '#build/pohon/error'
import type { ButtonProps } from '../types'
import type { ComponentConfig } from '../types/uv'

type Error = ComponentConfig<typeof theme, AppConfig, 'error'>

export interface ErrorProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: APrimitiveProps['as'];
  error?: Partial<NuxtError & { message: string }>
  /**
   * The URL to redirect to when the error is cleared.
   * @defaultValue '/'
   */
  redirect?: string
  /**
   * Display a button to clear the error in the links slot.
   * `{ size: 'lg', color: 'primary', variant: 'solid', label: 'Back to home' }`{lang="ts-type"}
   * @defaultValue true
   */
  clear?: boolean | Partial<ButtonProps>
  class?: any
  pohon?: Error['slots']
}

export interface ErrorSlots {
  default(props?: object): any
  statusCode(props?: object): any
  statusMessage(props?: object): any
  message(props?: object): any
  links(props?: object): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { APrimitive } from 'akar'
import { clearError, useAppConfig } from '#imports'
import { useLocale } from '../composables/use-locale'
import { uv } from '../utils/uv'
import PButton from './button.vue'

const props = withDefaults(defineProps<ErrorProps>(), {
  as: 'main',
  redirect: '/',
  clear: true
})
const slots = defineSlots<ErrorSlots>()

const { t } = useLocale()
const appConfig = useAppConfig() as Error['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.error || {}) })())

function handleError() {
  clearError({ redirect: props.redirect })
}
</script>

<template>
  <APrimitive :as="as" :class="pohon.root({ class: [props.pohon?.root, props.class] })">
    <p v-if="!!props.error?.statusCode || !!slots.statusCode" :class="pohon.statusCode({ class: props.pohon?.statusCode })">
      <slot name="statusCode">
        {{ props.error?.statusCode }}
      </slot>
    </p>
    <h1 v-if="!!props.error?.statusMessage || !!slots.statusMessage" :class="pohon.statusMessage({ class: props.pohon?.statusMessage })">
      <slot name="statusMessage">
        {{ props.error?.statusMessage }}
      </slot>
    </h1>
    <p v-if="(props.error?.message && props.error.message !== props.error.statusMessage) || !!slots.message" :class="pohon.message({ class: props.pohon?.message })">
      <slot name="message">
        {{ props.error?.message }}
      </slot>
    </p>
    <div v-if="!!clear || !!slots.links" :class="pohon.links({ class: props.pohon?.links })">
      <slot name="links">
        <PButton
          v-if="clear"
          size="lg"
          color="primary"
          variant="solid"
          :label="t('error.clear')"
          v-bind="(typeof clear === 'object' ? clear as Partial<ButtonProps> : {})"
          @click="handleError"
        />
      </slot>
    </div>
  </APrimitive>
</template>
