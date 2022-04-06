import { defineStore } from 'pinia'

export const ticketDisplay = defineStore({
    id: 'ticket_display',
    state: () => ({
        data: [],
    }),
    actions: {
        addData(item) {
            this.data.push(item)
        },
        removeDataByKey(index, key) {
            delete this.data[index][key]
        }
    }
})

