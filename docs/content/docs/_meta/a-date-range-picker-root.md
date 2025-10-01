<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-date-range-picker-root' :data='[
  {
    "name": "as",
    "description": "The element or component this component should render as. Can be overwritten by `asChild`.",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\'div\'"
  },
  {
    "name": "allowNonContiguousRanges",
    "description": "When combined with `isDateUnavailable`, determines whether non-contiguous ranges, i.e. ranges containing unavailable dates, may be selected.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "asChild",
    "description": "Change the default rendered element for the one passed as a child, merging their props and behavior.\\n\\nRead our [Composition](https://akar.vinicunca.dev/core/guides/composition) guide for more details.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "closeOnSelect",
    "description": "Whether or not to close the popover on range select",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "defaultOpen",
    "description": "The open state of the popover when it is initially rendered. Use when you do not need to control its open state.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "defaultPlaceholder",
    "description": "The default placeholder date",
    "type": "DateValue",
    "required": false
  },
  {
    "name": "defaultValue",
    "description": "The default value for the calendar",
    "type": "DateRange",
    "required": false,
    "default": "{ start: undefined, end: undefined }"
  },
  {
    "name": "dir",
    "description": "The reading direction of the date field when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false
  },
  {
    "name": "disabled",
    "description": "Whether or not the date field is disabled",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "fixedDate",
    "description": "Which part of the range should be fixed",
    "type": "\'start\' | \'end\'",
    "required": false
  },
  {
    "name": "fixedWeeks",
    "description": "Whether or not to always display 6 weeks in the calendar",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "granularity",
    "description": "The granularity to use for formatting times. Defaults to day if a CalendarDate is provided, otherwise defaults to minute. The field will render segments for each part of the date up to and including the specified granularity",
    "type": "\'day\' | \'hour\' | \'minute\' | \'second\'",
    "required": false
  },
  {
    "name": "hideTimeZone",
    "description": "Whether or not to hide the time zone segment of the field",
    "type": "boolean",
    "required": false
  },
  {
    "name": "hourCycle",
    "description": "The hour cycle used for formatting times. Defaults to the local preference",
    "type": "12 | 24",
    "required": false
  },
  {
    "name": "id",
    "description": "Id of the element",
    "type": "string",
    "required": false
  },
  {
    "name": "isDateDisabled",
    "description": "A function that returns whether or not a date is disabled",
    "type": "DateMatcher",
    "required": false
  },
  {
    "name": "isDateHighlightable",
    "description": "A function that returns whether or not a date is hightable",
    "type": "DateMatcher",
    "required": false
  },
  {
    "name": "isDateUnavailable",
    "description": "A function that returns whether or not a date is unavailable",
    "type": "DateMatcher",
    "required": false
  },
  {
    "name": "locale",
    "description": "The locale to use for formatting dates",
    "type": "string",
    "required": false,
    "default": "\'en\'"
  },
  {
    "name": "maximumDays",
    "description": "The maximum number of days that can be selected in a range",
    "type": "number",
    "required": false
  },
  {
    "name": "maxValue",
    "description": "The maximum date that can be selected",
    "type": "DateValue",
    "required": false
  },
  {
    "name": "minValue",
    "description": "The minimum date that can be selected",
    "type": "DateValue",
    "required": false
  },
  {
    "name": "modal",
    "description": "The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "modelValue",
    "description": "The controlled checked state of the calendar. Can be bound as `v-model`.",
    "type": "DateRange | null",
    "required": false
  },
  {
    "name": "name",
    "description": "The name of the field. Submitted with its owning form as part of a name/value pair.",
    "type": "string",
    "required": false
  },
  {
    "name": "numberOfMonths",
    "description": "The number of months to display at once",
    "type": "number",
    "required": false,
    "default": "1"
  },
  {
    "name": "open",
    "description": "The controlled open state of the popover.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "pagedNavigation",
    "description": "This property causes the previous and next buttons to navigate by the number of months displayed at once, rather than one month",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "placeholder",
    "description": "The placeholder date, which is used to determine what month to display when no date is selected. This updates as the user navigates the calendar and can be used to programmatically control the calendar view",
    "type": "DateValue",
    "required": false
  },
  {
    "name": "preventDeselect",
    "description": "Whether or not to prevent the user from deselecting a date without selecting another date first",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "readonly",
    "description": "Whether or not the date field is readonly",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "required",
    "description": "When `true`, indicates that the user must set the value before the owning form can be submitted.",
    "type": "boolean",
    "required": false
  },
  {
    "name": "step",
    "description": "The stepping interval for the time fields. Defaults to `1`.",
    "type": "DateStep",
    "required": false
  },
  {
    "name": "weekdayFormat",
    "description": "The format to use for the weekday strings provided via the weekdays slot prop",
    "type": "\'narrow\' | \'long\' | \'short\'",
    "required": false,
    "default": "\'narrow\'"
  },
  {
    "name": "weekStartsOn",
    "description": "The day of the week to start the calendar on",
    "type": "0 | 1 | 2 | 3 | 4 | 5 | 6",
    "required": false,
    "default": "0"
  }
]'} 

#### Events

:docs-emits-table{name='events-date-range-picker-root' :data='[
  {
    "name": "update:modelValue",
    "description": "Event handler called whenever the model value changes",
    "type": "[date: DateRange]"
  },
  {
    "name": "update:open",
    "description": "Event handler called when the open state of the combobox changes.",
    "type": "[value: boolean]"
  },
  {
    "name": "update:placeholder",
    "description": "Event handler called whenever the placeholder value changes",
    "type": "[date: DateValue]"
  },
  {
    "name": "update:startValue",
    "description": "Event handler called whenever the start value changes",
    "type": "[date: DateValue]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-date-range-picker-root' :data='[
  {
    "name": "modelValue",
    "description": "",
    "type": "DateRange"
  },
  {
    "name": "open",
    "description": "",
    "type": "boolean"
  }
]'} 

#### Exposed

:docs-exposed-table{name='exposed-date-range-picker-root' :data='[
  {
    "name": "isDateDisabled",
    "description": "A function that returns whether or not a date is disabled",
    "type": "DateMatcher"
  },
  {
    "name": "isDateUnavailable",
    "description": "A function that returns whether or not a date is unavailable",
    "type": "DateMatcher"
  },
  {
    "name": "isDateHighlightable",
    "description": "A function that returns whether or not a date is hightable",
    "type": "DateMatcher"
  }
]'} 
