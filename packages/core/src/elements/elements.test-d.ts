import type { AkarElementEvent, AkarElementTagNameMap, AkarEventType, AkarIntrinsicElements, UseKebabCaseEventProp } from '.';
import type { DateValue } from '@/date';
import type { Color } from '@/shared/color';
import { describe, expectTypeOf, it } from 'vitest';

// The opt-in documented in the "Custom elements" guide.
declare global {
  interface HTMLElementTagNameMap extends AkarElementTagNameMap {}
}

describe('element typings', () => {
  it('names events like `toEventType()`', () => {
    expectTypeOf<AkarEventType<'update:modelValue'>>().toEqualTypeOf<'update-model-value'>();
    expectTypeOf<AkarEventType<'beforeUpdate:open'>>().toEqualTypeOf<'before-update-open'>();
    expectTypeOf<AkarEventType<'escapeKeyDown'>>().toEqualTypeOf<'escape-key-down'>();
  });

  it('types the default-prefixed tags in `HTMLElementTagNameMap`', () => {
    const el = document.createElement('akar-switch-root');
    expectTypeOf(el.modelValue).toEqualTypeOf<boolean | null | undefined>();
    el.addEventListener('update-model-value', (event) => {
      expectTypeOf(event).toExtend<AkarElementEvent>();
      expectTypeOf(event.detail.value).toEqualTypeOf<boolean>();
      expectTypeOf(event.detail.details.cancel).toBeFunction();
    });
    // @ts-expect-error `as` is not part of the element API
    expectTypeOf(el.as).toBeUnknown();
  });

  it('types Temporal, number-array and color values, and the read-only slot props', () => {
    const calendar = document.createElement('akar-calendar-root');
    expectTypeOf(calendar.minValue).toEqualTypeOf<DateValue | undefined>();
    expectTypeOf(calendar.slotProps).toEqualTypeOf<Readonly<Record<string, unknown>> | undefined>();
    calendar.addEventListener('update-model-value', (event) => {
      expectTypeOf(event.detail.value).toExtend<DateValue | Array<DateValue> | undefined>();
    });
    expectTypeOf(document.createElement('akar-slider-root').defaultValue).toEqualTypeOf<Array<number> | undefined>();
    expectTypeOf<string | Color>().toExtend<NonNullable<HTMLElementTagNameMap['akar-color-field-root']['modelValue']>>();
  });

  it('types the menu, toast and arrow tags', () => {
    document.createElement('akar-dropdown-menu-item').addEventListener('select', (event) => {
      expectTypeOf(event.detail.value).toEqualTypeOf<Event>();
    });
    document.createElement('akar-toast-provider').addEventListener('update-toasts', (event) => {
      expectTypeOf(event.detail.value[0].id).toEqualTypeOf<string>();
    });
    expectTypeOf(document.createElement('akar-popover-arrow').rounded).toEqualTypeOf<boolean | undefined>();
  });

  it('types JSX event props in kebab-case, and steers away from camelCase handlers', () => {
    type Switch = AkarIntrinsicElements<{ defaultValue?: string; title?: string }>['akar-switch-root'];
    type OnUpdate = NonNullable<Switch['onupdate-model-value']>;
    expectTypeOf<Parameters<OnUpdate>[0]['detail']['value']>().toEqualTypeOf<boolean>();
    expectTypeOf<Switch['onUpdateModelValue']>().toEqualTypeOf<UseKebabCaseEventProp<'onupdate-model-value'> | undefined>();
    // The element's own `defaultValue` replaces the base attribute's.
    expectTypeOf<Switch['defaultValue']>().toEqualTypeOf<boolean | undefined>();
    expectTypeOf<Switch['title']>().toEqualTypeOf<string | undefined>();
  });
});
