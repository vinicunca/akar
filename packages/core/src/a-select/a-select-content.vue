<script lang="ts">
import type {
  ASelectContentImplEmits,
  ASelectContentImplProps,
} from './a-select-content-impl.vue';

export type ASelectContentEmits = ASelectContentImplEmits;

export interface ASelectContentProps extends ASelectContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { APresence } from '~~/a-presence';
import { useForwardPropsEmits } from '~~/shared';

import ASelectContentImpl from './a-select-content-impl.vue';
import ASelectProvider from './a-select-provider.vue';
import { injectASelectRootContext } from './a-select-root.vue';

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
    <ASelectContentImpl v-bind="{ ...forwarded, ...$attrs }">
      <slot />
    </ASelectContentImpl>
  </APresence>

  <div v-else-if="!presenceRef?.present && fragment">
    <Teleport :to="fragment">
      <ASelectProvider :context="rootContext">
        <slot />
      </ASelectProvider>
    </Teleport>
  </div>
</template>
