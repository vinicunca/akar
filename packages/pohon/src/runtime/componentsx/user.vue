<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { AvatarProps, ChipProps, LinkProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/user';

type User = ComponentConfig<typeof theme, AppConfig, 'user'>;

export interface UserProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  name?: string;
  description?: string;
  avatar?: Omit<AvatarProps, 'size'> & { [key: string]: any };
  chip?: boolean | Omit<ChipProps, 'size' | 'inset'>;
  /**
   * @defaultValue 'md'
   */
  size?: User['variants']['size'];
  /**
   * The orientation of the user.
   * @defaultValue 'horizontal'
   */
  orientation?: User['variants']['orientation'];
  to?: LinkProps['to'];
  target?: LinkProps['target'];
  onClick?: (event: MouseEvent) => void | Promise<void>;
  class?: any;
  pohon?: User['slots'];
}

export interface UserSlots {
  avatar?: (props: { pohon: User['pohon'] }) => Array<VNode>;
  name?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import UChip from './Chip.vue';
import ULink from './Link.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<UserProps>(), {
  orientation: 'horizontal',
});
const slots = defineSlots<UserSlots>();

const appConfig = useAppConfig() as User['AppConfig'];
const pohonProp = useComponentPohon('user', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.user || {}) })({
  size: props.size,
  orientation: props.orientation,
  to: !!props.to || !!props.onClick,
}));
</script>

<template>
  <Primitive
    :as="as"
    :data-orientation="orientation"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
    @click="onClick"
  >
    <slot
      name="avatar"
      :pohon="pohon"
    >
      <UChip
        v-if="chip && avatar"
        inset
        v-bind="typeof chip === 'object' ? chip : {}"
        :size="size"
      >
        <PAvatar
          :alt="name"
          v-bind="avatar"
          :size="size"
          data-slot="avatar"
          :class="pohon.avatar({ class: pohonProp?.avatar })"
        />
      </UChip>
      <PAvatar
        v-else-if="avatar"
        :alt="name"
        v-bind="avatar"
        :size="size"
        data-slot="avatar"
        :class="pohon.avatar({ class: pohonProp?.avatar })"
      />
    </slot>

    <div
      data-slot="wrapper"
      :class="pohon.wrapper({ class: pohonProp?.wrapper })"
    >
      <ULink
        v-if="to"
        :aria-label="name"
        v-bind="{ to, target, ...$attrs }"
        class="peer focus:outline-none"
        raw
      >
        <span
          class="inset-0 absolute"
          aria-hidden="true"
        />
      </ULink>

      <slot>
        <p
          v-if="name || !!slots.name"
          data-slot="name"
          :class="pohon.name({ class: pohonProp?.name })"
        >
          <slot name="name">
            {{ name }}
          </slot>
        </p>
        <p
          v-if="description || !!slots.description"
          data-slot="description"
          :class="pohon.description({ class: pohonProp?.description })"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </slot>
    </div>
  </Primitive>
</template>
