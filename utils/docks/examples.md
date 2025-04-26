# Examples

This page provides practical examples of using Nebula Form in different scenarios.

## Basic Login Form

```vue
<script setup lang="ts">
import { useForm } from 'nebula-form'

interface LoginForm {
	email: string
	password: string
}

const { register, handleSubmit, errors } = useForm<LoginForm>()

const onSubmit = (data: LoginForm) => {
	console.log('Login attempt:', data)
	// Call authentication API
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

## Registration Form with Password Confirmation

```vue
<script setup lang="ts">
import { useForm } from 'nebula-form'
import { ref, watch } from 'vue'

interface RegistrationForm {
	username: string
	email: string
	password: string
	confirmPassword: string
}

const { register, handleSubmit, errors, values, setValue } =
	useForm<RegistrationForm>()
const passwordsMatch = ref(true)

// Watch for password changes to validate confirmation
watch(
	() => values.confirmPassword,
	newVal => {
		if (newVal && values.password !== newVal) {
			passwordsMatch.value = false
		} else {
			passwordsMatch.value = true
		}
	}
)

watch(
	() => values.password,
	newVal => {
		if (values.confirmPassword && values.confirmPassword !== newVal) {
			passwordsMatch.value = false
		} else {
			passwordsMatch.value = true
		}
	}
)

const onSubmit = (data: RegistrationForm) => {
	if (!passwordsMatch.value) return

	console.log('Registration data:', data)
	// Call registration API
}
</script>

<template>
	<form @submit="handleSubmit(onSubmit)">
		<div>
			<label for="username">Username</label>
			<input
				id="username"
				v-bind="
					register('username', {
						required: 'Username is required',
						minLength: {
							value: 3,
							message: 'Username must be at least 3 characters',
						},
					})
				"
			/>
			<p v-if="errors.username" class="error">{{ errors.username }}</p>
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

		<div>
			<label for="confirmPassword">Confirm Password</label>
			<input
				id="confirmPassword"
				type="password"
				v-bind="
					register('confirmPassword', {
						required: 'Please confirm your password',
					})
				"
			/>
			<p v-if="errors.confirmPassword" class="error">
				{{ errors.confirmPassword }}
			</p>
			<p v-if="!passwordsMatch && values.confirmPassword" class="error">
				Passwords do not match
			</p>
		</div>

		<button type="submit">Register</button>
	</form>
</template>
```

## Dynamic Form with Multiple Fields

```vue
<script setup lang="ts">
import { useForm } from 'nebula-form'
import { ref } from 'vue'

interface ProductForm {
	name: string
	price: number
	description: string
	category: string
	inStock: boolean
	tags: string
}

const categories = ref(['Electronics', 'Clothing', 'Books', 'Home', 'Other'])

const { register, handleSubmit, errors, setValue } = useForm<ProductForm>({
	defaultValues: {
		name: '',
		price: 0,
		description: '',
		category: 'Electronics',
		inStock: true,
		tags: '',
	},
})

const onSubmit = (data: ProductForm) => {
	// Convert tags string to array
	const formattedData = {
		...data,
		tags: data.tags
			.split(',')
			.map(tag => tag.trim())
			.filter(Boolean),
		price: Number(data.price),
	}

	console.log('Product data:', formattedData)
	// Submit to API
}
</script>

<template>
	<form @submit="handleSubmit(onSubmit)">
		<div>
			<label for="name">Product Name</label>
			<input
				id="name"
				v-bind="register('name', { required: 'Product name is required' })"
			/>
			<p v-if="errors.name" class="error">{{ errors.name }}</p>
		</div>

		<div>
			<label for="price">Price</label>
			<input
				id="price"
				type="number"
				step="0.01"
				v-bind="
					register('price', {
						required: 'Price is required',
						min: { value: 0.01, message: 'Price must be greater than 0' },
					})
				"
			/>
			<p v-if="errors.price" class="error">{{ errors.price }}</p>
		</div>

		<div>
			<label for="description">Description</label>
			<textarea
				id="description"
				v-bind="
					register('description', {
						required: 'Description is required',
						minLength: {
							value: 10,
							message: 'Description must be at least 10 characters',
						},
					})
				"
			></textarea>
			<p v-if="errors.description" class="error">{{ errors.description }}</p>
		</div>

		<div>
			<label for="category">Category</label>
			<select
				id="category"
				v-bind="register('category', { required: 'Please select a category' })"
			>
				<option
					v-for="category in categories"
					:key="category"
					:value="category"
				>
					{{ category }}
				</option>
			</select>
			<p v-if="errors.category" class="error">{{ errors.category }}</p>
		</div>

		<div>
			<label>
				<input type="checkbox" v-bind="register('inStock')" />
				In Stock
			</label>
		</div>

		<div>
			<label for="tags">Tags (comma separated)</label>
			<input
				id="tags"
				v-bind="register('tags')"
				placeholder="e.g. new, featured, sale"
			/>
		</div>

		<button type="submit">Save Product</button>
	</form>
