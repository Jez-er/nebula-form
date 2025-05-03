import { describe, expect, it } from 'vitest'
import * as yup from 'yup'
import { yupResolver } from '../../../core/feature/resolvers/yupResolver'

describe('yupResolver', () => {
	const schema = yup.object({
		name: yup.string().required().min(3),
		age: yup.number().min(18).max(99),
	})
	const resolver = yupResolver(schema)

	it('validates correct data', () => {
		const result = resolver({ name: 'Jack', age: 25 })
		expect(result).toHaveProperty('values')
		expect(result.values).toEqual({ name: 'Jack', age: 25 })
		expect(result).not.toHaveProperty('errors')
	})

	it('returns errors for incorrect data', () => {
		const result = resolver({ name: '', age: 15 })
		expect(result).toHaveProperty('errors')
		expect(result.errors).toHaveProperty('name')
		expect(result.errors).toHaveProperty('age')
	})

	it('ignores unknown fields', () => {
		const result = resolver({ name: 'Jack', age: 25, extra: 'extra' })
		expect(result).toHaveProperty('values')
		expect(result.values).not.toHaveProperty('extra')
	})
})
