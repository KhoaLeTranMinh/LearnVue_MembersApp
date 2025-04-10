<script setup lang="ts">
import { useModal } from "@/composables/modal"
import CustumButton from "@/components/CustumButton.vue"
const modal = useModal()
</script>

<template>
	<CustumButton text="Thêm Thành Viên" :handle-click="modal.showModal" />
</template>
