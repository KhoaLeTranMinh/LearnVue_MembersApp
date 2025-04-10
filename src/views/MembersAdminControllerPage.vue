<script setup lang="ts">
import { ref } from "vue"

import { useModal } from "@/composables/modal"

import { useDebounce } from "@vueuse/core"
import SearchBar from "../components/SearchBar.vue"
import Table from "../components/Table.vue"

import AddMemberButton from "../components/AddMemberButton.vue"
import DownloadCSVButton from "../components/DownloadCSVButton.vue"

const searchQuery = ref("")
const debouncedSearchQuery = useDebounce(searchQuery, 300)
const modal = useModal()
const props = defineProps<{
	isAdmin: boolean
}>()

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
			<SearchBar v-model:debounced-search-query="debouncedSearchQuery" v-model:search-query="searchQuery" />
			<AddMemberButton />
			<DownloadCSVButton />
		</div>

		<!-- Members Table -->
		<Table v-model:search-query="searchQuery" v-model:debounced-search-query="debouncedSearchQuery" />
	</div>

	<Teleport to="#modal">
		<component :is="modal.component.value" />
	</Teleport>
</template>
