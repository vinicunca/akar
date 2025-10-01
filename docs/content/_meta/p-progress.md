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
    'name': 'animation',
    'description': '<p>The animation of the progress bar.</p>\n',
    'type': '\'carousel\' | \'carousel-inverse\' | \'swing\' | \'elastic\'',
    'required': false
  },
  {
    'name': 'color',
    'description': '',
    'type': '\'error\' | \'primary\' | \'secondary\' | \'success\' | \'info\' | \'warning\' | \'neutral\'',
    'required': false
  },
  {
    'name': 'getValueLabel',
    'description': '<p>A function to get the accessible label text in a human-readable format.</p>\n<p>If not provided, the value label will be read as the numeric value as a percentage of the max value.</p>\n',
    'type': '((value: number | null, max: number) => string)',
    'required': false
  },
  {
    'name': 'getValueText',
    'description': '<p>A function to get the accessible value text representing the current value in a human-readable format.</p>\n',
    'type': '((value: number | null, max: number) => string)',
    'required': false
  },
  {
    'name': 'inverted',
    'description': '<p>Whether the progress is visually inverted.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'false'
  },
  {
    'name': 'max',
    'description': '<p>The maximum progress value.</p>\n',
    'type': 'number | any[]',
    'required': false
  },
  {
    'name': 'modelValue',
    'description': '<p>The progress value. Can be bind as <code>v-model</code>.</p>\n',
    'type': 'number | null',
    'required': false,
    'default': 'null'
  },
  {
    'name': 'orientation',
    'description': '<p>The orientation of the progress bar.</p>\n',
    'type': '\'vertical\' | \'horizontal\'',
    'required': false,
    'default': '\'horizontal\''
  },
  {
    'name': 'size',
    'description': '',
    'type': '\'md\' | \'xs\' | \'sm\' | \'lg\' | \'xl\' | \'2xs\' | \'2xl\'',
    'required': false
  },
  {
    'name': 'status',
    'description': '<p>Display the current progress value.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ root?: ClassValue; base?: ClassValue; indicator?: ClassValue; status?: ClassValue; steps?: ClassValue; step?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'update:max',
    'description': '',
    'type': '[value: number]'
  },
  {
    'name': 'update:modelValue',
    'description': '',
    'type': '[value: string[]]'
  }
]" />

<DocsSlotsTable :data="[
  {
    'name': 'percent',
    'description': '',
    'type': 'number | undefined'
  }
]" />
