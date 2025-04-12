<script setup lang="ts">
import type { MembersState } from "@/stores/members"
import type { Member } from "@/stores/members"
import Switch from "@/components/ui/switch/Switch.vue"
import { useMembers } from "@/stores/members"
import { ChevronLeft, ChevronRight } from "lucide-vue-next"
import { computed, ref, watch } from "vue"
defineProps<{}>()
const membersStore = useMembers()
const allMembers = ref([...membersStore.all.values()])
const searchQuery = defineModel<string>("searchQuery", { required: true })
const debouncedSearchQuery = defineModel<string>("debouncedSearchQuery", {
	required: true,
})
const currentPage = ref(1)
const totalPages = computed(() => {
	return debouncedSearchQuery.value
		? Math.ceil(filteredMembers.value.length / itemsPerPage)
		: Math.ceil(allMembers.value.length / itemsPerPage)
	// return Math.ceil(allMembers.length / itemsPerPage);
})
const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++
	}
}

const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--
	}
}
const itemsPerPage = 5

const filteredMembers = computed(() => {
	if (!debouncedSearchQuery.value) {
		return allMembers.value
	}
	return allMembers.value.filter(
		(m) =>
			m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			m.email.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
})

const paginatedMembers = computed(() => {
	const startIndex = (currentPage.value - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	return filteredMembers.value.slice(startIndex, endIndex)
})

watch(
	() => debouncedSearchQuery.value,
	(newValue) => {
		// Reset current page when search query changes
		currentPage.value = 1
		if (filteredMembers.value.length === 0) {
			currentPage.value = 0
		}
	}
	// { immediate: true }
)

watch(
	() => membersStore.all,
	(newAll) => {
		allMembers.value = [...newAll.values()]
	},
	{ deep: true }
)
</script>

<template>
	<div class="bg-white overflow-hidden sm:rounded-md">
		<table class="min-w-full">
			<thead class="">
				<tr>
					<th class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">Tên</th>
					<th class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">Email</th>
					<th class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">Enable / Disable</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				<tr v-for="member in paginatedMembers" :key="member.email">
					<td class="px-6 py-4 whitespace-nowrap">{{ member.name }}</td>
					<td class="px-6 py-4 whitespace-nowrap">{{ member.email }}</td>
					<td class="px-6 py-4">
						<label class="inline-flex items-center cursor-pointer">
							<Switch
								:id="member.id"
								:model-value="member.enabled"
								@update:model-value="membersStore.toggleEnable(member.id)"
								class="border-0"
							/>

							<span class="ml-2 text-gray-700">
								{{ member.enabled ? "Enabled" : "Disabled" }}
							</span>
						</label>
					</td>
				</tr>
			</tbody>
		</table>

		<div class="py-4 flex items-center justify-center border-t">
			<div class="flex space-x-0">
				<button @click="prevPage" :disabled="currentPage === 1" class="">
					<ChevronLeft></ChevronLeft>
				</button>
				<span class="text-gray-700 py-1"> {{ currentPage }} / {{ totalPages }} </span>
				<button @click="nextPage" :disabled="currentPage === totalPages" class="">
					<ChevronRight></ChevronRight>
				</button>
			</div>
		</div>
	</div>
</template>
