<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {toTypedSchema} from '@vee-validate/zod'
import {useForm} from 'vee-validate'
import {toast} from 'vue-sonner'
import {object, string} from 'zod'
import type {LoginResponse} from "~/lib/types";
import {AUTHENTICATED_USER_COOKIE_KEY, TOKE_EXPIRY_COOKIE_KEY, TOKEN_COOKIE_KEY} from "~/lib/constant";


// form schema
const formSchema = toTypedSchema(object({
  email: string().email(),
  password: string().min(8, 'Check length of password')
}))

const {handleSubmit} = useForm({
  validationSchema: formSchema,
})
const tokenCookie = useCookie<string>(TOKEN_COOKIE_KEY)
const userDetails = useCookie<LoginResponse['user']>(AUTHENTICATED_USER_COOKIE_KEY)
const tokenExpiresAt = useCookie(TOKE_EXPIRY_COOKIE_KEY)

const _runtimeConfig = useRuntimeConfig()
const onSubmit = handleSubmit(async (values) => {
  $fetch<LoginResponse>(`${_runtimeConfig.public.apiBaseUrl}/auth/admin/login`, {
    method: 'POST',
    body: values
  }).then(res => {
    toast.success('Login successful')

    tokenCookie.value = res.token
    userDetails.value = res.user
    tokenExpiresAt.value = new Date(res.expiresAt)
    navigateTo({
      name: 'analytics',
      replace: true
    })
  }).catch(err => {
    toast.error(err.response.data.message)
    console.error(err, 'Something went wrong')
  })
}, (_errors) => {
  toast.error('Please fill all required fields')
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="max-w-md min-w-sm mx-auto w-full space-y-2.5">
    <FormField name="email" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="johndoe@test.com" v-bind="componentField"/>
        </FormControl>
        <FormDescription/>
        <FormMessage/>
      </FormItem>
    </FormField>

    <FormField name="password" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input placeholder="johndoe@test.com" v-bind="componentField"/>
        </FormControl>
        <FormDescription/>
        <FormMessage/>
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full">
      Login
    </Button>
  </form>

</template>
