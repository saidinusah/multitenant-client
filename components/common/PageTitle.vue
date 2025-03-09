<script setup lang="ts">
const {title} = defineProps<{ title: string }>()
</script>
<template>
  <div class="flex items-center justify-between">
    <h1 class="text-xl text-primary">{{ title }}</h1>
    <slot/>
  </div>
</template>
