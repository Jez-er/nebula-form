# API Reference

This document provides detailed information about the NebulaForm API.

## useForm

The main hook for creating and managing forms.

```typescript
function useForm<T extends object>(options?: FormOptions<T>): UseFormReturn<T>
```

### Parameters

- `options` (optional): Configuration options for the form
  - `defaultValues`: Initial values for form fields

### Returns

The `useForm` hook returns an object with the following properties and methods:

| Property/Method     | Type                                                                                            | Description                                                |
| ------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `values`            | `T`                                                                                             | Current form values                                        |
| `errors`            | `Partial<Record<keyof T, string \| null>>`                                                      | Form validation errors                                     |
| `register`          | `(name: keyof T, rules?: FormRule) => RegisterReturn`                                           | Registers a field with optional validation rules           |
| `handleSubmit`      | `(callback: (data: T) => void) => (e: Event) => void`                                           | Handles form submission with validation                    |
| `reset`             | `(name?: keyof T) => void`                                                                      | Resets form or specific field to default values            |
| `setValue`          | `<K extends keyof T>(name: K, value: T[K]) => void`                                             | Sets a field value programmatically                        |
| `watch`             | `<K extends keyof T>(name: K \| '*', callback: Function, options?: WatchOptions) => () => void` | Watches for changes in form values                         |
| `validateAllFields` | `() => boolean`                                                                                 | Validates all fields and returns whether the form is valid |

## FormRule

Interface for defining validation rules for form fields.

```typescript
interface FormRule {
	required?: boolean | string
	minLength?: { value: number; message: string }
	maxLength?: { value: number; message: string }
	min?: { value: number; message: string }
	max?: { value: number; message: string }
	pattern?: { value: RegExp; message: string }
}
```

## RegisterReturn

The object returned by the `register` function, which can be bound to an input element.

```typescript
interface RegisterReturn {
	name: string
	value: any
	onInput: (e: Event) => void
	onBlur: (e: Event) => void
}
```

## FormOptions

Interface for configuring the form.

```typescript
interface FormOptions<T extends object> {
	defaultValues?: Partial<T>
}
```

## UseFormReturn

Interface for the object returned by the `useForm` hook.

```typescript
interface UseFormReturn<T extends object> {
	values: T
	errors: Partial<Record<keyof T, string | null>>
	register: (name: keyof T, rules?: FormRule) => RegisterReturn
	handleSubmit: (callback: (data: T) => void) => (e: Event) => void
	reset: (name?: keyof T) => void
	setValue: <K extends keyof T>(name: K, value: T[K]) => void
	watch: <K extends keyof T>(
		name: K | '*',
		callback: Function,
		options?: WatchOptions
	) => () => void
	validateAllFields: () => boolean
}
```
