<template>
	<form @submit="onSubmit">
		<input
			v-bind="
				register('email', {
					required: 'Email is required',
					minLength: {
						values: 5,
						message: 'Email must be at least 5 characters',
					},
				})
			"
			placeholder="Email"
		/>
		<input
			v-bind="register('password')"
			type="password"
			placeholder="Password"
		/>
		<span v-if="errors.email">{{ errors.email }}</span>
		<button type="submit">Submit</button>
	</form>
</template>

<script setup lang="ts">
import { useForm } from '../core'

const { register, handleSubmit, errors } = useForm<{
	email: string
	password: string
}>()

const onSubmit = handleSubmit(data => {
	console.log('Form Submitted:', data.email)
	console.log('Form Submitted:', errors)
})
</script>
