<script setup lang="ts">
import type { ADrawerDirection } from '@vinicunca/akar';
import {
  ADrawerOverlay,
  ADrawerPortal,
  ADrawerRoot,
  ADrawerTitle,
  ADrawerTrigger,
} from '@vinicunca/akar';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import DrawerContentWrapper from '../../components/drawer-content.vue';

const route = useRoute();
const direction = ref<ADrawerDirection>(route.query.direction as ADrawerDirection ?? 'bottom');
</script>

<template>
  <div
    class="h-screen w-screen flex items-center justify-center bg-white p-8"
    data-akar-drawer-wrapper=""
  >
    <ADrawerRoot :direction="direction">
      <ADrawerTrigger as-child>
        <button
          data-testid="trigger"
          class="text-2xl"
        >
          Open Drawer
        </button>
      </ADrawerTrigger>
      <ADrawerPortal>
        <ADrawerOverlay
          data-testid="overlay"
          class="fixed inset-0 bg-black/40"
        />
        <DrawerContentWrapper
          :direction="direction"
        >
          <div class="mx-auto max-w-md">
            <ADrawerTitle class="mb-4 font-medium">
              Unstyled drawer for Vue.
            </ADrawerTitle>
            <p class="mb-2 text-zinc-600">
              This component can be used as a replacement for a Dialog on mobile and tablet devices.
            </p>
          </div>
        </DrawerContentWrapper>
      </ADrawerPortal>
    </ADrawerRoot>
  </div>
</template>

<style scoped></style>
