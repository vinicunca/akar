import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';

import { useTestKeyboard } from '~~/test/use-test-keyboard';

import Coba from './coba.vue';

it('coba coba', async () => {
  const user = userEvent.setup();
  const apa = render(Coba);

  const itu = apa.getByTestId('test-coba');

  await user.click(itu);
  await user.keyboard('Enter');
});
