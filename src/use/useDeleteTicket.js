
import { db } from "@/firebase.config.js"
import { doc, deleteDoc } from "firebase/firestore";
import { useLoadTicketList } from "@/use/useLoadTicketList"

export const useDeleteTicket = async (ticketID) => {
    try {
        await deleteDoc(doc(db, "tickets", ticketID))
        await useLoadTicketList()
    } catch (error) {
        console.log(error)
    }
}
