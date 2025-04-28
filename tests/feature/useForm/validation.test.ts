import { beforeEach, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { createValidation } from '../../../core/feature/useForm/validation'

describe('createValidation', () => {
	let errors: any
	let validation: ReturnType<
		typeof createValidation<{ name: string; email: string; age: number }>
	>

	beforeEach(() => {
		errors = ref({})
		validation = createValidation(errors)
	})

	it('should return validateField function', () => {
		expect(validation.validateField).toBeTypeOf('function')
	})

	describe('required rule', () => {
		it('should validate required field with value', () => {
			const result = validation.validateField('name', 'test', {
				required: 'This field is required',
			})
			expect(result).toBe(true)
			expect(errors.value.name).toBeUndefined()
		})

		it('should fail validation for empty required field', () => {
			const result = validation.validateField('name', '', {
				required: 'This field is required',
			})
			expect(result).toBe(false)
			expect(errors.value.name).toBe('This field is required')
		})

		it('should use custom message for required field', () => {
			const result = validation.validateField('name', '', {
				required: 'Field is required',
			})
			expect(result).toBe(false)
			expect(errors.value.name).toBe('Field is required')
		})
	})

	describe('minLength rule', () => {
		it('should validate field with sufficient length', () => {
			const result = validation.validateField('name', 'test', {
				minLength: { value: 3, message: 'Minimum 3 characters' },
			})
			expect(result).toBe(true)
			expect(errors.value.name).toBeUndefined()
		})

		it('should fail validation for too short value', () => {
			const result = validation.validateField('name', 'te', {
				minLength: { value: 3, message: 'Minimum 3 characters' },
			})
			expect(result).toBe(false)
			expect(errors.value.name).toBe('Minimum 3 characters')
		})
	})

	describe('maxLength rule', () => {
		it('should validate field with length greater than maxLength', () => {
			const result = validation.validateField('name', 'test', {
				maxLength: { value: 3, message: 'Maximum 3 characters' },
			})
			expect(result).toBe(true)
			expect(errors.value.name).toBeUndefined()
		})

		it('should fail validation for value with length less than maxLength', () => {
			const result = validation.validateField('name', 'a', {
				maxLength: { value: 3, message: 'Maximum 3 characters' },
			})
			expect(result).toBe(false)
			expect(errors.value.name).toBe('Maximum 3 characters')
		})
	})

	describe('min rule', () => {
		it('should validate number above minimum', () => {
			const result = validation.validateField('age', 25, {
				min: { value: 18, message: 'Minimum age is 18' },
			})
			expect(result).toBe(true)
			expect(errors.value.age).toBeUndefined()
		})

		it('should fail validation for number below minimum', () => {
			const result = validation.validateField('age', 16, {
				min: { value: 18, message: 'Minimum age is 18' },
			})
			expect(result).toBe(false)
			expect(errors.value.age).toBe('Minimum age is 18')
		})
	})

	describe('max rule', () => {
		it('should validate number below maximum', () => {
			const result = validation.validateField('age', 65, {
				max: { value: 70, message: 'Maximum age is 70' },
			})
			expect(result).toBe(true)
			expect(errors.value.age).toBeUndefined()
		})

		it('should fail validation for number above maximum', () => {
			const result = validation.validateField('age', 75, {
				max: { value: 70, message: 'Maximum age is 70' },
			})
			expect(result).toBe(false)
			expect(errors.value.age).toBe('Maximum age is 70')
		})
	})

	describe('pattern rule', () => {
		it('should validate value matching pattern', () => {
			const result = validation.validateField('email', 'test@example.com', {
				pattern: {
					value: /^\S+@\S+\.\S+$/,
					message: 'Invalid email',
				},
			})
			expect(result).toBe(true)
			expect(errors.value.email).toBeUndefined()
		})

		it('should fail validation for value not matching pattern', () => {
			const result = validation.validateField('email', 'invalid-email', {
				pattern: {
					value: /^\S+@\S+\.\S+$/,
					message: 'Invalid email',
				},
			})
			expect(result).toBe(false)
			expect(errors.value.email).toBe('Invalid email')
		})
	})
})
