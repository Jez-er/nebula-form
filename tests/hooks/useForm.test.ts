import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useForm } from '../../core/hooks/useForm'

describe('useForm', () => {
	it('initialization with defaultValues', () => {
		const { values } = useForm({ defaultValues: { name: 'Alex', age: 25 } })
		expect(values.name).toBe('Alex')
		expect(values.age).toBe(25)
	})

	it('working with values and errors', async () => {
		const { values, errors, setValue } = useForm({
			defaultValues: { email: '' },
		})
		setValue('email', 'test@mail.com')
		await nextTick()
		expect(values.email).toBe('test@mail.com')
		expect(errors.value.email).toBeUndefined()
	})

	it('register returns correct props', () => {
		const { register } = useForm({ defaultValues: { foo: '' } })
		const props = register('foo')
		expect(props.name).toBe('foo')
		expect(typeof props.onInput).toBe('function')
	})

	it('handleSubmit calls callback with actual values', async () => {
		const onSubmit = vi.fn()
		const { handleSubmit, setValue } = useForm({ defaultValues: { bar: '' } })
		setValue('bar', 'baz')
		await nextTick()
		await handleSubmit(onSubmit)(new Event('submit'))
		expect(onSubmit).toHaveBeenCalledWith({ bar: 'baz' })
	})

	it('reset resets values to defaultValues', async () => {
		const { values, setValue, reset } = useForm({ defaultValues: { x: 1 } })
		setValue('x', 42)
		await nextTick()
		expect(values.x).toBe(42)
		reset()
		await nextTick()
		expect(values.x).toBe(1)
	})

	it('getValue returns actual value', () => {
		const { setValue, getValue } = useForm({ defaultValues: { y: 'abc' } })
		setValue('y', 'def')
		expect(getValue('y')).toBe('def')
	})

	it('watch reacts to value changes', async () => {
		const { setValue, watch } = useForm({ defaultValues: { z: 0 } })
		const spy = vi.fn()
		watch('z', spy)
		setValue('z', 123)
		await nextTick()
		expect(spy).toHaveBeenCalledWith(123, 0)
	})
})
