/**
 * The sidebar the reader actually sees, and the previous/next links built from
 * it.
 *
 * Two layers:
 *
 * 1. ONE shared list in `astro.config.mjs` names the pages of the newest docs.
 *    An archived release may not have them all (a page added, renamed or
 *    dropped later), so every link is checked against the pages that version
 *    really publishes and the ones it does not have are hidden; a group left
 *    without entries disappears along with its title.
 *
 * 2. A release that needs a different order, different link text or pages the
 *    shared list does not mention gets its own file in `src/sidebars/`, named
 *    after its docs folder: `src/sidebars/v1.0.0.mjs`. It lists only the
 *    adjustments (`hide`, `rename`, `move`, `extra`); everything it does not
 *    mention keeps following the shared list. See `src/sidebars/README.md`.
 *
 * `src/components/Sidebar.astro` renders the result and
 * `src/components/Pagination.astro` walks the same list to get the neighbouring
 * pages, so both always agree - overrides included.
 */
import { parseDocsPath, publishedPages, versionHref } from './versions';

/** The parts of a Starlight sidebar entry this module needs. */
export interface VersionedSidebarLink {
	type: 'link';
	href: string;
	label: string;
	isCurrent?: boolean;
	[key: string]: unknown;
}

export interface VersionedSidebarGroup {
	type: 'group';
	label: string;
	entries: VersionedSidebarEntry[];
	[key: string]: unknown;
}

export type VersionedSidebarEntry = VersionedSidebarLink | VersionedSidebarGroup;

/** Link text: one string for every language, or one per locale tag (`en`, `zh-CN`). */
export type VersionLabel = string | Record<string, string>;

/** Where an entry goes, relative to a page of the same release. */
export interface SidebarPlacement {
	/** Directly before the page with this path (`tutorial/run_project`). */
	before?: string;
	/** Directly after the page with this path. */
	after?: string;
	/** Last in the group that holds the page with this path. */
	group?: string;
	/** First in the group that holds the page with this path. */
	firstInGroup?: string;
}

/** One archived release's adjustments, from `src/sidebars/<version>.mjs`. */
export interface VersionSidebarOverride {
	/** Pages this release hides even though it has the file. */
	hide?: string[];
	/** Different link text in this release: `{ 'tutorial/x': 'New text' }`. */
	rename?: Record<string, VersionLabel>;
	/** Pages of the shared list, put somewhere else. */
	move?: ({ page: string } & SidebarPlacement)[];
	/**
	 * Pages the shared list does not mention (added or dropped after this
	 * release was frozen). Without a placement they are appended at the end of
	 * the sidebar, outside any group.
	 */
	extra?: ({ page: string; label: VersionLabel } & SidebarPlacement)[];
}

/** Per-version files, keyed by their path relative to this module. */
const OVERRIDE_FILES = import.meta.glob('../sidebars/*.mjs', {
	eager: true,
}) as Record<string, { default?: VersionSidebarOverride }>;

const warned = new Set<string>();

/** Report a problem with a version file once per build, not once per page. */
function warn(message: string): void {
	if (warned.has(message)) return;
	warned.add(message);
	console.warn(`[sidebar] ${message}`);
}

/** The adjustments for `version`, or an empty object when it has no file. */
function overrideFor(version: string): VersionSidebarOverride {
	for (const [file, module] of Object.entries(OVERRIDE_FILES)) {
		const name = file.replace('../sidebars/', '').replace(/\.\w+$/, '');
		if (name === version) return module.default ?? {};
	}
	return {};
}

