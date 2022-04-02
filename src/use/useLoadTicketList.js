
import { db } from "@/firebase.config.js"
import { collection, getDocs } from "firebase/firestore";
import { ticketListStore } from "@/stores/ticketlist"

export const useLoadTicketList = async () => {
    const TicketList = ticketListStore()
    try {
        const queryTicketList = await getDocs(collection(db, "tickets"));
        TicketList.ticket_list = []
        TicketList.ticket_list.length = 0

        queryTicketList.forEach((doc) => {
            let ticket = doc.data()
            ticket.id = doc.id
            TicketList.addData(ticket) 
        });    
    } catch (error) {
        console.log(error)
    }
    

}
