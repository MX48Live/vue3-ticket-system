import { defineStore } from 'pinia'

export const dataTickets = defineStore({
    id: 'data_tickets',
    state: () => ({
        data: [
            {
                id: 1,
                name: 'Type A',
                description: 'Type A',
                start_date_time_utc: 202204070000,
                end_date_time_utc: 202204100000,
                available: true,
                price: 5000,
                quantity: 30,
                minimum_buying: 2,
                limit_per_day: 10,
                limit_per_time: 10,
                stats: {
                    total_sale: 0,
                    total_remaining: 30,
                    today_remaining: 10,
                },
                setting: {
                    start_date_time: true,
                    end_date_time: true,
                    quantity: true,
                    total_sale: true,
                    total_remaining: true,
                    today_remaining: true,
                    limit_per_day: true,
                }
            },
            {
                id: 2,
                name: 'Type B',
                description: 'Type B',
                start_date_time_utc: 202204070000,
                end_date_time_utc: 202204100000,
                available: true,
                price: 4000,
                quantity: 30,
                minimum_buying: 2,
                limit_per_day: 10,
                limit_per_time: 10,
                stats: {
                    total_sale: 0,
                    total_remaining: 30,
                    today_remaining: 10,
                },
                setting: {
                    start_date_time: true,
                    end_date_time: true,
                    quantity: true,
                    total_sale: true,
                    total_remaining: true,
                    today_remaining: true,
                    limit_per_day: true,
                }
            },
            {
                id: 3,
                name: 'Type C',
                description: 'Type C',
                start_date_time_utc: 202204070000,
                end_date_time_utc: 202204100000,
                available: true,
                price: 3000,
                quantity: 30,
                minimum_buying: 2,
                limit_per_day: 10,
                limit_per_time: 10,
                stats: {
                    total_sale: 0,
                    total_remaining: 30,
                    today_remaining: 10,
                },
                setting: {
                    start_date_time: false,
                    end_date_time: false,
                    quantity: false,
                    total_sale: false,
                    total_remaining: false,
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

