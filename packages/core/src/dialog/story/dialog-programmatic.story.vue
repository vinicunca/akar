<script setup lang="ts">
import { ref } from 'vue';
import { ADialogContent, ADialogOverlay, ADialogRoot } from '..';

const dialogAOpen = ref(false);
const dialogBOpen = ref(false);

function openA() {
  dialogBOpen.value = false;
  dialogAOpen.value = true;
}
function openB() {
  dialogAOpen.value = false;
  dialogBOpen.value = true;
}
function closeA(opened: boolean) {
  if (opened) {
    dialogAOpen.value = false;
  }
}
function closeB(opened: boolean) {
  if (opened) {
    dialogBOpen.value = false;
  }
}
</script>

<template>
  <Story
    title="Dialog/Programmatic"
    :layout="{ type: 'single', iframe: true }"
  >
    <Variant title="default">
      <div class="h-[300vh]">
        <button
          class="text-black9 rounded-[4px] bg-blackA9 p-2 text-white hover:bg-blackA10"
          @click="openA"
        >
          Open A
        </button>
        <div v-if="dialogAOpen">
          <ADialogRoot
            v-model:open="dialogAOpen"
            @update:open="closeA"
          >
            <ADialogOverlay class="fixed inset-0 bg-blackA9" />
            <ADialogContent
              class="fixed left-[50%] top-[50%] max-h-[85vh] max-w-[450px] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px]"
            >
              <h1>Dialog A</h1>
              <button
                class="text-black9 rounded-[4px] bg-blackA9 p-2 text-white hover:bg-blackA10"
                @click="openB"
              >
                Open B
              </button>
            </ADialogContent>
          </ADialogRoot>
        </div>
        <div v-if="dialogBOpen">
          <ADialogRoot
            v-model:open="dialogBOpen"
            @update:open="closeB"
          >
            <ADialogOverlay class="fixed inset-0 bg-blackA9" />
            <ADialogContent
              class="fixed left-[50%] top-[50%] max-h-[85vh] max-w-[450px] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px]"
            >
              <h1>Dialog B</h1>
              <button
                class="text-black9 rounded-[4px] bg-blackA9 p-2 text-white hover:bg-blackA10"
                @click="openA"
              >
                Open A
              </button>
            </ADialogContent>
          </ADialogRoot>
        </div>
      </div>
    </Variant>
  </Story>
</template>