</template>
```

## Form with Conditional Fields

```vue
<script setup lang="ts">
import { useForm } from 'nebula-form'
import { computed } from 'vue'

interface ShippingForm {
	fullName: string
	email: string
	shippingMethod: 'standard' | 'express' | 'pickup'
	address?: string
	city?: string
	zipCode?: string
	pickupLocation?: string
}

const { register, handleSubmit, errors, values, watch } = useForm<ShippingForm>(
	{
		defaultValues: {
			fullName: '',
			email: '',
			shippingMethod: 'standard',
		},
	}
)

const needsAddress = computed(
	() =>
		values.shippingMethod === 'standard' || values.shippingMethod === 'express'
)

const needsPickupLocation = computed(() => values.shippingMethod === 'pickup')

const onSubmit = (data: ShippingForm) => {
	console.log('Shipping information:', data)
	// Process order
}
</script>

<template>
	<form @submit="handleSubmit(onSubmit)">
		<div>
			<label for="fullName">Full Name</label>
			<input
				id="fullName"
				v-bind="register('fullName', { required: 'Full name is required' })"
			/>
			<p v-if="errors.fullName" class="error">{{ errors.fullName }}</p>
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
			<label>Shipping Method</label>
			<div>
				<label>
					<input
						type="radio"
						v-bind="register('shippingMethod')"
						value="standard"
					/>
					Standard Shipping
				</label>
			</div>
			<div>
				<label>
					<input
						type="radio"
						v-bind="register('shippingMethod')"
						value="express"
					/>
					Express Shipping
				</label>
			</div>
			<div>
				<label>
					<input
						type="radio"
						v-bind="register('shippingMethod')"
						value="pickup"
					/>
					Store Pickup
				</label>
			</div>
		</div>

		<!-- Conditional Address Fields -->
		<template v-if="needsAddress">
			<div>
				<label for="address">Address</label>
				<input
					id="address"
					v-bind="register('address', { required: 'Address is required' })"
				/>
				<p v-if="errors.address" class="error">{{ errors.address }}</p>
			</div>

			<div>
				<label for="city">City</label>
				<input
					id="city"
					v-bind="register('city', { required: 'City is required' })"
				/>
				<p v-if="errors.city" class="error">{{ errors.city }}</p>
			</div>

			<div>
				<label for="zipCode">ZIP Code</label>
				<input
					id="zipCode"
					v-bind="register('zipCode', { required: 'ZIP code is required' })"
				/>
				<p v-if="errors.zipCode" class="error">{{ errors.zipCode }}</p>
			</div>
		</template>

		<!-- Conditional Pickup Location -->
		<template v-if="needsPickupLocation">
			<div>
				<label for="pickupLocation">Pickup Location</label>
				<select
					id="pickupLocation"
					v-bind="
						register('pickupLocation', {
							required: 'Please select a pickup location',
						})
					"
				>
					<option value="">Select a location</option>
					<option value="downtown">Downtown Store</option>
					<option value="mall">Shopping Mall</option>
					<option value="north">North District</option>
				</select>
				<p v-if="errors.pickupLocation" class="error">
					{{ errors.pickupLocation }}
				</p>
			</div>
		</template>

		<button type="submit">Continue to Payment</button>
	</form>
</template>
```

These examples demonstrate different ways to use NebulaForm in real-world scenarios. You can adapt them to fit your specific requirements.
