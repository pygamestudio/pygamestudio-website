/**
 * Release notes and the support page are the same in every release: they
 * describe "now", not a past release. They are written once, in the root docs,
 * and this script copies them into every archived release folder before the
 * site is built.
 *
 * That is what keeps the reader inside the release they opened:
 *
 *     /v1.0.1/updates_and_support/release_notes/    ->  newest text, still v1.0.1
 *
 * The addresses stay versioned (sidebar, previous/next links and the "old docs"
 * banner keep working as usual), only the text is the latest one. Pictures in
 * those pages keep using `public/images/doc/` - `remark-versioned-images.mjs`
 * skips shared pages for the same reason.
 *
 * Runs from `predev` / `prebuild` (see package.json), so `npm run dev` and
 * `npm run build` always see fresh copies. Edit the root file only: the copies
 * are overwritten on every run.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const DOCS = join(root, 'src', 'content', 'docs');
const SHARED_PAGES = JSON.parse(readFileSync(join(root, 'src', 'data', 'shared-pages.json'), 'utf8'));

/** A docs folder that is an archived release, e.g. `v1.0.0` or `1.0.0.dev6`. */
const VERSION_FOLDER = /^v?\d[\w.-]*$/;

/** Extensions a docs page can have, in the order they are looked for. */
const EXTENSIONS = ['.md', '.mdx'];

/** Directories directly inside `dir`. */
function directories(dir) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => join(dir, entry.name));
}

/**
 * Every archived release folder, with the docs folder that holds the pages of
 * its language (the root docs, or `<docs>/<locale>`).
 *
 *   src/content/docs/v1.0.0/...         -> docs root
 *   src/content/docs/zh-cn/v1.0.0/...   -> src/content/docs/zh-cn
 */
function archives() {
	const found = [];
	for (const first of directories(DOCS)) {
		const name = first.split(/[\\/]/).pop();
		if (VERSION_FOLDER.test(name)) {
			found.push({ archive: first, source: DOCS });
			continue;
		}
		// Not a release: it may be a locale folder holding releases.
		for (const second of directories(first)) {
			if (VERSION_FOLDER.test(second.split(/[\\/]/).pop())) {
				found.push({ archive: second, source: first });
			}
		}
	}
	return found;
}

/** The root file of a page, whichever extension it uses. */
function sourceOf(docs, page) {
	for (const extension of EXTENSIONS) {
		const file = join(docs, `${page}${extension}`);
		if (existsSync(file)) return file;
	}
	return null;
}

let copied = 0;

for (const { archive, source } of archives()) {
	for (const page of SHARED_PAGES) {
		const from = sourceOf(source, page);
		if (!from) {
			console.warn(`[shared] "${page}" does not exist in ${source} - skipped.`);
			continue;
		}
		const to = join(archive, from.slice(source.length + 1));
		const upToDate =
			existsSync(to) &&
			statSync(to).size === statSync(from).size &&
			readFileSync(to, 'utf8') === readFileSync(from, 'utf8');
		if (upToDate) continue;
		mkdirSync(dirname(to), { recursive: true });
		copyFileSync(from, to);
		console.log(`[shared] ${relative(root, to)}  <-  ${relative(root, from)}`);
		copied += 1;
	}
}

if (copied > 0) console.log(`[shared] ${copied} page(s) refreshed in the archived releases.`);
