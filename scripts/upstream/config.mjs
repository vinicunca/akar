/**
 * How `scripts/upstream/sync.mjs` mirrors Reka UI into Akar's vendor branches.
 * Changing anything here changes the normalized output, so the cache is rebuilt.
 */
export default {
  repository: 'https://github.com/unovue/reka-ui.git',

  /**
   * Each line mirrors one upstream branch into one vendor branch.
   * Merge the vendor branch into `target` to take the upstream changes.
   * `parentLine` links merges from Reka `v2` into Reka `v3` to the matching v2 vendor commit.
   */
  lines: {
    v2: {
      upstreamBranch: 'v2',
      vendorBranch: 'upstream/reka-v2',
      target: 'main',
    },
    v3: {
      upstreamBranch: 'v3',
      vendorBranch: 'upstream/reka-v3',
      target: 'next',
      parentLine: 'v2',
    },
  },

  /** The Akar branch whose ESLint config and dependencies normalize the upstream files. */
  lintRef: 'main',

  /** Upstream paths to mirror. Everything else in Akar is left alone. */
  include: [
    'packages/core',
    'packages/plugins',
    'playground',
  ],

  /** Upstream files Akar maintains on its own. */
  exclude: [
    '**/pnpm-lock.yaml',
    'packages/core/LICENSE',
    'packages/core/README.md',
  ],

  /**
   * Upstream bumps the version on every release.
   * Pinning it keeps those bumps from conflicting with Akar's own version.
   */
  pinnedVersion: '0.0.0-upstream',

  /** Text matching these patterns is kept as is, before the replacements run. */
  keep: [
    // Issues, pull requests and commits stay linked to Reka UI.
    /github\.com\/unovue\/reka-ui\/(?:issues|pull|discussions|commit)\/\w+/g,
  ],

  /** Applied in order to every text file. */
  replacements: [
    [/https:\/\/(?:www\.)?reka-ui\.com\/docs\//g, 'https://vinicunca.dev/akar/'],
    [/https:\/\/(?:www\.)?reka-ui\.com/g, 'https://vinicunca.dev'],
    [/github\.com\/unovue\/reka-ui/g, 'github.com/vinicunca/akar'],
    [/Reka UI/g, 'Akar'],
    [/RekaUI/g, 'Akar'],
    [/reka-ui/g, 'akar'],
    [/REKA/g, 'AKAR'],
    [/Reka/g, 'Akar'],
    [/reka/g, 'akar'],
  ],
};
