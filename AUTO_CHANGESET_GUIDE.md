# Automated Changeset Generation

You have **3 options** to avoid manually typing changeset summaries:

## 🤖 Option 1: Auto-Changeset Script (Local)

Generate changesets automatically from your conventional commits.

### **Setup:**

Add to `package.json`:
```json
{
  "scripts": {
    "changeset:auto": "node scripts/auto-changeset.js"
  }
}
```

### **Usage:**

```bash
# 1. Make commits using conventional commits
git commit -m "feat(button): add new variant"
git commit -m "fix(input): handle edge case"

# 2. Generate changesets automatically
pnpm changeset:auto

# 3. Review and bump
pnpm bump
git push
```

### **How it works:**
- Reads commits since last tag
- Detects packages from changed files
- Maps commit types to bump types:
  - `feat:` → **minor**
  - `fix:` → **patch**  
  - `BREAKING CHANGE` or `!:` → **major**
- Generates changeset files automatically

### **Example:**

```bash
# You committed:
# - feat(core): add new button component
# - fix(pohon): fix input validation

pnpm changeset:auto

# Creates:
# .changeset/auto-a1b2c3d4.md
---
"akar": minor
---
Add new button component

# .changeset/auto-e5f6g7h8.md  
---
"pohon-ui": patch
---
Fix input validation
```

---

## 🏷️ Option 2: GitHub PR Labels (CI-based)

Automatically generate changesets based on PR labels.

### **How it works:**

1. Open a PR
2. Add labels: `patch`, `minor`, or `major`
3. Workflow automatically creates changeset
4. Uses PR title as summary

### **Usage:**

```bash
# 1. Create PR
git checkout -b feat/new-button
# make changes
git push

# 2. Add label to PR on GitHub
# Label: "minor"

# 3. GitHub Actions automatically:
# - Detects changed packages
# - Creates changeset with PR title
# - Commits to your branch
```

### **Labels:**
- `patch` - Bug fixes
- `minor` - New features
- `major` - Breaking changes
- `skip-changeset` - Skip changeset creation

### **Workflow file:** `.github/workflows/auto-changeset.yaml`

---

## ✍️ Option 3: One-Liner Manual

Still want control but faster? Use this pattern:

```bash
# Create changeset with one command
echo -e "---\n\"akar\": minor\n---\n\nAdd new button variant" > .changeset/my-feature.md
```

Or create an alias:

```bash
# Add to your ~/.zshrc
alias csadd='f(){ echo -e "---\n\"$1\": $2\n---\n\n$3" > .changeset/$(openssl rand -hex 4).md; };f'

# Usage:
csadd akar minor "Add new button variant"
csadd pohon-ui patch "Fix input validation"
```

---

## 📊 Comparison

| Method | Speed | Control | Best For |
|--------|-------|---------|----------|
| **Auto Script** | ⚡️⚡️⚡️ Fast | 🎯 Medium | Multiple commits, local development |
| **PR Labels** | ⚡️⚡️ Medium | 🎯 Low | Team collaboration, automated workflow |
| **Manual** | ⚡️ Slow | 🎯🎯🎯 Full | Custom scenarios, precise control |

---

## 🎯 Recommended Workflow

### **For Solo Development:**
```bash
# Use conventional commits + auto script
git commit -m "feat(button): add variant"
git commit -m "fix(input): validation"
pnpm changeset:auto
pnpm bump
git push
```

### **For Team Development:**
Use PR labels - let CI handle it automatically!

### **For Precise Control:**
Manually run `pnpm changeset` when needed.

---

## 💡 Pro Tips

### **Mix and Match:**
```bash
# Auto-generate most changesets
pnpm changeset:auto

# Manually add one more
pnpm changeset

# Then bump all together
pnpm bump
```

### **Preview Before Committing:**
```bash
pnpm changeset:auto
cat .changeset/*.md  # Review
pnpm bump            # Apply if good
# or
rm .changeset/auto-* # Remove if bad
```

### **Conventional Commits Guide:**
```bash
# Format: type(scope): description

# Features (minor)
git commit -m "feat(button): add new variant"
git commit -m "feat: add dark mode support"

# Fixes (patch)  
git commit -m "fix(input): handle empty value"
git commit -m "fix: correct validation logic"

# Breaking (major)
git commit -m "feat(api)!: change prop names"
git commit -m "feat: remove deprecated methods

BREAKING CHANGE: removed `oldMethod`"
```

---

## 🚀 Quick Start

1. **Make commits with conventional format**
2. **Run:** `pnpm changeset:auto`
3. **Review:** Check `.changeset/` folder
4. **Bump:** `pnpm bump`
5. **Push:** `git push`

Done! No more manual typing! 🎉
