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
import { computed, onMounted, ref, watch } from 'vue';
import { APresence } from '../presence';
import { useForwardPropsEmits } from '../shared';
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

const present = computed(() => props.forceMount || rootContext.open.value);
const renderPresence = ref(present.value);

watch(
  present,
  () => {
    /**
     * Toggle render presence after a delay (nextTick is not enough)Add commentMore actions
     * to allow children to re-render with the latest state.
     * Otherwise, they would remain in the old state during the transition,
     * which would prevent the animation that depend on state (e.g., data-[state=closed])
     * from being applied accurately.
     */
    setTimeout(() => {
      renderPresence.value = present.value;
    });
  },
);
</script>

<template>
  <APresence
    v-if="present || renderPresence || presenceRef?.present"
    ref="presenceRef"
    :present="present"
  >
    <SelectContentImpl v-bind="{ ...forwarded, ...$attrs }">
      <slot />
    </SelectContentImpl>
  </APresence>

  <div v-else-if="fragment">
    <Teleport :to="fragment">
      <SelectProvider :context="rootContext">
        <slot />
      </SelectProvider>
    </Teleport>
  </div>
</template>
