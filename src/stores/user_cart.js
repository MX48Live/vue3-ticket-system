import { defineStore } from 'pinia'

export const userCart = defineStore({
    id: 'user_cart',
    state: () => ({
        data: [],
    }),
    actions: {
        addData(item) {
            this.data.push(item)
        },
        removeData(itemID) {
            let index = this.data.findIndex(item => item.ticket_id === itemID)
            this.data.splice(index, 1)
        },
        updateQuantity(itemID, number) {
            let index = this.data.findIndex(item => item.ticket_id === itemID)
            this.data[index].quantity = number
        }
    }
})

