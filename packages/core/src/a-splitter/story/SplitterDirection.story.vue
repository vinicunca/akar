<script setup lang="ts">
import { ref } from 'vue';

import type { DataOrientation } from '~~/shared/types';

import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..';

const direction = ref<DataOrientation>('horizontal');
</script>

<template>
  <Story
    title="ASplitter/Direction"
    :layout="{ type: 'single', width: '100%', iframe: false }"
  >
    <Variant title="default">
      <div class="w-full">
        <div>
          <button
            class="rounded bg-white px-3 py-1.5 text-sm text-slate-800 capitalize hover:bg-slate-100"
            @click="direction = direction === 'horizontal' ? 'vertical' : 'horizontal'"
          >
            {{ direction }}
          </button>
        </div>
        <div class="mt-4 h-48 w-full">
          <ASplitterGroup :direction="direction">
            <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
              Panel A
            </ASplitterPanel>
            <ASplitterResizeHandle
              class="transition data-[state=active]:bg-white"
              :class="direction === 'horizontal' ? 'w-2' : 'h-2'"
            />
            <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
              Panel B
            </ASplitterPanel>
          </ASplitterGroup>
        </div>
      </div>
    </Variant>
  </Story>
</template>
