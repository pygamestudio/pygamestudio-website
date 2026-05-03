// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://pygamestudio.com',
	integrations: [
		starlight({
			title: 'Pygame Studio',
			favicon: './src/assets/images/favicon.ico',
			logo: {
				src: './src/assets/images/logo.png',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/pygamestudio/pygamestudio'}],
			sidebar: [
				{ label: 'Tutorial', autogenerate: { directory: 'tutorial' }}
			],
			components: {
				Footer: './src/components/ConditionalFooter.astro',
			},
		}),
	],
});
