<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { Placement, Strategy } from '@floating-ui/dom'
import type { Editor, JSONContent } from '@tiptap/vue-3'
import type { DragHandleProps } from '@tiptap/extension-drag-handle-vue-3'
import theme from '#build/pohon/editor-drag-handle'
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types'
import type { FloatingUIOptions } from '../types/editor'
import type { ComponentConfig } from '../types/tv'

type EditorDragHandle = ComponentConfig<typeof theme, AppConfig, 'editorDragHandle'>

export interface EditorDragHandleProps extends Omit<DragHandleProps, 'editor' | 'element' | 'onNodeChange' | 'computePositionConfig' | 'class'>, Omit<PButtonProps, PLinkPropsKeys | 'icon' | 'color' | 'variant'> {
  /**
   * @defaultValue appConfig.pohon.icons.drag
   * @IconifyIcon
   */
  icon?: PIconProps['name']
  /**
   * @defaultValue 'neutral'
   */
  color?: PButtonProps['color']
  /**
   * @defaultValue 'ghost'
   */
  variant?: PButtonProps['variant']
  /**
   * The options for positioning the drag handle. Those are passed to Floating UI and include options for the placement, offset, flip, shift, size, autoPlacement, hide, and inline middleware.
   * @defaultValue { strategy: 'absolute', placement: 'left-start' }
   * @see https://floating-ui.com/docs/computePosition#options
   */
  options?: FloatingUIOptions
  editor: Editor
  pohon?: EditorDragHandle['slots'] & PButtonProps['pohon']
}

export interface EditorDragHandleSlots {
  default?(props: { pohon: EditorDragHandle['pohon'], onClick: () => { node: JSONContent, pos: number } | undefined }): VNode[]
}

export interface EditorDragHandleEmits {
  nodeChange: [{ node: JSONContent, pos: number }]
  hover: [{ node: JSONContent, pos: number }]
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DragHandle from '@tiptap/extension-drag-handle-vue-3'
import { useForwardProps } from 'reka-ui'
import { reactiveOmit, reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { useAppConfig } from '#imports'
import { useComponentPohon } from '../composables/use-component-pohon'
import { buildFloatingUIMiddleware } from '../utils/editor'
import { transformPohon } from '../utils'
import { tv } from '../utils/tv'
import PButton from './button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<EditorDragHandleProps>(), {
  color: 'neutral',
  variant: 'ghost',
  size: 'sm'
})
defineSlots<EditorDragHandleSlots>()
const emit = defineEmits<EditorDragHandleEmits>()

const dragHandleProps = useForwardProps(reactivePick(props, 'pluginKey', 'nested', 'nestedOptions', 'onElementDragEnd', 'onElementDragStart', 'getReferencedVirtualElement'))
const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'options', 'editor', 'pluginKey', 'nested', 'nestedOptions', 'onElementDragEnd', 'onElementDragStart', 'getReferencedVirtualElement', 'class', 'ui'))

const appConfig = useAppConfig() as EditorDragHandle['AppConfig']
const pohonProp = useComponentPohon('editorDragHandle', props)

// eslint-disable-next-line vue/no-dupe-keys
const ui = computed(() => tv({ extend: tv(theme), ...(appConfig.pohon?.editorDragHandle || {}) })())

const floatingUIOptions = computed(() => defu(props.options, {
  strategy: 'absolute' as Strategy,
  placement: 'left-start' as Placement,
  offset: ({ rects }) => {
    const blockHeight = rects.reference.height
    const handleHeight = rects.floating.height

    // For blocks taller than 40px, align to top (no offset)
    if (blockHeight > 40) {
      return {
        alignmentAxis: 0,
        mainAxis: 8
      }
    }

    // For smaller blocks, center vertically
    return {
      alignmentAxis: (blockHeight - handleHeight) / 2,
      mainAxis: 8
    }
  },
  flip: {},
  shift: {},
  size: false,
  autoPlacement: false,
  hide: false,
  inline: false
} as FloatingUIOptions))

const middleware = computed(() => buildFloatingUIMiddleware(floatingUIOptions.value))

const computePositionConfig = computed<DragHandleProps['computePositionConfig']>(() => ({
  placement: floatingUIOptions.value.placement,
  strategy: floatingUIOptions.value.strategy,
  middleware: middleware.value
}))

const currentNodePos = ref<number | null>()

function onNodeChange({ pos }: { pos: number }) {
  currentNodePos.value = pos
  if (pos == null || pos < 0) return

  const node = props.editor.state.doc.nodeAt(pos)
  if (node) {
    emit('hover', { node: node.toJSON(), pos })
  }
}

function onClick() {
  if (!props.editor) return

  const pos = currentNodePos.value
  if (pos == null || pos < 0) return

  const node = props.editor.state.doc.nodeAt(pos)
  if (node) {
    const selectedNode = { node: node.toJSON(), pos }

    emit('nodeChange', selectedNode)

    props.editor.chain().setNodeSelection(pos).run()

    return selectedNode
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
    :class="ui.root({ class: [pohonProp?.root, props.class] })"
    @click="onClick"
  >
    <slot : pohon="ui" :on-click="onClick">
      <PButton
        v-bind="{
          ...buttonProps,
          icon: props.icon || appConfig.pohon.icons.drag,
          ...$attrs
        }"
        data-slot="handle"
        :class="ui.handle({ class: [pohonProp?.handle, props.class] })"
        : pohon="transformPohon(ui, pohonProp)"
      />
    </slot>
  </DragHandle>
</template>
