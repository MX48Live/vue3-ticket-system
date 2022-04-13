import { DateTime } from "luxon";

export const useInitialAvailability = (ticket) => { 
    const currentUTCTime = parseInt(DateTime.now().toUTC().toFormat('yyyyMMddHHmm'))
    const totalRemaining = ticket.quantity - ticket.stats_total_sale
    const todayRemaining = ticket.limit_per_day - ticket.stats_today_sale

    let isAvailable = false
    let errorMessage = "Not Avaliable"

    const checkTicketAvailable = () => {
        return ticket.available
    }
    const checkStartDate = () => {
        if (ticket.start_date_time_utc <= currentUTCTime) {
            return true
        } else {
            errorMessage = "Starting Soon"
            return false
        }
    }
    const checkEndDate = () => {
        if(ticket.end_date_time_utc >= currentUTCTime) {
            return true
        } else {
            errorMessage = "End of Sale Period"
            return false
        }
    }
    const checkQuantityRemaining = () => {
        if(totalRemaining != 0) {
            return true
        } else {
            errorMessage = "Out of Order"
            return false
        }
    }
    const checkTodayRemaining = () => {
        if(todayRemaining > 0 || todayRemaining < 0) {
            return true
        } else {
            errorMessage = "Out of Order (Today)"
            return false
        }
    }
    const checkTodayRemainingEnoughForMinimumBuying = () => {
        if( todayRemaining >= ticket.minimum_buying || todayRemaining < 0 ) {
            return true
        } else {
            errorMessage = "Insufficiency amount due Minimum buying (Today)"
            return false
        }
    }

    const checkTotalRemainingEnoughForMinimumBuying = () => {
        if(totalRemaining >= ticket.minimum_buying || totalRemaining < 0) {
            return true
        } else {
            errorMessage = "Insufficiency amount due Minimum buying"
            return false
        }
    }

    isAvailable = checkTicketAvailable() && checkStartDate() && checkEndDate() && checkQuantityRemaining() && checkTodayRemaining() && checkTodayRemainingEnoughForMinimumBuying() && checkTotalRemainingEnoughForMinimumBuying()
    return [isAvailable, errorMessage]
 
}
