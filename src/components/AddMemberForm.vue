<script lang="ts" setup>
import { computed, ref, useSlots } from "vue"
import FormInput from "./FormInput.vue"

import { useModal } from "../composables/modal"

import { useMembers } from "@/stores/members.ts"

const isInvalid = computed(() => {
	return !name.value || !email.value
})

const modal = useModal()
const name = ref("")
const email = ref("")
const membersStore = useMembers()

async function handleSubmit() {
	if (isInvalid.value) {
		return
	}

	try {
		membersStore.addMember(name.value, email.value)
		console.log("Member added:", name.value, email.value)
		modal.hideModal()
	} catch (e) {}
}
</script>

<template>
	<form class="border w-full rounded-2xl border-black text-base" @submit.prevent="handleSubmit">
		<FormInput name="Name" v-model="name" type="text" />
		<FormInput name="Email" v-model="email" type="text" />
		<!-- <div v-if="error" class="is-danger help">
        {{ error }}
      </div> -->
		<div class="flex justify-center items-center">
			<button
				class="px-4 py-2 bg-primary text-white rounded-sm hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed mb-2 w-1/5 text-base"
				:disabled="isInvalid"
			>
				Submit
			</button>
		</div>
	</form>
</template>

<style scoped>
.form {
	background: white;
	padding: 30px;
	margin-top: 50px;
}
</style>
