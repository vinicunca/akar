<script lang="ts">
import type {
  SelectContentImplEmits,
  SelectContentImplProps,
} from './select-content-impl.vue';

export type ASelectContentEmits = SelectContentImplEmits;

export interface ASelectContentProps extends SelectContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { APresence } from '~~/presence';
import { useForwardPropsEmits } from '~~/shared';
import SelectContentImpl from './select-content-impl.vue';
import SelectProvider from './select-provider.vue';
import { injectASelectRootContext } from './select-root.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ASelectContentProps>();

const emits = defineEmits<ASelectContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const rootContext = injectASelectRootContext();

const fragment = ref<DocumentFragment>();
onMounted(() => {
  fragment.value = new DocumentFragment();
});

const presenceRef = ref<InstanceType<typeof APresence>>();
const renderPresence = computed(() => props.forceMount || rootContext.open.value);
</script>

<template>
  <APresence
    v-if="renderPresence"
    ref="presenceRef"
    :present="true"
  >
    <SelectContentImpl v-bind="{ ...forwarded, ...$attrs }">
      <slot />
    </SelectContentImpl>
  </APresence>

  <div v-else-if="!presenceRef?.present && fragment">
    <Teleport :to="fragment">
      <SelectProvider :context="rootContext">
        <slot />
      </SelectProvider>
    </Teleport>
  </div>
</template>
