<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { PAvatarProps, PChipProps, PLinkProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/user';

type User = ComponentConfig<typeof theme, AppConfig, 'user'>;

export interface PUserProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  name?: string;
  description?: string;
  avatar?: Omit<PAvatarProps, 'size'> & { [key: string]: any };
  chip?: boolean | Omit<PChipProps, 'size' | 'inset'>;
  /**
   * @defaultValue 'md'
   */
  size?: User['variants']['size'];
  /**
   * The orientation of the user.
   * @defaultValue 'horizontal'
   */
  orientation?: User['variants']['orientation'];
  to?: PLinkProps['to'];
  target?: PLinkProps['target'];
  onClick?: (event: MouseEvent) => void | Promise<void>;
  class?: any;
  pohon?: User['slots'];
}

export interface PUserSlots {
  avatar?: (props: { pohon: User['pohon'] }) => Array<VNode>;
  name?: (props?: {}) => Array<VNode>;
  description?: (props?: {}) => Array<VNode>;
  default?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PChip from './chip.vue';
import PLink from './link.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PUserProps>(), {
  orientation: 'horizontal',
});
const slots = defineSlots<PUserSlots>();

const appConfig = useAppConfig() as User['AppConfig'];
const pohonProp = useComponentPohon('user', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.user || {}) })({
  size: props.size,
  orientation: props.orientation,
  to: !!props.to || !!props.onClick,
}));
</script>

<template>
  <APrimitive
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
      <PChip
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
      </PChip>
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
      <PLink
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
      </PLink>

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
  </APrimitive>
</template>
