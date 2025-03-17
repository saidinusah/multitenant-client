<script setup lang="ts">

import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { packagesCrudSchema } from "~/lib/schemas/packages";
import { Textarea } from '@/components/ui/textarea'
import Switch from "~/components/ui/switch/Switch.vue";

const config = useRuntimeConfig()
const { visible } = defineProps<{ visible: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()


const { handleSubmit, values } = useForm({
  validationSchema: packagesCrudSchema,
  initialValues: {
    name: '',
    amount: 50,
    description: '',
    isActive: true
  },
})

// const { data, error, execute } = await useCustomFetch(`${config.public.apiBaseUrl}/subscriptions`, {
//   body: values,
//   immediate: false,
//   method: 'POST'
// })


// if (error.value) {
//   toast.error('Sorry something went wrong')
// }

// if (data.value) {
// }

const submitForm = handleSubmit(async (values) => {

  $fetch(`${config.public.apiBaseUrl}/subscriptions`, {
    body: values,
    immediate: false,
    method: 'POST'
  }).then(_data => {
    toast.success('Successfully added a new package')
  }).catch(_error => {
    toast.error('Something went wrong')
  })

}, () => { toast.error('Please fill all required fields') })




</script>

<template>


  <Dialog :open="visible" @update:open="emit('close')">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add subscription package</DialogTitle>
      </DialogHeader>
      <form class="space-y-3  py-4" @submit.prevent="submitForm">
        <FormField name="name" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Weekly + Trainer " v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="amount" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <Input placeholder="Doe" v-bind="componentField" type="number" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>


        <FormField name="description" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Weekly session with a personal trainer" v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="status" v-slot="{ value, handleChange }">
          <FormItem class="flex items-center space-x-2">
            <FormLabel>Active</FormLabel>
            <FormControl>
              <Switch :model-value="value" aria-readonly @update:model-value="handleChange" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full">
          Save
        </Button>
      </form>

    </DialogContent>
  </Dialog>

</template>

<style scoped></style>
