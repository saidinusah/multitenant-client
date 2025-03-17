import { TOKEN_COOKIE_KEY } from "~/lib/constant";
import { ofetch } from "ofetch";


export default defineNuxtPlugin((nuxtApp) => {
    const tokenCookie = useCookie(TOKEN_COOKIE_KEY)
    const config = useRuntimeConfig()

    const $customFetch = ofetch.create({
        baseURL: config.app.apiBaseUrl,
        onRequest({ options, }) {
            if (tokenCookie.value) {
                options.headers.append('Authorization', `Bearer ${tokenCookie.value}`)
            }
        },
        onResponseError({ response }) {

            if (response.status === 401) {
                tokenCookie.value = null
                return nuxtApp.runWithContext(() => {
                    navigateTo({ name: 'login' })
                })
            }
        },
    })
    return {
        provide: {
            customFetch: $customFetch,
        },
    }
})
