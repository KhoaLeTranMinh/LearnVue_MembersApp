<script setup lang="ts">
import { Plus } from "lucide-vue-next"
defineProps<{
	handleClick: () => void
	text: string
}>()
</script>

<template>
	<div class="relative flex-1">
		<button
			class="w-full px-4 py-2 border-1 border-black focus:outline-none focus:ring-1 focus:ring-purple-800 rounded-2xl font-[400] text-left"
			@click="handleClick"
		>
			{{ text }}
			<Plus :size="20" class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
		</button>
	</div>
</template>
