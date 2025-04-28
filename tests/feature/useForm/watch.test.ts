import { beforeEach, describe, expect, it, vi } from 'vitest'
import { watch as vueWatch } from 'vue'
import { createWatch } from '../../../core/feature/useForm/watch'

vi.mock('vue', () => ({
	watch: vi.fn().mockImplementation((source, callback, options) => {
		return vi.fn()
	}),
	WatchStopHandle: Function,
}))

describe('createWatch', () => {
	let values: { name: string; email: string }
	let watchModule: ReturnType<typeof createWatch<typeof values>>

	beforeEach(() => {
		values = { name: 'test', email: 'test@example.com' }
		watchModule = createWatch(values)
		vi.clearAllMocks()
	})

	it('should return watch function', () => {
		expect(watchModule.watch).toBeTypeOf('function')
	})

	it('should watch specific field', () => {
		const callback = vi.fn()
		const unwatch = watchModule.watch('name', callback)

		expect(vueWatch).toHaveBeenCalled()
		expect(unwatch).toBeTypeOf('function')
	})

	it('should watch all fields with wildcard', () => {
		const callback = vi.fn()
		const unwatch = watchModule.watch('*', callback)

		expect(vueWatch).toHaveBeenCalled()
		expect(unwatch).toBeTypeOf('function')
	})

	it('should use deep option for wildcard by default', () => {
		const callback = vi.fn()
		watchModule.watch('*', callback)

		expect(vueWatch).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			expect.objectContaining({ deep: true })
		)
	})

	it('should respect deep option for specific field', () => {
		const callback = vi.fn()
		watchModule.watch('name', callback, { deep: true })

		expect(vueWatch).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			expect.objectContaining({ deep: true })
		)
	})

	it('should respect immediate option', () => {
		const callback = vi.fn()
		watchModule.watch('name', callback, { immediate: true })

		expect(vueWatch).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Function),
			expect.objectContaining({ immediate: true })
		)
	})

	it('should unwatch previous watcher when watching same field again', () => {
		const callback1 = vi.fn()
		const callback2 = vi.fn()

		const unwatchMock = vi.fn()
		;(vueWatch as any).mockReturnValue(unwatchMock)

		watchModule.watch('name', callback1)
		watchModule.watch('name', callback2)

		expect(unwatchMock).toHaveBeenCalledTimes(1)
	})

	it('should unwatch when calling returned function', () => {
		const callback = vi.fn()

		const unwatchMock = vi.fn()
		;(vueWatch as any).mockReturnValue(unwatchMock)

		const unwatch = watchModule.watch('name', callback)
		unwatch()

		expect(unwatchMock).toHaveBeenCalledTimes(1)
	})
})
