import { AnySchema, InferType } from 'yup'
import { Resolver } from '../../types/types'

export function yupResolver<T extends AnySchema>(
	schema: T
): Resolver<InferType<T>> {
	return (values: any) => {
		try {
			const data = schema.validateSync(values, {
				abortEarly: false,
				stripUnknown: true,
			})

			return {
				values: data,
			}
		} catch (err: any) {
			const errors: Partial<Record<keyof InferType<T>, string>> = {}

			if (err.inner && Array.isArray(err.inner)) {
				for (const e of err.inner) {
					if (e.path && !errors[e.path as keyof InferType<T>]) {
						errors[e.path as keyof InferType<T>] = e.message
					}
				}
			}

			return {
				errors,
			}
		}
	}
}
