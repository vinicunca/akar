<script lang="ts">
/* eslint-disable no-nested-ternary, sonar/no-nested-conditional */
import type { AppConfig } from '@nuxt/schema';
import type { EditorMenuOptions } from '../composables/use-editor-menu';
import type { PAvatarProps, PIconProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/editor-mention-menu';

type EditorMentionMenu = ComponentConfig<typeof theme, AppConfig, 'editorMentionMenu'>;

export interface PEditorMentionMenuItem {
  label: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  avatar?: PAvatarProps;
  disabled?: boolean;
  class?: any;
  [key: string]: any;
}

export interface PEditorMentionMenuProps<T extends PEditorMentionMenuItem = PEditorMentionMenuItem> extends Partial<Pick<EditorMenuOptions<T>, 'editor' | 'char' | 'pluginKey' | 'items' | 'filterFields' | 'limit' | 'options' | 'appendTo'>> {
  class?: any;
  pohon?: EditorMentionMenu['slots'];
}
</script>

<script setup lang="ts" generic="T extends PEditorMentionMenuItem">
import { useAppConfig } from '#imports';
import { computed, h, nextTick, onBeforeUnmount, onMounted } from 'vue';
import { useEditorMenu } from '../composables/use-editor-menu';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<PEditorMentionMenuProps<T>>(), {
  pluginKey: 'mentionMenu',
  char: '@',
});

const appConfig = useAppConfig() as EditorMentionMenu['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.editorMentionMenu || {}),
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
      // Delete the trigger character and query text, then insert the mention
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({
          type: 'mention',
          attrs: item,
        })
        .run();
    },
    renderItem: (item, styles) => [
      item.avatar
        ? h(PAvatar, { ...item.avatar, size: styles.value.itemLeadingAvatarSize(), class: styles.value.itemLeadingAvatar() })
        : item.icon
          ? h(PIcon, { name: item.icon, class: styles.value.itemLeadingIcon() })
          : null,
      h('span', { class: styles.value.itemWrapper() }, [
        h('span', { class: styles.value.itemLabel() }, item.label),
        item.description
          ? h('span', { class: styles.value.itemDescription() }, item.description)
          : null,
      ]),
    ],
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
