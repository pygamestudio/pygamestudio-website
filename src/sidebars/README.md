# Per-release sidebar adjustments

The sidebar is written **once**, in `astro.config.mjs`, and describes the newest
docs. Every archived release reuses it, except that a link is dropped when that
release does not publish the page (see `src/data/versioned-sidebar.ts`).

A file in this folder is optional and only carries the **differences** of one
release. It is named after that release's docs folder (`src/content/docs/v1.0.0`
↔ `src/sidebars/v1.0.0.mjs`). Anything the file does not mention keeps
following the shared list, so new pages and fixes in `astro.config.mjs` still
reach the archive.

Page paths are always written **without the version** (`editor_introduction/audio_editor`),
with or without a leading slash.

| Key | What it does |
| --- | --- |
| `hide` | Pages this release does not show, even though the file exists. |
| `rename` | Different link text in this release. One string for all languages, or `{ en, 'zh-CN' }`. |
| `move` | Pages of the shared list, put somewhere else (`before`, `after`, `group`, `firstInGroup`). |
| `extra` | Pages the shared list does not mention - typically a page that only this release has. Needs `label`; without a placement it goes to the end of the sidebar, outside any group. |

```js
// src/sidebars/v1.0.0.mjs
export default {
  hide: ['editor_introduction/ai_agent'],
  rename: {
    'editor_introduction/audio_editor': { en: 'Audio Editor', 'zh-CN': '音频编辑器' },
  },
  move: [
    { page: 'editor_introduction/audio_editor', before: 'editor_introduction/inspector' },
    { page: 'tutorial/run_project', group: 'tutorial/installation' }, // last in that group
  ],
  extra: [
    {
      page: 'tutorial/old_sound_api',          // src/content/docs/v1.0.0/tutorial/old_sound_api.md
      label: { en: 'Old Sound API', 'zh-CN': '旧版声音接口' },
      after: 'tutorial/add_script',
    },
  ],
};
```

The previous/next links at the bottom of a page are derived from this same list,
so a page moved here also changes its neighbours.

Mistakes are not fatal: an entry that points at a page this release does not
publish, or a placement whose anchor is missing, is reported once in the build
output as `[sidebar] v1.0.0: …` and skipped (a page being moved always stays in
the sidebar).
