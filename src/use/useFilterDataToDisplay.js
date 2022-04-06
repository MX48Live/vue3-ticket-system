import { ticketDisplay } from "@/stores/ticket_display"

export const useFilterDataToDisplay = (ticketsData) => { 

    const ticket_display = ticketDisplay()

    ticketsData.map((item) => {
        ticket_display.addData({...item})
    })

    ticket_display.data.map((item, index) => {
        for (const [key, value] of Object.entries(item.setting)) {
            if (value === false) {
                ticket_display.removeDataByKey(index, key)
            }
        }
    })
}
