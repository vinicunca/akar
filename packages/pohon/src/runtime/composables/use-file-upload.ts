import type { MaybeRef } from '@vueuse/core';
import { useDropZone, useFileDialog } from '@vueuse/core';
import { computed, onMounted, reactive, ref, unref, watch } from 'vue';

export interface UseFileUploadOptions {
  /**
   * Specifies the allowed file types. Provide a comma-separated list of MIME types or file extensions.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept
   * @defaultValue '*'
   */
  accept?: MaybeRef<string>;
  reset?: boolean;
  multiple?: boolean;
  dropzone?: boolean;
  onUpdate: (files: Array<File>) => void;
}

function parseAcceptToDataTypes(accept: string): Array<string> | undefined {
  if (!accept || accept === '*') {
    return undefined;
  }

  const types = accept
    .split(',')
    .map((type) => {
      const trimmedType = type.trim();

      if (trimmedType.includes('/') && trimmedType.endsWith('/*')) {
        return trimmedType.split('/')[0] || trimmedType;
      }
      return trimmedType;
    })
    .filter((type) => {
      return !type.startsWith('.');
    });

  return types.length > 0 ? types : undefined;
}

export function useFileUpload(options: UseFileUploadOptions) {
  const {
    accept = '*',
    reset = false,
    multiple = false,
    dropzone = true,
    onUpdate,
  } = options;
  const inputRef = ref<HTMLInputElement>();
  const dropzoneRef = ref<HTMLDivElement>();

  const dataTypes = computed(() => parseAcceptToDataTypes(unref(accept)));

  function onDrop(files: FileList | Array<File> | null) {
    if (!files || files.length === 0) {
      return;
    }

    if (files instanceof FileList) {
      files = Array.from(files);
    }

    if (files.length > 1 && !multiple) {
      files = [files[0]!];
    }

    onUpdate(files);
  };

  const isDragging = ref(false);
  const fileDialog = reactive({
    open: () => {
    },
  });

  function open() {
    fileDialog.open();
  }

  onMounted(() => {
    const { isOverDropZone } = dropzone
      ? useDropZone(dropzoneRef, { dataTypes: dataTypes.value, onDrop })
      : { isOverDropZone: ref(false) };

    watch(isOverDropZone, (value) => {
      isDragging.value = value;
    });

    const { onChange, open } = useFileDialog({
      accept: unref(accept),
      multiple,
      input: unref(inputRef),
      reset,
    });

    fileDialog.open = open;

    onChange((fileList) => onDrop(fileList));
  });

  return {
    isDragging,
    open,
    inputRef,
    dropzoneRef,
  };
}
