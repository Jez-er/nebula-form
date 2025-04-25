export interface FormOptions<T> {
	defaultValues?: Partial<T>
}

export interface FormValues {
	values: number | string
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
	errors: Record<keyof T, string | null>
	register: <K extends keyof T>(
		name: K,
		options?: FormRule
	) => {
		name: K
		value: T[K]
		onInput: (e: Event) => void
	}
	handleSubmit: (cb: (data: T) => void) => (e: Event) => void
}
