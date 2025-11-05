<script lang="ts" setup>
import type { Ref } from '#imports';
import type { ContentNavigationItem } from '@nuxt/content';
import { PContainer, PContentNavigation, PMain } from '#components';
import { inject, onMounted, useNavigation, useRoute, useTemplateRef, watch } from '#imports';
import { useDebounceFn } from '@vueuse/core';

const route = useRoute();

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigation');

const { navigationByCategory } = useNavigation(navigation!);

const refNav = useTemplateRef('refNav');

function scrollToActiveItem() {
  if (import.meta.server || !refNav.value) {
    return;
  }
  // Find the anchor tag inside the li tag and check if the href matches the current route
  const activeElement = document.querySelector(`nav[data-akar="content-nav"] li a[href="${route.path}"]`) as HTMLElement;

  if (activeElement) {
    const containerRect = refNav.value.getBoundingClientRect();
    const elementRect = activeElement.getBoundingClientRect();

    // Calculate the scroll position to center the element in the container
    const scrollTop = refNav.value.scrollTop + (elementRect.top - containerRect.top) - (containerRect.height / 2) + (elementRect.height / 2);

    refNav.value.scrollTo({
      behavior: 'smooth',
      top: scrollTop,
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

onMounted(() => {
  scrollToActiveItem();
});
</script>

<template>
  <PMain>
    <PContainer>
      <div class="flex flex-col lg:(gap-10 grid grid-cols-10)">
        <!-- Left Aside -->
        <div class="lg-col-span-2">
          <div
            ref="refNav"
            class="py-8 hidden overflow-y-auto lg:(pe-6.5 ps-4 max-h-[calc(100vh-var(--pohon-header-height))] block top-$pohon-header-height sticky -ms-4)"
          >
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
      </div>
    </PContainer>
  </PMain>
</template>
