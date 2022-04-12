import { defineStore } from 'pinia'

export const dataTickets = defineStore({
    id: 'data_tickets',
    state: () => ({
        data: [],
        isLoading: false,
        isInitialLoading: true
    }),
    actions: {
        addData(data) {
            this.data.push(data)
        },
        setLoaded(condition) {
            this.loaded = condition
        },
        updateTicket(ticketID, updateData) {
            let index = this.data.findIndex(item => item.id === ticketID)
            this.data[index] = {...updateData}
        },
        setIsLoading(condition) {
            this.isLoading = condition
        },
        setIsInitialLoading(condition) {
            this.isInitialLoading = condition
        }
    }
})

