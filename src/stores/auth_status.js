import { defineStore } from 'pinia'

export const authStatus = defineStore({
    id: 'auth_status',
    state: () => ({
        isUser: false,
        isCheckingAuthen: true
    }),
    actions: {
        userSignOut() {
            this.isUser = false
        },
        userSignIn() {
            this.isUser = true
        }, 
        finishChecking() {
            this.isCheckingAuthen = false
        }
    }
})
