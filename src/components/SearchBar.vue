<script setup lang="ts">
import type { Member } from "@/stores/members"
import { useMembers } from "@/stores/members"
import { ref, computed, nextTick, watch } from "vue"
import { useDebounce } from "@vueuse/core"
import { Search as SearchIcon } from "lucide-vue-next"
defineProps<{}>()

const searchQuery = defineModel<string>("searchQuery", { required: true })
const debouncedSearchQuery = defineModel<string>("debouncedSearchQuery", { required: true })

const highlightedIndex = ref(0)
const showSuggestions = ref(false)

const selectedMember = ref("")
const useMember = useMembers()

const allMembers = ref([...useMember.all.values()])
const searchSuggestions = computed(() => {
	if (!searchQuery.value) return []
	if (!debouncedSearchQuery.value) return []
	return allMembers.value.filter(
		(m) =>
			m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			m.email.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
})

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

watch(
	() => useMember.all,
	(newAll) => {
		allMembers.value = [...newAll.values()]
	},
	{ deep: true }
)
</script>

<template>
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
			<SearchIcon class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

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
</template>
