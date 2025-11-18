# Pohon UI CLI

The Pohon UI CLI provides commands to help you customize your Pohon UI installation.

## Commands

### `init`

Initialize theme customization by copying the layer files into your project.

```bash
pohon-ui init
```

This command will:
1. Copy the `app.config.ts` file to your `app/` directory
2. Copy all theme files from `layer/app/themes/` to your `app/themes/` directory
3. Allow you to customize the theme files to match your design

#### Options

- `--cwd <path>` - Specify the working directory (default: current directory)
- `--force` - Force overwrite existing files without prompting

#### Examples

```bash
# Initialize in current directory
pohon-ui init

# Initialize in a specific directory
pohon-ui init --cwd ./my-nuxt-app

# Force overwrite existing files
pohon-ui init --force
```

## Debugging the CLI in Development

When developing the CLI, you have several options for debugging:

### 1. Using `pnpm link` (Recommended)

This creates a global symlink to your local package:

```bash
# In the pohon package directory
cd packages/pohon

# Create a global link
pnpm link --global

# Now you can use the CLI from anywhere
pohon-ui init

# When done, unlink
pnpm unlink --global
```

### 2. Direct Node Execution

Run the CLI directly with Node:

```bash
# From the pohon package directory
node cli/index.mjs init

# Or from the workspace root
node packages/pohon/cli/index.mjs init --cwd ./test-project
```

### 3. Using a Test Project

Create a test Nuxt project and test the CLI:

```bash
# Create a test project
npx nuxi init test-project
cd test-project

# Install dependencies
pnpm install

# Run the CLI from your development package
node ../packages/pohon/cli/index.mjs init
```

### 4. Using Node Debugger

For step-by-step debugging:

```bash
# Using Node's inspect mode
node --inspect-brk cli/index.mjs init

# Then open chrome://inspect in Chrome and click "inspect"
```

### 5. VS Code Debugging

Add this configuration to your `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug CLI Init",
      "program": "${workspaceFolder}/packages/pohon/cli/index.mjs",
      "args": ["init", "--cwd", "${workspaceFolder}/test-project"],
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

Then press F5 or use the Debug panel to start debugging.

### 6. Add Console Logs

For quick debugging, add console logs or use `consola.debug()`:

```javascript
import { consola } from 'consola';

// In your code
consola.debug('Current working directory:', cwd);
consola.debug('Themes path:', themesPath);
```

### Tips

- The CLI uses `citty` for command handling and `consola` for logging
- Use `consola.info()`, `consola.success()`, `consola.warn()`, and `consola.error()` for consistent output
- The `@clack/prompts` library is used for interactive prompts
- Files are copied using Node's built-in `fs.promises` module with `pathe` for cross-platform path handling

## Development Workflow

1. Make changes to the CLI files in `packages/pohon/cli/`
2. Test using one of the debugging methods above
3. Check for linting errors: `pnpm lint`
4. Build the package: `pnpm build`
5. Test the built package in a real project

## Common Issues

### "Module not found" errors

Make sure you've installed dependencies:
```bash
pnpm install
```

### Permission denied

The CLI entry point needs to be executable. Check the shebang line:
```javascript
#!/usr/bin/env node
```

### Changes not reflecting

If using `pnpm link`, you may need to unlink and relink after major changes:
```bash
pnpm unlink --global
pnpm link --global
```
