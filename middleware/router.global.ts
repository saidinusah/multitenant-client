import {AUTHENTICATED_USER_COOKIE_KEY, TOKE_EXPIRY_COOKIE_KEY, TOKEN_COOKIE_KEY} from "~/lib/constant";
import {differenceInMinutes} from 'date-fns';


export default defineNuxtRouteMiddleware((to) => {
    const tokenCookie = useCookie(TOKEN_COOKIE_KEY);
    const userCookie = useCookie(AUTHENTICATED_USER_COOKIE_KEY);
    const tokenExpiresAt = useCookie(TOKE_EXPIRY_COOKIE_KEY)
    const isAuthenticated = Boolean(tokenCookie.value) && tokenExpiresAt.value && differenceInMinutes(new Date(), tokenExpiresAt.value) < 1;
    const isGuestRoute = to.name === "login";

    // Redirect unauthenticated users trying to access protected routes
    if (!isAuthenticated && !isGuestRoute) {
        userCookie.value = undefined;
        return navigateTo({
            path: "/",
            query: {
                ref: to.fullPath,
            }
        }, {replace: true});
    }

    // Redirect authenticated users away from guest routes
    if (isAuthenticated && isGuestRoute) {
        return navigateTo({name: 'analytics'}, {replace: true});
    }


});