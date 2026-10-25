<div align="center"><img src="https://i-blog.csdnimg.cn/direct/ce0f186a9ade4295bfa9367ceecba0e2.png" width="300"></div>
<div dir="auto" align="center">
    <a href="javascript:;">
        <img src="https://img.shields.io/badge/Pygame Studio-Open Source-green.svg" />
    </a>
    <a href="javascript:;">
        <img src="https://img.shields.io/badge/For-pygame_ce-dark.svg" />
    </a>
    <a href="javascript:;">
        <img src="https://img.shields.io/badge/Language-Python-purple.svg" />
    </a>
    <a href="javascript:;">
        <img src="https://img.shields.io/badge/License-MIT-orange.svg" />
    </a>
</div>

<br>

<div align="center"><h1>Pygame Studio Official Website</h1></div>

This is the official website of **Pygame Studio**, a visual editor built specifically for **pygame-ce**. 

🔗 **website link**: https://pygamestudio.com

🔗 **Pygame Studio Repository**: https://github.com/pygamestudio/pygamestudio

## Documentation versions

The docs of the **current release** live in `src/content/docs` (English) and
`src/content/docs/zh-cn` (简体中文). They are published without a version prefix,
e.g. `/tutorial/create_an_object/`.

Docs of an **older release** are a **copy** of the docs inside a folder named
after the release. The folder name has to start with a digit, optionally
prefixed with `v`: `v1.0.0`, `v1.1.0`, `1.0.0.dev6`, … Anything else is detected
automatically and listed in the version selector at the top right of every
documentation page:

```
src/content/docs/v1.0.0/...           ->  https://pygamestudio.com/v1.0.0/...
src/content/docs/zh-cn/v1.0.0/...     ->  https://pygamestudio.com/zh-cn/v1.0.0/...
```

⚠️ The docs stay in place at the root as well — **copy, never move**. The root
is what `/tutorial/installation/` (the link used by the editor's Help menu and
by `pyproject.toml`) points at, and the Starlight sidebar config references
those root slugs.

So, when a new release comes out, snapshot the docs of the previous one — the
pages **and** their pictures:

```powershell
$docs  = "src/content/docs"
$old   = "v1.0.0"                       # the release that is being frozen
$image = "public/images"

# `updates_and_support` is deliberately missing: release notes and the support
# page are shared by every release (see SHARED_PAGES in src/data/versions.ts).
foreach ($dir in 'api','editor_introduction','game_examples','tutorial') {
    Copy-Item "$docs/$dir"       "$docs/$old/$dir"       -Recurse
    Copy-Item "$docs/zh-cn/$dir" "$docs/zh-cn/$old/$dir" -Recurse
}

# The pictures of that release (the current ones, which is what the docs show now).
New-Item -ItemType Directory -Force -Path "$image/$old/doc" | Out-Null
Get-ChildItem "$image/doc" -File | Copy-Item -Destination "$image/$old/doc" -Force

# Optional: a file for this release's own sidebar tweaks (leave it empty for now).
New-Item -ItemType File -Force -Path "src/sidebars/$old.mjs" | Out-Null
```

`index.mdx` / `zh-cn/index.mdx` are the site home pages: never copy them into a
version folder.

After that, edit the docs at the root for the next release; the archived folder
stays frozen. To drop an archived version, delete its folder (and
`public/images/<version>`) — the selector follows automatically.

Pages of an archived version show a banner linking back to the latest version,
and the sidebar keeps the reader inside the version they opened. The version
selector labels the root docs `Latest (<CURRENT_RELEASE>)`: set that constant in
`src/data/versions.ts` when you cut a release (leave it empty to fall back to the
newest `## [vX.Y.Z]` heading of `updates_and_support/release_notes.md`).

**Pages every release shares.** Release notes and the support page describe
"now", not a past release, so they are written once in the root docs and
`scripts/sync-shared-docs.mjs` copies them into every archived folder before
`dev` / `build` (it also runs on its own: `node scripts/sync-shared-docs.mjs`).
The address stays inside the release being read, only the text is the latest:

```
/v1.0.1/updates_and_support/release_notes/   ->  newest release notes, still v1.0.1
/zh-cn/v1.0.1/updates_and_support/...        ->  newest Chinese ones, still zh-cn v1.0.1
```

