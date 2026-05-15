// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://pygamestudio.com',
	integrations: [
		starlight({
			title: 'Pygame Studio',
			favicon: 'favicon.ico',
				logo: {
				src: './src/assets/images/logo.png',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/pygamestudio/pygamestudio'}],
			components: {
				Footer: './src/components/ConditionalFooter.astro',
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
						// { slug: 'tutorial/create_an_object' },
					],
				},
				{
					label: 'Updates & Support',
					translations: {
						'zh-CN': '更新与支持',
					},
					items: [
						{ slug: 'updates_and_support/release_notes' },
						{ slug: 'updates_and_support/support_pygame_studio' },
					],
				}
			],
		}),
	],
});
