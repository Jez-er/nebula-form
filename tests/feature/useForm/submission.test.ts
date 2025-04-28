import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createSubmission } from '../../../core/feature/useForm/submission'

describe('createSubmission', () => {
	let values: { name: string; email: string }
	let errors: Partial<Record<keyof typeof values, string | null>>
	let validateField: any
	let fieldRules: Map<keyof typeof values, any>
	let submission: ReturnType<typeof createSubmission<typeof values>>
	let focusMock: any
	let querySelectorMock: any

	beforeEach(() => {
		values = { name: 'test', email: 'test@example.com' }
		errors = { name: null, email: null }
		validateField = vi.fn()
		fieldRules = new Map()

		// Mock DOM methods
		focusMock = vi.fn()
		querySelectorMock = vi.fn().mockReturnValue({ focus: focusMock })
		global.document = { querySelector: querySelectorMock } as any

		submission = createSubmission(values, errors, fieldRules, validateField)
	})

	it('should return submission functions', () => {
		expect(submission.validateAllFields).toBeTypeOf('function')
		expect(submission.handleSubmit).toBeTypeOf('function')
	})

	describe('validateAllFields', () => {
		it('should return true when all fields are valid', () => {
			validateField.mockReturnValue(true)
			fieldRules.set('name', { required: true })
			fieldRules.set('email', { required: true })

			const result = submission.validateAllFields()

			expect(result).toBe(true)
			expect(validateField).toHaveBeenCalledTimes(2)
			expect(errors.name).toBeNull()
			expect(errors.email).toBeNull()
		})

		it('should return false when any field is invalid', () => {
			validateField.mockImplementation(name =>
				name === 'email' ? false : true
			)
			fieldRules.set('name', { required: true })
			fieldRules.set('email', { required: true })

			const result = submission.validateAllFields()

			expect(result).toBe(false)
			expect(querySelectorMock).toHaveBeenCalledWith('[name="email"]')
			expect(focusMock).toHaveBeenCalled()
		})

		it('should clear all errors before validation', () => {
			errors.name = 'Previous error'
			errors.email = 'Previous error'
			validateField.mockReturnValue(true)
			fieldRules.set('name', { required: true })

			submission.validateAllFields()

			expect(errors.name).toBeNull()
			expect(errors.email).toBeNull()
		})
	})

	describe('handleSubmit', () => {
		it('should prevent default event behavior', () => {
			const preventDefault = vi.fn()
			const event = { preventDefault } as unknown as Event
			const callback = vi.fn()

			validateField.mockReturnValue(true)
			fieldRules.set('name', { required: true })

			const handler = submission.handleSubmit(callback)
			handler(event)

			expect(preventDefault).toHaveBeenCalled()
		})

		it('should call callback with form values when validation passes', () => {
			const preventDefault = vi.fn()
			const event = { preventDefault } as unknown as Event
			const callback = vi.fn()

			validateField.mockReturnValue(true)
			fieldRules.set('name', { required: true })

			const handler = submission.handleSubmit(callback)
			handler(event)

			expect(callback).toHaveBeenCalledWith(values)
		})

		it('should not call callback if validation fails', () => {
			const preventDefault = vi.fn()
			const event = { preventDefault } as unknown as Event
			const callback = vi.fn()

			validateField.mockReturnValue(false)
			fieldRules.set('name', { required: true })

			const handler = submission.handleSubmit(callback)
			handler(event)

			expect(callback).not.toHaveBeenCalled()
		})
	})
})
