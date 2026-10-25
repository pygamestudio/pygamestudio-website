/**
 * Keep the images of archived docs with their own release.
 *
 * The docs reference pictures with an absolute path (`/images/doc/foo.png`),
 * which every version of the docs would otherwise share: replacing a picture
 * in the newest docs would silently change the old pages too.
 *
 * Every page inside a version folder (`src/content/docs/v1.0.0/...` or
 * `src/content/docs/zh-cn/v1.0.0/...`) therefore gets its images rewritten to
 *
 *     /images/doc/foo.png  ->  /images/v1.0.0/doc/foo.png
 *
 * The version is inserted right after `/images/`, so `public/images/v1.0.0/`
 * holds that release's copy of the pictures while the current docs keep using
 * `public/images/`. Pages outside a version folder are left untouched.
 *
 * Pages listed in `src/data/shared-pages.json` are copied into every release by
 * `scripts/sync-shared-docs.mjs` and always show the newest text, so their
 * pictures stay with the newest ones too (`/images/doc/...`).
 */
import { readFileSync } from 'node:fs';

/** A docs folder that is an archived release, e.g. `v1.0.0` or `1.0.0.dev6`. */
const VERSION_SEGMENT = /^v?\d[\w.-]*$/;

const IMAGE_PREFIX = '/images/';

/** Pages whose text is always the newest one, whatever release is open. */
const SHARED_PAGES = JSON.parse(
        readFileSync(new URL('../data/shared-pages.json', import.meta.url), 'utf8')
);

/**
 * Release folder and page path of a markdown file:
 * `.../docs/v1.0.0/tutorial/x.md` -> `{ version: 'v1.0.0', page: 'tutorial/x' }`,
 * `.../docs/zh-cn/v1.0.0/x.md` -> `{ version: 'v1.0.0', page: 'x' }`.
 */
function locationOf(file) {
        const path = String(file?.path ?? file?.history?.[0] ?? '');
        const segments = path.split(/[\\/]/);
        const docs = segments.lastIndexOf('docs');
        if (docs === -1) return { version: '', page: '' };
        const rest = segments.slice(docs + 1);
        // The docs root is `content/docs/<version>/...` or
        // `content/docs/<locale>/<version>/...`: skip the locale when there is one.
        if (rest.length > 0 && !VERSION_SEGMENT.test(rest[0])) rest.shift();
        const version = rest.length > 0 && VERSION_SEGMENT.test(rest[0]) ? rest.shift() : '';
        return { version, page: rest.join('/').replace(/\.(md|mdx)$/, '') };
}

/** `/images/<rest>` -> `/images/<version>/<rest>` (already versioned: as is). */
function versionedUrl(url, version) {
	if (!url.startsWith(IMAGE_PREFIX)) return url;
	const rest = url.slice(IMAGE_PREFIX.length);
	if (rest === version || rest.startsWith(`${version}/`)) return url;
	return `${IMAGE_PREFIX}${version}/${rest}`;
}

function walk(node, version) {
	if (!node || typeof node !== 'object') return;
	// `image` covers `![alt](/images/...)`; `link` covers a download link to a
	// picture (e.g. a sample asset) written as a normal markdown link.
	if ((node.type === 'image' || node.type === 'link') && typeof node.url === 'string') {
		node.url = versionedUrl(node.url, version);
	}
	const children = node.children;
	if (Array.isArray(children)) {
		for (const child of children) walk(child, version);
	}
}

export default function remarkVersionedImages() {
	return (tree, file) => {
                const { version, page } = locationOf(file);
                if (!version) return;
                // Shared pages carry the newest text: keep its pictures too.
                if (SHARED_PAGES.includes(page)) return;
                walk(tree, version);
	};
}
