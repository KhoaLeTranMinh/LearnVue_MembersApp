<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToMembers = () => router.push("/members");
const navigateToAdmins = () => router.push("/admins");
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-8">
    <h1 class="text-3xl font-bold mb-40">Welcome to Members Management</h1>
  </div>
</template>
