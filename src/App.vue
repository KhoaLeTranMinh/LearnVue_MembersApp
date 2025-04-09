<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider class="flex">
    <AppSidebar class="flex-1" />
    <div class="flex-1">
      <div class="sticky top-0 bg-white z-10">
        <SidebarTrigger class="p-4" />
      </div>
      <main class="h-full">
        <RouterView class="" />
      </main>
    </div>
  </SidebarProvider>
</template>

<style>
:root {
  --base-font-size: 12px;
}

body {
  font-size: var(--base-font-size);
}
</style>
