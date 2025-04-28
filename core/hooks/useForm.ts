import { reactive, Ref, ref } from 'vue'
import {
	createRegister,
	createState,
	createSubmission,
	createValidation,
	createWatch,
} from '../feature/useForm'
import type { FormOptions, FormRule, UseFormReturn } from '../types/types'

export function useForm<T extends object = any>(
	options?: FormOptions<T>
): UseFormReturn<T> {
	const values = reactive<T>({ ...options?.defaultValues } as T)
	const errors = ref<Partial<Record<keyof T, string | null>>>({})
	const fieldRules = new Map<keyof T, FormRule>()

	const { validateField } = createValidation<T>(
		errors as Ref<Partial<Record<keyof T, string | null>>>
	)

	const register = createRegister<T>(
		values as T,
		errors.value,
		validateField,
		fieldRules
	)

	const { handleSubmit } = createSubmission<T>(
		values as T,
		errors.value,
		fieldRules,
		validateField
	)

	const { reset, setValue, getValue } = createState<T>(
		values as T,
		errors.value,
		fieldRules,
		validateField,
		options?.defaultValues
	)

	const { watch } = createWatch<T>(values as T)

	return {
		values: values as T,
		errors: errors as Ref<Partial<Record<keyof T, string | null>>>,
		register,
		handleSubmit,
		reset,
		setValue,
		getValue,
		watch,
	}
}
