<script setup lang="ts">
import {
  ADropdownMenuContent,
  ADropdownMenuItem,
  ADropdownMenuPortal,
  ADropdownMenuRoot,
  ADropdownMenuTrigger,
} from '@vinicunca/akar';

defineProps<{
  label: string;
  items: Array<{
    text: string;
    link?: string;
  }>;
}>();
</script>

<template>
  <ADropdownMenuRoot>
    <ADropdownMenuTrigger class="mx-0 h-full inline-flex items-center px-4 py-2 text-sm text-muted-foreground font-semibold md:mx-3 md:px-0 data-[state=open]:text-foreground hover:text-foreground">
      <span>{{ label }}</span>
      <i
        class="i-lucide:chevron-down ml-1 text-lg"
      />
    </ADropdownMenuTrigger>

    <ADropdownMenuPortal>
      <ADropdownMenuContent
        position="popper"
        align="end"
        :side-offset="2"
        class="z-10 border border-muted rounded-lg bg-card p-2"
      >
        <ADropdownMenuItem
          v-for="item in items"
          :key="item.text"
          :value="item.text"
          as-child
          class="h-full flex items-center rounded px-2 py-2 text-sm text-muted-foreground font-semibold focus:bg-primary/10 focus:text-primary"
        >
          <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
          >
            <span>{{ item.text }}</span>
            <i
              class="i-lucide:arrow-up-right ml-2 text-base"
            />

          </a>
          <div v-else>
            {{ item.text }}
          </div>
        </ADropdownMenuItem>
      </ADropdownMenuContent>
    </ADropdownMenuPortal>
  </ADropdownMenuRoot>
</template>
