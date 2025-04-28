import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createState } from '../../../core/feature/useForm/state'

describe('createState', () => {
	let values: { name: string; email: string }
	let errors: Partial<Record<keyof typeof values, string | null>>
	let validateField: any
	let fieldRules: Map<keyof typeof values, any>
	let defaultValues: { name: string; email: string }
	let state: ReturnType<typeof createState<typeof values>>

	beforeEach(() => {
		values = { name: 'test', email: 'test@example.com' }
		errors = { name: null, email: null }
		validateField = vi.fn().mockReturnValue(true)
		fieldRules = new Map()
		defaultValues = { name: '', email: '' }
		state = createState(
			values,
			errors,
			fieldRules,
			validateField,
			defaultValues
		)
	})

	it('should return state management functions', () => {
		expect(state.reset).toBeTypeOf('function')
		expect(state.setValue).toBeTypeOf('function')
		expect(state.getValue).toBeTypeOf('function')
	})

	it('should reset a specific field to default value', () => {
		state.reset('name')

		expect(values.name).toBe('')
		expect(errors.name).toBeNull()
	})

	it('should reset all fields to default values', () => {
		state.reset()

		expect(values.name).toBe('')
		expect(values.email).toBe('')
		expect(errors.name).toBeNull()
		expect(errors.email).toBeNull()
		expect(fieldRules.size).toBe(0)
	})

	it('should set value for a field', () => {
		state.setValue('name', 'new name')

		expect(values.name).toBe('new name')
	})

	it('should validate field when setting value if rules exist', () => {
		const rules = { required: true }
		fieldRules.set('name', rules)

		state.setValue('name', 'new name')

		expect(validateField).toHaveBeenCalledWith('name', 'new name', rules)
	})

	it('should not validate field when setting value if no rules exist', () => {
		state.setValue('email', 'new@example.com')

		expect(validateField).not.toHaveBeenCalled()
	})

	it('should get value for a field', () => {
		expect(state.getValue('name')).toBe('test')
		expect(state.getValue('email')).toBe('test@example.com')
	})

	it('should return undefined for non-existent field', () => {
		const result = state.getValue('nonexistent' as any)
		expect(result).toBeUndefined()
	})
})
