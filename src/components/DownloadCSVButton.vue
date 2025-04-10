<script setup lang="ts">
import { useMembers } from "@/stores/members"
import { computed } from "vue"
import CustumButton from "@/components/CustumButton.vue"
const membersStore = useMembers()
const allMembers = computed(() => {
	return [...membersStore.all.values()]
})
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
</script>

<template>
	<CustumButton text="Tải CSV" :handle-click="downloadCsv" />
</template>
