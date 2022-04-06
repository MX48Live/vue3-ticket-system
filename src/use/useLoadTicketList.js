
import { db } from "@/firebase.config.js"
import { collection, getDocs } from "firebase/firestore";
import { dataTickets } from "@/stores/data_tickets"

export const useLoadTicketList = async () => {
    const data_tickets = dataTickets()
    try {
        const queryTicketList = await getDocs(collection(db, "tickets"));
        data_tickets.data = []
        data_tickets.data.length = 0

        queryTicketList.forEach((doc) => {
            let ticket = doc.data()
            ticket.id = doc.id
            data_tickets.addData(ticket) 
        })
    } catch (error) {
        console.log(error)
    }
}
