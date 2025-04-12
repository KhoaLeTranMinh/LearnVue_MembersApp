<script lang="ts" setup>
defineProps<{
	name: string
	modelValue: string
	type: string
}>()

const emit = defineEmits<{
	(event: "update:modelValue", value: string): void
}>()

function handleInput(e: Event) {
	const value = (e.target as HTMLInputElement).value
	emit("update:modelValue", value)
}
</script>

<template>
	<div class="p-4 mb-4">
		<label :for="name">{{ name }}</label>
		<div class="mt-2">
			<input
				:type="type"
				:id="name"
				class="w-full border border-black focus: outline-none focus:border-black rounded-lg p-2 bg-gray-200"
				:value="modelValue"
				@input="handleInput"
			/>
		</div>

		<!-- <p class="is-danger help" v-if="!status.valid">
      {{ status.message }}
    </p> -->
	</div>
</template>
