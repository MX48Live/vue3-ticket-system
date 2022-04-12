
import { db } from "@/firebase.config.js"
import { collection, getDocs } from "firebase/firestore";
import { dataTickets } from "@/stores/data_tickets"
import { notify } from "@kyvg/vue3-notification"

export const useLoadTicketList = async () => {
    const data_tickets = dataTickets()
    data_tickets.setIsLoading(true)
    try {
        const queryTicketList = await getDocs(collection(db, "tickets"));
        data_tickets.data = []
        data_tickets.data.length = 0

        await queryTicketList.forEach((doc) => {
            let ticket = doc.data()
            ticket.id = doc.id
            data_tickets.addData(ticket) 
        })
        data_tickets.setIsLoading(false)
    } catch (error) {
        data_tickets.setIsLoading(false)
        notify({ type: "error", title: "Something went can not load data, please try again." }) 
        // console.log(error)
    }
}
