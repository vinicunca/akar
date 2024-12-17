import { expect, it } from 'vitest';
import { components, utilities } from '../constant';
import * as AkarUi from './index';

it('should expose the correct components', () => {
  const exportedComponents = Object.keys(AkarUi).filter((exp) => !exp.includes('inject'));
  expect(exportedComponents).toEqual([...Object.values(components).flat(), ...Object.values(utilities).flat()]);
});
