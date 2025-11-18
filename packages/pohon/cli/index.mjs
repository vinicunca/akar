#!/usr/bin/env node
import { defineCommand, runMain } from 'citty';
import initLayer from './commands/init/index.mjs';

const main = defineCommand({
  meta: {
    name: 'pohon-ui',
    description: 'Pohon UI CLI',
  },
  subCommands: {
    'init-layer': initLayer,
  },
});

runMain(main);
