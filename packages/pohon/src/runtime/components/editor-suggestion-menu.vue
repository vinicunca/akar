<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { EditorMenuOptions } from '../composables/use-editor-menu';
import type { PIconProps } from '../types';
import type { EditorCustomHandlers, EditorItem } from '../types/editor';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/editor-suggestion-menu';

type EditorSuggestionMenu = ComponentConfig<typeof theme, AppConfig, 'editorSuggestionMenu'>;

type EditorSuggestionMenuLabelItem = {
  type: 'label';
  label: string;
  class?: any;
  [key: string]: any;
};

type EditorSuggestionMenuSeparatorItem = {
  type: 'separator';
  class?: any;
  [key: string]: any;
};

type EditorSuggestionMenuActionItem<H extends EditorCustomHandlers = EditorCustomHandlers> = {
  type?: never;
  label: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  disabled?: boolean;
  class?: any;
  [key: string]: any;
} & EditorItem<H>;

export type PEditorSuggestionMenuItem<H extends EditorCustomHandlers = EditorCustomHandlers>
  = | EditorSuggestionMenuLabelItem
    | EditorSuggestionMenuSeparatorItem
    | EditorSuggestionMenuActionItem<H>;

export interface PEditorSuggestionMenuProps<T extends PEditorSuggestionMenuItem = PEditorSuggestionMenuItem> extends Partial<Pick<EditorMenuOptions<T>, 'editor' | 'char' | 'pluginKey' | 'items' | 'filterFields' | 'limit' | 'options' | 'appendTo'>> {
  class?: any;
  pohon?: EditorSuggestionMenu['slots'];
}
</script>

<script setup lang="ts" generic="T extends PEditorSuggestionMenuItem">
import { useAppConfig } from '#imports';
import { computed, h, inject, nextTick, onBeforeUnmount, onMounted } from 'vue';
import { useEditorMenu } from '../composables/use-editor-menu';
import { createHandlers } from '../utils/editor';
import { uv } from '../utils/uv';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PEditorSuggestionMenuProps<T>>(),
  {
    pluginKey: 'suggestionMenu',
    char: '/',
  },
);

const appConfig = useAppConfig() as EditorSuggestionMenu['AppConfig'];

const handlers = inject('editorHandlers', computed(() => createHandlers()));

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.editorSuggestionMenu || {}),
  })(),
);

let menu: ReturnType<typeof useEditorMenu> | null = null;

onMounted(async () => {
  await nextTick();

  if (!props.editor || props.editor.isDestroyed) {
    return;
  }

  menu = useEditorMenu({
    editor: props.editor,
    char: props.char,
    pluginKey: props.pluginKey,
    items: props.items,
    filterFields: props.filterFields,
    limit: props.limit,
    options: props.options,
    appendTo: props.appendTo,
    ui: pohon,
    onSelect: (editor, range, item) => {
      // Skip if it's a label (non-interactive)
      if (item.type === 'label' || item.type === 'separator') {
        return;
      }

      // Delete the trigger character and query text
      editor.chain().focus().deleteRange(range).run();

      // Execute the actual command using handlers
      const handler = handlers?.value?.[item.kind];
      if (handler) {
        handler.execute(editor, item).run();
      }
    },
    renderItem: (item, styles) => {
      // Render label (just text)
      if (item.type === 'label') {
        return [h('span', {}, item.label)];
      }

      // Render regular item
      return [
        item.icon
          ? h(PIcon, { name: item.icon, class: styles.value.itemLeadingIcon() })
          : null,
        h('span', { class: styles.value.itemWrapper() }, [
          h('span', { class: styles.value.itemLabel() }, item.label),
          item.description
            ? h('span', { class: styles.value.itemDescription() }, item.description)
            : null,
        ]),
      ];
    },
  });

  props.editor.registerPlugin(menu.plugin);
});

onBeforeUnmount(() => {
  if (menu) {
    menu.destroy();
    menu = null;
  }

  if (props.editor && !props.editor.isDestroyed) {
    props.editor.unregisterPlugin(props.pluginKey);
  }
});
</script>

<template>
  <div />
</template>
