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
    'description': '<p>The value of the RadioGroup when initially rendered. Use when you do not need to control the state of the RadioGroup.</p>\n',
    'type': 'any',
    'required': false
  },
  {
    'name': 'descriptionKey',
    'description': '<p>When <code>items</code> is an array of objects, select the field to use as the description.</p>\n',
    'type': 'string | number',
    'required': false,
    'default': '\'description\''
  },
  {
    'name': 'disabled',
    'description': '<p>When <code>true</code>, prevents the user from interacting with radio items.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'indicator',
    'description': '<p>Position of the indicator.</p>\n',
    'type': '\'hidden\' | \'start\' | \'end\'',
    'required': false
  },
  {
    'name': 'items',
    'description': '',
    'type': 'PRadioGroupItem[]',
    'required': false
  },
  {
    'name': 'labelKey',
    'description': '<p>When <code>items</code> is an array of objects, select the field to use as the label.</p>\n',
    'type': 'string | number',
    'required': false,
    'default': '\'label\''
  },
  {
    'name': 'legend',
    'description': '',
    'type': 'string',
    'required': false
  },
  {
    'name': 'loop',
    'description': '<p>When <code>true</code>, keyboard navigation will loop from last item to first, and vice versa.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'modelValue',
    'description': '<p>The controlled value of the RadioGroup. Can be bind as <code>v-model</code>.</p>\n',
    'type': 'any',
    'required': false
  },
  {
    'name': 'name',
    'description': '<p>The name of the field. Submitted with its owning form as part of a name/value pair.</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'orientation',
    'description': '<p>The orientation the radio buttons are laid out.</p>\n',
    'type': '\'vertical\' | \'horizontal\'',
    'required': false,
    'default': '\'vertical\''
  },
  {
    'name': 'required',
    'description': '<p>When <code>true</code>, indicates that the user must set the value before the owning form can be submitted.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'size',
    'description': '',
    'type': '\'md\' | \'xs\' | \'sm\' | \'lg\' | \'xl\'',
    'required': false
  },
  {
    'name': 'valueKey',
    'description': '<p>When <code>items</code> is an array of objects, select the field to use as the value.</p>\n',
    'type': 'string | number',
    'required': false,
    'default': '\'value\' as never'
  },
  {
    'name': 'variant',
    'description': '',
    'type': '\'table\' | \'list\' | \'card\'',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ root?: ClassValue; fieldset?: ClassValue; legend?: ClassValue; item?: ClassValue; container?: ClassValue; base?: ClassValue; indicator?: ClassValue; wrapper?: ClassValue; label?: ClassValue; description?: ClassValue; }',
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
    'type': '[payload: string]'
  }
]" />

<DocsSlotsTable :data="[
  {
    'description': '',
    'type': ''
  },
  {
    'description': '',
    'type': ''
  }
]" />
