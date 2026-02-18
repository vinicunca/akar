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
import { useComponentPohon } from '../../composables/use-component-pohon';
import { uv } from '../../utils/uv';

const props = defineProps<ProseFieldProps>();
const slots = defineSlots<ProseFieldSlots>();

const appConfig = useAppConfig() as ProseField['AppConfig'];
const pohonProp = useComponentPohon('prose.field', props);

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.field || {}) })());
</script>

<template>
  <APrimitive
    :as="as"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <div :class="pohon.container({ class: pohonProp?.container })">
      <span
        v-if="name"
        :class="pohon.name({ class: pohonProp?.name })"
      >
        {{ name }}
      </span>

      <div
        v-if="type || required"
        :class="pohon.wrapper({ class: pohonProp?.wrapper })"
      >
        <span
          v-if="type"
          :class="pohon.type({ class: pohonProp?.type })"
        >
          {{ type }}
        </span>

        <span
          v-if="required"
          :class="pohon.required({ class: pohonProp?.required })"
        >
          required
        </span>
      </div>
    </div>

    <div
      v-if="!!slots.default || description"
      :class="pohon.description({ class: pohonProp?.description })"
    >
      <slot mdc-unwrap="p">
        {{ description }}
      </slot>
    </div>
  </APrimitive>
</template>
