<script lang="ts">
import type { Placement, Strategy } from '@floating-ui/dom';
import type { AppConfig } from '@nuxt/schema';
import type { DragHandleProps } from '@tiptap/extension-drag-handle-vue-3';
import type { Editor, JSONContent } from '@tiptap/vue-3';
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { FloatingUIOptions } from '../types/editor';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/editor-drag-handle';

type EditorDragHandle = ComponentConfig<typeof theme, AppConfig, 'editorDragHandle'>;

export interface PEditorDragHandleProps extends Omit<DragHandleProps, 'editor' | 'element' | 'onNodeChange' | 'computePositionConfig' | 'class'>, Omit<PButtonProps, PLinkPropsKeys | 'icon' | 'color' | 'variant'> {
  /**
   * @defaultValue appConfig.pohon.icons.drag
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  /**
   * @defaultValue 'neutral'
   */
  color?: PButtonProps['color'];
  /**
   * @defaultValue 'ghost'
   */
  variant?: PButtonProps['variant'];
  /**
   * The options for positioning the drag handle. Those are passed to Floating UI and include options for the placement, offset, flip, shift, size, autoPlacement, hide, and inline middleware.
   * @defaultValue { strategy: 'absolute', placement: 'left-start' }
   * @see https://floating-ui.com/docs/computePosition#options
   */
  options?: FloatingUIOptions;
  editor: Editor;
  pohon?: EditorDragHandle['slots'] & PButtonProps['pohon'];
}

export interface PEditorDragHandleSlots {
  default: (props: {
    pohon: EditorDragHandle['pohon'];
    onClick: () => { node: JSONContent; pos: number } | undefined;
  }) => any;
}

export interface PEditorDragHandleEmits {
  nodeChange: [{ node: JSONContent; pos: number }];
}
</script>

<script setup lang="ts">
import { PButton } from '#components';
import { useAppConfig } from '#imports';
import DragHandle from '@tiptap/extension-drag-handle-vue-3';
import { reactiveOmit, reactivePick } from '@vueuse/core';
import { useForwardProps } from 'akar';
import { defu } from 'defu';
import { computed, ref } from 'vue';
import { transformPohon } from '../utils';
import { buildFloatingUIMiddleware } from '../utils/editor';
import { uv } from '../utils/uv';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PEditorDragHandleProps>(),
  {
    color: 'neutral',
    variant: 'ghost',
    size: 'sm',
  },
);
const emit = defineEmits<PEditorDragHandleEmits>();

defineSlots<PEditorDragHandleSlots>();

const dragHandleProps = useForwardProps(
  reactivePick(
    props,
    'pluginKey',
    'onElementDragEnd',
    'onElementDragStart',
    'getReferencedVirtualElement',
  ),
);

const buttonProps = useForwardProps(
  reactiveOmit(
    props,
    'icon',
    'options',
    'editor',
    'pluginKey',
    'onElementDragEnd',
    'onElementDragStart',
    'getReferencedVirtualElement',
    'class',
    'pohon',
  ),
);

const appConfig = useAppConfig() as EditorDragHandle['AppConfig'];

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.editorDragHandle || {}),
  })(),
);

const floatingUIOptions = computed(() =>
  defu(
    props.options,
    {
      strategy: 'absolute' as Strategy,
      placement: 'left-start' as Placement,
      offset: ({ rects }) => {
        const blockHeight = rects.reference.height;
        const handleHeight = rects.floating.height;

        // For blocks taller than 40px, align to top (no offset)
        if (blockHeight > 40) {
          return {
            alignmentAxis: 0,
            mainAxis: 8,
          };
        }

        // For smaller blocks, center vertically
        return {
          alignmentAxis: (blockHeight - handleHeight) / 2,
          mainAxis: 8,
        };
      },
      flip: {},
      shift: {},
      size: false,
      autoPlacement: false,
      hide: false,
      inline: false,
    } as FloatingUIOptions,
  ),
);

const middleware = computed(() => buildFloatingUIMiddleware(floatingUIOptions.value));

const computePositionConfig = computed<DragHandleProps['computePositionConfig']>(() => ({
  placement: floatingUIOptions.value.placement,
  strategy: floatingUIOptions.value.strategy,
  middleware: middleware.value,
}));

const currentNodePos = ref<number | null>();

function onNodeChange({ pos }: { pos: number }) {
  currentNodePos.value = pos;
}

function onClick() {
  if (!props.editor) {
    return;
  }

  const pos = currentNodePos.value;
  if (pos == null) {
    return;
  }

  const node = props.editor.state.doc.nodeAt(pos);
  if (node) {
    const selectedNode = { node: node.toJSON(), pos };

    emit('nodeChange', selectedNode);

    props.editor.chain().setNodeSelection(pos).run();

    return selectedNode;
  }
}
</script>

<template>
  <DragHandle
    v-bind="dragHandleProps"
    :compute-position-config="computePositionConfig"
    :editor="editor"
    :on-node-change="onNodeChange"
    data-slot="root"
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    @click="onClick"
  >
    <slot
      :pohon="pohon"
      :on-click="onClick"
    >
      <PButton
        v-bind="{
          ...buttonProps,
          icon: props.icon || appConfig.pohon.icons.drag,
          ...$attrs,
        }"
        data-slot="handle"
        :class="pohon.handle({ class: [props.pohon?.handle, props.class] })"
        :pohon="transformPohon(pohon, props.pohon)"
      />
    </slot>
  </DragHandle>
</template>
