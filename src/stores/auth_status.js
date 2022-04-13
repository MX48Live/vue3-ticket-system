import { defineStore } from 'pinia'

export const authStatus = defineStore({
    id: 'auth_status',
    state: () => ({
        isUser: false
    }),
    actions: {
        userSignOut() {
            this.isUser = false
        },
        userSignIn() {
            this.isUser = true
        },
    }
})
