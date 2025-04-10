<script setup lang="ts">
defineProps<{
	handleKeydown: (event: KeyboardEvent) => void
	searchQuery: string
	searchSuggestions: { id: string; name: string; email: string; enabled: boolean }[]
	selectMember: (member: Member) => void
}>()
const showSuggestions = defineModel<boolean>("showSuggestions", { required: true })
const highlightedIndex = defineModel<number>("highlightedIndex", { required: true })
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
</template>
