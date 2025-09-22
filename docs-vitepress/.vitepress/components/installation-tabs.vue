<script setup lang="ts">
import { ATabsContent, ATabsList, ATabsRoot, ATabsTrigger } from 'akar';
import { PACKAGE_MANAGERS } from '../plugins/installation-tabs';
import { store } from '../store';
</script>

<template>
  <ATabsRoot
    v-model="store.packageManager"
    class="border border-[hsl(0_0%_15%)] rounded-xl bg-[hsl(141_17%_5%)] overflow-hidden"
  >
    <div class="pr-2 border-b border-[hsl(0_0%_15%)] bg-[hsl(141_17%_5%)] flex">
      <div class="text-[13px] flex w-full items-center justify-between">
        <ATabsList class="flex">
          <ATabsTrigger
            v-for="(pkg, index) in PACKAGE_MANAGERS"
            :key="index"
            :value="pkg"
            tabindex="-1"
            class="text-white/70 px-4 py-2.5 data-[state=active]:text-white hover:text-white data-[state=active]:font-medium data-[state=active]:shadow-[0_1px_0_#10b981]"
          >
            {{ pkg }}
          </ATabsTrigger>
        </ATabsList>
      </div>
    </div>

    <div
      class="custom [&_pre]:rounded-t-none [&_pre]:border-none [&_>div]:!m-0"
    >
      <ATabsContent
        v-for="pkg in PACKAGE_MANAGERS"
        :key="pkg"
        tabindex="-1"
        :value="pkg"
        as-child
      >
        <slot :name="pkg" />
      </ATabsContent>
    </div>
  </ATabsRoot>
</template>
