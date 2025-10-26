<script lang="ts" setup>
import type { Ref } from '#imports';
import type { ContentNavigationItem } from '@nuxt/content';
import { PContainer, PMain } from '#components';
import { inject, useNavigation, useRoute, watch } from '#imports';
import { useDebounceFn } from '@vueuse/core';

const route = useRoute();

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigation');

const { navigationByCategory } = useNavigation(navigation!);

function scrollToActiveItem() {
  if (import.meta.server) {
    return;
  }
  // Find the anchor tag inside the li tag and check if the href matches the current route
  const activeElement = document.querySelector(`nav[data-akar="content-nav"] li a[href="${route.path}"]`) as HTMLElement;
  if (activeElement) {
    activeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
}

const debouncedScroll = useDebounceFn(scrollToActiveItem, 320);

watch(
  () => route.path,
  () => {
    debouncedScroll();
  },
  { immediate: true },
);
</script>

<template>
  <PMain>
    <PContainer>
      <div class="flex-vertical lg:(gap-10 grid grid-cols-10)">
        <!-- Left Aside -->
        <div class="lg-col-span-2">
          <div class="py-8 hidden overflow-y-auto lg:(pe-6.5 ps-4 max-h-[calc(100vh-var(--pohon-header-height))] block top-$pohon-header-height sticky -ms-4)">
            <div class="relative">
              <PContentNavigation
                :key="route.path"
                data-akar="content-nav"
                :navigation="navigationByCategory"
                :pohon="{
                  linkTrailingBadge: 'font-semibold uppercase',
                }"
              />
            </div>
          </div>
        </div>

        <div class="lg:col-span-8">
          <slot />
        </div>

        <div class="after:(rounded-full w-px block transition-colors inset-y-0.5 absolute -left-1.5)" />
      </div>
    </PContainer>
  </PMain>
</template>
