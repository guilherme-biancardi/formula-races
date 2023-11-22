import { DateTime, type DateObjectUnits } from "luxon";

const getCurrentYear = () => DateTime.now().year
const convertObjectToJsDate = (obj: DateObjectUnits) => DateTime.fromObject(obj).toJSDate()

export const useDatetime = () => ({
    getCurrentYear,
    convertObjectToJsDate
})