---
"akar": minor
"pohon-ui": minor
---

- feat(DropdownMenu): add filter component
- feat(Checkbox/Switch): add support for custom true/false values
- fix(useForwardExpose): sync currentElement on DOM update
- fix(Calendar): parity + docs regen
- feat: color components
- feat: new TimeRangeField Component
- fix(Toast): resolve accessibility issues flagged by axe-core
- fix(DismissableLayer): guard against non-Element targets in isLayerExist
- fix(useBodyScrollLock): prevent permanent scroll lock on rapid toggle
- fix(useHideOthers): edge case with useHideOthers when nested in a native popover
- fix(Splitter): emit correct units for pixel-sized panels in events
- chore(Menu): add aria-labelledby to MenuGroup
- fix(Combobox): close content when focus moves outside with openOnFocus
- fix(Calendar): add role="application" to fix NVDA keyboard navigation
- fix(Splitter): nested px group ignores defaultSize & percentage drift
- fix(useHideOthers): handle browsers without :popover-open support (Safari 18)
