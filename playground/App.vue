<template>
	<form @submit="onSubmit">
		<input
			v-bind="
				register('email', {
					required: 'Email is required',
					minLength: {
						value: 5,
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
		<input
			v-bind="
				register('age', {
					required: 'Age is required',
					min: {
						value: 18,
						message: 'You must be at least 18 years old',
					},
					max: {
						value: 120,
						message: 'You must be at most 120 years old',
					},
				})
			"
			type="number"
			placeholder="Age"
		/>
		<span v-if="errors.email">{{ errors.email }}</span>
		<span v-if="errors.age">{{ errors.age }}</span>
		<button type="submit">Submit</button>
	</form>
</template>

<script setup lang="ts">
import { useForm } from '../core'

const { register, handleSubmit, errors, reset } = useForm<{
	email: string
	password: string
	age: number
}>()

const onSubmit = handleSubmit(data => {
	console.log('Form Submitted:', data.email)
	console.log('Form Submitted:', errors)
	reset()
})
</script>
