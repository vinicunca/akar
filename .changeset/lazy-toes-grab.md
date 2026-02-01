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
