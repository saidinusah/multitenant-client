<script setup lang="ts">
import PageTitle from "~/components/common/PageTitle.vue";

import CreateMember from "~/components/modules/members/CreateMember.vue";
import DataTable from "~/components/ui/table/DataTable.vue";
import { type MemberDetails, membersTableColumnDefinition } from '~/lib/table-columns/member'
import { toast } from "vue-sonner";
import ViewMemberDetails from "~/components/modules/members/ViewMemberDetails.vue";


const showCreateMemberModal = ref<boolean>(false)
const selectedId = ref<number>()
const showDetailsModal = ref<boolean>(false)


const { data, error } = await useCustomFetch<MemberDetails[]>('/members', {
  method: 'GET'
})


if (error.value) {
  toast.error(error.value?.message)
  toast.error('Could not fetch members, please try again.')
}


const viewDetails = (id: number) => {
  selectedId.value = (id);
  showDetailsModal.value = true;
}

const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedId.value = undefined
}

const closeCreationModal = () => {
  showCreateMemberModal.value = false;
}


definePageMeta({
  name: 'members'
})
</script>

<template>
  <PageTitle title="Members">

    <Button @click="showCreateMemberModal = true">
      Add new member
    </Button>
  </PageTitle>

  <div class="min-h-[60dvh]">
    <DataTable :columns="membersTableColumnDefinition(viewDetails)" :data="data ?? []"
      :pagination="{ limit: 10, page: 1, total: data?.length ?? 0 }" />
  </div>


  <ViewMemberDetails :id="selectedId" :visible="showDetailsModal" @close="closeDetailsModal" />
  <CreateMember :visible="showCreateMemberModal" @close="closeCreationModal" />
</template>
