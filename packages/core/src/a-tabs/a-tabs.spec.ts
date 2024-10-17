import type { VueWrapper } from '@vue/test-utils';

import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import ATabs from './story/_ATabs.vue';

describe('given default ATabs', () => {
  let wrapper: VueWrapper<InstanceType<typeof ATabs>>;

  beforeEach(() => {
    wrapper = mount(ATabs, { attachTo: document.body });
    wrapper.find('button').element.focus();
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });

  it('should render tab\'s content', () => {
    expect(wrapper.find('[role=tabpanel]').exists()).toBeTruthy();

    expect(wrapper.html()).toContain('Make changes');
  });

  describe('after changing tab', () => {
    beforeEach(async () => {
      const trigger = wrapper.find('button');
      await trigger.trigger('keydown', { key: KEY_CODES.ARROW_RIGHT });
    });

    it('should focus on next tab', () => {
      const trigger = wrapper.findAll('button')[1];
      expect(trigger.element).toBe(document.activeElement);
    });

    it('should render it\'s content', () => {
      expect(wrapper.find('[role=tabpanel]').exists()).toBeTruthy();
      expect(wrapper.html()).toContain('Change your password');
    });
  });
});
