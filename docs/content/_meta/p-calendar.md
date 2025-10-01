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
    'name': 'allowNonContiguousRanges',
    'description': '<p>When combined with <code>isDateUnavailable</code>, determines whether non-contiguous ranges, i.e. ranges containing unavailable dates, may be selected.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'color',
    'description': '',
    'type': '\'error\' | \'primary\' | \'secondary\' | \'success\' | \'info\' | \'warning\' | \'neutral\'',
    'required': false
  },
  {
    'name': 'defaultPlaceholder',
    'description': '<p>The default placeholder date</p>\n',
    'type': 'DateValue',
    'required': false
  },
  {
    'name': 'defaultValue',
    'description': '',
    'type': 'DateValue | DateRange | DateValue[]',
    'required': false
  },
  {
    'name': 'disabled',
    'description': '<p>Whether or not the calendar is disabled</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'disableDaysOutsideCurrentView',
    'description': '<p>Whether or not to disable days outside the current view.</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'fixedDate',
    'description': '<p>Which part of the range should be fixed</p>\n',
    'type': '\'start\' | \'end\'',
    'required': false
  },
  {
    'name': 'fixedWeeks',
    'description': '<p>Whether or not to always display 6 weeks in the calendar</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'initialFocus',
    'description': '<p>If true, the calendar will focus the selected day, today, or the first day of the month depending on what is visible when the calendar is mounted</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'isDateDisabled',
    'description': '<p>A function that returns whether or not a date is disabled</p>\n',
    'type': 'DateMatcher',
    'required': false
  },
  {
    'name': 'isDateHighlightable',
    'description': '<p>A function that returns whether or not a date is hightable</p>\n',
    'type': 'DateMatcher',
    'required': false
  },
  {
    'name': 'isDateUnavailable',
    'description': '<p>A function that returns whether or not a date is unavailable</p>\n',
    'type': 'DateMatcher',
    'required': false
  },
  {
    'name': 'maximumDays',
    'description': '<p>The maximum number of days that can be selected in a range</p>\n',
    'type': 'number',
    'required': false
  },
  {
    'name': 'maxValue',
    'description': '<p>The maximum date that can be selected</p>\n',
    'type': 'DateValue',
    'required': false
  },
  {
    'name': 'minValue',
    'description': '<p>The minimum date that can be selected</p>\n',
    'type': 'DateValue',
    'required': false
  },
  {
    'name': 'modelValue',
    'description': '',
    'type': 'DateValue | DateRange | DateValue[] | null',
    'required': false
  },
  {
    'name': 'monthControls',
    'description': '<p>Show month controls</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'multiple',
    'description': '<p>Whether or not multiple dates can be selected</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'nextMonth',
    'description': '<p>Configure the next month button.\n<code>{ color: 'neutral', variant: 'ghost' }</code>{lang=&quot;ts-type&quot;}</p>\n',
    'type': 'PButtonProps',
    'required': false
  },
  {
    'name': 'nextMonthIcon',
    'description': '<p>The icon to use for the next month control.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'nextPage',
    'description': '<p>A function that returns the next page of the calendar. It receives the current placeholder as an argument inside the component.</p>\n',
    'type': '((placeholder: DateValue) => DateValue)',
    'required': false
  },
  {
    'name': 'nextYear',
    'description': '<p>Configure the next year button.\n<code>{ color: 'neutral', variant: 'ghost' }</code>{lang=&quot;ts-type&quot;}</p>\n',
    'type': 'PButtonProps',
    'required': false
  },
  {
    'name': 'nextYearIcon',
    'description': '<p>The icon to use for the next year control.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'numberOfMonths',
    'description': '<p>The number of months to display at once</p>\n',
    'type': 'number',
    'required': false
  },
  {
    'name': 'pagedNavigation',
    'description': '<p>This property causes the previous and next buttons to navigate by the number of months displayed at once, rather than one month</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'placeholder',
    'description': '<p>The placeholder date, which is used to determine what month to display when no date is selected. This updates as the user navigates the calendar and can be used to programmatically control the calendar view</p>\n',
    'type': 'DateValue',
    'required': false
  },
  {
    'name': 'preventDeselect',
    'description': '<p>Whether or not to prevent the user from deselecting a date without selecting another date first</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'prevMonth',
    'description': '<p>Configure the prev month button.\n<code>{ color: 'neutral', variant: 'ghost' }</code>{lang=&quot;ts-type&quot;}</p>\n',
    'type': 'PButtonProps',
    'required': false
  },
  {
    'name': 'prevMonthIcon',
    'description': '<p>The icon to use for the previous month control.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'prevPage',
    'description': '<p>A function that returns the previous page of the calendar. It receives the current placeholder as an argument inside the component.</p>\n',
    'type': '((placeholder: DateValue) => DateValue)',
    'required': false
  },
  {
    'name': 'prevYear',
    'description': '<p>Configure the prev year button.\n<code>{ color: 'neutral', variant: 'ghost' }</code>{lang=&quot;ts-type&quot;}</p>\n',
    'type': 'PButtonProps',
    'required': false
  },
  {
    'name': 'prevYearIcon',
    'description': '<p>The icon to use for the previous year control.</p>\n',
    'type': 'string | object',
    'required': false
  },
  {
    'name': 'range',
    'description': '<p>Whether or not a range of dates can be selected</p>\n',
    'type': 'boolean',
    'required': false
  },
  {
    'name': 'readonly',
    'description': '<p>Whether or not the calendar is readonly</p>\n',
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
    'name': 'weekdayFormat',
    'description': '<p>The format to use for the weekday strings provided via the weekdays slot prop</p>\n',
    'type': '\'long\' | \'narrow\' | \'short\'',
    'required': false
  },
  {
    'name': 'weekStartsOn',
    'description': '<p>The day of the week to start the calendar on</p>\n',
    'type': '0 | 1 | 2 | 3 | 4 | 5 | 6',
    'required': false
  },
  {
    'name': 'yearControls',
    'description': '<p>Show year controls</p>\n',
    'type': 'boolean',
    'required': false,
    'default': 'true'
  },
  {
    'name': 'pohon',
    'description': '',
    'type': '{ root?: ClassValue; header?: ClassValue; body?: ClassValue; heading?: ClassValue; grid?: ClassValue; gridRow?: ClassValue; gridWeekDaysRow?: ClassValue; gridBody?: ClassValue; headCell?: ClassValue; cell?: ClassValue; cellTrigger?: ClassValue; }',
    'required': false
  }
]" />

<DocsEmitsTable :data="[
  {
    'name': 'update:modelValue',
    'description': '',
    'type': '[date: DateValue | DateRange | DateValue[] | null]'
  },
  {
    'name': 'update:placeholder',
    'description': '',
    'type': '[date: DateValue] & [date: DateValue]'
  },
  {
    'name': 'update:startValue',
    'description': '',
    'type': '[date: DateValue]'
  },
  {
    'name': 'update:validModelValue',
    'description': '',
    'type': '[date: DateRange]'
  }
]" />

<DocsSlotsTable :data="[
  {
    'name': 'value',
    'description': '',
    'type': 'string'
  }
]" />
