<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    "name": "disabled",
    "description": "<p>Disable all inputs inside the form.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "id",
    "description": "",
    "type": "string | number",
    "required": false
  },
  {
    "name": "loadingAuto",
    "description": "<p>When <code>true</code>, all form elements will be disabled on <code>@submit</code> event.\nThis will cause any focused input elements to lose their focus state.</p>\n",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "name",
    "description": "<p>Path of the form's state within it's parent form.\nUsed for nesting forms. Only available if <code>nested</code> is true.</p>\n",
    "type": "string",
    "required": false
  },
  {
    "name": "nested",
    "description": "<p>If true, this form will attach to its parent Form and validate at the same time.</p>\n",
    "type": "boolean",
    "required": false
  },
  {
    "name": "schema",
    "description": "<p>Schema to validate the form state. Supports Standard Schema objects, Yup, Joi, and Superstructs.</p>\n",
    "type": "Struct<any, any> | StandardSchemaV1<object, object>",
    "required": false
  },
  {
    "name": "state",
    "description": "<p>An object representing the current state of the form.</p>\n",
    "type": "Partial<any>",
    "required": false
  },
  {
    "name": "transform",
    "description": "<p>If true, applies schema transformations on submit.</p>\n",
    "type": "boolean",
    "required": false,
    "default": "true as T"
  },
  {
    "name": "validate",
    "description": "<p>Custom validation function to validate the form state.</p>\n",
    "type": "((state: Partial<any>) => FormError<string>[] | Promise<FormError<string>[]>)",
    "required": false
  },
  {
    "name": "validateOn",
    "description": "<p>The list of input events that trigger the form validation.</p>\n",
    "type": "FormInputEvents[]",
    "required": false
  },
  {
    "name": "validateOnInputDelay",
    "description": "<p>Delay in milliseconds before validating the form on input events.</p>\n",
    "type": "number",
    "required": false,
    "default": "300"
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "error",
    "description": "",
    "type": "[event: FormErrorEvent]"
  },
  {
    "name": "submit",
    "description": "",
    "type": "[event: FormSubmitEvent<any>]"
  }
]" />

<DocsSlotsTable :data="[
  {
    "name": "errors",
    "description": "",
    "type": "FormError<string>"
  },
  {
    "name": "loading",
    "description": "",
    "type": "boolean"
  }
]" />

<DocsExposedTable :data="[
  {
    "name": "setErrors",
    "description": "",
    "type": "(errs: FormError<string>[], name?: string | number | symbol | RegExp | undefined) => void"
  },
  {
    "name": "submit",
    "description": "",
    "type": "() => Promise<void>"
  },
  {
    "name": "getErrors",
    "description": "",
    "type": "(name?: string | number | symbol | RegExp | undefined) => { id?: string | undefined; name?: string | undefined; message: string; }[]"
  },
  {
    "name": "clear",
    "description": "",
    "type": "(name?: string | number | symbol | RegExp | undefined) => void"
  }
]" />
