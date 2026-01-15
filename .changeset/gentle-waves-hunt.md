---
"pohon-ui": minor
"akar": minor
---

- chore(deps): replace dependency @tsconfig/node18 with @tsconfig/node20
- feat(ScrollArea): add glimpse scrollbar mode
- feat(PinInput): enforce sequential inputs in OTP
- feat(Menu): allow more value types
- feat(NumberField): add focusOnChange prop
- fix(TimeField/DateField/DateRangeField): filter redundant brackets with hideTimeZone
- feat(PopperContent): add hideShiftedArrow prop to control arrow visibility
- fix(DateRangePicker): add exports for missing component types and include TimeValue type in exports
- fix(PinInput): handle more edge cases for the placeholder
- fix: dayPeriod returning incorrect value due to missmatched format
- fix(Editable): prevent submission during IME composition
- fix(NavigationMenu): allow aria-label override by fixing CollectionSlot attrs forwarding
- fix(Avatar): Properly set referrerpolicy and crossorigin
- fix(NavigationMenu): close menu when clicking top-level link
