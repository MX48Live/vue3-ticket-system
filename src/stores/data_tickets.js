import { defineStore } from 'pinia'

export const dataTickets = defineStore({
    id: 'data_tickets',
    state: () => ({
        data: [
            {
                id: 1,
                name: 'Type A',
                description: 'Type A',
                start_date: '4 เมษายน 2564',
                start_time: '00:00',
                end_date: '12 เมษายน 2564',
                end_time: '00:00',
                available: true,
                price: 5000,
                minimum_buying: 1,
                quantity: 10,
                total_remaining: 27,
                total_sale: 3,
                today_remaining: 10,
                limit_per_time: 5,
                limit_per_day: 10,
                setting: {
                    start_date: true,
                    start_time: true,
                    end_date: true,
                    end_time: true,
                    quantity: true,
                    total_remaining: true,
                    total_sale: true,
                    today_remaining: true,
                    limit_per_day: true,
                }
            },
            {
                id: 2,
                name: 'Type B',
                description: 'Type B',
                start_date: '4 เมษายน 2564',
                start_time: '00:00',
                end_date: '12 เมษายน 2564',
                end_time: '00:00',
                available: true,
                price: 4000,
                minimum_buying: 2,
                quantity: 30,
                total_remaining: 27,
                total_sale: 3,
                today_remaining: -1,
                limit_per_time: 5,
                limit_per_day: 10,
                setting: {
                    start_date: false,
                    start_time: false,
                    end_date: false,
                    end_time: false,
                    quantity: false,
                    total_remaining: false,
                    total_sale: false,
                    today_remaining: false,
                    limit_per_day: false,
                }
            },
            {
                id: 3,
                name: 'Type C',
                description: 'Type C',
                start_date: '4 เมษายน 2564',
                start_time: '00:00',
                end_date: '12 เมษายน 2564',
                end_time: '00:00',
                available: false,
                price: 3000,
                minimum_buying: 3,
                quantity: 30,
                total_remaining: 27,
                total_sale: 3,
                today_remaining: 7,
                limit_per_time: 5,
                limit_per_day: 10,
                setting: {
                    start_date: false,
                    start_time: false,
                    end_date: false,
                    end_time: false,
                    quantity: false,
                    total_remaining: false,
                    total_sale: false,
                    today_remaining: false,
                    limit_per_day: false,
                }
            },
        ],
        loaded: false
    }),
    actions: {
        addData(data) {
            this.data.push(data)
        },
        setLoaded(condition) {
            this.loaded = condition
        },
        updateTicket(index, updateData) {
            this.data[index] = {...updateData}
        }
    }
})

