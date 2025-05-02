import { Ref } from 'vue'

export interface FormOptions<T> {
	defaultValues?: Partial<T>
	resolver?: Resolver<T>
}

export type Resolver<T> = (values: T) => {
	values?: T
	errors?: Partial<Record<keyof T, string>>
}

export interface FormValues {
	value: number | string | RegExp
	message: string
}

export interface FormRule {
	required?: string
	minLength?: FormValues
	maxLength?: FormValues
	min?: FormValues
	max?: FormValues
	pattern?: FormValues
	validate?: (value: string) => boolean
}

export interface UseFormReturn<T> {
	values: T
	errors: Ref<Partial<Record<keyof T, string | null>>>
	register: <K extends keyof T>(
		name: K,
		options?: FormRule
	) => {
		name: K
		value: T[K]
		onInput: (e: Event) => void
		onBlur: (e: Event) => void
	}
	handleSubmit: (cb: (data: T) => void) => (e: Event) => void
	reset: (name?: keyof T) => void
	setValue: (name: keyof T, value: T[keyof T]) => void
	getValue: (name: keyof T) => T[keyof T]
	watch: (
		name: keyof T | '*',
		callback: (value: any, oldValue: any) => void,
		options?: { deep?: boolean; immediate?: boolean }
	) => () => void
}
