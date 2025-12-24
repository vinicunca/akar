<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { EditorMenuOptions } from '../composables/use-editor-menu';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/editor-emoji-menu';

type EditorEmojiMenu = ComponentConfig<typeof theme, AppConfig, 'editorEmojiMenu'>;

export interface PEditorEmojiMenuItem {
  name: string;
  emoji?: string;
  shortcodes: Array<string>;
  tags: Array<string>;
  group?: string;
  fallbackImage?: string;
  [key: string]: any;
}

export interface PEditorEmojiMenuProps<T extends PEditorEmojiMenuItem = PEditorEmojiMenuItem> extends Partial<Pick<EditorMenuOptions<T>, 'editor' | 'char' | 'pluginKey' | 'items' | 'filterFields' | 'limit' | 'options' | 'appendTo'>> {
  class?: any;
  pohon?: EditorEmojiMenu['slots'];
}
</script>

<script setup lang="ts" generic="T extends PEditorEmojiMenuItem">
import { useAppConfig } from '#imports';
import { computed, h, nextTick, onBeforeUnmount, onMounted } from 'vue';
import { useEditorMenu } from '../composables/use-editor-menu';
import { uv } from '../utils/uv';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PEditorEmojiMenuProps<T>>(),
  {
    pluginKey: 'emojiMenu',
    char: ':',
    filterFields: () => ['name', 'shortcodes', 'tags'],
  },
);

const appConfig = useAppConfig() as EditorEmojiMenu['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.editorEmojiMenu || {}),
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
      if (!item.emoji) {
        return;
      }

      // Delete the trigger character and query text, then insert the emoji
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent(item.emoji)
        .run();
    },
    renderItem: (item, styles) => {
      const content = item.emoji || item.shortcodes[0] || item.name;
      return [
        h('span', { class: styles.value.itemLeadingIcon() }, content),
        h('span', { class: styles.value.itemWrapper() }, [
          h('span', { class: styles.value.itemLabel() }, item.name),
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
