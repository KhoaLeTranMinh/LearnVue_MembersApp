<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings, House } from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RouterLink } from "vue-router";

// Menu items.
const items = [
  {
    title: "Quản lý thành viên",
    url: "/members",
  },
  {
    title: "Quản lý quản trị viên",
    url: "/admins",
  },
];
</script>

<template>
  <Sidebar>
    <SidebarContent class="flex flex-col justify-center">
      <SidebarGroup class="mb-40">
        <SidebarGroupContent>
          <SidebarMenu class="flex w-full flex-col justify-around gap-10">
            <SidebarMenuItem class="rounded-md">
              <button
                class="text-white rounded-lg hover:bg-gray-300 flex-row justify-start absolute left-1 bottom-1 w-8 h-8"
              >
                <RouterLink to="/">
                  <House class="w-full h-full" color="black" />
                </RouterLink>
              </button>
            </SidebarMenuItem>
            <SidebarMenuItem
              class="rounded-md h-16 hover:bg-gray-300"
              v-for="item in items"
              :key="item.title"
            >
              <SidebarMenuButton class="hover:bg-gray-300" asChild>
                <a :href="item.url" class="no-hover-style">
                  <!-- <component class="w-10 h-10" :is="item.icon" /> -->
                  <span class="text-sm">{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
