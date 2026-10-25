/**
 * Sidebar adjustments of the v1.0.0 docs (`src/content/docs/v1.0.0`).
 *
 * The shared sidebar lives in `astro.config.mjs`; this file only lists what
 * this release does differently. Read `src/sidebars/README.md` for the keys and
 * examples, and leave the file empty (`export default {}`) when the release
 * follows the shared sidebar as-is.
 *
 * @type {import('../data/versioned-sidebar').VersionSidebarOverride}
 */
export default {
	// Pages this release hides, even though `src/content/docs/v1.0.0` has them:
	// hide: ['editor_introduction/tile_map_editor'],

	// Different link text in this release:
	// rename: {
	// 	'editor_introduction/audio_editor': { en: 'Audio Editor', 'zh-CN': '音频编辑器' },
	// },
    rename: {
		'editor_introduction/audio_editor': { en: 'Audio Player', 'zh-CN': '音频播放器' },
	},

	// Pages of the shared list, put somewhere else:
	// move: [
	// 	{ page: 'editor_introduction/audio_editor', before: 'editor_introduction/inspector' },
	// ],

	// Pages the shared list does not mention (only this release has them):
	// extra: [
	// 	{ page: 'tutorial/old_sound_api', label: { en: 'Old Sound API', 'zh-CN': '旧版声音接口' }, after: 'tutorial/add_script' },
	// ],
};
