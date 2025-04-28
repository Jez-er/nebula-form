import { FormRule } from '../../types/types'

export function createState<T extends object>(
	values: T,
	errors: Partial<Record<keyof T, string | null>>,
	fieldRules: Map<keyof T, FormRule>,
	validateField: <K extends keyof T>(
		name: K,
		value: any,
		rules: FormRule
	) => boolean,
	defaultValues?: Partial<T>
) {
	function reset(name?: keyof T) {
		if (name) {
			// Reset specific field
			;(values as any)[name] = (defaultValues as any)?.[name] ?? null
			errors[name] = null
		} else {
			// Reset all fields
			Object.keys(values).forEach(key => {
				;(values as any)[key] = (defaultValues as any)?.[key] ?? null
				errors[key as keyof T] = null
			})
			fieldRules.clear()
		}
	}

	function setValue<K extends keyof T>(name: K, value: T[K]) {
		;(values as T)[name] = value

		// Validate field if it has rules
		const rules = fieldRules.get(name)
		if (rules) {
			validateField(name, value, rules)
		}
	}

	function getValue<K extends keyof T>(name: K): T[K] {
		if (name in values) {
			return values[name]
		}
		return undefined as any
	}

	return {
		reset,
		setValue,
		getValue,
	}
}
