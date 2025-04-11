<template>
  <div class="fixed inset-0 bg-gray-200/60 z-50" :style="modalStyle">
    <div class="flex items-center justify-center h-full">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-2xl mb-40">
        <div id="modal"></div>
        <!-- Close button -->

        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-500"
          @click="modal.hideModal()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useModal } from "@/composables/modal";
const modal = useModal();
const modalStyle = computed(() => {
  return {
    display: modal.show.value ? "block" : "none",
  };
});
</script>
