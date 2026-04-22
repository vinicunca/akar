import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Error from '../../src/runtime/components/error.vue';
import { renderEach } from '../component-render';

describe('Error', () => {
  const error = {
    statusCode: 404,
    statusMessage: 'Not Found',
    message: 'The page you are looking for does not exist.',
  };

  const errorWithStatus = {
    status: 500,
    statusText: 'Internal Server Error',
    message: 'Something went wrong.',
  };

  const props = { error };

  renderEach(Error, [
    // Props
    ['with error', { props }],
    ['with error using status/statusText', { props: { error: errorWithStatus } }],
    ['with redirect', { props: { ...props, redirect: '/blog' } }],
    ['with clear', { props: { ...props, clear: { label: 'Home' } } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'min-h-full' } }],
    ['with pohon', { props: { ...props, pohon: { links: 'mt-16' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with statusCode slot', { props, slots: { statusCode: () => 'Status code slot' } }],
    ['with statusMessage slot', { props, slots: { statusMessage: () => 'Status message slot' } }],
    ['with message slot', { props, slots: { message: () => 'Message slot' } }],
    ['with links slot', { props, slots: { links: () => 'Links slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Error, {
      props: {
        error,
        redirect: '/blog',
        clear: { label: 'Home' },
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
