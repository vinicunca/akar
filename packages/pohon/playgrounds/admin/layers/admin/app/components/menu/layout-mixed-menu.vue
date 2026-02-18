<script lang="ts" setup>
import type { PDashboardMenuItem } from 'pohon-ui';
import { ANavigationMenuItem, ANavigationMenuList, ANavigationMenuRoot } from 'akar';
import { pickLinkProps } from 'pohon-ui/utils/link';

const props = defineProps<{
  items: Array<PDashboardMenuItem>;
}>();
</script>

<template>
  <ANavigationMenuRoot
    :disable-hover-trigger="true"
  >
    <ANavigationMenuList class="flex flex-col gap-1">
      <ANavigationMenuItem
        v-for="menu in props.items"
        :key="menu.path"
        :value="menu.path"
      >
        <PLink
          v-slot="{ active, ...slotProps }"
          v-bind="pickLinkProps(menu)"
          custom
        >
          <PLinkBase
            v-bind="slotProps"
            class="px-1 py-2 rounded-2 flex flex-col gap-2 w-full items-center justify-center"
            :class="{
              'bg-primary color-text-inverted': active,
            }"
          >
            <PIcon
              v-if="menu.icon"
              :name="menu.icon"
              class="size-5"
            />

            <span class="text-12px text-center w-full truncate">{{ menu.label }}</span>
          </PLinkBase>
        </PLink>
      </ANavigationMenuItem>
    </ANavigationMenuList>
  </ANavigationMenuRoot>
</template>
