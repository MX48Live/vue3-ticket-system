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
                stats_total_sale: 2,
                stats_today_sale: 2,
                setting_start_date_time: true,
                setting_end_date_time: true,
                setting_total_remaining: true,
                setting_total_sale: true,
                setting_today_remaining: true,
                setting_show_if_inactive: true,
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
                minimum_buying: 1,
                limit_per_day: -1,
                limit_per_time: -1,
                created_date: 202204070000,
                updated_date: 202204100000,
                stats_total_sale: 2,
                stats_today_sale: 2,
                setting_start_date_time: true,
                setting_end_date_time: true,
                setting_total_remaining: true,
                setting_total_sale: true,
                setting_today_remaining: true,
                setting_show_if_inactive: true,
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
                stats_total_sale: 2,
                stats_today_sale: 2,
                setting_start_date_time: true,
                setting_end_date_time: true,
                setting_total_remaining: true,
                setting_total_sale: true,
                setting_today_remaining: true,
                setting_show_if_inactive: true,
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
        updateTicket(ticketID, updateData) {
            let index = this.data.findIndex(item => item.id === ticketID)
            this.data[index] = {...updateData}
        }
    }
})

