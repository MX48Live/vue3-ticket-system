
import { db } from "@/firebase.config.js"
import { doc, updateDoc } from "firebase/firestore"; 
import { useLoadTicketList } from "@/use/useLoadTicketList"
import { notify } from "@kyvg/vue3-notification";

export const useUpdateTicket = async (ticketID, formData) => {
    const ticketRef = doc(db, "tickets", ticketID)
    try {
        await updateDoc(ticketRef, { ...formData })
        await useLoadTicketList()
    } catch (error) {
        // console.log(error)
        notify({ type: "error", title: "Something went wrong while update." }) 
    }
}
