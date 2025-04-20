// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://selfhost-hub.com',
	integrations: [
		starlight({
			title: 'SelfHost-Hub',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/songtianlun/selfhost-hub' }],
			sidebar: [
				{
					label: 'Tools',
					autogenerate: { directory: 'tools' },
				},
				{
					label: 'Services',
					autogenerate: { directory: 'services' },
				},
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			defaultLocale: 'root',
			locales: {
				// 简体中文文档在 `src/content/docs/` 中。
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
				// en in `src/content/docs/en/`
				'en': {
					label: 'English',
					lang: 'en',
				},
				// 简体中文文档在 `src/content/docs/zh-cn/` 中。
				// 'zh-cn': {
				//   label: '简体中文',
				//   lang: 'zh-CN',
				// },
			  },
		}),
	],
});
