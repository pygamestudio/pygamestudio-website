import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader({
			// Keep the file path as the page id, e.g. `1.0.0.dev6/tutorial/installation`.
			// Astro's default generator runs every path segment through a GitHub-style
			// slugger, which strips the dots of an archived docs folder: the pages of
			// `src/content/docs/1.0.0.dev6/` would be published under `/100dev6/`.
			//
			// The default generator also turns `zh-cn/index.mdx` into the slug `zh-cn`
			// (the locale root) and `index.mdx` into `index` (the site root), so the
			// trailing `/index` has to be dropped here as well - without it a locale
			// home page is not found and Starlight falls back to the English page.
			generateId: ({ entry }) =>
				entry
					.replace(/\.(markdown|mdown|mkdn|mkd|mdwn|md|mdx)$/, '')
					.replace(/\/index$/, ''),
		}),
		schema: docsSchema(),
	}),
};
