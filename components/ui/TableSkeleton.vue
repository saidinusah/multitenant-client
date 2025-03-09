<script lang="ts" setup>
const { cols } = defineProps<{ cols: number }>();
</script>

<template>
  <tr v-for="(_, idx) in Array(5).fill(0)" :key="idx" class="space-y-4 shadow-sm">
    <td v-for="(_, idx) in Array(cols).fill(0)" :key="idx" class="animate-pulse whitespace-nowrap px-3 py-4">
      <div class="h-3 w-3/4 rounded bg-gray-200"></div>
    </td>
  </tr>
</template>
