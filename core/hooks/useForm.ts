import { reactive, ref } from 'vue'
import type { FormOptions, FormRule, UseFormReturn } from '../types/types'

export function useForm<T extends object = any>(
	options?: FormOptions<T>
): UseFormReturn<T> {
	const values = reactive<T>({ ...options?.defaultValues } as T)
	const errors = ref<Partial<Record<keyof T, string | null>>>({})
	const fieldRules = new Map<keyof T, FormRule>()

	function register<K extends keyof T>(name: K, rules?: FormRule) {
		return {
			name,
			value: (values as any)[name],
			onInput: (e: Event) => {
				const target = e.target as HTMLInputElement
				;(values as T)[name] = target.value as any
				errors.value[name] = null

				if (rules) {
					validateField(name, target.value, rules)
				}
			},
		}
	}

	function validateField<K extends keyof T>(
		name: K,
		value: any,
		rules: FormRule
	): boolean {
		if (rules.required && (!value || value.toString().trim() === '')) {
			errors.value[name] =
				typeof rules.required === 'string'
					? rules.required
					: 'Это поле обязательно'
			return false
		}

		if (
			rules.minLength &&
			value &&
			value.toString().length < rules.minLength.values
		) {
			errors.value[name] = rules.minLength.message
			return false
		}

		return true
	}

	function validateAllFields(): boolean {
		let isValid = true
		errors.value = {} // сброс перед проверкой

		for (const [name, rules] of fieldRules.entries()) {
			const value = (values as any)[name]
			const valid = validateField(name, value, rules)
			if (!valid) isValid = false
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
		values: values as T,
		errors: errors.value,
		register,
		handleSubmit,
	}
}
