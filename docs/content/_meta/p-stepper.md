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
    'name': 'color',
    'description': '',
    'type': '\'error\' | \'primary\' | \'secondary\' | \'success\' | \'info\' | \'warning\' | \'neutral\'',
    'required': false
  },
  {
    'name': 'defaultValue',
    'description': '<p>The value of the step that should be active when initially rendered. Use when you do not need to control the state of the steps.</p>\n',
    'type': 'string | number',
    'required': false
  },
  {
    'name': 'disabled',
    'description': '',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'items',
    'description': '',
    'type': 'PStepperItem[]',
    'required': true
  },
  {
    'name': 'linear',
    'description': '<p>Whether or not the steps must be completed in order.</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'modelValue',
    'description': '',
    'type': 'string | number',
    'required': false
  },
  {
    'name': 'orientation',
    'description': '<p>The orientation of the stepper.</p>\n',
    'type': '\'vertical\' | \'horizontal\'',
    'required': false,
    'default': '\'horizontal\''
  },
  {
    'name': 'size',
    'description': '',
    'type': '\'md\' | \'xs\' | \'sm\' | \'lg\' | \'xl\'',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ root?: ClassValue; header?: ClassValue; item?: ClassValue; container?: ClassValue; trigger?: ClassValue; indicator?: ClassValue; icon?: ClassValue; separator?: ClassValue; wrapper?: ClassValue; title?: ClassValue; description?: ClassValue; content?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'next',
    'description': '',
    'type': '[value: PStepperItem]'
  },
  {
    'name': 'prev',
    'description': '',
    'type': '[value: PStepperItem]'
  },
  {
    'name': 'update:modelValue',
    'description': '',
    'type': '[value: string | number]'
  }
]" />

<DocsSlotsTable :data="[
  {
    'name': 'item',
    'description': '',
    'type': 'PStepperItem'
  }
]" />

<DocsExposedTable :data="[
  {
    'name': 'next',
    'description': '',
    'type': '() => void'
  },
  {
    'name': 'prev',
    'description': '',
    'type': '() => void'
  }
]" />
