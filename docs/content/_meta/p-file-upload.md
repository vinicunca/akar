<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    'name': 'as',
    'description': '<p>The element or component this component should render as.</p>\n',
    'type': 'APrimitiveAsTag | Component',
    'required': false,
    'default': '\'div\''
  },
  {
    'name': 'accept',
    'description': '<p>Specifies the allowed file types for the input. Provide a comma-separated list of MIME types or file extensions (e.g., &quot;image/png,application/pdf,.jpg&quot;).</p>\n',
    'type': 'string',
    'required': false,
    'default': '\'*\''
  },
  {
    'name': 'color',
    'description': '',
    'type': '\'error\' | \'primary\' | \'secondary\' | \'success\' | \'info\' | \'warning\' | \'neutral\'',
    'required': false
  },
  {
    'name': 'description',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'disabled',
    'description': '',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'dropzone',
    'description': '<p>Create a zone that allows the user to drop files onto it.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'fileDelete',
    'description': '<p>Configure the delete button for the file.\nWhen <code>layout</code> is <code>grid</code>, the default is <code>{ color: 'neutral', variant: 'solid', size: 'xs' }</code>{lang=&quot;ts-type&quot;}\nWhen <code>layout</code> is <code>list</code>, the default is <code>{ color: 'neutral', variant: 'link' }</code>{lang=&quot;ts-type&quot;}</p>\n',
    'type': 'boolean | Partial<PButtonProps>',
    'required': false
  },
  {
    'name': 'fileDeleteIcon',
    'description': '<p>The icon displayed to delete a file.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'fileIcon',
    'description': '<p>The icon to display for the file.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'highlight',
    'description': '<p>Highlight the ring color like a focus state.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'icon',
    'description': '<p>The icon to display.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'id',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'interactive',
    'description': '<p>Make the dropzone interactive when the user is clicking on it.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'label',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'layout',
    'description': '<p>The layout of how files are displayed.\nOnly works when <code>variant</code> is <code>area</code>.</p>\n',
    'type': '\'list\' | \'grid\'',
    'required': false,
    'default': '\'grid\''
  },
  {
    'name': 'modelValue',
    'description': '',
    'type': 'File | File[] | null',
    'required': false
  },
  {
    'name': 'multiple',
    'description': '',
    'type': 'boolean',
    'required': false,
    'default': 'false as never'
  },
  {
    'name': 'name',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'position',
    'description': '<p>The position of the files.\nOnly works when <code>variant</code> is <code>area</code> and when <code>layout</code> is <code>list</code>.</p>\n',
    'type': '\'inside\' | \'outside\'',
    'required': false,
    'default': '\'outside\''
  },
  {
    'name': 'required',
    'description': '',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'reset',
    'description': '<p>Reset the file input when the dialog is opened.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'false'
  },
  {
    'name': 'size',
    'description': '',
    'type': '\'md\' | \'xs\' | \'sm\' | \'lg\' | \'xl\'',
    'required': false
  },
  {
    'name': 'variant',
    'description': '<p>The <code>button</code> variant is only available when <code>multiple</code> is <code>false</code>.</p>\n',
    'type': '\'button\' | \'area\'',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ root?: ClassValue; base?: ClassValue; wrapper?: ClassValue; icon?: ClassValue; avatar?: ClassValue; label?: ClassValue; description?: ClassValue; actions?: ClassValue; files?: ClassValue; file?: ClassValue; fileLeadingAvatar?: ClassValue; fileWrapper?: ClassValue; fileName?: ClassValue; fileSize?: ClassValue; fileTrailingButton?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'change',
    'description': '',
    'type': '[event: Event]'
  },
  {
    'name': 'update:modelValue',
    'description': '',
    'type': '[value: File | File[] | null]'
  }
]" />

<DocsSlotsTable :data="[
  {
    'name': 'open',
    'description': '',
    'type': '(localOptions?: Partial<UseFileDialogOptions> | undefined): void'
  },
  {
    'name': 'removeFile',
    'description': '',
    'type': '(index?: number | undefined): void'
  }
]" />
