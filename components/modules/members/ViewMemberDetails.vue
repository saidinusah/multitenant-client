<script lang="ts" setup>
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "~/components/ui/dialog";
import {toast} from "vue-sonner";
import type {MemberDetails} from "~/lib/table-columns/member";

const {id, visible} = defineProps<{ id: number | undefined, visible: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const {data, error, execute} = useCustomFetch<MemberDetails>(`/members/${id}`, {
  method: 'GET',
  immediate: Boolean(id) && visible
})

if (error.value) {
  console.log('error', error.value)
  toast.error("Something went wrong")
}


if (id) {
  execute()
}

</script>

<template>
  <Dialog :open="visible" @update:open="emit('close')">

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>View details</DialogTitle>
        <DialogDescription>
          Profile details
        </DialogDescription>
      </DialogHeader>
      <div class="space-y-2">
        <div>
          <p>Fore name(s):</p>
          <p>{{ data?.foreNames }}</p>
        </div>

        <div>
          <p>Last name:</p>
          <p>{{ data?.lastName }}</p>
        </div>

        <div>
          <p>Contact:</p>
          <p>{{ data?.phoneNumber }}</p>
        </div>

        <div>
          <p>Ecowas card number:</p>
          <p>{{ data?.idNumber }}</p>
        </div>
      </div>
      <!--      <DialogFooter>-->
      <!--        Edit profile-->
      <!--      </DialogFooter>-->
    </DialogContent>
  </Dialog>
</template>