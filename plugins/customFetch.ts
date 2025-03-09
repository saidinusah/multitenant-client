import {TOKEN_COOKIE_KEY} from "~/lib/constant";

export default defineNuxtPlugin((nuxtApp) => {
    const tokenCookie = useCookie(TOKEN_COOKIE_KEY)
    const config = useRuntimeConfig()

    const $customFetch = $fetch.create({
        baseURL: config.public.apiBaseUrl,
        onRequest({request, options, error}) {
            if (tokenCookie.value) {
                options.headers.set('x-api-key', `Bearer ${tokenCookie.value}`)
            }
        },
        onResponse({response}) {
            return response
        },
        onResponseError({response}) {
            if (response.status === 401) {
                tokenCookie.value = null
                return nuxtApp.runWithContext(() => {
                    navigateTo({name: 'login'})
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
