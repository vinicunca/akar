<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseFileDialogReturn } from '@vueuse/core';
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

export interface FileUploadEmits {
  change: [event: Event];
}

type FileUploadFiles<M> = (M extends true ? Array<File> : File) | null;

export interface PFileUploadSlots<M extends boolean = false> {
  'default': (props: {
    open: UseFileDialogReturn['open'];
    removeFile: (index?: number) => void;
    pohon: FileUpload['pohon'];
  }) => any;
  'leading': (props: { pohon: FileUpload['pohon'] }) => any;
  'label': (props?: object) => any;
  'description': (props?: object) => any;
  'actions': (props: { files?: FileUploadFiles<M>; open: UseFileDialogReturn['open']; removeFile: (index?: number) => void }) => any;
  'files': (props: { files?: FileUploadFiles<M> }) => any;
  'files-top': (props: { files?: FileUploadFiles<M>; open: UseFileDialogReturn['open']; removeFile: (index?: number) => void }) => any;
  'files-bottom': (props: { files?: FileUploadFiles<M>; open: UseFileDialogReturn['open']; removeFile: (index?: number) => void }) => any;
  'file': (props: { file: File; index: number }) => any;
  'file-leading': (props: { file: File; index: number; pohon: FileUpload['pohon'] }) => any;
  'file-name': (props: { file: File; index: number }) => any;
  'file-size': (props: { file: File; index: number }) => any;
  'file-trailing': (props: { file: File; index: number; pohon: FileUpload['pohon'] }) => any;
}
</script>

<script setup lang="ts" generic="M extends boolean = false">
import { useAppConfig, useLocale } from '#imports';
import { createReusableTemplate } from '@vueuse/core';
import { APrimitive } from 'akar';
import { computed, toRef, watch } from 'vue';
import { useFileUpload } from '../composables/use-file-upload';
import { useFormField } from '../composables/use-form-field';
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
    fileDelete: true,
    interactive: true,
    layout: 'grid',
    position: 'outside',
    preview: true,
  },
);
const emits = defineEmits<FileUploadEmits>();
const slots = defineSlots<PFileUploadSlots<M>>();

const modelValue = defineModel<(M extends true ? Array<File> : File) | null>();

const appConfig = useAppConfig() as FileUpload['AppConfig'];

const { t } = useLocale();

const [DefineFilesTemplate, ReuseFilesTemplate] = createReusableTemplate();

const { isDragging, open, inputRef, dropzoneRef } = useFileUpload({
  accept: props.accept,
  reset: props.reset,
  multiple: props.multiple,
  dropzone: props.dropzone,
  onUpdate,
});
const { emitFormInput, emitFormChange, id, name, disabled, ariaAttrs } = useFormField<PFileUploadProps>(props);

const variant = computed(() => props.multiple ? 'area' : props.variant);
const layout = computed(() => props.variant === 'button' && !props.multiple ? 'grid' : props.layout);
const position = computed(() => {
  if (layout.value === 'grid' && props.multiple) {
    return 'inside';
  }
  if (variant.value === 'button') {
    return 'outside';
  }

  return props.position;
});

const pohon = computed(() =>
  uv({
    extend: uv(theme),
    ...(appConfig.pohon?.fileUpload || {}),
  })({
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
  }),
);

function createObjectUrl(file: File): string {
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
    modelValue.value = files?.[0] as (M extends true ? Array<File> : File) | null;
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

    if (hasModelReset && inputRef.value) {
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
        :class="pohon.files({ class: props.pohon?.files })"
        data-pohon="file-upload-files"
      >
        <slot
          name="files"
          :files="modelValue"
        >
          <div
            v-for="(file, index) in Array.isArray(modelValue) ? modelValue : [modelValue]"
            :key="(file as File).name"
            :class="pohon.file({ class: props.pohon?.file })"
            data-pohon="file-upload-file"
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
                  :src="createObjectUrl(file)"
                  :icon="fileIcon || appConfig.pohon.icons.file"
                  :size="props.size"
                  :class="pohon.fileLeadingAvatar({ class: props.pohon?.fileLeadingAvatar })"
                  data-pohon="file-upload-file-leading-avatar"
                />
              </slot>

              <div
                :class="pohon.fileWrapper({ class: props.pohon?.fileWrapper })"
                data-pohon="file-upload-file-wrapper"
              >
                <span
                  :class="pohon.fileName({ class: props.pohon?.fileName })"
                  data-pohon="file-upload-file-name"
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
                  :class="pohon.fileSize({ class: props.pohon?.fileSize })"
                  data-pohon="file-upload-file-size"
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
                  :class="pohon.fileTrailingButton({ class: props.pohon?.fileTrailingButton })"
                  data-pohon="file-upload-file-trailing-button"
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
    :class="pohon.root({ class: [props.pohon?.root, props.class] })"
    data-pohon="file-upload-root"
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
        :class="pohon.base({ class: props.pohon?.base })"
        :tabindex="interactive && !disabled ? 0 : -1"
        @click="interactive && !disabled && open()"
        @keydown.prevent
        @keyup.enter.space="interactive && !disabled && open()"
      >
        <ReuseFilesTemplate v-if="position === 'inside'" />

        <div
          v-if="position === 'inside' ? (multiple ? !(modelValue as File[])?.length : !modelValue) : true"
          :class="pohon.wrapper({ class: props.pohon?.wrapper })"
          data-pohon="file-upload-wrapper"
        >
          <slot
            name="leading"
            :pohon="pohon"
          >
            <PIcon
              v-if="variant === 'button'"
              :name="icon || appConfig.pohon.icons.upload"
              :class="pohon.icon({ class: props.pohon?.icon })"
              data-pohon="file-upload-icon"
            />
            <PAvatar
              v-else
              :icon="icon || appConfig.pohon.icons.upload"
              :size="props.size"
              :class="pohon.avatar({ class: props.pohon?.avatar })"
              data-pohon="file-upload-avatar"
            />
          </slot>

          <template v-if="variant !== 'button'">
            <div
              v-if="label || !!slots.label"
              :class="pohon.label({ class: props.pohon?.label })"
              data-pohon="file-upload-label"
            >
              <slot name="label">
                {{ label }}
              </slot>
            </div>
            <div
              v-if="description || !!slots.description"
              :class="pohon.description({ class: props.pohon?.description })"
              data-pohon="file-upload-description"
            >
              <slot name="description">
                {{ description }}
              </slot>
            </div>

            <div
              v-if="!!slots.actions"
              :class="pohon.actions({ class: props.pohon?.actions })"
              data-pohon="file-upload-actions"
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

    <input
      :id="id"
      ref="inputRef"
      type="file"
      :name="name"
      :accept="accept"
      :multiple="(multiple as boolean)"
      :required="required"
      :disabled="disabled"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      class="sr-only"
      tabindex="-1"
    >
  </APrimitive>
</template>
