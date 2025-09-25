<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PLinkProps, PAvatarProps } from '../types';
import type { ComponentConfig } from '../types/uv';

import theme from '#build/pohon/button';

type Button = ComponentConfig<typeof theme, AppConfig, 'button'>;

export interface PButtonProps extends UseComponentIconsProps, Omit<PLinkProps, 'raw' | 'custom'> {
  label?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: Button['variants']['color'];
  activeColor?: Button['variants']['color'];
  /**
   * @defaultValue 'solid'
   */
  variant?: Button['variants']['variant'];
  activeVariant?: Button['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Button['variants']['size'];
  /** Render the button with equal padding on all sides. */
  square?: boolean;
  /** Render the button full width. */
  block?: boolean;
  /** Set loading state automatically based on the `@click` promise state */
  loadingAuto?: boolean;
  onClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>;
  class?: any;
  pohon?: Button['slots'];
}

export interface PButtonSlots {
  leading: (props?: object) => any;
  default: (props?: object) => any;
  trailing: (props?: object) => any;
}
</script>

<script setup lang="ts">
import type { Ref } from 'vue';
import { useAppConfig } from '#imports';
import { isNonNullish, omit } from '@vinicunca/perkakas';
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { computed, inject, ref } from 'vue';
import { useComponentIcons } from '../composables/use-component-icons';
import { useFieldGroup } from '../composables/use-field-group';
import { formLoadingInjectionKey } from '../composables/use-form-field';
import { mergeClasses } from '../utils';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';

const props = defineProps<PButtonProps>();
const slots = defineSlots<PButtonSlots>();

const appConfig = useAppConfig() as Button['AppConfig'];
const { orientation, size: buttonSize } = useFieldGroup<PButtonProps>(props);

const linkProps = useForwardProps(pickLinkProps(props));

const loadingAutoState = ref(false);
const formLoading = inject<Ref<boolean> | undefined>(formLoadingInjectionKey, undefined);

async function onClickWrapper(event: MouseEvent) {
  loadingAutoState.value = true;
  const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick];
  try {
    await Promise.all(callbacks.map((fn) => fn?.(event)));
  } finally {
    loadingAutoState.value = false;
  }
}

const isLoading = computed(() => {
  return props.loading
    || (props.loadingAuto && (loadingAutoState.value || (formLoading?.value && props.type === 'submit')));
});

const {
  isLeading,
  isTrailing,
  leadingIconName,
  trailingIconName,
} = useComponentIcons(
  computed(() => ({ ...props, loading: isLoading.value })),
);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...defu({
      variants: {
        active: {
          true: {
            base: mergeClasses(appConfig.pohon?.button?.variants?.active?.true?.base, props.activeClass),
          },
          false: {
            base: mergeClasses(appConfig.pohon?.button?.variants?.active?.false?.base, props.inactiveClass),
          },
        },
      },
    }, appConfig.pohon?.button || {}),
  })({
    color: props.color,
    variant: props.variant,
    size: buttonSize.value,
    loading: isLoading.value,
    block: props.block,
    square: props.square || (!slots.default && !props.label),
    leading: isLeading.value,
    trailing: isTrailing.value,
    fieldGroup: orientation.value,
  }),
);
</script>

<template>
  <PLink
    v-slot="{ active, ...slotProps }"
    :type="type"
    :disabled="disabled || isLoading"
    v-bind="omit(linkProps, ['type', 'disabled', 'onClick'])"
    custom
  >
    <PLinkBase
      v-bind="slotProps"
      :class="pohon.base({
        class: [props.pohon?.base, props.class],
        active,
        ...(active && activeVariant ? { variant: activeVariant } : {}),
        ...(active && activeColor ? { color: activeColor } : {}),
      })"
      @click="onClickWrapper"
    >
      <slot name="leading">
        <PIcon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          :class="pohon.leadingIcon({ class: props.pohon?.leadingIcon, active })"
        />
        <PAvatar
          v-else-if="!!avatar"
          :size="((props.pohon?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="avatar"
          :class="pohon.leadingAvatar({ class: props.pohon?.leadingAvatar, active })"
        />
      </slot>

      <slot>
        <span
          v-if="isNonNullish(label)"
          :class="pohon.label({ class: props.pohon?.label, active })"
        >
          {{ label }}
        </span>
      </slot>

      <slot name="trailing">
        <PIcon
          v-if="isTrailing && trailingIconName"
          :name="trailingIconName"
          :class="pohon.trailingIcon({ class: props.pohon?.trailingIcon, active })"
        />
      </slot>
    </PLinkBase>
  </PLink>
</template>
