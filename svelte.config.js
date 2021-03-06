import netlify from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				prependData: '@import "src/variables.scss";'
			}
		})
	],

	kit: {
		adapter: netlify(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@import "src/variables.scss";'
					}
				}
			},
			optimizeDeps: {
				include: [
					'gun',
					'gun/gun',
					'gun/sea',
					'gun/sea.js',
					'gun/lib/then',
					'gun/lib/webrtc',
					'gun/lib/radix',
					'gun/lib/radisk',
					'gun/lib/store',
					'gun/lib/rindexed'
				]
			},
			define: {
				__VERSION__: JSON.stringify(process.env.npm_package_version)
			}
		}
	}
};

export default config;
