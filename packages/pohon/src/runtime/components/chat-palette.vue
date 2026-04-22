<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/chat-palette';

type ChatPalette = ComponentConfig<typeof theme, AppConfig, 'chatPalette'>;

export interface PChatPaletteProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  pohon?: ChatPalette['slots'];
}

export interface PChatPaletteSlots {
  default?: (props?: {}) => Array<VNode>;
  prompt?: (props?: {}) => Array<VNode>;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive, APrimitiveSlot } from 'akar';
import { computed } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { uv } from '../utils/uv';

const props = defineProps<PChatPaletteProps>();
const slots = defineSlots<PChatPaletteSlots>();

const appConfig = useAppConfig() as ChatPalette['AppConfig'];
const pohonProp = useComponentPohon('chatPalette', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.chatPalette || {}) })());
</script>

<template>
  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div
      data-slot="content"
      :class="pohon.content({ class: pohonProp?.content })"
    >
      <APrimitiveSlot compact>
        <slot />
      </APrimitiveSlot>
    </div>

    <APrimitiveSlot
      v-if="!!slots.prompt"
      data-slot="prompt"
      :class="pohon.prompt({ class: pohonProp?.prompt })"
    >
      <slot name="prompt" />
    </APrimitiveSlot>
  </APrimitive>
</template>
