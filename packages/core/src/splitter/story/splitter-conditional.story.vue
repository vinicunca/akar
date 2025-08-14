<script setup lang="ts">
import { ref } from 'vue';
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..';

const isShowingA = ref(false);
const isShowingB = ref(false);
</script>

<template>
  <Story
    title="Splitter/Conditional"
    :layout="{ type: 'single', width: '100%', iframe: false }"
  >
    <Variant title="default">
      <div class="w-full">
        <div>
          <button
            class="text-sm text-slate-800 px-3 py-1.5 rounded bg-white hover:bg-slate-100"
            @click="isShowingA = !isShowingA"
          >
            {{ isShowingA ? 'Hide' : 'Show' }} A
          </button>
          <button
            class="text-sm text-slate-800 ml-2 px-3 py-1.5 rounded bg-white hover:bg-slate-100"
            @click="isShowingB = !isShowingB"
          >
            {{ isShowingB ? 'Hide' : 'Show' }} B
          </button>
        </div>

        <div class="mt-4 h-48 w-full">
          <ASplitterGroup direction="horizontal">
            <template v-if="isShowingA">
              <ASplitterPanel
                :min-size="20"
                class="bg-blackA8 rounded-lg flex items-center justify-center"
                :order="1"
              >
                Panel A
              </ASplitterPanel>
              <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
            </template>

            <template v-if="isShowingB">
              <ASplitterPanel
                :min-size="20"
                class="bg-blackA8 rounded-lg flex items-center justify-center"
                :order="2"
              >
                Panel B
              </ASplitterPanel>
              <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
            </template>

            <ASplitterPanel
              :min-size="20"
              class="bg-blackA8 rounded-lg flex items-center justify-center"
              :order="3"
            >
              Panel C
            </ASplitterPanel>
          </ASplitterGroup>
        </div>
      </div>
    </Variant>
  </Story>
</template>
