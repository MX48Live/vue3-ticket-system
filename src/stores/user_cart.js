import { defineStore } from 'pinia'

export const userCart = defineStore({
    id: 'user_cart',
    state: () => ({
        data: [],
        ticket_status: new Set(),
    }),
    actions: {
        addData(item) {
            this.data.push(item)
        },
        removeData(itemID) {
            let index = this.data.findIndex(item => item.ticket_id === itemID)
            this.data.splice(index, 1)
        },
        clearData() {
            this.data = []
            this.data.length = 0
        },
        updateQuantity(itemID, number) {
            let index = this.data.findIndex(item => item.ticket_id === itemID)
            this.data[index].quantity = number
        },
        addTicketStatus(status) {
            this.ticket_status.add(status)
        }
    }
})