/** True when `href` is a docs page that the browsed version publishes. */
function isPublished(href: string, pages: Set<string>): boolean {
	// External links and anchors are not docs pages: never hide them.
	if (!href.startsWith('/')) return true;
	return pages.has(href.split(/[?#]/)[0]);
}

/** Version-less path of a sidebar link (`tutorial/installation`). */
function pageOf(link: VersionedSidebarLink): string {
	return parseDocsPath(link.href).page;
}

/** Treat `v1.0.0/tutorial/x` and `/tutorial/x/` both as `tutorial/x`. */
function normalisePage(page: string): string {
	return parseDocsPath(page.replace(/^\//, '')).page;
}

/** One label for the language being rendered. */
function resolveLabel(label: VersionLabel, locale: string): string {
	if (typeof label === 'string') return label;
	const tag = locale === 'zh-cn' ? 'zh-CN' : 'en';
	return label[tag] ?? label[locale] ?? Object.values(label)[0] ?? '';
}

/**
 * Rewrite Starlight's configured (version-less) sidebar into the sidebar of the
 * browsed version, keeping the entry shape so it can be handed straight back to
 * `SidebarSublist`.
 */
export function versionedSidebar<E>(entries: E[], pathname: string): E[] {
	const pages = publishedPages();
	const { version, locale } = parseDocsPath(pathname);
	const currentPath = pathname.replace(/\/$/, '');

	const rewrite = (list: VersionedSidebarEntry[]): VersionedSidebarEntry[] => {
		const result: VersionedSidebarEntry[] = [];
		for (const entry of list) {
			if (entry.type === 'group') {
				const children = rewrite(entry.entries);
				if (children.length === 0) continue; // nothing left: drop the title too
				result.push({ ...entry, entries: children });
				continue;
			}
			// External links keep their own address; docs pages follow the version.
			const href = entry.href.startsWith('/')
				? versionHref(pathname, version, parseDocsPath(entry.href).page)
				: entry.href;
			if (!isPublished(href, pages)) continue; // page not in this release
			result.push({ ...entry, href, isCurrent: href.replace(/\/$/, '') === currentPath });
		}
		return result;
	};

	const tree = rewrite(entries as unknown as VersionedSidebarEntry[]);

	// The current docs are the shared list itself, so only archives have a file.
	if (version) applyOverride(tree, version, pathname, locale, pages);

	return tree as unknown as E[];
}

/** Apply `src/sidebars/<version>.mjs` to the already version-filtered tree. */
function applyOverride(
	tree: VersionedSidebarEntry[],
	version: string,
	pathname: string,
	locale: string,
	pages: Set<string>,
): void {
	const override = overrideFor(version);

	const hide = new Set((override.hide ?? []).map(normalisePage));
	const rename = new Map(
		Object.entries(override.rename ?? {}).map(([page, label]) => [
			normalisePage(page),
			resolveLabel(label, locale),
		]),
	);

	// 1. Drop what this release hides, then relabel what is left.
	prune(tree, (link) => {
		const page = pageOf(link);
		if (hide.has(page)) return false;
		const label = rename.get(page);
		if (label !== undefined) link.label = label;
		return true;
	});

	// 2. Put pages of the shared list somewhere else.
	for (const move of override.move ?? []) {
		const page = normalisePage(move.page);
		const link = findLink(tree, page);
		if (!link) {
			warn(`${version}: move target "${move.page}" is not in this release's sidebar.`);
			continue;
		}
		remove(tree, page);
		if (!insert(tree, link, move)) {
			warn(`${version}: "${move.page}" has nowhere to go (check before/after/group).`);
			tree.push(link); // never lose a page over a broken anchor
		}
	}

	// 3. Add pages the shared list does not mention.
	for (const extra of override.extra ?? []) {
		const page = normalisePage(extra.page);
		const href = versionHref(pathname, version, page);
		if (!page || !isPublished(href, pages)) {
			warn(`${version}: extra page "${extra.page}" does not exist in this release.`);
			continue;
		}
		if (findLink(tree, page)) {
			warn(`${version}: extra page "${extra.page}" is already in this release's sidebar.`);
			continue;
		}
		const link: VersionedSidebarLink = {
			type: 'link',
			href,
			label: resolveLabel(extra.label, locale),
			isCurrent: href.replace(/\/$/, '') === pathname.replace(/\/$/, ''),
			// Starlight's SidebarSublist renders `attrs.class`, so the shape has
			// to match a link it built itself.
			attrs: {},
		};
		if (!insert(tree, link, extra)) tree.push(link);
	}
}

/** Visit every link; returning `false` drops it. Groups left empty go too. */
function prune(entries: VersionedSidebarEntry[], visit: (link: VersionedSidebarLink) => boolean): void {
	for (let index = entries.length - 1; index >= 0; index -= 1) {
		const entry = entries[index]!;
		if (entry.type === 'group') {
			prune(entry.entries, visit);
			if (entry.entries.length === 0) entries.splice(index, 1);
			continue;
		}
		if (!visit(entry)) entries.splice(index, 1);
	}
}

function findLink(entries: VersionedSidebarEntry[], page: string): VersionedSidebarLink | undefined {
	for (const entry of entries) {
		if (entry.type === 'group') {
			const found = findLink(entry.entries, page);
			if (found) return found;
			continue;
		}
		if (pageOf(entry) === page) return entry;
	}
	return undefined;
}

function remove(entries: VersionedSidebarEntry[], page: string): void {
	for (let index = entries.length - 1; index >= 0; index -= 1) {
		const entry = entries[index]!;
		if (entry.type === 'group') {
			remove(entry.entries, page);
			if (entry.entries.length === 0) entries.splice(index, 1);
			continue;
		}
		if (pageOf(entry) === page) entries.splice(index, 1);
	}
}

/** Put `link` where the placement asks. False when the anchor is not there. */
function insert(
	entries: VersionedSidebarEntry[],
	link: VersionedSidebarLink,
	placement: SidebarPlacement,
): boolean {
	const before = placement.before && normalisePage(placement.before);
	const after = placement.after && normalisePage(placement.after);
	const group = placement.group && normalisePage(placement.group);
	const firstInGroup = placement.firstInGroup && normalisePage(placement.firstInGroup);

	// No anchor at all: the caller appends it at the end of the sidebar.
	if (!before && !after && !group && !firstInGroup) return false;

	for (let index = 0; index < entries.length; index += 1) {
		const entry = entries[index]!;
		if (entry.type === 'link') {
			if (before && pageOf(entry) === before) {
				entries.splice(index, 0, link);
				return true;
			}
			if (after && pageOf(entry) === after) {
				entries.splice(index + 1, 0, link);
				return true;
			}
			continue;
		}
		const holds = (page: string) =>
			entry.entries.some((child) => child.type === 'link' && pageOf(child) === page);
		if (group && holds(group)) {
			entry.entries.push(link);
			return true;
		}
		if (firstInGroup && holds(firstInGroup)) {
			entry.entries.unshift(link);
			return true;
		}
		if (insert(entry.entries, link, placement)) return true;
	}
	return false;
}

/** The nested sidebar as a flat list of links, in reading order. */
function flatten(entries: VersionedSidebarEntry[]): VersionedSidebarLink[] {
	return entries.flatMap((entry) => (entry.type === 'group' ? flatten(entry.entries) : entry));
}

export interface VersionedPagination {
	prev?: VersionedSidebarLink;
	next?: VersionedSidebarLink;
}

/**
 * Previous / next page of the browsed version, in sidebar order.
 *
 * Starlight itself derives these links from the unversioned sidebar, so on an
 * archived page nothing ever matches the current URL and both links come out
 * empty. This walks the filtered sidebar instead, which is exactly the list the
 * reader sees.
 */
export function versionedPagination(entries: unknown[], pathname: string): VersionedPagination {
	const links = flatten(versionedSidebar(entries, pathname) as VersionedSidebarEntry[]);
	const index = links.findIndex((entry) => entry.isCurrent);
	if (index === -1) return {};
	return { prev: links[index - 1], next: links[index + 1] };
}
