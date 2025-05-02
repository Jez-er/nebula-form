import type { Schema } from 'joi'
import { Resolver } from '../../types/types'

export function joiResolver<T>(schema: Schema): Resolver<T> {
	return (values: any) => {
		const { error, value } = schema.validate(values, {
			abortEarly: false,
			stripUnknown: true,
		})

		if (!error) {
			return {
				values: value,
			}
		}

		const errors: Partial<Record<keyof T, string>> = {}

		for (const detail of error.details) {
			const path = detail.path[0] as keyof T
			if (path && !errors[path]) {
				errors[path] = detail.message
			}
		}

		return {
			errors,
		}
	}
}
