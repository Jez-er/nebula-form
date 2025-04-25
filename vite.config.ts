import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [vue(), dts()],
	build: {
		lib: {
			entry: 'core/index.ts',
			name: 'NebulaForm',
			fileName: format => `index.${format}.js`,
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
})
