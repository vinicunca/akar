# How Selective Package Publishing Works

## 🎯 The Magic: Changesets Only Publishes Changed Packages

When you run `changeset publish`, it **automatically detects** which packages have new versions and **only publishes those**.

## 📦 Examples

### **Scenario 1: Only Bump `akar`**

```bash
# 1. Create changeset for akar only
pnpm changeset
# Select: ✓ akar
#         ✗ plugins
#         ✗ pohon-ui
#         ✗ @vinicunca/unocss-preset
# Type: minor

# 2. Bump version
pnpm bump
# Result:
# ✓ akar: 1.11.0 → 1.12.0
# ✗ plugins: 1.11.0 (unchanged)
# ✗ pohon-ui: 1.0.0 (unchanged)
# ✗ @vinicunca/unocss-preset: 1.31.0 (unchanged)

# 3. Commit and push
git add .
git commit -m "chore: release akar v1.12.0"
git push
```

**GitHub Actions will:**
- ✅ Build all packages
- ✅ Run `changeset publish`
- ✅ Publish **ONLY akar** to npm
- ✅ Create release: `akar@1.12.0`
- ✗ Skip plugins, pohon-ui, unocss-preset

### **Scenario 2: Bump `akar` and `pohon-ui`**

```bash
# 1. Create changeset
pnpm changeset
# Select: ✓ akar
#         ✗ plugins
#         ✓ pohon-ui
#         ✗ @vinicunca/unocss-preset
# akar: minor
# pohon-ui: patch

# 2. Bump versions
pnpm bump
# Result:
# ✓ akar: 1.11.0 → 1.12.0
# ✗ plugins: 1.11.0 (unchanged)
# ✓ pohon-ui: 1.0.0 → 1.0.1
# ✗ @vinicunca/unocss-preset: 1.31.0 (unchanged)

# 3. Commit and push
git add .
git commit -m "chore: release akar v1.12.0 and pohon-ui v1.0.1"
git push
```

**GitHub Actions will:**
- ✅ Publish **akar@1.12.0**
- ✅ Publish **pohon-ui@1.0.1**
- ✅ Create releases for both
- ✗ Skip plugins and unocss-preset

### **Scenario 3: Bump Only `@vinicunca/unocss-preset`**

```bash
# 1. Create changeset
pnpm changeset
# Select: ✗ akar
#         ✗ plugins
#         ✗ pohon-ui
#         ✓ @vinicunca/unocss-preset
# Type: patch

# 2. Bump version
pnpm bump
# Result:
# ✗ akar: 1.11.0 (unchanged)
# ✗ plugins: 1.11.0 (unchanged)
# ✗ pohon-ui: 1.0.0 (unchanged)
# ✓ @vinicunca/unocss-preset: 1.31.0 → 1.31.1

# 3. Commit and push
git add .
git commit -m "chore: release unocss-preset v1.31.1"
git push
```

**GitHub Actions will:**
- ✅ Publish **ONLY @vinicunca/unocss-preset@1.31.1**
- ✅ Create release: `@vinicunca/unocss-preset@1.31.1`
- ✗ Skip akar, plugins, pohon-ui

## 🔍 How Does It Work?

### **Step 1: Changesets Compares Versions**

When `changeset publish` runs, it:
1. Reads the local `package.json` version (e.g., `1.12.0`)
2. Checks npm registry for published version (e.g., `1.11.0`)
3. Compares: `1.12.0` > `1.11.0` → **Needs publishing**

### **Step 2: Only Publishes New Versions**

```
akar: 1.12.0 (local) vs 1.11.0 (npm) → Publish ✅
plugins: 1.11.0 (local) vs 1.11.0 (npm) → Skip ✗
pohon-ui: 1.0.1 (local) vs 1.0.0 (npm) → Publish ✅
@vinicunca/unocss-preset: 1.31.0 (local) vs 1.31.0 (npm) → Skip ✗
```

### **Step 3: GitHub Actions Output**

The workflow logs will show:
```
📦 Checking packages to publish...
🦋 Packages to be published:
🦋   - akar@1.12.0
🦋   - pohon-ui@1.0.1

✅ Successfully published packages:
  - akar@1.12.0
  - pohon-ui@1.0.1

Creating release for akar@1.12.0
Creating release for pohon-ui@1.0.1
```

## 🎯 Key Points

1. **No manual filtering needed** - Changesets automatically detects which packages need publishing
2. **Safe** - If a package version already exists on npm, it won't try to republish
3. **Efficient** - Only builds once, publishes selectively
4. **No separate workflows needed** - One workflow handles all packages
5. **Works for any combination** - 1 package, 2 packages, all packages - it adapts automatically

## 🚀 Workflow Logic

```yaml
# Triggers on ANY package.json change
paths:
  - 'packages/*/package.json'

# But changesets publish only publishes:
# - Packages where local version > npm version
```

## 💡 Pro Tips

### **See what will be published before pushing:**
```bash
pnpm bump
pnpm exec changeset publish --dry-run
```

Output shows:
```
🦋 The following packages will be published:
🦋   - akar@1.12.0
```

### **Check current npm versions:**
```bash
npm view akar version
npm view pohon-ui version
npm view @vinicunca/unocss-preset version
```

### **Verify after pushing:**
Check GitHub Actions logs to see:
- Which packages were detected
- Which packages were published
- Which releases were created

## ✅ Summary

**Your workflow already does selective publishing automatically!**

- Bump only `akar` → Publishes only `akar`
- Bump only `pohon-ui` → Publishes only `pohon-ui`
- Bump all packages → Publishes all packages
- Bump 2 packages → Publishes those 2 packages

**No additional configuration needed!** 🎉
