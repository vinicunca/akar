# pohon-ui

## 1.6.0

### Minor Changes

- [#766](https://github.com/vinicunca/akar/pull/766) [`aa11413`](https://github.com/vinicunca/akar/commit/aa11413bc95fa4a1fead0c19a55b5497e42ac52a) Thanks [@praburangki](https://github.com/praburangki)! - - chore(deps): replace dependency @tsconfig/node18 with @tsconfig/node20
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
  - fix(Tabs): only render aria-controls when TabsContent exists
  - fix(Combobox): allow input focus when used inside Dialog
  - fix(FormField): hide error if error prop is false
  - feat(ContextMenu/DropdownMenu): expose sub prop on content slots
  - feat(defineShortcuts): add layoutIndependent option
  - fix(ProseA/ProseCallout/ProseCard): improve focus styles
  - docs(toast): add callback example
  - docs(extract-shortcuts): add own page
  - docs(composables): add defineLocale and extendLocale
  - feat(extractShortcuts): add separator option
  - docs(app): add component theme visualizer
  - feat(ProseCodeTree): add items prop
  - feat(Slideover): add inset prop
  - feat(FormField): add orientation prop
  - feat(docs): add component theme visualizer
  - fix(CommandPalette/ContextMenu/DropdownMenu): keyboard selection on link items
  - feat(InputMenu/SelectMenu): add clear prop
  - feat(CommandPalette): add input prop
  - feat(CommandPalette/InputMenu/SelectMenu/Tree): handle virtualizer estimateSize as function
  - fix(Editor): set contentType when updating value
  - fix(EditorToolbar): prevent disabled dropdown when items have no kind
  - fix(EditorToolbar): prevent onClick from being called twice on items
  - fix(Banner): prevent XSS via id prop injection
  - docs(components): properly escape markdown in prop type rendering
  - feat(pohon): add unplugin for vue
  - feat(Editor): handle boolean in image and mention props
  - docs(table): improve examples to use meta
  - feat(Editor): add placeholder.mode prop
  - fix(useOverlay): refine close event argument extraction
  - feat(ProseTd/ProseTh): handle align prop
  - feat(InputMenu/Select/SelectMenu): expose viewportRef for infinite scroll
  - feat(Timeline/Stepper): add wrapper slot and fix dynamic slot conditions
  - docs: send back markdown if accept header is text/markdown

### Patch Changes

- Updated dependencies [[`aa11413`](https://github.com/vinicunca/akar/commit/aa11413bc95fa4a1fead0c19a55b5497e42ac52a)]:
  - akar@1.16.0

## 1.5.0

### Minor Changes

- [#764](https://github.com/vinicunca/akar/pull/764) [`2a6f561`](https://github.com/vinicunca/akar/commit/2a6f5617f15c21dd264f2afdc5fc31ef99ee44e4) Thanks [@praburangki](https://github.com/praburangki)! - - chore(deps): update dependency vite to ^7.2.7
  - fix(ComboboxCancel): reset model value on clear without requiring input element
  - chore(deps): update build
  - fix(useForwardExpose): expose specified ref properties to parent ref
  - fix(Combobox): restore body pointer-event style
  - fix(Tooltip): reset isPointerInTransit to ensure trigger always works
  - fix(RangeCalendar): ensure update:validModelValue always emits latest value
  - fix(Combobox): don't focus the trigger element after closing
  - fix(Tabs): update indicator style when element size changes
  - fix(DateRangePicker/DatePicker): root has invalid as,asChild props
  - fix(Select): always show select arrow and leave display to the select content
  - feat(Editor): new component
  - feat(InputMenu/Select/SelectMenu): add modelModifiers prop

### Patch Changes

- Updated dependencies [[`2a6f561`](https://github.com/vinicunca/akar/commit/2a6f5617f15c21dd264f2afdc5fc31ef99ee44e4)]:
  - akar@1.15.0

## 1.4.0

### Minor Changes

- [#761](https://github.com/vinicunca/akar/pull/761) [`23be298`](https://github.com/vinicunca/akar/commit/23be298e47f25b8c2a60356ddb51e5c8b534702f) Thanks [@praburangki](https://github.com/praburangki)! - \n
  - feat(Select): add disableOutsidePointerEvents prop to Content
  - fix(Tooltip): empty ariaLabel for nested components in Content
  - fix(RangeCalendar): a11y aria attribute in CellTrigger
  - fix(InputDate/InputTime): add missing field group variant

### Patch Changes

- Updated dependencies [[`23be298`](https://github.com/vinicunca/akar/commit/23be298e47f25b8c2a60356ddb51e5c8b534702f)]:
  - akar@1.14.0

## 2.0.0

### Major Changes

- [#759](https://github.com/vinicunca/akar/pull/759) [`c7c6366`](https://github.com/vinicunca/akar/commit/c7c6366ff23dd5e8ed531fdf5867ea487e66e987) Thanks [@praburangki](https://github.com/praburangki)! - update deps

### Minor Changes

- [#759](https://github.com/vinicunca/akar/pull/759) [`c7c6366`](https://github.com/vinicunca/akar/commit/c7c6366ff23dd5e8ed531fdf5867ea487e66e987) Thanks [@praburangki](https://github.com/praburangki)! - chore(components): reduce type verbosity by omitting link props from action buttons

### Patch Changes

- Updated dependencies [[`c7c6366`](https://github.com/vinicunca/akar/commit/c7c6366ff23dd5e8ed531fdf5867ea487e66e987)]:
  - akar@2.0.0

## 1.3.0

### Minor Changes

- [#757](https://github.com/vinicunca/akar/pull/757) [`7c2ee29`](https://github.com/vinicunca/akar/commit/7c2ee295fa048531b026896922f2b1a7636b05e8) Thanks [@praburangki](https://github.com/praburangki)! - chore(components): reduce type verbosity by omitting link props from action buttons

## 1.2.0

### Minor Changes

- [#755](https://github.com/vinicunca/akar/pull/755) [`c5ae2f6`](https://github.com/vinicunca/akar/commit/c5ae2f626433742a509212890465c8086f3a7917) Thanks [@praburangki](https://github.com/praburangki)! - - fix(ScrollArea): correct scrollbar padding calculation
  - chore(deps): update build
  - fix(ScrollArea): update thumb position when content size changes
  - fix(RangeCalendar): maximum days highlight out of range
  - fix(Combobox): highlight element for async options
  - fix(DateField): prevent day value from being incorrectly constrained during input
  - docs: fix broken wai-aria docs links in dropdown dropdown-menu docs
  - fix(Tree): don't mutate the expanded state
  - fix(ContentSearch/DasboardSearch): set full height on mobile to prevent jump
  - fix(Table): only forward necessary props

### Patch Changes

- Updated dependencies [[`c5ae2f6`](https://github.com/vinicunca/akar/commit/c5ae2f626433742a509212890465c8086f3a7917)]:
  - akar@1.13.0

## 1.1.0

### Minor Changes

- [`a6f16d7`](https://github.com/vinicunca/akar/commit/a6f16d7a6ef3f18d81250c7b7269a4b8b40dfd49) Thanks [@praburangki](https://github.com/praburangki)! - update unocss-variants

## 1.0.16

### Patch Changes

- [`147cf74`](https://github.com/vinicunca/akar/commit/147cf745d5a6e367ee4fe763dd0f3e47e4e64bca) Thanks [@praburangki](https://github.com/praburangki)! - release

- Updated dependencies [[`147cf74`](https://github.com/vinicunca/akar/commit/147cf745d5a6e367ee4fe763dd0f3e47e4e64bca)]:
  - akar@1.12.1

## 1.0.15

### Patch Changes

- [`0625b11`](https://github.com/vinicunca/akar/commit/0625b117abe8a1b7ee6d6baf010ee0df6a9b9505) Thanks [@praburangki](https://github.com/praburangki)! - feat(components): handle description in items
  fix(Breadcrumb): handle active in items
  fix(ContextMenu/DropdownMenu): allow item content class override
  fix(ContentSearch): de-duplicate description and suffix
  feat(ProseImg): improve zoom transition
  feat(CommandPalette): preserve group order in search results
  feat(CommandPalette)!: add children-icon prop to use trailing-icon in input

## 1.0.14

### Patch Changes

- Updated dependencies [[`ee04233`](https://github.com/vinicunca/akar/commit/ee04233f979f587748ffe81f9496b9da397ccc56)]:
  - akar@1.12.0