So the sidebar, the previous/next links and the "you are reading v1.0.1" banner
keep working as usual - the reader never loses the release they opened. Pictures
in those pages stay on `/images/doc/...` (both the sync script and
`remark-versioned-images.mjs` treat the pages listed in
`src/data/shared-pages.json` as "newest content"). The list is that JSON file;
add a version-less slug there (`api/config`) to share another page.

Edit the **root** file only: the copies inside the version folders are generated
and overwritten on every `dev` / `build`.

A version folder holding the same release as the root — the `v1.0.0/` folder
right after snapshotting it — is left out of the selector until
`CURRENT_RELEASE` moves on, so the same docs are never listed twice.

### Why an archived release keeps its own sidebar

The sidebar is ONE hand-written list in `astro.config.mjs`, and it names the
pages of the newest docs. An archived release may not have them all (a page
added, renamed or dropped later), so `src/data/versioned-sidebar.ts` checks
every link against the pages that version really publishes and hides the ones it
does not have; a group that ends up empty disappears with its title. Nothing has
to be configured per version.

The same filtered list gives the previous/next links at the bottom of a page
(`src/components/Pagination.astro`), so an archived page walks its own release
and never jumps into the newest docs.

What the single list means in practice:

| Change | Effect on the newest docs | Effect on an archived release |
| --- | --- | --- |
| New page + `{ slug: 'tutorial/x' }` entry | listed | hidden (no such file in `v1.0.1/` …) |
| Page dropped from the newest docs (file and entry removed) | gone | gone too — the entry no longer exists |
| Page that only an old release has | — | listed from that release's own file (`src/sidebars/<version>.mjs`), not from the shared list |
| Group title, order, `translations` | new order/title | same order/title unless the release overrides it |

So existence is per version, while order, grouping and labels are shared by all
versions.

#### A release that needs a different order or grouping

`src/sidebars/<version>.mjs` (named after the docs folder, e.g.
`src/sidebars/v1.0.0.mjs`) carries only that release's **differences**; whatever
it does not mention keeps following the shared list. Keys: `hide`, `rename`,
`move`, `extra` — see `src/sidebars/README.md` for the full description.

```js
// src/sidebars/v1.0.0.mjs
export default {
  hide: ['editor_introduction/ai_agent'],
  rename: { 'editor_introduction/audio_editor': { en: 'Audio Editor', 'zh-CN': '音频编辑器' } },
  move: [{ page: 'editor_introduction/audio_editor', before: 'editor_introduction/inspector' }],
  extra: [
    { page: 'tutorial/old_sound_api', label: { en: 'Old Sound API', 'zh-CN': '旧版声音接口' }, after: 'tutorial/add_script' },
  ],
};
```

A release without such a file simply follows the shared list. Broken references
(an `extra` page the release does not have, a `move` whose anchor is missing) are
reported once in the build output as `[sidebar] v1.0.0: …` instead of failing the
build.

### Pictures per release

Docs reference pictures with an absolute path (`/images/doc/example.png`),
which would be shared by every version. `src/plugins/remark-versioned-images.mjs`
(remark plugin, wired in `astro.config.mjs`) rewrites that path for pages inside
a version folder:

```
/docs/v1.0.0/tutorial/x.md   ![a](/images/doc/example.png)
   ->  <img src="/images/v1.0.0/doc/example.png">   ->  public/images/v1.0.0/doc/example.png
/docs/tutorial/x.md          ![a](/images/doc/example.png)
   ->  <img src="/images/doc/example.png">          ->  public/images/doc/example.png
```

So a screenshot that is replaced for the newest docs never changes an older
release: the archived pages keep the copy under `public/images/<version>/`.
When a page of an archived version gets a picture it does not have yet, copy
that file into `public/images/<version>/doc/`.

## Sections and languages

The sidebar is configured by hand in `astro.config.mjs` — a new page needs an
entry there (`{ slug: 'api/audio' }`, with `translations` for the group labels).

The supported locales are declared twice and have to be kept in sync:

| File | What it does |
| --- | --- |
| `astro.config.mjs` → `locales` | Tells Starlight which languages the site publishes. |
| `src/data/versions.ts` → `LOCALES` | Tells the version helpers which URL prefixes are languages (so `api`, `tutorial`, … are never mistaken for one). |

The default locale lives at the site root and has no folder of its own, so only
the translated locales — currently `zh-cn` — are listed.

