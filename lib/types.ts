export type LoginResponse = {
    "user": {
        "id": number
        "email": string
        "phoneNumber": string
        "foreNames": string
        "lastName": string
    },
    "token": string,
    "expiresAt": string
}