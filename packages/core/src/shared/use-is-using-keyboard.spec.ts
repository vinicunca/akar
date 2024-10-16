import { fireEvent } from '@testing-library/vue';
import { KEY_CODES } from '@vinicunca/perkakas';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';

import { useIsUsingKeyboard } from './use-is-using-keyboard';

function setupTestComponent() {
  return defineComponent({
    setup() {
      return {
        isUsingKeyboard: useIsUsingKeyboard(),
      };
    },
    template: '<div></div>',
  });
}

describe('useIsUsingKeyboard', () => {
  it('should be false by default', () => {
    const wrapper = mount(setupTestComponent());
    expect(wrapper.vm.isUsingKeyboard).toBe(false);
  });

  it('should be true after keydown', () => {
    const wrapper = mount(setupTestComponent());
    fireEvent.keyDown(document, { key: KEY_CODES.ARROW_DOWN });
    expect(wrapper.vm.isUsingKeyboard).toBe(true);
  });

  it('should reset to false after pointermove', () => {
    const wrapper = mount(setupTestComponent());
    fireEvent.keyDown(document, { key: KEY_CODES.ARROW_DOWN });
    expect(wrapper.vm.isUsingKeyboard).toBe(true);
    fireEvent.pointerMove(document);
    expect(wrapper.vm.isUsingKeyboard).toBe(false);
  });

  it('should reset to false after pointerdown', () => {
    const wrapper = mount(setupTestComponent());
    fireEvent.keyDown(document, { key: KEY_CODES.ARROW_DOWN });
    expect(wrapper.vm.isUsingKeyboard).toBe(true);
    fireEvent.pointerDown(document);
    expect(wrapper.vm.isUsingKeyboard).toBe(false);
  });
});
