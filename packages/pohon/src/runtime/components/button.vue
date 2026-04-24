<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { Ref, VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/use-component-icons';
import type { PAvatarProps, PLinkProps } from '../types';
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
  leading?: (props: { pohon: Button['pohon'] }) => Array<VNode>;
  default?: (props: { pohon: Button['pohon'] }) => Array<VNode>;
  trailing?: (props: { pohon: Button['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { computed, inject, ref } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentIcons } from '../composables/use-component-icons';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFieldGroup } from '../composables/use-field-group';
import { formLoadingInjectionKey } from '../composables/use-form-field';
import { mergeClasses, omit } from '../utils';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';
import PLinkBase from './link-base.vue';
import PLink from './link.vue';

const props = defineProps<PButtonProps>();
const slots = defineSlots<PButtonSlots>();

const appConfig = useAppConfig() as Button['AppConfig'];
const pohonProp = useComponentPohon('button', props);
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
  return props.loading || (props.loadingAuto && (loadingAutoState.value || (formLoading?.value && props.type === 'submit')));
});

const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
  computed(() => ({ ...props, loading: isLoading.value })),
);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...defu(
      {
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
      },
      appConfig.pohon?.button || {},
    ),
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
      data-slot="base"
      :class="pohon.base({
        class: [pohonProp?.base, props.class],
        active,
        ...(active && activeVariant ? { variant: activeVariant } : {}),
        ...(active && activeColor ? { color: activeColor } : {}),
      })"
      @click="onClickWrapper"
    >
      <slot
        name="leading"
        :pohon="pohon"
      >
        <PIcon
          v-if="isLeading && leadingIconName"
          :name="leadingIconName"
          data-slot="leadingIcon"
          :class="pohon.leadingIcon({ class: pohonProp?.leadingIcon, active })"
        />
        <PAvatar
          v-else-if="!!avatar"
          :size="((pohonProp?.leadingAvatarSize || pohon.leadingAvatarSize()) as PAvatarProps['size'])"
          v-bind="avatar"
          data-slot="leadingAvatar"
          :class="pohon.leadingAvatar({ class: pohonProp?.leadingAvatar, active })"
        />
      </slot>

      <slot :pohon="pohon">
        <span
          v-if="label !== undefined && label !== null"
          data-slot="label"
          :class="pohon.label({ class: pohonProp?.label, active })"
        >
          {{ label }}
        </span>
      </slot>

      <slot
        name="trailing"
        :pohon="pohon"
      >
        <PIcon
          v-if="isTrailing && trailingIconName"
          :name="trailingIconName"
          data-slot="trailingIcon"
          :class="pohon.trailingIcon({ class: pohonProp?.trailingIcon, active })"
        />
      </slot>
    </PLinkBase>
  </PLink>
</template>
