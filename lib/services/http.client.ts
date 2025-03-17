import { ofetch } from "ofetch";

const httpClient = ofetch.create({
  baseURL:import.meta.env.NUXT_PUBLIC_API_BASE_URL
})
