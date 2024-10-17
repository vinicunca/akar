import type { VueWrapper } from '@vue/test-utils';

import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import ATooltip from './stories/_ATooltip.vue';

describe('given default ATooltip', () => {
  let wrapper: VueWrapper<InstanceType<typeof ATooltip>>;

  globalThis.ResizeObserver = class ResizeObserver {
    disconnect() {}
    observe() {}
    unobserve() {}
  };
  beforeEach(() => {
    document.body.innerHTML = '';
    wrapper = mount(ATooltip, { attachTo: document.body });
  },
  );

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();

    await wrapper.find('button').trigger('focus');
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('should open when focus', async () => {
    await wrapper.find('button').trigger('focus');
    expect(document.body.innerHTML).toContain('Add to library');
  });

  describe('after focusing out', () => {
    beforeEach(() => {
      document.body.focus();
    });

    it('should close the tooltip', () => {
      expect(document.body.innerHTML).not.toContain('Add to library');
    });
  });

  describe('disabled tooltip', () => {
    it('should not be open when focus', async () => {
      await wrapper.setProps({ disabled: true });

      await wrapper.find('button').trigger('focus');

      expect(document.body.innerHTML).not.toContain('Add to library');
    });
  });
});
