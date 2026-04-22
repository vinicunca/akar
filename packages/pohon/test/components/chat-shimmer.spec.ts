import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import ChatShimmer from '../../src/runtime/components/chat-shimmer.vue';
import { renderEach } from '../component-render';

describe('ChatShimmer', () => {
  const props = {
    text: 'Loading...',
  };

  renderEach(ChatShimmer, [
    // Props
    ['with text', { props }],
    ['with duration', { props: { ...props, duration: 3 } }],
    ['with spread', { props: { ...props, spread: 4 } }],
    ['with class', { props: { ...props, class: 'font-bold' } }],
    ['with pohon', { props: { ...props, pohon: { base: 'font-bold' } } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ChatShimmer, {
      props,
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
