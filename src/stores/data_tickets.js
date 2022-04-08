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
                minimum_buying: 1,
                limit_per_day: 5,
                limit_per_time: 7,
                created_date: 202204070000,
                updated_date: 202204100000,
                stats: {
                    total_sale: 2,
                    today_sale: 2,
                },
                setting: {
                    start_date_time: true,
                    end_date_time: true,
                    total_remaining: true,
                    total_sale: true,
                    today_remaining: true,
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
                minimum_buying: 29,
                limit_per_day: -1,
                limit_per_time: -1,
                created_date: 202204070000,
                updated_date: 202204100000,
                stats: {
                    total_sale: 0,
                    today_sale: 0,
                },
                setting: {
                    start_date_time: true,
                    end_date_time: true,
                    total_remaining: true,
                    total_sale: true,
                    today_remaining: true,
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
                created_date: 202204070000,
                updated_date: 202204100000,
                stats: {
                    total_sale: 2,
                    today_sale: 6,
                },
                setting: {
                    start_date_time: true,
                    end_date_time: true,
                    total_remaining: true,
                    total_sale: true,
                    today_remaining: true,
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

