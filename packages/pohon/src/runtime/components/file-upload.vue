<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseFileDialogReturn } from '@vueuse/core';
import type { MaybeRef, VNode } from 'vue';
import type { PButtonProps, PIconProps, PLinkPropsKeys } from '../types';
import type { InputHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/pohon/file-upload';

type FileUpload = ComponentConfig<typeof theme, AppConfig, 'fileUpload'>;

export interface PFileUploadProps<M extends boolean = false> extends /** @vue-ignore */ Pick<InputHTMLAttributes, 'form' | 'formaction' | 'formenctype' | 'formmethod' | 'formnovalidate' | 'formtarget'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  id?: string;
  name?: string;
  /**
   * The icon to display.
   * @defaultValue appConfig.pohon.icons.upload
   * @IconifyIcon
   */
  icon?: PIconProps['name'];
  label?: string;
  description?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: FileUpload['variants']['color'];
  /**
   * The `button` variant is only available when `multiple` is `false`.
   * @defaultValue 'area'
   */
  variant?: FileUpload['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: FileUpload['variants']['size'];
  /**
   * The layout of how files are displayed.
   * Only works when `variant` is `area`.
   * @defaultValue 'list'
   */
  layout?: FileUpload['variants']['layout'];
  /**
   * The position of the files.
   * Only works when `variant` is `area` and when `layout` is `list`.
   * @defaultValue 'outside'
   */
  position?: FileUpload['variants']['position'];
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  /**
   * Specifies the allowed file types for the input. Provide a comma-separated list of MIME types or file extensions (e.g., "image/png,application/pdf,.jpg").
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept
   * @defaultValue '*'
   */
  accept?: string;
  multiple?: M & boolean;
  /**
   * Reset the file input when the dialog is opened.
   * @defaultValue false
   */
  reset?: boolean;
  /**
   * Create a zone that allows the user to drop files onto it.
   * @defaultValue true
   */
  dropzone?: boolean;
  /**
   * Make the dropzone interactive when the user is clicking on it.
   * @defaultValue true
   */
  interactive?: boolean;
  required?: boolean;
  disabled?: boolean;
  /**
   * The icon to display for the file.
   * @defaultValue appConfig.pohon.icons.file
   * @IconifyIcon
   */
  fileIcon?: PIconProps['name'];
  /**
   * Preview the file (currently only `<img>` is rendered)
   * When set false, only `fileIcon` is displayed
   * @defaultValue true
   */
  fileImage?: boolean;
  /**
   * Configure the delete button for the file.
   * When `layout` is `grid`, the default is `{ color: 'neutral', variant: 'solid', size: 'xs' }`{lang="ts-type"}
   * When `layout` is `list`, the default is `{ color: 'neutral', variant: 'link' }`{lang="ts-type"}
   */
  fileDelete?: boolean | Omit<PButtonProps, PLinkPropsKeys>;
  /**
   * The icon displayed to delete a file.
   * @defaultValue appConfig.pohon.icons.close
   * @IconifyIcon
   */
  fileDeleteIcon?: PIconProps['name'];
  /**
   * Show the file preview/list after upload.
   * @defaultValue true
   */
  preview?: boolean;
  class?: any;
  pohon?: FileUpload['slots'];
}

export interface PFileUploadEmits {
  change: [event: Event];
}

type FileUploadFiles<M> = (M extends true ? Array<File> : File) | null;

export interface PFileUploadSlots<M extends boolean = false> {
  'default'?: (props: {
    open: UseFileDialogReturn['open'];
    removeFile: (index?: number) => void;
    pohon: FileUpload['pohon'];
  }) => Array<VNode>;
  'leading'?: (props: { pohon: FileUpload['pohon'] }) => Array<VNode>;
  'label'?: (props?: {}) => Array<VNode>;
  'description'?: (props?: {}) => Array<VNode>;
  'actions'?: (props: { files: FileUploadFiles<M> | undefined; open: UseFileDialogReturn['open']; removeFile: (index?: number) => void }) => Array<VNode>;
  'files'?: (props: { files: FileUploadFiles<M> }) => Array<VNode>;
  'files-top'?: (props: { files: FileUploadFiles<M>; open: UseFileDialogReturn['open']; removeFile: (index?: number) => void }) => Array<VNode>;
  'files-bottom'?: (props: { files: FileUploadFiles<M>; open: UseFileDialogReturn['open']; removeFile: (index?: number) => void }) => Array<VNode>;
  'file'?: (props: { file: File; index: number }) => Array<VNode>;
  'file-leading'?: (props: { file: File; index: number; pohon: FileUpload['pohon'] }) => Array<VNode>;
  'file-name'?: (props: { file: File; index: number }) => Array<VNode>;
  'file-size'?: (props: { file: File; index: number }) => Array<VNode>;
  'file-trailing'?: (props: { file: File; index: number; pohon: FileUpload['pohon'] }) => Array<VNode>;
}
</script>

<script setup lang="ts" generic="M extends boolean = false">
import { useAppConfig } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive, AVisuallyHidden } from 'akar';
import { computed, toRef, toRefs, watch } from 'vue';
import { useComponentPohon } from '../composables/use-component-pohon';
import { useFileUpload } from '../composables/use-file-upload';
import { useFormField } from '../composables/use-form-field';
import { useLocale } from '../composables/use-locale';
import { useResolvedVariants } from '../composables/use-resolved-variants';
import { uv } from '../utils/uv';
import PAvatar from './avatar.vue';
import PButton from './button.vue';
import PIcon from './icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<PFileUploadProps<M>>(),
  {
    accept: '*',
    multiple: false as never,
    reset: false,
    dropzone: true,
    interactive: true,
    fileDelete: true,
    layout: 'grid',
    position: 'outside',
    preview: true,
    fileImage: true,
  },
);
const emits = defineEmits<PFileUploadEmits>();
const slots = defineSlots<PFileUploadSlots<M>>();

