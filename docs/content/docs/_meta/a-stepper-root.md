<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-stepper-root' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'div\'"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "The value of the step that should be active when initially rendered. Use when you do not need to control the state of the steps.",
    "type": "number",
    "required": false,
    "default": "1"
  },
  {
    "name": "dir",
    "description": "The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false
  },
  {
    "name": "linear",
    "description": "Whether or not the steps must be completed in order.",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "modelValue",
    "description": "The controlled value of the step to activate. Can be bound as `v-model`.",
    "type": "number",
    "required": false
  },
  {
    "name": "orientation",
    "description": "The orientation the steps are laid out.\\nMainly so arrow navigation is done accordingly (left & right vs. up & down).",
    "type": "\'horizontal\' | \'vertical\'",
    "required": false,
    "default": "\'horizontal\'"
  }
]'} 

#### Events

:docs-emits-table{name='events-stepper-root' :data='[
  {
    "name": "update:modelValue",
    "description": "Event handler called when the value changes",
    "type": "[payload: number]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-stepper-root' :data='[
  {
    "name": "modelValue",
    "description": "Current step",
    "type": "number | undefined"
  },
  {
    "name": "totalSteps",
    "description": "Total number of steps",
    "type": "number"
  },
  {
    "name": "isNextDisabled",
    "description": "Whether or not the next step is disabled",
    "type": "boolean"
  },
  {
    "name": "isPrevDisabled",
    "description": "Whether or not the previous step is disabled",
    "type": "boolean"
  },
  {
    "name": "isFirstStep",
    "description": "Whether or not the first step is active",
    "type": "boolean"
  },
  {
    "name": "isLastStep",
    "description": "Whether or not the last step is active",
    "type": "boolean"
  },
  {
    "name": "goToStep",
    "description": "Go to a specific step",
    "type": "(step: number): void"
  },
  {
    "name": "nextStep",
    "description": "Go to the next step",
    "type": "(): void"
  },
  {
    "name": "prevStep",
    "description": "Go to the previous step",
    "type": "(): void"
  },
  {
    "name": "hasNext",
    "description": "Whether or not there is a next step",
    "type": "(): boolean"
  },
  {
    "name": "hasPrev",
    "description": "Whether or not there is a previous step",
    "type": "(): boolean"
  }
]'} 

#### Exposed

:docs-exposed-table{name='exposed-stepper-root' :data='[
  {
    "name": "goToStep",
    "description": "",
    "type": "(step: number) => void"
  },
  {
    "name": "nextStep",
    "description": "",
    "type": "() => void"
  },
  {
    "name": "prevStep",
    "description": "",
    "type": "() => void"
  },
  {
    "name": "hasNext",
    "description": "",
    "type": "() => boolean"
  },
  {
    "name": "hasPrev",
    "description": "",
    "type": "() => boolean"
  }
]'} 
