<script setup lang="ts">
import type { DataOrientation } from '~~/shared/types';
import { ref } from 'vue';
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..';

const direction = ref<DataOrientation>('horizontal');
</script>

<template>
  <Story
    title="Splitter/Direction"
    :layout="{ type: 'single', width: '100%', iframe: false }"
  >
    <Variant title="default">
      <div class="w-full">
        <div>
          <button
            class="text-sm text-slate-800 px-3 py-1.5 rounded bg-white capitalize hover:bg-slate-100"
            @click="direction = direction === 'horizontal' ? 'vertical' : 'horizontal'"
          >
            {{ direction }}
          </button>
        </div>
        <div class="mt-4 h-48 w-full">
          <ASplitterGroup :direction="direction">
            <ASplitterPanel class="bg-blackA8 rounded-lg flex items-center justify-center">
              Panel A
            </ASplitterPanel>
            <ASplitterResizeHandle
              class="transition data-[state=active]:bg-white"
              :class="direction === 'horizontal' ? 'w-2' : 'h-2'"
            />
            <ASplitterPanel class="bg-blackA8 rounded-lg flex items-center justify-center">
              Panel B
            </ASplitterPanel>
          </ASplitterGroup>
        </div>
      </div>
    </Variant>
  </Story>
</template>
