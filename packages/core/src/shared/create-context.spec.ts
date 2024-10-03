import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';

import { createContext } from '~~/shared/create-context';

describe('createContext', () => {
  const [injectContext, provideContext] = createContext<string>('ParentComponent');

  it('should render the injected value', () => {
    const ChildComponent = defineComponent({
      setup() {
        const context = injectContext();

        return { context };
      },

      template: '<span id="provide-test">{{context}}</span>',
    });

    const ParentComponent = defineComponent({
      setup() {
        provideContext('some-data');
      },

      template: `
    <div>
      <slot />
    </div>
  `,
    });

    const wrapper = mount(ParentComponent, {
      slots: {
        default: () => h(ChildComponent),
      },
    });

    expect(wrapper.find('#provide-test').text()).toBe('some-data');
  });

  describe('should throw error', () => {
    it('with single provider', () => {
      const ChildComponent = defineComponent({
        setup() {
          injectContext();
        },

        template: '<span id="provide-test" />',
      });

      expect(() => mount(ChildComponent))
        .toThrowError('Component must be used within `ParentComponent`');
    });

    it('with multiple providers', () => {
      const [injectContextMulti] = createContext<string>(
        ['AMenuCheckboxItem', 'AMenuRadioItem'],
        'AMenuItemIndicatorContext',
      );

      const ChildComponent = defineComponent({
        setup() {
          injectContextMulti();
        },

        template: '<span id="provide-test" />',
      });

      expect(() => mount(ChildComponent))
        .toThrowError('Component must be used within one of the following components: AMenuCheckboxItem, AMenuRadioItem');
    });
  });
});
