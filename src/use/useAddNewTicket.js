
import { db } from "@/firebase.config.js"
import { collection, addDoc } from "firebase/firestore"; 
import { useLoadTicketList } from "@/use/useLoadTicketList"

export const useAddNewTicket = async (newTicket) => {
    try {   
        await addDoc(collection(db, "tickets"), {
            available: (newTicket.available || false),
            start_date: newTicket.start_date,
            start_time: (newTicket.start_time || "00:00"),
            end_date: newTicket.end_date,
            end_time: (newTicket.end_time || "00:00"),
            ticket_type: newTicket.ticket_type,
            price: newTicket.price,
            limit_per_day: (newTicket.limit_per_day || 0),
            minimum_buying: (newTicket.minimum_buying || 1),
            quantity: newTicket.quantity,
            total_sales: 0
        })
        await useLoadTicketList()
    } catch (error) {
        console.log(error)
    }
}
