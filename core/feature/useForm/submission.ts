import { FormRule, Resolver } from '../../types/types'

export function createSubmission<T extends object>(
	values: T,
	errors: Partial<Record<keyof T, string | null>>,
	fieldRules: Map<keyof T, FormRule>,
	validateField: <K extends keyof T>(
		name: K,
		value: any,
		rules: FormRule
	) => boolean,
	resolver?: Resolver<T>
) {
	function validateAllFields(): boolean {
		let isValid = true
		Object.keys(errors).forEach(key => {
			errors[key as keyof T] = null
		})

		if (resolver) {
			const result = resolver(values)
			if (result.errors) {
				isValid = false
				for (const key in result.errors) {
					errors[key as keyof T] = result.errors[key]
				}
			}
		} else {
			for (const [name, rules] of fieldRules.entries()) {
				const value = (values as any)[name]
				const valid = validateField(name, value, rules)
				if (!valid) {
					isValid = false
					const input = document.querySelector(
						`[name="${String(name)}"]`
					) as HTMLElement
					if (input) {
						input.focus()
						break
					}
				}
			}
		}

		return isValid
	}

	function handleSubmit(cb: (data: T) => void) {
		return (e: Event) => {
			e.preventDefault()
			if (validateAllFields()) {
				cb(JSON.parse(JSON.stringify(values)) as T)
			}
		}
	}

	return {
		validateAllFields,
		handleSubmit,
	}
}
