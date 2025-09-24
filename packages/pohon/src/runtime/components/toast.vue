<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { APrimitiveProps, AToastRootEmits, AToastRootProps } from 'akar';
import type { AvatarProps, ButtonProps, IconProps, ProgressProps } from '../types';
import type { StringOrVNode } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/toast';

type Toast = ComponentConfig<typeof theme, AppConfig, 'toast'>;

export interface PToastProps extends Pick<AToastRootProps, 'defaultOpen' | 'open' | 'type' | 'duration'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'li'
   */
  as?: APrimitiveProps['as'];
  title?: StringOrVNode;
  description?: StringOrVNode;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  avatar?: AvatarProps;
  /**
   * @defaultValue 'primary'
   */
  color?: Toast['variants']['color'];
  /**
   * The orientation between the content and the actions.
   * @defaultValue 'vertical'
   */
  orientation?: Toast['variants']['orientation'];
  /**
   * Display a close button to dismiss the toast.
   * `{ size: 'md', color: 'neutral', variant: 'link' }`{lang="ts-type"}
   * @defaultValue true
   */
  close?: boolean | Partial<ButtonProps>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: IconProps['name'];
  /**
   * Display a list of actions:
   * - under the title and description when orientation is `vertical`
   * - next to the close button when orientation is `horizontal`
   * `{ size: 'xs' }`{lang="ts-type"}
   */
  actions?: Array<ButtonProps>;
  /**
   * Display a progress bar showing the toast's remaining duration.
   * `{ size: 'sm' }`{lang="ts-type"}
   * @defaultValue true
   */
  progress?: boolean | Pick<ProgressProps, 'color' | 'pohon'>;
  class?: any;
  pohon?: Toast['slots'];
}

export interface PToastEmits extends AToastRootEmits {}

export interface PToastSlots {
  leading: (props?: object) => any;
  title: (props?: object) => any;
  description: (props?: object) => any;
  actions: (props?: object) => any;
  close: (props: { pohon: { [K in keyof Required<Toast['slots']>]: (props?: Record<string, any>) => string } }) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import {
  AToastAction,
  AToastClose,
  AToastDescription,
  AToastRoot,
  AToastTitle,
  useForwardPropsEmits,
} from 'akar';
import { computed, nextTick, onMounted, ref } from 'vue';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import PIcon from './icon.vue';
import PProgress from './xProgress.vue';

const props = withDefaults(
  defineProps<PToastProps>(),
  {
    orientation: 'vertical',
    close: true,
    progress: true,
  },
);
const emits = defineEmits<PToastEmits>();
const slots = defineSlots<PToastSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as Toast['AppConfig'];

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type'), emits);

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.toast || {}),
  })({
    color: props.color,
    orientation: props.orientation,
    title: !!props.title || !!slots.title,
  }),
);

const el = ref();
const height = ref(0);

onMounted(() => {
  if (!el.value) {
    return;
  }

  nextTick(() => {
    height.value = el.value?.$el?.getBoundingClientRect()?.height;
  });
});

defineExpose({
  height,
});
</script>

<template>
  <AToastRoot
    ref="el"
    v-slot="{ remaining, duration, open }"
    v-bind="rootProps"
    :data-orientation="orientation"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    :style="{ '--height': height }"
  >
    <slot name="leading">
      <PAvatar
        v-if="avatar"
        :size="((props.pohon?.avatarSize || pohon.avatarSize()) as AvatarProps['size'])"
        v-bind="avatar"
        :class="pohon.avatar({ class: props.pohon?.avatar })"
      />
      <PIcon
        v-else-if="icon"
        :name="icon"
        :class="pohon.icon({ class: props.pohon?.icon })"
      />
    </slot>

    <div :class="pohon.wrapper({ class: props.pohon?.wrapper })">
      <AToastTitle
        v-if="title || !!slots.title"
        :class="pohon.title({ class: props.pohon?.title })"
      >
        <slot name="title">
          <component
            :is="title()"
            v-if="typeof title === 'function'"
          />
          <component
            :is="title"
            v-else-if="typeof title === 'object'"
          />
          <template v-else>
            {{ title }}
          </template>
        </slot>
      </AToastTitle>
      <AToastDescription
        v-if="description || !!slots.description"
        :class="pohon.description({ class: props.pohon?.description })"
      >
        <slot name="description">
          <component
            :is="description()"
            v-if="typeof description === 'function'"
          />
          <component
            :is="description"
            v-else-if="typeof description === 'object'"
          />
          <template v-else>
            {{ description }}
          </template>
        </slot>
      </AToastDescription>

      <div
        v-if="orientation === 'vertical' && (actions?.length || !!slots.actions)"
        :class="pohon.actions({ class: props.pohon?.actions })"
      >
        <slot name="actions">
          <AToastAction
            v-for="(action, index) in actions"
            :key="index"
            :alt-text="action.label || 'Action'"
            as-child
            @click.stop
          >
            <PButton
              size="xs"
              :color="color"
              v-bind="action"
            />
          </AToastAction>
        </slot>
      </div>
    </div>

    <div
      v-if="(orientation === 'horizontal' && (actions?.length || !!slots.actions)) || close"
      :class="pohon.actions({ class: props.pohon?.actions, orientation: 'horizontal' })"
    >
      <template v-if="orientation === 'horizontal' && (actions?.length || !!slots.actions)">
        <slot name="actions">
          <AToastAction
            v-for="(action, index) in actions"
            :key="index"
            :alt-text="action.label || 'Action'"
            as-child
            @click.stop
          >
            <PButton
              size="xs"
              :color="color"
              v-bind="action"
            />
          </AToastAction>
        </slot>
      </template>

      <AToastClose
        v-if="close || !!slots.close"
        as-child
      >
        <slot
          name="close"
          :pohon="pohon"
        >
          <PButton
            v-if="close"
            :icon="closeIcon || appConfig.pohon.icons.close"
            color="neutral"
            variant="link"
            :aria-label="t('toast.close')"
            v-bind="(typeof close === 'object' ? close as Partial<ButtonProps> : {})"
            :class="pohon.close({ class: props.pohon?.close })"
            @click.stop
          />
        </slot>
      </AToastClose>
    </div>

    <PProgress
      v-if="progress && open && remaining > 0 && duration"
      :model-value="remaining / duration * 100"
      :color="color"
      v-bind="(typeof progress === 'object' ? progress as Partial<ProgressProps> : {})"
      size="sm"
      :class="pohon.progress({ class: props.pohon?.progress })"
    />
  </AToastRoot>
</template>
