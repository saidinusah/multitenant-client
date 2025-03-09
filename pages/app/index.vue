<script setup lang="ts">

import PageTitle from "~/components/common/PageTitle.vue";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {ArrowRight} from 'lucide-vue-next'

definePageMeta({
  name: 'analytics'
})

const analyticsData = [
  {
    title: 'Members',
    value: 450,
    routeName: 'members'
  },
  {
    title: 'Packages',
    value: 4,
    routeName: 'packages'
  },
  {
    title: 'Subscriptions',
    value: 'GHS 53500',
    routeName: 'packages'
  }

]
</script>


<template>
  <PageTitle title="Analytics"/>
  <div class="grid grid-cols-4 gap-x-4 ">
    <Card class="w-full space-y-2 py-4" v-for="stat in analyticsData">
      <CardHeader class="pb-0">
        <CardTitle class="text-neutral-600">{{ stat.title }}</CardTitle>
      </CardHeader>
      <CardContent class="py-0 text-2xl">
        {{ stat.value }}
      </CardContent>

    </Card>
  </div>


</template>