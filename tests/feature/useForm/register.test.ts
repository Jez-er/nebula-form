import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRegister } from '../../../core/feature/useForm/register'

describe('createRegister', () => {
	let values: { name: string; email: string }
	let errors: Partial<Record<keyof typeof values, string | null>>
	let validateField: any
	let fieldRules: Map<keyof typeof values, any>
	let register: ReturnType<typeof createRegister<typeof values>>

	beforeEach(() => {
		values = { name: '', email: '' }
		errors = {}
		validateField = vi.fn().mockReturnValue(true)
		fieldRules = new Map()
		register = createRegister(values, errors, validateField, fieldRules)
	})

	it('should return a register function', () => {
		expect(register).toBeTypeOf('function')
	})

	it('should register a field with rules', () => {
		const rules = { required: 'This field is required' }
		register('name', rules)
		expect(fieldRules.get('name')).toBe(rules)
	})

	it('should return field props with correct values', () => {
		values.name = 'test'
		const props = register('name')

		expect(props.name).toBe('name')
		expect(props.value).toBe('test')
		expect(props.onInput).toBeTypeOf('function')
		expect(props.onBlur).toBeTypeOf('function')
	})

	it('should update value and clear error on input', () => {
		const rules = { required: 'This field is required' }
		const props = register('name', rules)

		const event = { target: { value: 'new value' } } as unknown as Event
		props.onInput(event)

		expect(values.name).toBe('new value')
		expect(errors.name).toBeNull()
		expect(validateField).toHaveBeenCalledWith('name', 'new value', rules)
	})

	it('should validate on blur', () => {
		const rules = { required: 'This field is required' }
		const props = register('name', rules)

		const event = { target: { value: 'test value' } } as unknown as Event
		props.onBlur(event)

		expect(validateField).toHaveBeenCalledWith('name', 'test value', rules)
	})

	it('should not validate if no rules provided', () => {
		const props = register('name')

		const event = { target: { value: 'test' } } as unknown as Event
		props.onBlur(event)

		expect(validateField).not.toHaveBeenCalled()
	})
})
