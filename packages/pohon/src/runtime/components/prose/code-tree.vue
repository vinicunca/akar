<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/pohon/prose/code-tree';

type ProseCodeTree = ComponentConfig<typeof theme, AppConfig, 'codeTree', 'pohon.prose'>;

type TreeNode = {
  label: string;
  path: string;
  children?: Array<TreeNode>;
};

export interface ProseCodeTreeProps {
  /**
   * The default path to select.
   * @example 'package.json'
   */
  defaultValue?: string;
  /**
   * Expand all directories by default.
   * @defaultValue false
   */
  expandAll?: boolean;
  class?: any;
  pohon?: ProseCodeTree['slots'];
}

export interface ProseCodeTreeSlots {
  default: (props?: object) => any;
}
</script>

<script setup lang="ts">
import { useAppConfig } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { ATreeItem, ATreeRoot } from 'akar';
import { computed, onBeforeUpdate, ref, watch } from 'vue';
import { uv } from '../../utils/uv';
import PIcon from '../icon.vue';
import PCodeIcon from './code-icon.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<ProseCodeTreeProps>();
const slots = defineSlots<ProseCodeTreeSlots>();

const appConfig = useAppConfig() as ProseCodeTree['AppConfig'];

const [DefineTreeTemplate, ReuseTreeTemplate] = createReusableTemplate<{ items: Array<TreeNode>; level: number }>();

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.prose?.codeTree || {}) })());

const model = ref(props.defaultValue ? { path: props.defaultValue } : undefined);
const lastSelectedItem = ref();
const rerenderCount = ref(1);

const flatItems = computed<Array<{
  index: number;
  label: string;
  icon: string;
  component: any;
}>>(() => {
  // eslint-disable-next-line ts/no-unused-expressions
  rerenderCount.value;
  return slots.default?.()?.flatMap(transformSlot).filter(Boolean) || [];
});
const items = computed(() => buildTree(flatItems.value));

function buildTree(items: Array<{ label: string }>): Array<TreeNode> {
  const map = new Map<string, TreeNode>();
  const root: Array<TreeNode> = [];

  items.forEach((item) => {
    const parts = item.label.split('/');
    let path = '';

    parts.forEach((part, i) => {
      path = path ? `${path}/${part}` : part;

      if (!map.has(path)) {
        const node = { label: part, path, ...(i < parts.length - 1 && { children: [] }) };
        map.set(path, node);

        if (i === 0) {
          root.push(node);
        } else {
          map.get(parts.slice(0, i).join('/'))?.children?.push(node);
        }
      }
    });
  });

  const sort = (nodes: Array<TreeNode>): Array<TreeNode> =>
    nodes.sort((a, b) =>
      // eslint-disable-next-line no-nested-ternary, sonar/no-nested-conditional
      !!a.children === !!b.children ? a.label.localeCompare(b.label) : b.children ? 1 : -1,
    ).map((n) => ({ ...n, children: n.children && sort(n.children) }));

  return sort(root);
}

function transformSlot(slot: any, index: number) {
  if (typeof slot.type === 'symbol') {
    return slot.children?.map(transformSlot);
  }

  return {
    label: slot.props?.filename || slot.props?.label || `${index}`,
    icon: slot.props?.icon,
    component: slot,
  };
}

const expanded = computed(() => {
  if (props.expandAll) {
    const allPaths = new Set<string>();
    flatItems.value.forEach((item) => {
      const parts = item.label.split('/');
      for (let i = 1; i < parts.length; i++) {
        allPaths.add(parts.slice(0, i).join('/'));
      }
    });
    return Array.from(allPaths);
  }

  const path = model.value?.path;
  if (!path) {
    return [];
  }

  const parts = path.split('/');
  return parts.map((_, index) => parts.slice(0, index + 1).join('/'));
});

watch(model, (value) => {
  const item = flatItems.value.find((item) => value?.path === item.label);
  if (item?.component) {
    lastSelectedItem.value = item;
  }
}, { immediate: true });

onBeforeUpdate(() => rerenderCount.value++);
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineTreeTemplate v-slot="{ items, level }">
    <ATreeItem
      v-for="(item, index) in items"
      :key="`${level}-${index}`"
      v-slot="{ isExpanded, isSelected }"
      :level="level"
      :value="item"
      :class="level > 1 ? pohon.itemWithChildren({ class: props.pohon?.itemWithChildren }) : pohon.item({ class: props.pohon?.item })"
    >
      <button
        type="button"
        :data-expanded="isExpanded"
        :class="pohon.link({ class: props.pohon?.link, active: isSelected })"
      >
        <PIcon
          v-if="item.children?.length"
          :name="isExpanded ? appConfig.pohon.icons.folderOpen : appConfig.pohon.icons.folder"
          :class="pohon.linkLeadingIcon({ class: props.pohon?.linkLeadingIcon })"
        />
        <PCodeIcon
          v-else
          :filename="item.label"
          :class="pohon.linkLeadingIcon({ class: props.pohon?.linkLeadingIcon })"
        />

        <span :class="pohon.linkLabel({ class: props.pohon?.linkLabel })">
          {{ item.label }}
        </span>

        <span
          v-if="item.children?.length"
          :class="pohon.linkTrailing({ class: props.pohon?.linkTrailing })"
        >
          <PIcon
            :name="appConfig.pohon.icons.chevronDown"
            :class="pohon.linkTrailingIcon({ class: props.pohon?.linkTrailingIcon })"
          />
        </span>
      </button>

      <ul
        v-if="item.children?.length && isExpanded"
        role="group"
        :class="pohon.listWithChildren({ class: props.pohon?.listWithChildren })"
      >
        <ReuseTreeTemplate
          :items="item.children"
          :level="level + 1"
        />
      </ul>
    </ATreeItem>
  </DefineTreeTemplate>

  <div
    v-bind="$attrs"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
  >
    <ATreeRoot
      v-model="model"
      :class="pohon.list({ class: props.pohon?.list })"
      :items="items"
      :get-key="(item) => item.path"
      :default-expanded="expanded"
    >
      <ReuseTreeTemplate
        :items="items"
        :level="1"
      />
    </ATreeRoot>

    <div :class="pohon.content({ class: props.pohon?.content })">
      <component :is="lastSelectedItem?.component" />
    </div>
  </div>
</template>
