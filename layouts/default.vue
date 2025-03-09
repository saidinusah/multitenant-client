<script setup lang="ts">
import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar'

</script>

<template>
  <SidebarProvider>
    <LazyCommonAppSideBar/>
    <main class="w-full">
      <SidebarTrigger/>
      <section class="lg:px-10 !w-full flex flex-col  space-y-6">
        <slot/>
      </section>
    </main>
  </SidebarProvider>
</template>