const modelValue = defineModel<(M extends true ? Array<File> : File) | null>();

const appConfig = useAppConfig() as FileUpload['AppConfig'];
const pohonProp = useComponentPohon('fileUpload', props);

const { t } = useLocale();

const [DefineFilesTemplate, ReuseFilesTemplate] = createReusableTemplate();

const { accept, multiple, reset } = toRefs(props);

const { isDragging, open, inputRef, dropzoneRef } = useFileUpload({
  accept,
  reset,
  multiple: multiple as MaybeRef<boolean>,
  dropzone: props.dropzone,
  onUpdate,
});
const { emitFormInput, emitFormChange, id, name, disabled, ariaAttrs } = useFormField<PFileUploadProps>(props);

const { variant: resolvedVariant } = useResolvedVariants('fileUpload', props, theme, ['variant']);
const variant = computed(() => props.multiple ? 'area' : resolvedVariant.value);
const layout = computed(() => resolvedVariant.value === 'button' && !props.multiple ? 'grid' : props.layout);
const position = computed(() => {
  if (layout.value === 'grid' && props.multiple) {
    return 'inside';
  }
  if (variant.value === 'button') {
    return 'outside';
  }

  return props.position;
});

const pohon = computed(() => uv({ extend: uv(theme), ...(appConfig.pohon?.fileUpload || {}) })({
  dropzone: props.dropzone,
  interactive: props.interactive,
  color: props.color,
  size: props.size,
  variant: variant.value,
  layout: layout.value,
  position: position.value,
  multiple: props.multiple,
  highlight: props.highlight,
  disabled: props.disabled,
}));

function createObjectUrl(file: File): string | undefined {
  if (!props.fileImage) {
    return undefined;
  }
  return URL.createObjectURL(file);
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return '0B';
  }

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = bytes / k ** i;
  const formattedSize = i === 0 ? size.toString() : size.toFixed(0);

  return `${formattedSize}${sizes[i]}`;
}

function onUpdate(files: Array<File>, reset = false) {
  if (props.multiple) {
    if (reset) {
      modelValue.value = files as (M extends true ? Array<File> : File) | null;
    } else {
      const existingFiles = (modelValue.value as Array<File>) || [];
      modelValue.value = [...existingFiles, ...(files || [])] as (M extends true ? Array<File> : File) | null;
    }
  } else {
    modelValue.value = (files?.[0] ?? null) as (M extends true ? Array<File> : File) | null;
  }

  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value: modelValue.value } });
  emits('change', event);
  emitFormChange();
  emitFormInput();
}

function removeFile(index?: number) {
  if (!modelValue.value) {
    return;
  }

  if (!props.multiple || index === undefined) {
    onUpdate([], true);

    dropzoneRef.value?.focus();
    return;
  }

  const files = [...modelValue.value as Array<File>];
  files.splice(index, 1);

  onUpdate(files, true);

  dropzoneRef.value?.focus();
}

watch(
  modelValue,
  (newValue) => {
    const hasModelReset = props.multiple ? !(newValue as Array<File>)?.length : !newValue;

    if (hasModelReset && inputRef.value?.$el) {
      inputRef.value.$el.value = '';
    }
  },
);

defineExpose({
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement),
  dropzoneRef,
});
</script>

