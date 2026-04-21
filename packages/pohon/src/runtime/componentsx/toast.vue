<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ToastRootEmits, ToastRootProps } from 'akar';
import type { VNode } from 'vue';
import type { AvatarProps, PButtonProps, PIconProps, PLinkPropsKeys, ProgressProps } from '../types';
import type { StringOrVNode } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/toast';

type Toast = ComponentConfig<typeof theme, AppConfig, 'toast'>;

export interface ToastProps extends Pick<ToastRootProps, 'defaultOpen' | 'open' | 'type' | 'duration'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'li'
   */
  as?: any;
  title?: StringOrVNode;
  description?: StringOrVNode;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
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
  close?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  closeIcon?: PIconProps['name'];
  /**
   * Display a list of actions:
   * - under the title and description when orientation is `vertical`
   * - next to the close button when orientation is `horizontal`
   * `{ size: 'xs' }`{lang="ts-type"}
   */
  actions?: Array<PButtonProps>;
  /**
   * Display a progress bar showing the toast's remaining duration.
   * `{ size: 'sm' }`{lang="ts-type"}
   * @defaultValue true
   */
  progress?: boolean | Pick<ProgressProps, 'color' | 'pohon'>;
  class?: any;
  pohon?: Toast['slots'];
}

export interface ToastEmits extends ToastRootEmits {}

export interface ToastSlots {
  leading?: (props: { pohon: Toast['pohon'] }) => Array<VNode>;
  title?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  actions?: (props?: {}) => Array<VNode>;
  close?: (props: { pohon: Toast['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { reactivePick } from '@vueuse/core';
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, useForwardPropsEmits } from 'akar';
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useLocale } from '../composables/use-locale';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import PIcon from './icon.vue';
import UProgress from './Progress.vue';

const props = withDefaults(defineProps<ToastProps>(), {
  orientation: 'vertical',
  close: true,
  progress: true,
});
const emits = defineEmits<ToastEmits>();
const slots = defineSlots<ToastSlots>();

const { t } = useLocale();
const appConfig = useAppConfig() as Toast['AppConfig'];
const pohonProp = useComponentPohon('toast', props);

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultOpen', 'open', 'duration', 'type'), emits);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.toast || {}) })({
  color: props.color,
  orientation: props.orientation,
  title: !!props.title || !!slots.title,
}));

const rootRef = useTemplateRef('rootRef');
const height = ref(0);

onMounted(() => {
  if (!rootRef.value?.$el?.getBoundingClientRect) {
    return;
  }

  height.value = rootRef.value.$el.getBoundingClientRect().height;
});

defineExpose({
  height,
});
</script>

<template>
  <ToastRoot
    ref="rootRef"
    v-slot="{ remaining, duration, open }"
    v-bind="rootProps"
    :data-orientation="orientation"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    :style="{ '--height': height }"
  >
    <slot
      name="leading"
      :pohon="pohon"
    >
      <PAvatar
        v-if="avatar"
        :size="((pohonProp?.avatarSize || pohon.avatarSize()) as AvatarProps['size'])"
        v-bind="avatar"
        data-slot="avatar"
        :class="pohon.avatar({ class: pohonProp?.avatar })"
      />
      <PIcon
        v-else-if="icon"
        :name="icon"
        data-slot="icon"
        :class="pohon.icon({ class: pohonProp?.icon })"
      />
    </slot>

    <div
      data-slot="wrapper"
      :class="pohon.wrapper({ class: pohonProp?.wrapper })"
    >
      <ToastTitle
        v-if="title || !!slots.title"
        data-slot="title"
        :class="pohon.title({ class: pohonProp?.title })"
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
      </ToastTitle>
      <ToastDescription
        v-if="description || !!slots.description"
        data-slot="description"
        :class="pohon.description({ class: pohonProp?.description })"
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
      </ToastDescription>

      <div
        v-if="orientation === 'vertical' && (actions?.length || !!slots.actions)"
        data-slot="actions"
        :class="pohon.actions({ class: pohonProp?.actions })"
      >
        <slot name="actions">
          <ToastAction
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
          </ToastAction>
        </slot>
      </div>
    </div>

    <div
      v-if="(orientation === 'horizontal' && (actions?.length || !!slots.actions)) || close"
      data-slot="actions"
      :class="pohon.actions({ class: pohonProp?.actions, orientation: 'horizontal' })"
    >
      <template v-if="orientation === 'horizontal' && (actions?.length || !!slots.actions)">
        <slot name="actions">
          <ToastAction
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
          </ToastAction>
        </slot>
      </template>

      <ToastClose
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
            v-bind="(typeof close === 'object' ? close : {})"
            data-slot="close"
            :class="pohon.close({ class: pohonProp?.close })"
            @click.stop
          />
        </slot>
      </ToastClose>
    </div>

    <UProgress
      v-if="progress && open && remaining > 0 && duration"
      :model-value="remaining / duration * 100"
      :color="color"
      v-bind="(typeof progress === 'object' ? progress as Partial<ProgressProps> : {})"
      size="sm"
      data-slot="progress"
      :class="pohon.progress({ class: pohonProp?.progress })"
    />
  </ToastRoot>
</template>
