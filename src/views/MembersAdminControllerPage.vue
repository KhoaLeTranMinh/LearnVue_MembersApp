<script setup lang="ts">
import { useMembers } from "@/stores/members"
import { ref, computed, watch, nextTick } from "vue"
import { Search, Plus } from "lucide-vue-next"
import Switch from "@/components/ui/switch/Switch.vue"
import { useModal } from "@/composables/modal"
import { debouncedRef } from "@vueuse/core"
import type { Member } from "@/stores/members"
import debounce from "lodash/debounce"
import { useDebounce } from "@vueuse/core"

const searchQuery = ref("")
const debouncedSearchQuery = useDebounce(searchQuery, 300)
const useMember = useMembers()
const allMembers = ref([...useMember.all.values()])
const modal = useModal()
const props = defineProps<{
	isAdmin: boolean
}>()

const currentPage = ref(1)
const itemsPerPage = 5

const showSuggestions = ref(false)
const selectedMember = ref("")
const highlightedIndex = ref(0) // Track currently highlighted suggestion

const searchSuggestions = computed(() => {
	if (!searchQuery.value) return []
	if (!debouncedSearchQuery.value) return []
	return allMembers.value.filter(
		(m) =>
			m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			m.email.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
})

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

// Whenever search query changes, reset the current page to 1

// Total pages computation
const totalPages = computed(() => {
	return debouncedSearchQuery.value
		? Math.ceil(filteredMembers.value.length / itemsPerPage)
		: Math.ceil(allMembers.value.length / itemsPerPage)
	// return Math.ceil(allMembers.length / itemsPerPage);
})

watch(
	() => useMember.all,
	(newAll) => {
		allMembers.value = [...newAll.values()]
	},
	{ deep: true }
)

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

function selectMember(member: Member) {
	selectedMember.value = member.id
	searchQuery.value = member.name
	showSuggestions.value = false
	highlightedIndex.value = 0
	searchQuery.value = member.name
}

function handleKeydown(event: KeyboardEvent) {
	if (!showSuggestions.value || !searchSuggestions.value.length) return

	switch (event.key) {
		case "ArrowDown":
			event.preventDefault()
			highlightedIndex.value = (highlightedIndex.value + 1) % searchSuggestions.value.length
			scrollToHighlighted()
			break
		case "ArrowUp":
			event.preventDefault()
			highlightedIndex.value =
				highlightedIndex.value <= 0 ? searchSuggestions.value.length - 1 : highlightedIndex.value - 1
			scrollToHighlighted()
			break
		case "Enter":
			event.preventDefault()
			if (searchSuggestions.value[highlightedIndex.value]) {
				selectMember(searchSuggestions.value[highlightedIndex.value])
			}
			break
		case "Escape":
			showSuggestions.value = false
			break
	}
}

function scrollToHighlighted() {
	nextTick(() => {
		const container = document.querySelector(".suggestions-container")
		const highlighted = document.querySelector(".highlighted")
		if (container && highlighted) {
			highlighted.scrollIntoView({ block: "nearest" })
		}
	})
}

// Methods

// Modified computed property for pagination

// Pagination methods
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

function downloadCsv() {
	let csvContent = "data:text/csv;charset=utf-8,"
	csvContent += "Name,Email,Enabled\n"
	allMembers.value.forEach((m) => {
		csvContent += `${m.name},${m.email},${m.enabled}\n`
	})

	const encodedUri = encodeURI(csvContent)
	const link = document.createElement("a")
	link.setAttribute("href", encodedUri)
	link.setAttribute("download", "members.csv")
	document.body.appendChild(link)
	console.log(link)
	link.click()
	document.body.removeChild(link)
}

function showAllMembers() {
	// Reset the search query to show all members
	searchQuery.value = ""
}
</script>

<style scoped>
.suggestions-container {
	scrollbar-width: thin;
	scrollbar-color: #cbd5e0 #f7fafc;
}

.suggestions-container::-webkit-scrollbar {
	width: 6px;
}

.suggestions-container::-webkit-scrollbar-track {
	background: #f7fafc;
}

.suggestions-container::-webkit-scrollbar-thumb {
	background-color: #cbd5e0;
	border-radius: 3px;
}
</style>

<template>
	<div class="p-4 space-y-4 m-3">
		<div class="flex items-center justify-between">
			<h1 class="text-xl font-bold">
				{{ props.isAdmin ? "Quản lý quản trị viên" : " Quản lý thành viên" }}
			</h1>
		</div>

		<div class="flex items-center gap-4">
			<button class="px-4 py-2" @click="showAllMembers">
				<span class="hover:text-purple-400 text-sm">Tất cả thành viên</span>
			</button>
			<div class="flex-1/3">
				<div class="relative">
					<input
						type="text"
						v-model="searchQuery"
						placeholder="Tìm kiếm thành viên"
						@focus="showSuggestions = true"
						@blur="showSuggestions = false"
						@keydown="handleKeydown"
						class="w-full px-4 py-2 border border-black focus:outline-none focus:ring-1 focus:ring-purple-800 rounded-2xl font-[400]"
					/>
					<Search class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

					<!-- Suggestions Dropdown -->
					<div
						v-if="showSuggestions && searchSuggestions.length > 0"
						class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg suggestions-container max-h-60 overflow-y-auto"
					>
						<ul class="py-1">
							<li
								v-for="(suggestion, index) in searchSuggestions"
								:key="suggestion.id"
								@mousedown="selectMember(suggestion)"
								@mouseover="highlightedIndex = index"
								:class="[
									'px-4 py-2 cursor-pointer',
									highlightedIndex === index ? 'bg-purple-100 highlighted' : 'hover:bg-gray-100',
								]"
							>
								<div class="font-medium">{{ suggestion.name }}</div>
								<div class="text-sm text-gray-500">{{ suggestion.email }}</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="relative flex-1">
				<button
					class="w-full px-4 py-2 border border-black focus:outline-none focus:ring-1 focus:ring-purple-800 rounded-2xl font-[400] text-left"
					@click="modal.showModal()"
				>
					Thêm thành viên
					<Plus :size="20" class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
				</button>
			</div>

			<div class="relative flex-1">
				<button
					class="w-full px-4 py-2 border-1 border-black focus:outline-none focus:ring-1 focus:ring-purple-800 rounded-2xl font-[400] text-left"
					@click="downloadCsv"
				>
					Tải CSV
					<Plus :size="20" class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
				</button>
			</div>
		</div>

		<!-- Members Table -->
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
									@update:model-value="useMember.toggleEnable(member.id)"
									class="border-0 data-[state=checked]:bg-purple-800"
								/>

								<span class="ml-2 text-gray-700">
									{{ member.enabled ? "Enabled" : "Disabled" }}
								</span>
							</label>
						</td>
					</tr>
				</tbody>
			</table>

			<div class="px-6 py-4 flex items-center justify-between border-t">
				<div class="flex items-center">
					<span class="text-gray-700"> Showing page {{ currentPage }} of {{ totalPages }} </span>
				</div>
				<div class="flex items-center space-x-4">
					<button
						@click="prevPage"
						:disabled="currentPage === 1"
						class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
					>
						Previous
					</button>
					<button
						@click="nextPage"
						:disabled="currentPage === totalPages"
						class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	</div>

	<Teleport to="#modal">
		<component :is="modal.component.value" />
	</Teleport>
</template>
