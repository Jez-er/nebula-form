import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [
		vue(),
		dts({
			include: ['core'],
			tsconfigPath: './tsconfig.app.json',
			insertTypesEntry: true,
		}),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'core/index.ts'),
			name: 'NebulaForm',
			formats: ['es', 'cjs'],
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
