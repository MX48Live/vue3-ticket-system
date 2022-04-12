import { DateTime } from "luxon";

const dateTimeSplitter = (source) => {
        const year = parseInt(source.toString().slice(0,4))
        const month = parseInt(source.toString().slice(4,6))
        const date = parseInt(source.toString().slice(6,8))
        const hour = parseInt(source.toString().slice(8,10))
        const min = parseInt(source.toString().slice(10,12))
        return [year, month, date, hour, min]
}
export const convertUTCtoLocal = (sourceUTC) => { 
    const [year, month, date, hour, min] = dateTimeSplitter(sourceUTC)
    const localTime = DateTime.utc(year, month, date, hour, min).toLocal().toFormat('yyyyMMddHHmm').toString()
    return parseInt(localTime)
}
export const convertLocaltoUTC = (sourceLocal) => {
    const [year, month, date, hour, min] = dateTimeSplitter(sourceLocal)
    const UTCTime = DateTime.local(year, month, date, hour, min).toUTC().toFormat('yyyyMMddHHmm').toString()
    return parseInt(UTCTime)
}
export const convertDateForDisplay = (source) => {
    let fullDate = source.toString().slice(0,8)
    let year = fullDate.slice(0,4)
    let month = fullDate.slice(4,6)
    let date = fullDate.slice(6,8)
    let concat = (year+'-'+month+'-'+date).toString()
    return concat
}
export const convertTimeForDisplay = (source) => {
    let fullTime = source.toString().slice(8,12)
    let hour = fullTime.slice(0,2)
    let minute = fullTime.slice(2,4)
    let concat = (hour+':'+minute).toString()
    return concat
}
