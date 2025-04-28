import { describe, expect, it } from 'vitest'
import * as useFormModule from '../../../core/feature/useForm'

describe('useForm module exports', () => {
	it('should export createRegister function', () => {
		expect(useFormModule.createRegister).toBeTypeOf('function')
	})

	it('should export createState function', () => {
		expect(useFormModule.createState).toBeTypeOf('function')
	})

	it('should export createSubmission function', () => {
		expect(useFormModule.createSubmission).toBeTypeOf('function')
	})

	it('should export createValidation function', () => {
		expect(useFormModule.createValidation).toBeTypeOf('function')
	})

	it('should export createWatch function', () => {
		expect(useFormModule.createWatch).toBeTypeOf('function')
	})
})
