// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkCjkEmphasis from './src/plugins/remark-cjk-emphasis.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://pygamestudio.com',
	markdown: {
		// `**粗体**` glued to Chinese characters does not parse as emphasis by
		// default; the plugin turns those leftovers into real bold text.
		remarkPlugins: [remarkCjkEmphasis],
	},
	integrations: [
		starlight({
			title: 'Pygame Studio',
			favicon: 'favicon.ico',
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					// Language pick: a choice made in the header select is remembered
					// (localStorage) and wins on later visits - the page redirects to that
					// language. Without a stored choice the browser's own language
					// decides: a Chinese browser lands on the Chinese docs, everyone
					// else stays on English.
					tag: 'script',
					content: `(function () {
	var KEY = 'pygs-docs-language';
	try {
		document.addEventListener('change', function (event) {
			var select = event.target;
			if (!select || !select.closest || !select.closest('starlight-lang-select')) return;
			localStorage.setItem(KEY, String(select.value).indexOf('/zh-cn') === 0 ? 'zh-cn' : 'en');
		}, true);

		var path = window.location.pathname;
		// The path without its locale prefix, so /zh-cn/... and /... compare.
		var bare = path.indexOf('/zh-cn') === 0 ? path.slice(6) : path;

		// Never bounce the 404 page around.
		if (bare.indexOf('/404') === 0) return;

		// A language chosen in the header select is remembered and wins over the
		// detected one; without a stored choice the browser's own language decides
		// (the first entry is the one the reader set).
		var stored = localStorage.getItem(KEY);
		if (stored !== 'zh-cn' && stored !== 'en') stored = '';

		var language = navigator.language || (navigator.languages && navigator.languages[0]) || '';
		var wantChinese = stored
			? stored === 'zh-cn'
			: String(language).toLowerCase().indexOf('zh') === 0;

		var target = '';
		if (wantChinese && path.indexOf('/zh-cn') !== 0) {
			target = '/zh-cn' + path;
		} else if (stored === 'en' && bare !== path) {
			target = bare || '/';
		}
		if (target) {
			window.location.replace(target + window.location.search + window.location.hash);
		}
	} catch (error) {
		// Storage disabled (private mode) - keep the language the page was built in.
	}
})();`,
				},
			],
			logo: {
				src: './src/assets/images/logo.png',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/pygamestudio/pygamestudio'},
				{ icon: 'seti:python', label: 'PyPI', href: 'https://pypi.org/project/pygamestudio/'}
			],
			components: {
				Footer: './src/components/ConditionalFooter.astro',
				// Homepage hero with the `pip install` command under the image.
				Hero: './src/components/Hero.astro',
				// Upper-right corner: docs version selector next to the theme select.
				ThemeSelect: './src/components/ThemeSelect.astro',
				// Sidebar links follow the version the reader is browsing.
				Sidebar: './src/components/Sidebar.astro',
				// "Old docs" notice above the page title of archived versions.
				PageTitle: './src/components/PageTitle.astro',
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en'
				},
				'zh-cn': {
					label: '简体中文',
					lang: 'zh-CN'
				}
			},
			sidebar: [
				{
					label: 'Tutorial',
					translations: {
						'zh-CN': '快速上手',
					},
					items: [
						{ slug: 'tutorial/installation' },
						{ slug: 'tutorial/create_a_project' },
						{ slug: 'tutorial/create_an_object' },
						{ slug: 'tutorial/add_script' },
						{ slug: 'tutorial/run_project' },
						{ slug: 'tutorial/build_game' },
					],
				},
				{
					label: 'Editor Introduction',
					translations: {
						'zh-CN': '编辑器介绍',
					},
					collapsed: true,
					items: [
						{ slug: 'editor_introduction/dashboard' },
						{ slug: 'editor_introduction/hierarchy' },
						{ slug: 'editor_introduction/asset' },
						{ slug: 'editor_introduction/scene' },
						{ slug: 'editor_introduction/inspector' },
						{ slug: 'editor_introduction/console' },
						{ slug: 'editor_introduction/code_editor' },
						{ slug: 'editor_introduction/block_editor' },
						{ slug: 'editor_introduction/image_editor' },
						{ slug: 'editor_introduction/audio_player' },
						{ slug: 'editor_introduction/tile_map_editor' },
						{ slug: 'editor_introduction/build_window' },
						{ slug: 'editor_introduction/ai_agent' },
					],
				},
				// {
				// 	label: 'Game Examples',
				// 	translations: {
				// 		'zh-CN': '游戏示例',
				// 	},
				// 	collapsed: true,
				// 	items: [
				// 		{
				// 			label: 'Balance Ball',
				// 			translations: { 'zh-CN': '平衡球' },
				// 			collapsed: true,
				// 			items: [
				// 				{ slug: 'game_examples/balance_ball' },
				// 				{ slug: 'game_examples/balance_ball/scene' },
				// 				{ slug: 'game_examples/balance_ball/script' },
				// 				{ slug: 'game_examples/balance_ball/ideas' },
				// 			],
				// 		},
				// 		{
				// 			label: 'Air Battle',
				// 			translations: { 'zh-CN': '飞机大战' },
				// 			collapsed: true,
				// 			items: [
				// 				{ slug: 'game_examples/air_battle' },
				// 				{ slug: 'game_examples/air_battle/scene' },
				// 				{ slug: 'game_examples/air_battle/script' },
				// 				{ slug: 'game_examples/air_battle/enemies' },
				// 				{ slug: 'game_examples/air_battle/ideas' },
				// 			],
				// 		},
				// 		{
				// 			label: '2048',
				// 			collapsed: true,
				// 			items: [
				// 				{ slug: 'game_examples/2048' },
				// 				{ slug: 'game_examples/2048/scene' },
				// 				{ slug: 'game_examples/2048/script' },
				// 				{ slug: 'game_examples/2048/logic' },
				// 				{ slug: 'game_examples/2048/ideas' },
				// 			],
				// 		},
				// 	],
				// },
				{
					label: 'API Reference',
					translations: {
						'zh-CN': 'API 参考',
					},
					collapsed: true,
					items: [
						{
							slug: 'api',
							label: 'Overview',
							translations: { 'zh-CN': '总览' },
						},
						{
							label: 'Objects',
							translations: { 'zh-CN': '对象' },
							collapsed: true,
							items: [
								{
									slug: 'api/objects',
									label: 'Overview',
									translations: { 'zh-CN': '总览' },
								},
								{
									slug: 'api/objects/canvas',
									translations: { 'zh-CN': '画布' },
								},
								{
									slug: 'api/objects/rect',
									translations: { 'zh-CN': '矩形' },
								},
								{
									slug: 'api/objects/ellipse',
									translations: { 'zh-CN': '椭圆' },
								},
								{
									slug: 'api/objects/line',
									translations: { 'zh-CN': '直线' },
								},
								{
									slug: 'api/objects/polygon',
									translations: { 'zh-CN': '多边形' },
								},
								{
									slug: 'api/objects/image',
									translations: { 'zh-CN': '图像' },
								},
								{
									slug: 'api/objects/text',
									translations: { 'zh-CN': '文本' },
								},
								{
									slug: 'api/objects/button',
									translations: { 'zh-CN': '按钮' },
								},
								{
									slug: 'api/objects/text_input',
									translations: { 'zh-CN': '文本输入框' },
								},
								{
									slug: 'api/objects/progress_bar',
									translations: { 'zh-CN': '进度条' },
								},
								{
									slug: 'api/objects/slider',
									translations: { 'zh-CN': '滑块' },
								},
								{
									slug: 'api/objects/particle',
									translations: { 'zh-CN': '粒子' },
								},
								{
									slug: 'api/objects/frame_sequence',
									translations: { 'zh-CN': '序列帧' },
								},
								{
									slug: 'api/objects/tile_map',
									translations: { 'zh-CN': '瓦片地图' },
								},
							],
						},
						{ slug: 'api/audio' },
						{ slug: 'api/scene' },
						{ slug: 'api/physics' },
						{ slug: 'api/global' },
						{ slug: 'api/window' },
						{ slug: 'api/config' },
						{ slug: 'api/events' },
					],
				},
				{
					label: 'Updates & Support',
					translations: {
						'zh-CN': '更新与支持',
					},
					collapsed: true,
					items: [
						{ slug: 'updates_and_support/release_notes' },
						{ slug: 'updates_and_support/support_pygame_studio' },
					],
				}
			],
		}),
	],
});
