---
"pohon-ui": minor
"akar": minor
---

- fix(DatePicker/DateRangePicker/Calendar/RangeCalendar)!: make weekStartsOn locale-independent
- fix(DatePicker): add exports for DatePicker
- fix(DatePicker/DateRangePicker): replaced type extendance from emits to type
- feat(TimeField): support stepSnapping
- refactor: ensure FocusScope adheres to the Dialog WAI-ARIA design pattern
- fix(HoverCard): reduce padding GraceArea
- fix(TimeField): correct hour display in 12-hour format
- fix(TimeField): call to updateHour to handle 12 hour time
- fix(DatePicker, DateRangePicker): integrate locale handling with useLocale hook
- fix(CheckboxGroup): update update:modelValue emit type
- fix(InputMenu/InputNumber/SelectMenu): proxy size to buttons
- fix(Drawer/Modal/Popover/Slideover): prevent unexpected close on touch when interacting with other overlays
- feat(Theme): new component
- fix(ColorModeImage): add baseURL support for public paths
- fix(Table): improve perfs with shallowRef when watch deep is disabled
- fix(Checkbox/Switch): prevent data-state conflict when used inside Tooltip
- feat(Toaster): prevent duplicate toasts and add pulse animation
- feat(Form): add HTML5 validation to programmatic submit
- fix(ContentNavigation): pass nested child data to slots
- fix(InputMenu/Select/SelectMenu): exclude cosmetic items from model value type
