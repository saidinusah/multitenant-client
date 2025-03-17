<script generic="TData, TValue" lang="ts" setup>
import { Button } from "@/components/ui/button";
import Label from "@/components/ui/label/Label.vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlexRender, getCoreRowModel, useVueTable, type ColumnDef } from "@tanstack/vue-table";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed, toRefs } from "vue";
import TableSkeleton from "~/components/ui/TableSkeleton.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./index";

type Props = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: { page: number; limit: number; total: number };
  loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  pagination: () => ({ page: 1, limit: 10, total: 0 }),
  loading: () => false,
});

const { pagination, loading } = toRefs(props);
const emit = defineEmits<{
  (e: "page-change", value: number): void;
  (e: "limit-change", value: number): void;
}>();

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
});

const pageTotal = computed(
  () => Math.floor(+pagination.value.total / +pagination.value.limit) || 1,
);

const start = computed(() => {
  if (pagination.value.limit >= pagination.value.total) {
    return 1;
  }

  return (pagination.value.page - 1) * pagination.value.limit + 1;
});
const end = computed(() => {
  return pagination.value.page * pagination.value.limit > pagination.value.total
    ? pagination.value.total
    : pagination.value.page * pagination.value.limit;
});
</script>

<template>
  <div>
    <Table class="border-b border-b-secondary-95 px-4">
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id"
          class="border-y border-y-secondary-95">
          <TableHead v-for="header in headerGroup.headers" :key="header.id"
            class="text-sm font-normal leading-normal text-secondary-60 ">
            <FlexRender v-if="!header.isPlaceholder" :props="header.getContext()"
              :render="header.column.columnDef.header" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <template v-if="loading">
          <TableSkeleton :cols="table?.getAllColumns().length" />
        </template>
        <template v-else>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined" class="border-0 py-2 text-sm font-normal">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :props="cell.getContext()" :render="cell.column.columnDef.cell" />
              </TableCell>
            </TableRow>
          </template>

          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </template>
      </TableBody>
    </Table>
  </div>
  <!-- pagination -->
  <div class="mx-5 mt-2 flex justify-between py-2">
    <div class="flex items-center space-x-3">
      <Select id="limit" :value="pagination.limit" name="limit" @update:model-value="(v) => emit('limit-change', +v)">
        <SelectTrigger class="h-6 w-16 border-none bg-[#F0F1F1] shadow-none">
          <SelectValue placeholder="10" />
        </SelectTrigger>

        <SelectContent class="w-16">
          <SelectGroup>
            <SelectItem v-for="n in ['10', '20', '30', '100']" :key="n" :value="n">
              {{ n }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label class="flex-none " for="limit">
        Items per page
      </Label>

      <p>
        {{ start }} - {{ end }} of {{ pagination.total }} items
      </p>
    </div>

    <div class="flex items-center space-x-3">
      <Select id="page" :default-value="pagination.page.toString()" :value="pagination.page" name="page"
        @update:model-value="(v) => emit('page-change', +v)">
        <SelectTrigger class="h-6 w-16 border-none bg-[#F0F1F1] shadow-none">
          <SelectValue placeholder="10" />
        </SelectTrigger>

        <SelectContent class="w-16">
          <SelectGroup>
            <SelectItem v-for="n in pageTotal" :key="n" :value="n.toString()">
              {{ n }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label class="flex-none " for="page">
        of {{ pageTotal }} pages
      </Label>

      <div class="flex space-x-1">
        <Button :disabled="pagination.page < 2" class="px-2" variant="ghost" @click="pagination.page -= 1">
          <ChevronLeft class="h-4 w-4" />
        </Button>

        <Button :disabled="pagination.page >= pageTotal" class="px-2" variant="ghost" @click="pagination.page += 1">
          <ChevronRight class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
