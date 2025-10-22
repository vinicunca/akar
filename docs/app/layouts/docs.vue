<script lang="ts" setup>
import type { Ref } from '#imports';
import type { ContentNavigationItem } from '@nuxt/content';
import { PContainer, PMain } from '#components';
import { inject, useNavigation, useRoute } from '#imports';

const route = useRoute();

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigation');

const { navigationByCategory } = useNavigation(navigation!);
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
