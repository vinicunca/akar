<script setup lang="ts">
import { ref } from 'vue'
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '../'
import type { DataOrientation } from '~~/shared/types'

const direction = ref<DataOrientation>('horizontal')
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
            class="px-3 py-1.5 text-sm rounded bg-white hover:bg-slate-100 text-slate-800 capitalize"
            @click="direction = direction === 'horizontal' ? 'vertical' : 'horizontal'"
          >
            {{ direction }}
          </button>
        </div>
        <div class="w-full mt-4 h-48">
          <ASplitterGroup :direction="direction">
            <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
              Panel A
            </ASplitterPanel>
            <ASplitterResizeHandle
              class="data-[state=active]:bg-white transition"
              :class="direction === 'horizontal' ? 'w-2' : 'h-2'"
            />
            <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
              Panel B
            </ASplitterPanel>
          </ASplitterGroup>
        </div>
      </div>
    </Variant>
  </Story>
</template>
