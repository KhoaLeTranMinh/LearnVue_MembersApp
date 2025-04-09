<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next";
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
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];
</script>

<template>
  <Sidebar>
    <SidebarContent class="flex flex-col justify-center">
      <SidebarGroup class="mb-40">
        <SidebarGroupContent>
          <SidebarMenu class="flex w-full flex-col justify-around gap-10">
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
