
import { db } from "@/firebase.config.js"
import { collection, addDoc } from "firebase/firestore"; 
import { useLoadTicketList } from "@/use/useLoadTicketList"

export const useAddNewTicket = async ({...newTicket}) => {
    const {
        name,
        description,
        start_date_time_utc,
        end_date_time_utc,
        available,
        price,
        quantity,
        minimum_buying,
        limit_per_day,
        limit_per_time,
        created_date,
        updated_date,
        stats_total_sale,
        stats_today_sale,
        setting_start_date_time,
        setting_end_date_time,
        setting_total_remaining,
        setting_total_sale,
        setting_today_remaining,
        setting_show_if_inactive,
    } = newTicket
    try {   
        await addDoc(collection(db, "tickets"), {
            name,
            description,
            start_date_time_utc,
            end_date_time_utc,
            available,
            price,
            quantity,
            minimum_buying,
            limit_per_day,
            limit_per_time,
            created_date,
            updated_date,
            stats_total_sale,
            stats_today_sale,
            setting_start_date_time,
            setting_end_date_time,
            setting_total_remaining,
            setting_total_sale,
            setting_today_remaining,
            setting_show_if_inactive,
        })
        await useLoadTicketList()
    } catch (error) {
        console.log(error)
    }
}
