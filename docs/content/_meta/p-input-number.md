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
    'name': 'autofocus',
    'description': '',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'autofocusDelay',
    'description': '',
    'type': 'number',
    'required': false
  },
  {
    'name': 'color',
    'description': '',
    'type': '\'error\' | \'primary\' | \'secondary\' | \'success\' | \'info\' | \'warning\' | \'neutral\'',
    'required': false
  },
  {
    'name': 'decrement',
    'description': '<p>Configure the decrement button. The <code>color</code> and <code>size</code> are inherited.</p>\n',
    'type': 'PButtonProps',
    'required': false
  },
  {
    'name': 'decrementDisabled',
    'description': '<p>Disable the decrement button.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'decrementIcon',
    'description': '<p>The icon displayed to decrement the value.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'defaultValue',
    'description': '',
    'type': 'number',
    'required': false
  },
  {
    'name': 'disabled',
    'description': '<p>When <code>true</code>, prevents the user from interacting with the Number Field.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'disableWheelChange',
    'description': '<p>When <code>true</code>, prevents the value from changing on wheel scroll.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'formatOptions',
    'description': '<p>Formatting options for the value displayed in the number field. This also affects what characters are allowed to be typed by the user.</p>\n',
    'type': 'Intl.NumberFormatOptions',
    'required': false
  },
  {
    'name': 'highlight',
    'description': '<p>Highlight the ring color like a focus state.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'id',
    'description': '<p>Id of the element</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'increment',
    'description': '<p>Configure the increment button. The <code>color</code> and <code>size</code> are inherited.</p>\n',
    'type': 'PButtonProps',
    'required': false
  },
  {
    'name': 'incrementDisabled',
    'description': '<p>Disable the increment button.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'incrementIcon',
    'description': '<p>The icon displayed to increment the value.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'invertWheelChange',
    'description': '<p>When <code>true</code>, inverts the direction of the wheel change.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'locale',
    'description': '<p>The locale to use for formatting and parsing numbers.</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'max',
    'description': '<p>The largest value allowed for the input.</p>\n',
    'type': 'number',
    'required': false
  },
  {
    'name': 'min',
    'description': '<p>The smallest value allowed for the input.</p>\n',
    'type': 'number',
    'required': false
  },
  {
    'name': 'modelModifiers',
    'description': '',
    'type': 'Pick<ModelModifiers, \'optional\'>',
    'required': false
  },
  {
    'name': 'modelValue',
    'description': '',
    'type': 'number | null',
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
    'description': '<p>The orientation of the input menu.</p>\n',
    'type': '\'vertical\' | \'horizontal\'',
    'required': false,
    'default': '\'horizontal\''
  },
  {
    'name': 'placeholder',
    'description': '<p>The placeholder text when the input is empty.</p>\n',
    'type': 'string',
    'required': false
  },
  {
    'name': 'readonly',
    'description': '<p>When <code>true</code>, the Number Field is read-only.</p>\n',
    'type': 'boolean',
    'required': false
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
    'name': 'step',
    'description': '<p>The amount that the input value changes with each increment or decrement &quot;tick&quot;.</p>\n',
    'type': 'number',
    'required': false
  },
  {
    'name': 'stepSnapping',
    'description': '<p>When <code>false</code>, prevents the value from snapping to the nearest increment of the step value</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'variant',
    'description': '',
    'type': '\'outline\' | \'soft\' | \'subtle\' | \'ghost\' | \'none\'',
    'required': false
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ root?: ClassValue; base?: ClassValue; increment?: ClassValue; decrement?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'blur',
    'description': '',
    'type': '[event: FocusEvent]'
  },
  {
    'name': 'change',
    'description': '',
    'type': '[event: Event]'
  },
  {
    'name': 'update:modelValue',
    'description': '',
    'type': '[value: number]'
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
