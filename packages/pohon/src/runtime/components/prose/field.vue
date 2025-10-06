<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/field';

type ProseField = ComponentConfig<typeof theme, AppConfig, 'field', 'pohon.prose'>;

export interface ProseFieldProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The name of the field.
   */
  name?: string;
  /**
   * Expected type of the field’s value
   */
  type?: string;
  /**
   * Description of the field
   */
  description?: string;
  /**
   * Indicate whether the field is required
   */
  required?: boolean;
  class?: any;
  pohon?: ProseField['slots'];
}

export interface ProseFieldSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { APrimitive } from 'akar';
import { computed } from 'vue';
import { uv } from '../../utils/uv';

const props = defineProps<ProseFieldProps>();
const slots = defineSlots<ProseFieldSlots>();

const appConfig = useAppConfig() as ProseField['AppConfig'];

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.field || {}) })());
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <div :class="pohon.container({ class: props.pohon?.container })">
      <span
        v-if="name"
        :class="pohon.name({ class: props.pohon?.name })"
      >
        {{ name }}
      </span>

      <div
        v-if="type || required"
        :class="pohon.wrapper({ class: props.pohon?.wrapper })"
      >
        <span
          v-if="type"
          :class="pohon.type({ class: props.pohon?.type })"
        >
          {{ type }}
        </span>

        <span
          v-if="required"
          :class="pohon.required({ class: props.pohon?.required })"
        >
          required
        </span>
      </div>
    </div>

    <div
      v-if="!!slots.default || description"
      :class="pohon.description({ class: props.pohon?.description })"
    >
      <slot mdc-unwrap="p">
        {{ description }}
      </slot>
    </div>
  </APrimitive>
</template>
