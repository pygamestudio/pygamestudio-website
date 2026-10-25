/**
 * Docs version helpers.
 *
 * The docs of the current release live directly in `src/content/docs` and their
 * URLs carry no version prefix. `CURRENT_RELEASE` below names that release. To
 * keep an older release online, copy its docs into a folder named after that
 * release:
 *
 *   src/content/docs/v1.0.0/tutorial/installation.md
 *   src/content/docs/zh-cn/v1.0.0/tutorial/installation.md
 *
 * and, only when that release needs its own sidebar tweaks, an empty
 * `src/sidebars/v1.0.0.mjs` to fill in later.
 *
 * Any docs folder whose name starts with a digit (optionally prefixed with `v`,
 * e.g. `v1.0.0`) is detected automatically and shows up in the version selector
 * in the header (newest first). Nothing else has to be configured.
 *
 * Two other things follow the same folder name:
 *
 * - the sidebar and the previous/next links: `src/data/versioned-sidebar.ts`
 *   hides the entries a version does not publish (checked against
 *   `publishedPages()` below) and walks what is left to get the neighbouring
 *   pages, so the one hand-written sidebar in `astro.config.mjs` serves every
 *   release. A release that needs a different order, different link text or a
 *   page the shared list does not mention adds `src/sidebars/<version>.mjs`
 *   (`hide` / `rename` / `move` / `extra` - see `src/sidebars/README.md`);
 *   without such a file it simply follows the shared sidebar;
 * - the pictures: `src/plugins/remark-versioned-images.mjs` points the images of
 *   an archived page at `/images/<version>/...`, i.e. at that release's own copy
 *   under `public/images/<version>/`, so replacing a screenshot in the newest
 *   docs never changes an older release;
 * - the pages listed in `src/data/shared-pages.json` (release notes, support)
 *   are the same in every release: `scripts/sync-shared-docs.mjs` copies the
 *   root file into every archived folder before `dev` / `build`, so an archived
 *   address shows the newest text while the reader stays in that release.
 *
 * The docs are discovered with `import.meta.glob` instead of the file system so
 * the same code works while developing and while prerendering the site.
 */

/** Every docs file, as a path relative to the docs root (`tutorial/installation.md`). */
const DOC_PATHS = Object.keys(import.meta.glob('../content/docs/**/*.{md,mdx}')).map((file) =>
	file.replace('../content/docs/', '')
);

/** Release notes, read as raw text to name the current version. */
const RELEASE_NOTES = Object.values(
	import.meta.glob('../content/docs/updates_and_support/release_notes.md', {
		query: '?raw',
		import: 'default',
		eager: true,
	})
)[0] as string | undefined;

/**
 * Release the docs at the site root belong to — this is what the version
 * selector shows as `Latest (…)` / `最新版 (…)`.
 *
 * Bump it when a new release is cut, together with a versioned docs folder for
 * the release that is being frozen. Leave it empty to fall back to the newest
 * `## [vX.Y.Z]` heading of the release notes instead.
 */
export const CURRENT_RELEASE = 'v1.0.2';

/** A docs folder that is an archived release, e.g. `v1.0.0` or `1.0.0.dev6`. */
const VERSION_FOLDER = /^v?\d/;

/**
 * Translation folders of the site, matching the `locales` of `astro.config.mjs`.
 * The default locale lives at the site root and has no folder of its own, so it
 * is not listed here. Add a locale here (and in `astro.config.mjs`) when the
 * docs are translated into another language.
 */
export const LOCALES = ['zh-cn'];

/*
 * Pages that are the same in every release (release notes, support): they are
 * written once in the root docs and copied into every version folder by
 * `scripts/sync-shared-docs.mjs`, which reads `src/data/shared-pages.json`.
 * Nothing in this file needs the list - it is mentioned so the two files are
 * easy to find. To share another page, add its version-less slug to that JSON.
 */

export interface DocsVersion {
	/** URL segment of the archive, empty for the current release. */
	slug: string;
	/** Release name of the archive, e.g. `v1.0.0`. */
	label: string;
	/** True for the folder holding the very same release as the root docs. */
	isCurrentRelease: boolean;
}

/** Release names of every archived docs folder, newest first. */
function archivedVersions(): string[] {
	const found = new Set<string>();
	for (const path of DOC_PATHS) {
		const segments = path.split('/');
		const [first, second] = segments;
		if (LOCALES.includes(first)) {
			if (second && VERSION_FOLDER.test(second)) found.add(second);
		} else if (segments.length > 1 && VERSION_FOLDER.test(first)) {
			found.add(first);
		}
	}
	return [...found].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
}

/** The release the current docs describe. */
function currentRelease(): string | null {
	return CURRENT_RELEASE || RELEASE_NOTES?.match(/^##\s*\[?v?(\d[\w.]*)/m)?.[1] || null;
}

/** `v1.0.0` and `1.0.0` are the same release. */
function sameRelease(folder: string, release: string | null): boolean {
	if (!release) return false;
	const normalise = (value: string) => value.replace(/^v/i, '').toLowerCase();
	return normalise(folder) === normalise(release);
}

/** All versions newest first: the current release, then every archive. */
export function getVersions(): DocsVersion[] {
	const release = currentRelease();
	return [
		{ slug: '', label: release ?? 'latest', isCurrentRelease: true },
		...archivedVersions().map((slug) => ({
			slug,
			label: slug,
			isCurrentRelease: sameRelease(slug, release),
		})),
	];
}

export interface DocsPath {
	/** Locale prefix of the URL, empty for the default locale. */
	locale: string;
	/** Version folder the page belongs to, empty when reading the current docs. */
	version: string;
	/** Path inside the version, without leading or trailing slash. */
	page: string;
}

/** Split a URL path (or a sidebar href) into locale, version and page. */
export function parseDocsPath(urlPath: string): DocsPath {
	const segments = urlPath.split('/').filter(Boolean);
	const locale = LOCALES.includes(segments[0] ?? '') ? segments.shift()! : '';
	const version = VERSION_FOLDER.test(segments[0] ?? '') ? segments.shift()! : '';
	return { locale, version, page: segments.join('/') };
}

/** URL that a page has in a given docs version (`version` empty = current docs). */
export function versionHref(pathname: string, version: string, page: string): string {
	const { locale } = parseDocsPath(pathname);
	const prefix = [locale, version].filter(Boolean).join('/');
	const suffix = page.replace(/^\/|\/$/g, '');
	return `/${[prefix, suffix].filter(Boolean).join('/')}${suffix || prefix ? '/' : ''}`;
}

/** Every page the site publishes, as URL paths (`/tutorial/installation/`). */
export function publishedPages(): Set<string> {
	return new Set(
		DOC_PATHS.map((path) => {
			const withoutExtension = path.replace(/\.(md|mdx)$/, '').replace(/(^|\/)index$/, '');
			return `/${withoutExtension}${withoutExtension ? '/' : ''}`;
		})
	);
}

/**
 * Best URL for the reader's current page inside `version`.
 *
 * The same page is used when that version has it. Otherwise the reader is sent
 * to that version's installation guide (`/v1.0.1/tutorial/installation/`), or
 * to its docs root when even that is missing - switching versions never leaves
 * an address that the target release does not publish.
 */
export function resolveVersionPage(pathname: string, version: string): string {
	const pages = publishedPages();
	const { page } = parseDocsPath(pathname);
	const href = versionHref(pathname, version, page);
	if (page === '' || pages.has(href)) return href;

	const start = versionHref(pathname, version, 'tutorial/installation');
	return pages.has(start) ? start : versionHref(pathname, version, '');
}
