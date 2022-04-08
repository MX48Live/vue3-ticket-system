import { DateTime } from "luxon";

export const useConvertUTCtoLocalDateToDisplay = (number) => {
    const UTCArr = []
    const tempUTCNumber = number.toString()
    for(let i = 0; i < tempUTCNumber.length; i++) {
        UTCArr.push(tempUTCNumber[i])
    }
    const UTCYear = parseInt(UTCArr.slice(0,4).join(''))
    const UTCMonth = parseInt(UTCArr.slice(4,6).join(''))
    const UTCDay = parseInt(UTCArr.slice(6,8).join(''))
    const UTCHour = parseInt(UTCArr.slice(8,10).join(''))
    const UTCMinute =  parseInt(UTCArr.slice(10,12).join(''))

    const localArr = []
    const UTCToLocal = DateTime.utc(UTCYear, UTCMonth, UTCDay, UTCHour, UTCMinute).toLocal().toFormat('yyyyMMddHHmm').toString()
    for(let i = 0; i < UTCToLocal.length; i++) {
        localArr.push(UTCToLocal[i])
    }
    const localYear = parseInt(localArr.slice(0,4).join(''))
    const localMonth = parseInt(localArr.slice(4,6).join(''))
    const localDay = localArr.slice(6,8).join('')
    const localHour = localArr.slice(8,10).join('')
    const localMinute =  localArr.slice(10,12).join('')

    const thaiMonth = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']
    const thaiYear = localYear+543

    return localDay+ " " + thaiMonth[localMonth-1] + " " + thaiYear + " · " + localHour + ":" + localMinute
}
