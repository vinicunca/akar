<script lang="ts" setup>
import type { Ref } from '#imports';
import type { ContentNavigationItem } from '@nuxt/content';
import {
  ContentRenderer,
  MDC,
  PBreadcrumb,
  PContentToc,
  PIcon,
  PLink,
  PLinkBase,
  PSeparator,
} from '#components';
import {
  computed,
  createError,
  inject,
  queryCollection,
  useAsyncData,
  useNavigation,
  useRoute,
  useSeoMeta,
} from '#imports';
import { toKebabCase } from '@vinicunca/perkakas';
import { pickLinkProps } from 'pohon/utils/link';

const props = defineProps<{
  type: 'akar' | 'pohon';
}>();

const route = useRoute();

const { data: page } = await useAsyncData(
  toKebabCase(route.path),
  () => queryCollection(props.type).path(route.path).first(),
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigation');

const { findBreadcrumb } = useNavigation(navigation!);

const breadcrumbs = computed(() => findBreadcrumb(page.value?.path as string));

const title = page.value?.seo?.title ?? page.value?.navigation.title ?? page.value?.title;
const prefix = page.value?.path.includes('components/') || page.value?.path.includes('composables/') ? 'Vue ' : '';
// eslint-disable-next-line no-nested-ternary
const suffix = page.value?.path.includes('components/')
  ? 'Component '
  // eslint-disable-next-line sonar/no-nested-conditional
  : page.value?.path.includes('composables/')
    ? 'Composable '
    : '';
const description = page.value?.seo?.description ?? page.value?.description;

useSeoMeta({
  titleTemplate: `${prefix}%s ${suffix}- Akar ${page.value?.framework === 'vue' ? ' for Vue' : ''}`,
  title,
  ogTitle: `${prefix}${title} ${suffix}- Akar ${page.value?.framework === 'vue' ? ' for Vue' : ''}`,
  description,
  ogDescription: description,
});

const communityLinks = computed(() => [
  {
    icon: 'i-lucide-file-pen',
    label: 'Edit this page',
    to: `https://github.com/vinicunca/akar/edit/main/docs/content/${page?.value?.stem}.md`,
    target: '_blank',
  },
  {
    icon: 'i-lucide-star',
    label: 'Star on GitHub',
    to: 'https://github.com/vinicunca/akar',
    target: '_blank',
  },
]);
</script>

<template>
  <div
    v-if="page"
    class="flex-vertical lg:(gap-10 grid grid-cols-10)"
  >
    <div class="lg:col-span-8">
      <!-- Page header -->
      <div class="py-8 border-b border-border relative">
        <!-- Headline -->
        <div class="text-sm color-primary font-semibold mb-2.5 flex gap-1.5 items-center">
          <PBreadcrumb :items="breadcrumbs" />
        </div>

        <div>
          <!-- Wrapper -->
          <div class="flex-vertical gap-4 lg:(flex-row items-center justify-between)">
            <h1 class="text-3xl color-text-highlighted font-bold text-pretty sm:text-4xl">
              {{ title }}
            </h1>
          </div>

          <div class="text-lg color-text-muted text-pretty">
            <MDC
              v-if="page.description"
              :value="page.description"
              unwrap="p"
              :cache-key="`${toKebabCase(route.path)}-description`"
            />
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <div class="mt-8 pb-24 space-y-12">
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />
      </div>
    </div>

    <!-- Page aside right -->
    <PContentToc
      v-if="page?.body?.toc?.links?.length"
      :links="page.body.toc.links"
      class="order-first z-2 lg:col-span-2 lg:order-last"
    >
      <template #bottom>
        <PSeparator
          v-if="page.body?.toc?.links?.length"
          type="dashed"
        />

        <nav class="flex-vertical gap-3">
          <p class="text-sm font-semibold flex gap-1.5 items-center">
            Community
          </p>

          <ul class="flex-vertical gap-2">
            <li
              v-for="(link, index) in communityLinks"
              :key="index"
              class="relative"
            >
              <PLink
                v-slot="slotProps"
                v-bind="pickLinkProps(link)"
                custom
              >
                <PLinkBase
                  v-bind="slotProps"
                  class="group text-sm color-text-muted flex gap-1.5 transition-colors items-center hover:color-text focus-visible:outline-primary"
                >
                  <PIcon
                    v-if="link.icon"
                    :name="link.icon"
                    class="shrink-0 size-5"
                  />

                  <span
                    v-if="link.label"
                    class="truncate"
                  >

                    {{ link.label }}

                    <PIcon
                      v-if="link.target === '_blank'"
                      name="i-lucide-arrow-up-right"
                      class="color-text-dimmed size-3 top-0 absolute"
                    />
                  </span>
                </PLinkBase>
              </PLink>
            </li>
          </ul>
        </nav>

        <PSeparator type="dashed" />
      </template>
    </PContentToc>
  </div>
</template>
