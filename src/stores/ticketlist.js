import { defineStore } from 'pinia'

export const ticketListStore = defineStore({
    id: 'ticketlist',
    state: () => ({
        ticket_list: [],
        loaded: false
    }),
    actions: {
        addData(data) {
            this.ticket_list.push(data)
        },
        setLoaded(condition) {
            this.loaded = condition
        },
        updateTicket(index, updateData) {
            this.ticket_list[index] = {...updateData}
        }
    }
})

