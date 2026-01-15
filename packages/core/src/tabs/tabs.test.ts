import type { VueWrapper } from '@vue/test-utils';
import { KEY_CODES } from '@vinicunca/perkakas';
import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { ATabsContent, ATabsList, ATabsRoot, ATabsTrigger } from '.';
import Tabs from './story/_tabs.vue';

describe('given default Tabs', () => {
  let wrapper: VueWrapper<InstanceType<typeof Tabs>>;

  beforeEach(() => {
    wrapper = mount(Tabs, { attachTo: document.body });
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

describe('given Tabs without TabsContent', () => {
  it('should not render aria-controls on TabsTrigger', async () => {
    const wrapper = mount({
      components: { ATabsRoot, ATabsList, ATabsTrigger },
      template: `
        <ATabsRoot default-value="tab1">
          <ATabsList>
            <ATabsTrigger value="tab1">Tab 1</ATabsTrigger>
            <ATabsTrigger value="tab2">Tab 2</ATabsTrigger>
          </ATabsList>
        </ATabsRoot>
      `,
    });
    await flushPromises();

    const triggers = wrapper.findAll('[role="tab"]');
    expect(triggers[0].attributes('aria-controls')).toBeUndefined();
    expect(triggers[1].attributes('aria-controls')).toBeUndefined();
  });

  it('should render aria-controls only for TabsTrigger with matching TabsContent', async () => {
    const wrapper = mount({
      components: { ATabsRoot, ATabsList, ATabsTrigger, ATabsContent },
      template: `
        <ATabsRoot default-value="tab1">
          <ATabsList>
            <ATabsTrigger value="tab1">Tab 1</ATabsTrigger>
            <ATabsTrigger value="tab2">Tab 2</ATabsTrigger>
          </ATabsList>
          <ATabsContent value="tab1">Content 1</ATabsContent>
        </ATabsRoot>
      `,
    });
    await flushPromises();

    const triggers = wrapper.findAll('[role="tab"]');
    expect(triggers[0].attributes('aria-controls')).toBeDefined();
    expect(triggers[1].attributes('aria-controls')).toBeUndefined();
  });
});
