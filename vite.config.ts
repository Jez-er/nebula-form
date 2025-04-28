import vue from '@vitejs/plugin-vue'
import path from 'path'
import dts from 'vite-plugin-dts'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		exclude: [...configDefaults.exclude, 'e2e/**'],
	},
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
