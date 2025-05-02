import { z, ZodTypeAny } from 'zod'
import { Resolver } from '../../types/types'

export function zodResolver<T extends ZodTypeAny>(
	schema: T
): Resolver<z.infer<T>> {
	return (values: any) => {
		const result = schema.safeParse(values)

		if (result.success) {
			return {
				values: result.data,
			}
		}

		const errors: Partial<Record<keyof z.infer<T>, string>> = {}

		for (const issue of result.error.issues) {
			const key = issue.path[0]
			if (key) {
				errors[key as keyof z.infer<T>] = issue.message
			}
		}

		return { errors }
	}
}
