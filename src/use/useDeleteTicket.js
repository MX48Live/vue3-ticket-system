
import { db } from "@/firebase.config.js"
import { doc, deleteDoc } from "firebase/firestore";
import { useLoadTicketList } from "@/use/useLoadTicketList"
import { notify } from "@kyvg/vue3-notification"

export const useDeleteTicket = async (ticketID) => {
    try {
        await deleteDoc(doc(db, "tickets", ticketID))
        await useLoadTicketList()
        return true
    } catch (error) {
        notify({ type: "error", title: "Something went wrong while deleting." }) 
        // console.log(error)
    }
}
