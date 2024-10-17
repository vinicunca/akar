import type { VueWrapper } from '@vue/test-utils';

import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { AToggle } from '.';

describe('given default AToggle', () => {
  let wrapper: VueWrapper<InstanceType<typeof AToggle>>;

  beforeEach(() => {
    wrapper = mount(AToggle, {
      attrs: { 'aria-label': 'AToggle italic' },
    });
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('should not be toggled yet', () => {
    expect(wrapper.attributes('data-state')).toBe('off');
  });

  describe('after toggling', () => {
    beforeEach(() => {
      wrapper.trigger('click');
    });

    it('should be toggled on', () => {
      expect(wrapper.attributes('data-state')).toBe('on');
    });

    describe('after toggling again', () => {
      beforeEach(() => {
        wrapper.trigger('click');
      });

      it('should be toggled off', () => {
        expect(wrapper.attributes('data-state')).toBe('off');
      });
    });
  });
});

describe('given disabled AToggle', () => {
  let wrapper: VueWrapper<InstanceType<typeof AToggle>>;

  beforeEach(() => {
    wrapper = mount(AToggle, {
      props: { disabled: true },
      attrs: { 'aria-label': 'AToggle italic' },
    });
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('should not be toggled yet', () => {
    expect(wrapper.attributes('data-state')).toBe('off');
  });

  describe('try toggling', () => {
    beforeEach(() => {
      wrapper.trigger('click');
    });

    it('should be toggled off', () => {
      expect(wrapper.attributes('data-state')).toBe('off');
    });

    it('should render disable attributes', () => {
      expect(wrapper.attributes('data-disabled')).toBe('');
      expect(wrapper.attributes('disabled')).toBe('');
    });
  });
});
