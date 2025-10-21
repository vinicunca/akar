# Manual Release Workflow Guide

This guide explains the **manual versioning + automatic publishing** workflow.

## 🎯 Workflow Overview

**You control:** Version bumping  
**GitHub Actions controls:** Publishing to npm

## 📝 Step-by-Step Release Process

### **1. Make Your Changes**
```bash
cd packages/core
# Make your code changes...
```

### **2. Add a Changeset**
```bash
pnpm changeset
```
- Select the package(s) you changed
- Choose the version bump type (patch/minor/major)
- Write a summary

This creates a file like `.changeset/funny-cats-dance.md`

### **3. Bump Versions Locally**
```bash
pnpm bump
```

This command will:
- ✅ Update `package.json` versions
- ✅ Update `CHANGELOG.md` files  
- ✅ Remove consumed changeset files

### **4. Review the Changes**
```bash
git diff
```

Check:
- Package versions are correct
- CHANGELOG entries look good
- Changesets were removed

### **5. Commit and Push**
```bash
git add .
git commit -m "chore: release v1.2.0"
git push origin main
```

### **6. GitHub Actions Publishes (Automatic)**
Once you push to `main`:
- ✅ Workflow detects version changes in `package.json`
- ✅ Builds all packages
- ✅ Publishes **only changed packages** to npm
- ✅ Creates GitHub releases

## 🔄 What the Workflow Does

### **Triggers:**
- Push to `main` branch
- Changes in `packages/*/package.json`

### **Actions:**
1. **Check** if package versions changed
2. **Build** all packages
3. **Publish** only packages with version changes
4. **Create** GitHub releases for published packages

### **Smart Detection:**
The workflow only runs when:
- `package.json` files in packages have changed
- There are changeset files present

## 📦 Release Scenarios

### **Single Package Release**
```bash
# 1. Make changes to akar
cd packages/core

# 2. Create changeset
pnpm changeset
# Select: akar, minor
# Summary: "Add new button variant"

# 3. Bump version
pnpm bump
# Result: akar 1.11.0 → 1.12.0

# 4. Commit & push
git add .
git commit -m "chore: release akar v1.12.0"
git push

# GitHub Actions publishes only akar
```

### **Multiple Package Release**
```bash
# 1. Changes affect multiple packages
pnpm changeset
# Select: akar, plugins, pohon-ui
# akar: minor
# plugins: patch
# pohon-ui: minor

# 2. Bump all versions
pnpm bump
# akar: 1.11.0 → 1.12.0
# plugins: 1.11.0 → 1.11.1
# pohon-ui: 1.0.0 → 1.1.0

# 3. Commit & push
git add .
git commit -m "chore: release multiple packages"
git push

# GitHub Actions publishes all three
```

## 🚨 Important Notes

### **Always Run `pnpm bump` Before Pushing**
If you forget to bump:
```bash
# You pushed changesets but forgot to bump
# Just run locally and push again:
pnpm bump
git add .
git commit -m "chore: bump versions"
git push
```

### **The Workflow Only Publishes**
- ❌ Does NOT run `changeset version` (you do this locally)
- ✅ Only runs `changeset publish`
- ✅ Publishes packages that have version changes

### **Dry Run Testing**
Test what will be published without actually publishing:
```bash
pnpm build
pnpm exec changeset publish --dry-run
```

## 🛠️ Available Commands

```bash
# Create a changeset
pnpm changeset

# Bump versions locally
pnpm bump

# Check what will be released
pnpm exec changeset status

# Build + publish locally (not recommended, let CI do it)
pnpm release

# Dry run (see what would be published)
pnpm exec changeset publish --dry-run
```

## 🔍 Troubleshooting

### **Workflow doesn't trigger**
Check:
- Did you push to `main`?
- Did `package.json` versions change?
- Check GitHub Actions tab for errors

### **Nothing gets published**
Check:
- Did you run `pnpm bump` before pushing?
- Are the versions in `package.json` actually higher than npm?
- Check npm token is valid

### **Wrong version published**
- Always review `git diff` before pushing
- Test with `changeset publish --dry-run` first

## 📊 Workflow Comparison

### **Old Workflow (Fully Automated):**
```
You: changeset → push
↓
CI: version → create PR
↓  
You: merge PR
↓
CI: publish
```

### **New Workflow (Manual Version, Auto Publish):**
```
You: changeset → bump → push
↓
CI: publish
```

## ✅ Benefits

1. **Full control** over version numbers
2. **One commit** for version changes
3. **No version PR** to review
4. **Faster** releases
5. **Still automated** publishing

## 🎯 Summary

**Your workflow:**
1. `pnpm changeset` - Describe changes
2. `pnpm bump` - Update versions
3. `git push` - Push to main
4. ☕ - Wait for CI to publish

That's it! 🎉
