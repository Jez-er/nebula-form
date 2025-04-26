<h1 align="center">Nebula Form</h1>

<p align="center">
  <img src="./utils/assets/NebulaForm.png" alt="NebulaForm" width="40%" />
</p>

Nebula Form is a lightweight, type-safe form management library for Vue.js applications. It provides a simple and intuitive API for handling form state, validation, and submission.

## Table of Contents

- [Installation](./utils/docks/installation.md)
- [Getting Started](./utils/docks/getting-started.md)
- [API Reference](./utils/docks/api-reference.md)
- [Validation](./utils/docks/validation.md)
- [Examples](./utils/docks/examples.md)

## Key Features

- **Type-safe form handling** - Built with TypeScript for excellent type inference
- **Simple API** - Intuitive hooks-based API for form management
- **Validation** - Built-in validation rules with custom validation support
- **Field registration** - Easy field registration with automatic validation
- **Form state management** - Manage form values, errors, and submission state
- **Form watching** - Watch for changes in form values

## Basic Example

```vue
<script setup lang="ts">
import { useForm } from 'nebula-form'

interface LoginForm {
	email: string
	password: string
}

const { register, handleSubmit, errors } = useForm<LoginForm>()

const onSubmit = (data: LoginForm) => {
	console.log('Form submitted:', data)
}
</script>

<template>
	<form @submit="handleSubmit(onSubmit)">
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
			<label for="password">Password</label>
			<input
				id="password"
				type="password"
				v-bind="
					register('password', {
						required: 'Password is required',
						minLength: {
							value: 8,
							message: 'Password must be at least 8 characters',
						},
					})
				"
			/>
			<p v-if="errors.password" class="error">{{ errors.password }}</p>
		</div>

		<button type="submit">Login</button>
	</form>
</template>
```

For more detailed information, please refer to the specific documentation sections listed in the table of contents.