<template>
  <DefineFilesTemplate>
    <template v-if="props.preview && modelValue && (Array.isArray(modelValue) ? modelValue.length : true)">
      <slot
        name="files-top"
        :files="modelValue"
        :open="open"
        :remove-file="removeFile"
      />

      <div
        data-slot="files"
        :class="pohon.files({ class: pohonProp?.files })"
      >
        <slot
          name="files"
          :files="modelValue"
        >
          <div
            v-for="(file, index) in Array.isArray(modelValue) ? modelValue : [modelValue]"
            :key="(file as File).name"
            data-slot="file"
            :class="pohon.file({ class: pohonProp?.file })"
          >
            <slot
              name="file"
              :file="file"
              :index="index"
            >
              <slot
                name="file-leading"
                :file="file"
                :index="index"
                :pohon="pohon"
              >
                <PAvatar
                  :as="{ img: 'img' }"
                  :src="createObjectUrl(file)"
                  :icon="fileIcon || appConfig.pohon.icons.file"
                  :size="props.size"
                  data-slot="fileLeadingAvatar"
                  :class="pohon.fileLeadingAvatar({ class: pohonProp?.fileLeadingAvatar })"
                />
              </slot>

              <div
                data-slot="fileWrapper"
                :class="pohon.fileWrapper({ class: pohonProp?.fileWrapper })"
              >
                <span
                  data-slot="fileName"
                  :class="pohon.fileName({ class: pohonProp?.fileName })"
                >
                  <slot
                    name="file-name"
                    :file="file"
                    :index="index"
                  >
                    {{ (file as File).name }}
                  </slot>
                </span>

                <span
                  data-slot="fileSize"
                  :class="pohon.fileSize({ class: pohonProp?.fileSize })"
                >
                  <slot
                    name="file-size"
                    :file="file"
                    :index="index"
                  >
                    {{ formatFileSize((file as File).size) }}
                  </slot>
                </span>
              </div>

              <slot
                name="file-trailing"
                :file="file"
                :index="index"
                :pohon="pohon"
              >
                <PButton
                  v-if="fileDelete"
                  color="neutral"
                  v-bind="{
                    ...(layout === 'grid' ? {
                      variant: 'solid',
                      size: 'xs',
                    } : {
                      variant: 'link',
                      size,
                    }),
                    ...typeof fileDelete === 'object' ? fileDelete : undefined,
                  }"
                  :aria-label="t('fileUpload.removeFile', { filename: (file as File).name })"
                  :trailing-icon="fileDeleteIcon || appConfig.pohon.icons.close"
                  data-slot="fileTrailingButton"
                  :class="pohon.fileTrailingButton({ class: pohonProp?.fileTrailingButton })"
                  @click.stop.prevent="removeFile(index)"
                />
              </slot>
            </slot>
          </div>
        </slot>
      </div>

      <slot
        name="files-bottom"
        :files="modelValue"
        :open="open"
        :remove-file="removeFile"
      />
    </template>
  </DefineFilesTemplate>

  <APrimitive
    :as="as"
    data-slot="root"
    :class="pohon.root({ class: [pohonProp?.root, props.class] })"
  >
    <slot
      :open="open"
      :remove-file="removeFile"
      :pohon="pohon"
    >
      <component
        :is="variant === 'button' ? 'button' : 'div'"
        ref="dropzoneRef"
        :type="variant === 'button' ? 'button' : undefined"
        :role="variant === 'button' ? undefined : 'button'"
        :data-dragging="isDragging"
        data-slot="base"
        :class="pohon.base({ class: pohonProp?.base })"
        :tabindex="interactive && !disabled ? 0 : -1"
        @click="interactive && !disabled && open()"
        @keydown.space.prevent
        @keyup.enter.space="interactive && !disabled && open()"
      >
        <ReuseFilesTemplate v-if="position === 'inside'" />

        <div
          v-if="position === 'inside' ? (!props.preview || (multiple ? !(modelValue as File[])?.length : !modelValue)) : true"
          data-slot="wrapper"
          :class="pohon.wrapper({ class: pohonProp?.wrapper })"
        >
          <slot
            name="leading"
            :pohon="pohon"
          >
            <PIcon
              v-if="variant === 'button'"
              :name="icon || appConfig.pohon.icons.upload"
              data-slot="icon"
              :class="pohon.icon({ class: pohonProp?.icon })"
            />
            <PAvatar
              v-else
              :icon="icon || appConfig.pohon.icons.upload"
              :size="props.size"
              data-slot="avatar"
              :class="pohon.avatar({ class: pohonProp?.avatar })"
            />
          </slot>

          <template v-if="variant !== 'button'">
            <div
              v-if="label || !!slots.label"
              data-slot="label"
              :class="pohon.label({ class: pohonProp?.label })"
            >
              <slot name="label">
                {{ label }}
              </slot>
            </div>
            <div
              v-if="description || !!slots.description"
              data-slot="description"
              :class="pohon.description({ class: pohonProp?.description })"
            >
              <slot name="description">
                {{ description }}
              </slot>
            </div>

            <div
              v-if="!!slots.actions"
              data-slot="actions"
              :class="pohon.actions({ class: pohonProp?.actions })"
            >
              <slot
                name="actions"
                :files="modelValue"
                :open="open"
                :remove-file="removeFile"
              />
            </div>
          </template>
        </div>
      </component>

      <ReuseFilesTemplate v-if="position === 'outside'" />
    </slot>

    <AVisuallyHidden
      :id="id"
      ref="inputRef"
      as="input"
      type="file"
      feature="fully-hidden"
      :name="name"
      :accept="accept"
      :multiple="(multiple as boolean)"
      :required="required"
      :disabled="disabled"
      v-bind="{ ...$attrs, ...ariaAttrs }"
    />
  </APrimitive>
</template>
