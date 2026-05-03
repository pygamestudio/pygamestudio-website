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
			sidebar: [
				{
					label: 'Tutorial',
					items: [
						{ label: 'Installation', slug: 'tutorial/installation' },
						{ label: 'Create a project', slug: 'tutorial/create_a_project' },
					],
				}
			],
		}),
	],
});
