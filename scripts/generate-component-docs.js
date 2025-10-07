#!/usr/bin/env node

/**
 * Script to generate component markdown files with frontmatter
 * Based on the pattern from accordion.md
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of component files to generate
const components = [
  'alert-dialog',
  'avatar',
  'calendar',
  'checkbox',
  'collapsible',
  'combobox',
  'context-menu',
  'date-field',
  'date-picker',
  'date-range-field',
  'date-range-picker',
  'dialog',
  'dropdown-menu',
  'editable',
  'hover-card',
  'label',
  'listbox',
  'menubar',
  'navigation-menu',
  'number-field',
  'pagination',
  'pin-input',
  'popover',
  'progress',
  'radio-group',
  'range-calendar',
  'scroll-area',
  'select',
  'separator',
  'slider',
  'splitter',
  'stepper',
  'switch',
  'tabs',
  'tags-input',
  'time-field',
  'toast',
  'toggle-group',
  'toggle',
  'toolbar',
  'tooltip',
  'tree',
];

// Component categories mapping (you can customize these)
const categories = {
  'alert-dialog': 'overlay',
  'avatar': 'data',
  'calendar': 'form',
  'checkbox': 'form',
  'collapsible': 'disclosure',
  'combobox': 'form',
  'context-menu': 'overlay',
  'date-field': 'form',
  'date-picker': 'form',
  'date-range-field': 'form',
  'date-range-picker': 'form',
  'dialog': 'overlay',
  'dropdown-menu': 'overlay',
  'editable': 'form',
  'hover-card': 'overlay',
  'label': 'form',
  'listbox': 'form',
  'menubar': 'navigation',
  'navigation-menu': 'navigation',
  'number-field': 'form',
  'pagination': 'navigation',
  'pin-input': 'form',
  'popover': 'overlay',
  'progress': 'feedback',
  'radio-group': 'form',
  'range-calendar': 'form',
  'scroll-area': 'layout',
  'select': 'form',
  'separator': 'layout',
  'slider': 'form',
  'splitter': 'layout',
  'stepper': 'form',
  'switch': 'form',
  'tabs': 'navigation',
  'tags-input': 'form',
  'time-field': 'form',
  'toast': 'feedback',
  'toggle-group': 'form',
  'toggle': 'form',
  'toolbar': 'layout',
  'tooltip': 'overlay',
  'tree': 'data',
};

function generateFrontmatter(componentName) {
  const category = categories[componentName] || 'misc';

  return `---
category: ${category}
links:
  - label: Pohon
    to: /pohon/components/${componentName}
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/akar/blob/main/packages/core/src/${componentName}/index.ts
---
`;
}

function createComponentFile(componentName) {
  const docsDir = path.resolve(__dirname, '../docs/content/akar/3.components');
  const filePath = path.join(docsDir, `${componentName}.md`);

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${componentName}.md (already exists)`);
    return;
  }

  // Ensure directory exists
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const content = generateFrontmatter(componentName);

  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Created ${componentName}.md`);
  } catch (error) {
    console.error(`❌ Failed to create ${componentName}.md:`, error.message);
  }
}

function main() {
  console.log('🚀 Generating component documentation files...\n');

  // Create all component files
  components.forEach(createComponentFile);

  console.log('\n✨ Done! Generated component documentation files.');
  console.log('\n📝 Next steps:');
  console.log('  1. Review and customize the generated files');
  console.log('  2. Add actual component imports to the Anatomy sections');
  console.log('  3. Add proper API documentation');
  console.log('  4. Add examples and accessibility information');
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
