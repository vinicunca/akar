# Pohon UI CLI - Quick Start

This CLI allows users to copy the Pohon UI layer files into their project for customization, just like shadcn/ui does.

## For Users

### Installation

If you have `pohon-ui` installed in your project:

```bash
# Install pohon-ui
pnpm add pohon-ui

# Run the init command
pnpm pohon-ui init
```

Or use npx:

```bash
npx pohon-ui init
```

### What it does

The `init` command will:
1. Copy the `layer` directory to your project
2. Prompt you if files already exist (unless you use `--force`)

After running this, you can customize any theme file to match your design system!

### Usage Examples

```bash
# Basic usage - will prompt if files exist
pnpm pohon-ui init

# Force overwrite without prompts
pnpm pohon-ui init --force

# Initialize in a different directory
pnpm pohon-ui init --cwd ./my-nuxt-app
```

## For Developers

See [CLI README](./README.md) for detailed debugging instructions.

### Quick Debug Methods

1. **Direct execution**:
   ```bash
   node cli/index.mjs init --cwd ./test-project
   ```

2. **Using pnpm link**:
   ```bash
   pnpm link --global
   pohon-ui init
   ```

3. **VS Code debugging**: Use F5 with the launch configuration in `.vscode/launch.json`

## Structure

```
cli/
├── index.mjs              # Main CLI entry point
├── README.md              # Detailed developer docs
├── QUICK_START.md         # This file
└── commands/
    └── init/
        ├── index.mjs      # Init command logic
        └── utils.mjs      # File copying utilities
```

## Similar to shadcn/ui

This approach is inspired by shadcn/ui's philosophy:
- Copy components/themes to your project
- Full control over the code
- No hidden abstractions
- Customize as needed

Instead of importing from a package that you can't modify, you get the actual source files in your project!
