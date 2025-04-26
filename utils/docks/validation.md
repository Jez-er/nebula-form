# Validation

Nebula Form provides a robust validation system that allows you to validate form inputs with built-in rules or custom validation logic.

## Built-in Validation Rules

NebulaForm comes with several built-in validation rules that can be applied to form fields:

| Rule        | Description                            | Example                                                                                        |
| ----------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `required`  | Ensures the field is not empty         | `{ required: 'This field is required' }`                                                       |
| `minLength` | Validates minimum string length        | `{ minLength: { value: 8, message: 'Min 8 characters' } }`                                     |
| `maxLength` | Validates maximum string length        | `{ maxLength: { value: 100, message: 'Max 100 characters' } }`                                 |
| `min`       | Validates minimum numeric value        | `{ min: { value: 18, message: 'Must be at least 18' } }`                                       |
| `max`       | Validates maximum numeric value        | `{ max: { value: 65, message: 'Must be at most 65' } }`                                        |
| `pattern`   | Validates against a regular expression | `{ pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } }` |

## Applying Validation Rules

Validation rules are applied when registering a field using the `register` function:

```typescript
const { register, errors } = useForm<FormData>()

// Single validation rule
register('username', { required: 'Username is required' })

// Multiple validation rules
register('email', {
	required: 'Email is required',
	pattern: {
		value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		message: 'Invalid email format',
	},
})

// Numeric validation
register('age', {
	required: 'Age is required',
	min: { value: 18, message: 'Must be at least 18 years old' },
	max: { value: 100, message: 'Must be at most 100 years old' },
})
```

## Validation Timing

Validation occurs at the following times:

1. **On Input**: When the user types in a field (immediate feedback)
2. **On Blur**: When the field loses focus
3. **On Submit**: When the form is submitted

## Displaying Validation Errors

Validation errors are stored in the `errors` object returned by `useForm`. You can display these errors in your template:

```vue
<template>
	<div>
		<input v-bind="register('email', { required: 'Email is required' })" />
		<p v-if="errors.email" class="error">{{ errors.email }}</p>
	</div>
</template>
```

## Manual Validation

You can manually validate all fields using the `validateAllFields` function:

```typescript
const { validateAllFields } = useForm<FormData>()

function checkForm() {
	const isValid = validateAllFields()
	if (isValid) {
		// Form is valid
	} else {
		// Form has errors
	}
}
```

## Field-Specific Validation

When setting a value programmatically using `setValue`, validation rules will be applied automatically if the field has been registered with rules:

```typescript
const { register, setValue } = useForm<FormData>()

// Register with validation rules
register('email', {
	required: 'Email is required',
	pattern: {
		value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		message: 'Invalid email format',
	},
})

// This will trigger validation
setValue('email', 'invalid-email')
```
