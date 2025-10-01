<!-- This file was automatic generated. Do not edit it manually -->

#### Props
:docs-props-table{name='props-calendar-root' :data='[
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
    "name": "calendarLabel",
    "description": "The accessible label for the calendar",
    "type": "string",
    "required": false
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
    "type": "DateValue",
    "required": false
  },
  {
    "name": "dir",
    "description": "The reading direction of the calendar when applicable. <br> If omitted, inherits globally from `AConfigProvider` or assumes LTR (left-to-right) reading mode.",
    "type": "\'ltr\' | \'rtl\'",
    "required": false
  },
  {
    "name": "disabled",
    "description": "Whether the calendar is disabled",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "disableDaysOutsideCurrentView",
    "description": "Whether or not to disable days outside the current view.",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "fixedWeeks",
    "description": "Whether or not to always display 6 weeks in the calendar",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "initialFocus",
    "description": "If true, the calendar will focus the selected day, today, or the first day of the month depending on what is visible when the calendar is mounted",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "isDateDisabled",
    "description": "A function that returns whether or not a date is disabled",
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
    "name": "modelValue",
    "description": "The controlled checked state of the calendar",
    "type": "DateValue | DateValue[]",
    "required": false
  },
  {
    "name": "multiple",
    "description": "Whether multiple dates can be selected",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "nextPage",
    "description": "A function that returns the next page of the calendar. It receives the current placeholder as an argument inside the component.",
    "type": "((placeholder: DateValue) => DateValue)",
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
    "name": "pagedNavigation",
    "description": "This property causes the previous and next buttons to navigate by the number of months displayed at once, rather than one month",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "placeholder",
    "description": "The placeholder date, which is used to determine what month to display when no date is selected",
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
    "name": "prevPage",
    "description": "A function that returns the previous page of the calendar. It receives the current placeholder as an argument inside the component.",
    "type": "((placeholder: DateValue) => DateValue)",
    "required": false
  },
  {
    "name": "readonly",
    "description": "Whether the calendar is readonly",
    "type": "boolean",
    "required": false,
    "default": "false"
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

:docs-emits-table{name='events-calendar-root' :data='[
  {
    "name": "update:modelValue",
    "description": "Event handler called whenever the model value changes",
    "type": "[date: DateValue]"
  },
  {
    "name": "update:placeholder",
    "description": "Event handler called whenever the placeholder value changes",
    "type": "[date: DateValue]"
  }
]'} 

#### Slots

:docs-slots-table{name='slots-calendar-root' :data='[
  {
    "name": "date",
    "description": "The current date of the placeholder",
    "type": "DateValue"
  },
  {
    "name": "grid",
    "description": "The grid of dates",
    "type": "DateGrid<DateValue>"
  },
  {
    "name": "weekDays",
    "description": "The days of the week",
    "type": "string[]"
  },
  {
    "name": "weekStartsOn",
    "description": "The start of the week",
    "type": "0 | 1 | 2 | 3 | 4 | 5 | 6"
  },
  {
    "name": "locale",
    "description": "The calendar locale",
    "type": "string"
  },
  {
    "name": "fixedWeeks",
    "description": "Whether or not to always display 6 weeks in the calendar",
    "type": "boolean"
  },
  {
    "name": "modelValue",
    "description": "The current date of the calendar",
    "type": "DateValue | DateValue[] | undefined"
  }
]'} 

#### Exposed

:docs-exposed-table{name='exposed-calendar-root' :data='[
  {
    "name": "isDateDisabled",
    "description": "A function that returns whether or not a date is disabled",
    "type": "DateMatcher"
  },
  {
    "name": "isDateUnavailable",
    "description": "A function that returns whether or not a date is unavailable",
    "type": "DateMatcher"
  }
]'} 
