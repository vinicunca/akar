<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  APopoverContent,
  APopoverPortal,
  APopoverRoot,
  APopoverTrigger,
  ASeparator,
} from '@vinicunca/akar';
import { useData, useRoute } from 'vitepress';
import { ref, toRefs, watch } from 'vue';
import LayoutDropdownMenu from '../components/layout-dropdown-menu.vue';
import LayoutThemeToggle from '../components/layout-theme-toggle.vue';

const { path } = toRefs(useRoute());
const { theme } = useData();

const isPopoverOpen = ref(false);

watch(
  path,
  () => {
    isPopoverOpen.value = false;
  },
);
</script>

<template>
  <nav class="hidden items-center lg:flex">
    <template
      v-for="nav in theme.nav"
      :key="nav.text"
    >
      <a
        v-if="nav.link"
        :href="nav.link"
        class="mx-3 h-full inline-flex items-center py-2 text-sm text-muted-foreground font-semibold hover:text-foreground"
        :class="{ '!text-primary': path.includes(nav.text.toLowerCase()) }"
      >
        {{ nav.text }}
      </a>
      <LayoutDropdownMenu
        v-else-if="nav.items"
        :label="nav.text"
        :items="nav.items"
      />
    </template>

    <ASeparator
      class="mx-4 h-4 w-px bg-muted"
      decorative
      orientation="vertical"
    />
    <LayoutThemeToggle />

    <ASeparator
      class="mx-4 h-4 w-px bg-muted"
      decorative
      orientation="vertical"
    />

    <a
      v-for="link in theme.socialLinks"
      :key="link.link"
      :href="link.link"
      :aria-label="link.icon"
      target="_blank"
      class="h-9 w-9 flex flex-shrink-0 items-center justify-center rounded-lg bg-transparent text-xl text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      <Icon :icon="`simple-icons:${link.icon}`" />
    </a>
  </nav>

  <div class="lg:hidden">
    <APopoverRoot v-model:open="isPopoverOpen">
      <APopoverTrigger class="rounded-lg p-2">
        <i
          class="i-lucide:ellipsis text-lg"
        />
      </APopoverTrigger>

      <APopoverPortal>
        <APopoverContent
          side="bottom"
          :side-offset="5"
          align="end"
          class="will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade z-10 w-[180px] border border-muted rounded-xl bg-card p-2 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green7)]"
        >
          <nav class="flex flex-col">
            <template
              v-for="nav in theme.nav"
              :key="nav.text"
            >
              <a
                v-if="nav.link"
                :href="nav.link"
                class="h-full inline-flex items-center rounded-lg p-2 text-sm text-muted-foreground font-semibold hover:bg-primary/10 hover:text-primary"
              >
                {{ nav.text }}
              </a>
              <LayoutDropdownMenu
                v-else-if="nav.items"
                :label="nav.text"
                :items="nav.items"
              />
            </template>

            <ASeparator
              class="my-2 h-px w-full bg-muted"
              decorative
              orientation="horizontal"
            />

            <div class="flex items-center justify-between px-4 text-sm">
              <label
                for="theme-toggle"
                class="text-muted-foreground font-semibold"
              >Appearance</label>
              <LayoutThemeToggle />
            </div>

            <ASeparator
              class="my-2 h-px w-full bg-muted"
              decorative
              orientation="horizontal"
            />

            <div class="flex items-center gap-2 px-4">
              <a
                v-for="link in theme.socialLinks"
                :key="link.link"
                :href="link.link"
                :aria-label="link.icon"
                target="_blank"
                class="h-9 w-9 flex items-center justify-center rounded-lg bg-transparent text-xl text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Icon :icon="`simple-icons:${link.icon}`" />
              </a>
            </div>
          </nav>
        </APopoverContent>
      </APopoverPortal>
    </APopoverRoot>
  </div>
</template>
