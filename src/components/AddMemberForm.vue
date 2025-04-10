<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue'
import FormInput from './FormInput.vue'
// import { NewUser } from '../users'
// import { validate, length, required } from '../validation'
// import { useUsers } from '../stores/users'
import { useModal } from '../composables/modal'
import type { Member } from '@/stores/members.ts'
import { useMembers } from '@/stores/members.ts'

// defineProps<{
//   error?: string
// }>()

// const emit = defineEmits<{
//   (event: 'submit', payload: Member): void
// }>()

// const username = ref('')
// const usernameStatus = computed(() => {
//   return validate(username.value, [required, length({ min: 5, max: 10 })])
// })

// const password = ref('')
// const passwordStatus = computed(() => {
//   return validate(password.value, [required, length({ min: 10, max: 40 })])
// })

const isInvalid = computed(() => {
  return !name.value || !email.value
})

const modal = useModal()
const name = ref('')
const email = ref('')
const membersStore = useMembers()

async function handleSubmit() {
  if (isInvalid.value) {
    return
  }

  try {
    membersStore.addMember(name.value, email.value)
    console.log('Member added:', name.value, email.value)
    modal.hideModal()
  } catch (e) {}
}
</script>

<template>
  <form class="border w-full rounded-2xl border-black" @submit.prevent="handleSubmit">
    <FormInput name="Name" v-model="name" type="text" />
    <FormInput name="Email" v-model="email" type="text" />
    <!-- <div v-if="error" class="is-danger help">
        {{ error }}
      </div> -->
    <div class="flex justify-center items-center mt-4">
      <button
        class="px-4 py-2 bg-purple-500 text-white rounded-sm hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed mb-2 w-1/5 text-base"
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
