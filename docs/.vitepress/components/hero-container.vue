<script setup lang="ts">
import {
  ALabel,
  ASwitchRoot,
  ASwitchThumb,
} from 'akar';
import { ref, watch } from 'vue';
import CodeSandbox from '../../components/code-sandbox.vue';
import Stackblitz from '../../components/stackblitz.vue';

const props = withDefaults(
  defineProps<{
    overflow?: boolean;
    dir?: string;
    name?: string;
    files?: Array<string>;
    cssFramework?: string;
    type?: 'demo' | 'example';
  }>(),
  {
    dir: '',
    name: '',
    files: () => [],
  },
);

const isCodeView = ref(false);
const sources = ref<Record<string, string>>({});

watch(() => props.cssFramework, () => {
  sources.value = {}; // reset sources everytime the value changes
  props.files?.forEach((file) => {
    const extension = file.split('.').pop();
    const fileExt = file.replace(`.${extension}`, '');
    const dirType = props.type === 'demo' ? 'demo' : 'examples';

    const item = `../../components/${dirType}/${props.dir}/${props.name}/${fileExt}.${extension}?raw`;

    import(item).then(
      (res) => {
        sources.value[file] = res.default;
      },
    );
  });
}, { immediate: true });
</script>

<template>
  <div
    class="text-sm text-black relative"
    :class="{ 'my-4': type === 'example' }"
  >
    <div class="flex w-full justify-end">
      <div class="text-foreground mb-4 flex items-center">
        <ALabel
          for="view-code"
          class="text-sm font-medium"
        >
          View code
        </ALabel>
        <ASwitchRoot
          id="view-code"
          v-model="isCodeView"
          class="ml-2 rounded-full flex h-5 w-[34px] transition relative data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary/50"
          aria-label="View code"
        >
          <ASwitchThumb
            class="text-xs my-auto will-change-transform rounded-full bg-white flex h-4 w-4 shadow-xl translate-x-0.5 transition-transform items-center justify-center data-[state=checked]:translate-x-full"
          />
        </ASwitchRoot>
      </div>
    </div>

    <div
      v-if="!isCodeView"
      class="not-prose p-4 border border-muted rounded-xl bg-card flex min-h-[400px] w-full items-center justify-center relative backdrop-blur-2xl"
      :class="{ 'overflow-x-auto': overflow }"
    >
      <div class="custom-justify-center py-12 flex max-w-[700px] w-full items-center sm:py-[100px]">
        <slot />

        <Stackblitz
          v-if="name"
          class="hidden bottom-4 right-12 absolute sm:block"
          :name="name"
          :files="files"
          :sources="sources"
        />
        <CodeSandbox
          v-if="name"
          class="hidden bottom-4 right-4 absolute sm:block"
          :name="name"
          :files="files"
          :sources="sources"
        />
      </div>
    </div>

    <div v-else>
      <slot name="codeSlot" />
    </div>
  </div>
</template>

<style scoped>
:deep(li) {
  margin-top: 0 !important;
}

:deep(h3) {
  margin: 0px !important;
  font-weight: unset !important;
}

:deep(pre) {
  z-index: 0 !important;
}
</style>
