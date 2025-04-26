# Getting Started with NebulaForm

This guide will help you get started with NebulaForm in your Vue.js application.

## Installation

First, make sure you have installed NebulaForm. If not, please refer to the [Installation Guide](./installation.md).

## Basic Form Setup

Here's how to create a basic form with NebulaForm:

### 1. Define Your Form Type

Start by defining the type for your form data:

```typescript
interface ContactForm {
	name: string
	email: string
	message: string
}
```

### 2. Initialize the Form

Use the `useForm` hook to initialize your form:

```typescript
import { useForm } from 'nebula-form'

const { register, handleSubmit, errors } = useForm<ContactForm>()
```

### 3. Create a Submit Handler

Create a function to handle form submission:

```typescript
const onSubmit = (data: ContactForm) => {
	// Process the form data
	console.log('Form data:', data)
	// e.g., send data to an API
}
```

### 4. Build Your Form Template

Create your form in the template section:

```vue
<template>
	<form @submit="handleSubmit(onSubmit)">
		<div>
			<label for="name">Name</label>
			<input
				id="name"
				v-bind="register('name', { required: 'Name is required' })"
			/>
			<p v-if="errors.name" class="error">{{ errors.name }}</p>
		</div>

		<div>
			<label for="email">Email</label>
			<input
				id="email"
				v-bind="
					register('email', {
						required: 'Email is required',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Invalid email format',
						},
					})
				"
			/>
			<p v-if="errors.email" class="error">{{ errors.email }}</p>
		</div>

		<div>
			<label for="message">Message</label>
			<textarea
				id="message"
				v-bind="register('message', { required: 'Message is required' })"
			></textarea>
			<p v-if="errors.message" class="error">{{ errors.message }}</p>
		</div>

		<button type="submit">Send</button>
	</form>
</template>
```

## Using Default Values

You can provide default values when initializing the form:

```typescript
const { register, handleSubmit, errors } = useForm<ContactForm>({
	defaultValues: {
		name: 'John Doe',
		email: 'john@example.com',
		message: '',
	},
})
```

## Programmatically Setting Values

You can set field values programmatically using the `setValue` function:

```typescript
const { register, handleSubmit, errors, setValue } = useForm<ContactForm>()

// Later in your code
setValue('name', 'Jane Doe')
```

## Resetting the Form

You can reset the entire form or specific fields:

```typescript
const { register, handleSubmit, reset } = useForm<ContactForm>()

// Reset the entire form
reset()

// Reset just the name field
reset('name')
```

## Watching Form Values

You can watch for changes in form values:

```typescript
const { register, watch } = useForm<ContactForm>()

// Watch a specific field
watch('email', value => {
	console.log('Email changed:', value)
})

// Watch all form values
watch('*', values => {
	console.log('Form values changed:', values)
})
```

## Next Steps

Now that you understand the basics of NebulaForm, you can:

- Learn more about [validation rules](./validation.md)
- Explore the complete [API reference](./api-reference.md)
- Check out more complex [examples](./examples.md)
