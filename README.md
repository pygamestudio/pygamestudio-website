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

So, when a new release comes out, snapshot the docs of the previous one:

```powershell
$docs = "src/content/docs"
$old  = "v1.0.0"   # the release that is being frozen
Copy-Item "$docs/tutorial" "$docs/$old/tutorial" -Recurse
Copy-Item "$docs/updates_and_support" "$docs/$old/updates_and_support" -Recurse
Copy-Item "$docs/zh-cn/tutorial" "$docs/zh-cn/$old/tutorial" -Recurse
Copy-Item "$docs/zh-cn/updates_and_support" "$docs/zh-cn/$old/updates_and_support" -Recurse
```

After that, edit the docs at the root for the next release; the archived folder
stays frozen. To drop an archived version, delete its folder — the selector
follows automatically.

Pages of an archived version show a banner linking back to the latest version,
and the sidebar keeps the reader inside the version they opened. The version
selector labels the root docs `Latest (<CURRENT_RELEASE>)`: set that constant in
`src/data/versions.ts` when you cut a release (leave it empty to fall back to the
newest `## [vX.Y.Z]` heading of `updates_and_support/release_notes.md`).

A version folder holding the same release as the root — the `v1.0.0/` folder
right after snapshotting it — is left out of the selector until
`CURRENT_RELEASE` moves on, so the same docs are never listed twice.

Screenshots used by the docs live in `public/images/doc/` and are referenced with
an absolute path (`/images/doc/example.png`), so a copied version keeps working
without touching any image path.

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

