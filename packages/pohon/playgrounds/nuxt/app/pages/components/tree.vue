<script setup lang="ts">
import type { PTreeItem } from 'pohon-ui';
import theme from '#build/pohon/tree';
import { ATreeItem, ATreeRoot } from 'akar';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
});

const nested = ref(true);
const virtualize = ref(false);

const itemsPohon = [
  {
    label: 'app',
    defaultExpanded: true,
    slot: 'app' as const,
    children: [
      {
        label: 'composables',
        defaultExpanded: true,
        children: [
          { label: 'useAuth.ts', icon: 'i-vscode-icons:file-type-typescript' },
          { label: 'useUser.ts', icon: 'i-vscode-icons:file-type-typescript' },
        ],
      },
      {
        label: 'components',
        children: [{
          label: 'Home',
          children: [
            { label: 'Card.vue', icon: 'i-vscode-icons:file-type-vue' },
            { label: 'Button.vue', icon: 'i-vscode-icons:file-type-vue' },
          ],
        }],
      },
    ],
  },
  { label: 'app.vue', icon: 'i-vscode-icons:file-type-vue' },
  { label: 'nuxt.config.ts', icon: 'i-vscode-icons:file-type-nuxt' },
] satisfies Array<PTreeItem>;

const itemsWithMappedId = [
  { id: 'id', title: 'hello' },
  { id: 'id2', title: 'there' },
  { id: 'id3', title: 'obiwan kenobi' },
];

const largeItems = Array(1000).fill(0).map((_, i) => ({
  label: `Item ${i + 1}`,
  icon: 'i-lucide:file',
  children: [
    { label: `Child ${i + 1}-1`, icon: 'i-lucide:file-text' },
    { label: `Child ${i + 1}-2`, icon: 'i-lucide:file-text' },
  ],
})) satisfies Array<PTreeItem>;

const modelValue = ref<(typeof itemsPohon)[number]>();
const modelValues = ref<(typeof itemsPohon)>([itemsPohon[itemsPohon.length - 2]!]);
const modelValueWithMappedId = ref<(typeof itemsWithMappedId)[number]>();

const items = [
  {
    title: 'composables',
    icon: 'lucide:folder',
    children: [
      { title: 'useAuth.ts', icon: 'i-vscode-icons:file-type-typescript' },
      { title: 'useUser.ts', icon: 'i-vscode-icons:file-type-typescript' },
    ],
  },
  {
    title: 'components',
    icon: 'lucide:folder',
    children: [
      {
        title: 'Home',
        icon: 'lucide:folder',
        children: [
          { title: 'Card.vue', icon: 'i-vscode-icons:file-type-vue' },
          { title: 'Button.vue', icon: 'i-vscode-icons:file-type-vue' },
        ],
      },
    ],
  },
  { title: 'app.vue', icon: 'i-vscode-icons:file-type-vue' },
  { title: 'nuxt.config.ts', icon: 'i-vscode-icons:file-type-nuxt' },
];
</script>

<template>
  <BaseNavbar>
    <PSwitch
      v-model="nested"
      label="Nested"
    />
    <PSwitch
      v-model="virtualize"
      label="Virtualize"
    />
    <PSelect
      v-model="attrs.color"
      :items="colors"
      placeholder="Color"
      multiple
    />
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      placeholder="Size"
      multiple
    />
  </BaseNavbar>

  <ATreeRoot
    v-slot="{ flattenItems }"
    class="text-sm color-text-muted font-medium p-2 list-none border rounded-lg bg-background w-56 select-none shadow-sm"
    :items="items"
    :get-key="(item) => item.title"
    :default-expanded="['components']"
  >
    <h2 class="text-sm font-semibold px-2 pb-3 pt-1">
      Directory Structure
    </h2>
    <ATreeItem
      v-for="item in flattenItems"
      v-slot="{ isExpanded }"
      :key="item._id"
      :style="{ 'padding-left': `${item.level - 0.5}rem` }"
      v-bind="item.bind"
      class="data-[selected]:accented my-0.5 px-2 py-1 outline-none rounded flex items-center data-[selected]:(color-primary bg-background-accented) focus:ring-2 focus:ring-primary"
    >
      <template v-if="item.hasChildren">
        <i
          v-if="!isExpanded"
          class="i-lucide:folder size-4"
        />
        <i
          v-else
          class="i-lucide:folder-open size-4"
        />
      </template>
      <i
        v-else
        class="size-4"
        :class="item.value.icon || 'i-lucide:file'"
      />
      <div class="pl-2">
        {{ item.value.title }}
      </div>
    </ATreeItem>
  </ATreeRoot>

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
    container-class="w-60"
  >
    <PTree
      v-if="virtualize"
      virtualize
      :items="largeItems"
      :nested="nested"
      v-bind="props"
      class="h-80 w-full"
    />

    <PTree
      v-else
      v-model="modelValues"
      :items="itemsPohon"
      :nested="nested"
      multiple
      v-bind="props"
      class="w-full"
    />
  </BaseMatrix>

  <!-- Typescript tests -->
  <template v-if="false">
    <PTree
      :model-value="modelValues"
      :items="itemsPohon"
      multiple
    />
    <PTree
      :default-value="modelValues"
      :items="itemsPohon"
      multiple
    />
    <PTree
      :items="itemsPohon"
      multiple
      @update:model-value="(payload) => payload"
    />
    <PTree
      :model-value="modelValue"
      :items="itemsPohon"
    />
    <PTree
      :default-value="modelValue"
      :items="itemsPohon"
    />
    <PTree
      :items="itemsPohon"
      @update:model-value="(payload) => payload"
    />

    <PTree
      v-model="modelValueWithMappedId"
      :items="itemsWithMappedId"
      :get-key="(i) => i.id"
    />
    <PTree
      v-model="modelValueWithMappedId"
      :items="itemsWithMappedId"
      label-key="title"
    />
  </template>
</template>
