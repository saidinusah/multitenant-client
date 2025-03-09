<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import {toTypedSchema} from "@vee-validate/zod";
import {object, string} from "zod";
import {useForm} from "vee-validate";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/ui/form";
import {REGEXES} from "~/lib/constant";
import {toast} from "vue-sonner";

const {visible} = defineProps<{ visible: boolean }>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const formSchema = toTypedSchema(object({
  foreNames: string().min(3, "Fore name is required"),
  phoneNumber: string().regex(REGEXES.GHANA_PHONE_NUMBER, 'Check format of phone number'),
  lastName: string().min(3, "Last name is required"),
  idNumber: string().regex(REGEXES.ECOWAS_CARD, 'Check format of Ecowas card number')
}))

const {handleSubmit, setFieldError} = useForm({
  validationSchema: formSchema,
})

const submitForm = handleSubmit((values) => {
  $fetch<{ message: string; id: string }>('http://localhost:3050/api/members', {
    method: 'POST',
    body: {...values},
  }).then(_res => {
    toast.success("Successfully created member");
  }).catch(err => {
    // err is an instance of FetchError so it's the message and other details are in the data object
    const errorData = err.data
    if (errorData.statusCode === 422) {
      const errs = errorData?.errors;
      errs?.forEach((e: any) => {
        setFieldError(e?.field, String(e?.errors[0]));
      });

    }
    if (errorData.statusCode === 500) {
      toast.error('Something went wrong!')
    } else {
      toast.error(errorData?.message)
    }

  })
})
</script>

<template>
  <Dialog :open="visible" @update:open="emit('close')">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add member</DialogTitle>
        <DialogDescription>
          Create a new member
        </DialogDescription>
      </DialogHeader>
      <form class="grid gap-4 py-4" @submit.prevent="submitForm">
        <FormField name="foreNames" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Forename(s)</FormLabel>
            <FormControl>
              <Input placeholder="John" v-bind="componentField"/>
            </FormControl>
            <FormDescription/>
            <FormMessage/>
          </FormItem>
        </FormField>

        <FormField name="lastName" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Last name</FormLabel>
            <FormControl>
              <Input placeholder="Doe" v-bind="componentField"/>
            </FormControl>
            <FormDescription/>
            <FormMessage/>
          </FormItem>
        </FormField>

        <FormField name="idNumber" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Ecowas card number</FormLabel>
            <FormControl>
              <Input placeholder="GHA-XXXXXXXX-X" v-bind="componentField"/>
            </FormControl>
            <FormDescription/>
            <FormMessage/>
          </FormItem>
        </FormField>
        <FormField name="phoneNumber" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Phone number</FormLabel>
            <FormControl>
              <Input placeholder="+233XXXXXXXXX" v-bind="componentField"/>
            </FormControl>
            <FormDescription/>
            <FormMessage/>
          </FormItem>
        </FormField>

        <Button type="submit">
          Save changes
        </Button>
      </form>
      <DialogFooter @click="submitForm">

      </DialogFooter>
    </DialogContent>
  </Dialog>

</template>

