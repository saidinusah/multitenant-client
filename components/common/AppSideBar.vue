<script setup lang="ts">
import {Home, Users, Package, User2, ChevronUp} from "lucide-vue-next";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "~/components/ui/dropdown-menu";
import {TOKEN_COOKIE_KEY, AUTHENTICATED_USER_COOKIE_KEY} from "~/lib/constant";
import type {LoginResponse} from "~/lib/types";

const items = [
  {
    title: "Analytics",
    url: "/app",
    icon: Home,
  },
  {
    title: "Members",
    url: "/app/members",
    icon: Users,
  },
  {
    title: "Packages",
    url: "/app/packages",
    icon: Package,
  },

];

const user = useCookie<LoginResponse['user']>(AUTHENTICATED_USER_COOKIE_KEY)
const tokenCookie = useCookie<string | null>(TOKEN_COOKIE_KEY)

const signOut = () => {
  tokenCookie.value = null
  navigateTo('/')
}
</script>

<template>
  <Sidebar>
    <SidebarHeader class="px-4">
      <p class="text-xl font-semibold text-primary">GyManager</p>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Modules</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <a :href="item.url">
                  <component :is="item.icon"/>
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup/>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2/>
                {{ user?.foreNames }} {{ user?.lastName }}
                <ChevronUp class="ml-auto"/>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                class="w-[--reka-popper-anchor-width]"
            >
              <DropdownMenuItem @click="signOut">
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
