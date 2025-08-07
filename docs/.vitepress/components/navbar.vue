<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { ADropdownMenuContent, ADropdownMenuItem, ADropdownMenuPortal, ADropdownMenuRoot, ADropdownMenuSub, ADropdownMenuSubContent, ADropdownMenuSubTrigger, ADropdownMenuTrigger, ASeparator } from 'akar';
import { useData, useRoute } from 'vitepress';
import { ref, toRefs, watch } from 'vue';
import ThemeToggle from './theme-toggle.vue';

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
        :href="nav.link"
        class="text-sm text-muted-foreground font-semibold mx-3 py-2 inline-flex h-full items-center hover:text-foreground"
        :class="{ '!text-primary': path.includes(nav.text.toLowerCase()) }"
      >
        {{ nav.text }}
      </a>
    </template>

    <ASeparator
      class="mx-4 bg-muted h-4 w-px"
      decorative
      orientation="vertical"
    />

    <ThemeToggle />

    <ASeparator
      class="mx-4 bg-muted h-4 w-px"
      decorative
      orientation="vertical"
    />

    <a
      v-for="link in theme.socialLinks"
      :key="link.link"
      :href="link.link"
      :aria-label="link.icon"
      target="_blank"
      class="text-xl text-muted-foreground rounded-lg bg-transparent flex flex-shrink-0 h-9 w-9 items-center justify-center hover:text-foreground hover:bg-muted"
    >
      <Icon :icon="`simple-icons:${link.icon}`" />
    </a>
  </nav>

  <div class="lg:hidden">
    <ADropdownMenuRoot v-model:open="isPopoverOpen">
      <ADropdownMenuTrigger class="p-2 rounded-lg">
        <i class="i-lucide:ellipsis text-lg" />
      </ADropdownMenuTrigger>

      <ADropdownMenuPortal>
        <ADropdownMenuContent
          side="bottom"
          :side-offset="5"
          align="end"
          class="data-[state=open]:data-[side=bottom]:animate-slide-up-and-fade p-2 will-change-[transform,opacity] border border-muted rounded-xl bg-card w-[180px] shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] z-10 focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green.700)]"
        >
          <nav class="flex flex-col">
            <template
              v-for="nav in theme.nav"
              :key="nav.text"
            >
              <ADropdownMenuItem
                v-if="nav.link"
                as="a"
                :href="nav.link"
                class="text-sm color-muted-foreground font-semibold p-2 rounded inline-flex h-full items-center hover:text-primary hover:bg-primary/10"
              >
                {{ nav.text }}
              </ADropdownMenuItem>

              <ADropdownMenuSub v-else-if="nav.items">
                <ADropdownMenuSubTrigger class="text-sm color-muted-foreground font-semibold p-2 rounded inline-flex h-full w-full items-center justify-between hover:text-primary hover:bg-primary/10">
                  <span>{{ nav.text }}</span>
                  <i
                    class="i-lucide:chevron-down text-lg ml-1"
                  />
                </ADropdownMenuSubTrigger>

                <ADropdownMenuPortal>
                  <ADropdownMenuSubContent class="data-[state=open]:data-[side=bottom]:animate-slide-up-and-fade p-2 will-change-[transform,opacity] border border-muted rounded-xl bg-card w-[180px] shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] z-10 focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green.700)]">
                    <ADropdownMenuItem
                      v-for="item in nav.items"
                      :key="item.text"
                      class="text-sm color-muted-foreground font-semibold p-2 rounded inline-flex h-full w-full items-center hover:text-primary hover:bg-primary/10"
                    >
                      <a
                        v-if="item.link"
                        :href="item.link"
                        target="_blank"
                        class="flex w-full items-center justify-between"
                      >
                        <span>{{ item.text }}</span>
                        <i
                          class="i-lucide:arrow-up-right text-base ml-2"
                        />

                      </a>
                      <div v-else>
                        {{ item.text }}
                      </div>
                    </ADropdownMenuItem>
                  </ADropdownMenuSubContent>
                </ADropdownMenuPortal>
              </ADropdownMenuSub>
            </template>

            <ASeparator
              class="my-2 bg-muted h-px w-full"
              decorative
              orientation="horizontal"
            />

            <div class="text-sm px-2 flex items-center justify-between">
              <label
                for="theme-toggle"
                class="color-muted-foreground font-semibold"
              >Appearance</label>
              <ADropdownMenuItem
                as-child
                @select.prevent
              >
                <ThemeToggle />
              </ADropdownMenuItem>
            </div>

            <ASeparator
              class="my-2 bg-muted h-px w-full"
              decorative
              orientation="horizontal"
            />

            <div class="px-2 flex gap-2 items-center">
              <ADropdownMenuItem
                v-for="link in theme.socialLinks"
                :key="link.link"
                as="a"
                :href="link.link"
                :aria-label="link.icon"
                target="_blank"
                class="text-xl color-muted-foreground rounded-lg bg-transparent flex h-9 w-9 items-center justify-center hover:text-foreground hover:bg-muted"
              >
                <Icon :icon="`simple-icons:${link.icon}`" />
              </ADropdownMenuItem>
            </div>
          </nav>
        </ADropdownMenuContent>
      </ADropdownMenuPortal>
    </ADropdownMenuRoot>
  </div>
</template>
