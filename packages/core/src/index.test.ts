import { expect, it } from 'vitest';
import { components, utilities } from '../constant';
import * as AkarUi from './index';

const exportedComponents = Object.keys(AkarUi).filter((exp) => !exp.includes('inject'));
const constants = [...Object.values(components).flat(), ...Object.values(utilities).flat()];

it.each(constants)('it should export %s', (component) => {
  expect(exportedComponents).toContain(component);
});
