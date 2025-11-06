<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
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
  avatar: (props: { pohon: User['pohon'] }) => any;
  name: (props?: object) => any;
  description: (props?: object) => any;
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PChip from './chip.vue';
import PLink from './link.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PUserProps>(),
  {
    orientation: 'horizontal',
  },
);
const slots = defineSlots<PUserSlots>();

const appConfig = useAppConfig() as User['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.user || {}),
  })({
    size: props.size,
    orientation: props.orientation,
    to: !!props.to || !!props.onClick,
  }),
);
</script>

<template>
  <APrimitive
    :as="as"
    :data-orientation="orientation"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    data-pohon="user-root"
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
          :class="pohon.avatar({ class: props.pohon?.avatar })"
          data-pohon="user-avatar"
        />
      </PChip>
      <PAvatar
        v-else-if="avatar"
        :alt="name"
        v-bind="avatar"
        :size="size"
        :class="pohon.avatar({ class: props.pohon?.avatar })"
        data-pohon="user-avatar"
      />
    </slot>

    <div
      :class="pohon.wrapper({ class: props.pohon?.wrapper })"
      data-pohon="user-wrapper"
    >
      <PLink
        v-if="to"
        :aria-label="name"
        v-bind="{ to, target, ...$attrs }"
        class="peer focus:outline-none"
        tabindex="-1"
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
          :class="pohon.name({ class: props.pohon?.name })"
          data-pohon="user-name"
        >
          <slot name="name">
            {{ name }}
          </slot>
        </p>
        <p
          v-if="description || !!slots.description"
          :class="pohon.description({ class: props.pohon?.description })"
          data-pohon="user-description"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </slot>
    </div>
  </APrimitive>
</template>
