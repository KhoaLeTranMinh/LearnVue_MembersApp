<script setup lang="ts">
import { useMembers } from "@/stores/members";
import { ref, computed, watch } from "vue";
import { Search, Plus } from "lucide-vue-next";
// Reactive state
const searchQuery = ref("");
const useMember = useMembers();
const allMembers = [...useMember.all.values()];

const filteredMembers = computed(() => {
  if (!searchQuery.value) {
    return allMembers;
  }
  return allMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods

function downloadCsv() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Name,Email,Enabled\n";
  allMembers.forEach((m) => {
    csvContent += `${m.name},${m.email},${m.enabled}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "members.csv");
  document.body.appendChild(link);
  console.log(link);
  link.click();
  document.body.removeChild(link);
}

function showAllMembers() {
  // Reset the search query to show all members
  searchQuery.value = "";
}

const currentPage = ref(1);
const itemsPerPage = 5;

// Modified computed property for pagination
const paginatedMembers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredMembers.value.slice(startIndex, endIndex);
  // const filteredMemberLength = filteredMembers.value.length;
  // const startIndex = 0;
  // const endIndex =
  //   filteredMemberLength < itemsPerPage ? filteredMemberLength : itemsPerPage;

  // return filteredMembers.value.slice(startIndex, endIndex);
});

// Whenever search query changes, reset the current page to 1
watch(
  () => searchQuery.value,
  (newValue) => {
    // Reset current page when search query changes
    currentPage.value = 1;
    if (filteredMembers.value.length === 0) {
      currentPage.value = 0;
    }
  }
);

// Total pages computation
const totalPages = computed(() => {
  return searchQuery.value
    ? Math.ceil(filteredMembers.value.length / itemsPerPage)
    : Math.ceil(allMembers.length / itemsPerPage);
  // return Math.ceil(allMembers.length / itemsPerPage);
});

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// const computedCurrentPage = computed(() => {
//   return
// });
</script>

<style scoped>
/* You can keep your scoped styles or customize further if needed */
</style>

<template>
  <div class="p-4 space-y-4 m-3">
    <!-- Title + Actions -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold">Quản lý quản trị viên</h1>
    </div>

    <!-- Sub-navigation: Tất cả thành viên, Thêm thành viên -->
    <div class="flex items-center gap-4">
      <button class="px-4 py-2" @click="showAllMembers">
        <span class="hover:text-blue-400 text-sm">Tất cả thành viên</span>
      </button>
      <div class="flex-1/3">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Tìm kiếm thành viên"
            class="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl font-[400]"
          />
          <Search
            class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          ></Search>
        </div>
        <!-- <component :is="Search"></component> -->
      </div>
      <div class="relative flex-1">
        <button
          class="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl font-[400] text-left"
        >
          Thêm thành viên
        </button>
        <Plus
          :size="20"
          class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div class="relative flex-1">
        <button
          class="w-full px-4 py-2 border-1 border-black focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl font-[400] text-left"
          @click="downloadCsv"
        >
          Tải CSV
        </button>
        <Plus
          :size="20"
          class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>

    <!-- Members Table -->
    <div class="bg-white overflow-hidden sm:rounded-md">
      <table class="min-w-full">
        <thead class="">
          <tr>
            <th class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
              Tên
            </th>
            <th class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
              Enable / Disable
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="member in paginatedMembers" :key="member.email">
            <td class="px-6 py-4 whitespace-nowrap">{{ member.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ member.email }}</td>
            <td class="px-6 py-4">
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-blue-600"
                  :checked="member.enabled"
                  @change="useMember.toggleEnable(member.id)"
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
          <span class="text-gray-700">
            Showing page {{ currentPage }} of {{ totalPages }}
          </span>
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
</template>
