import { DateTime } from "luxon";

const getNow = () => DateTime.now()

const getNowFromFormat = (format = "yyyy-LL-dd") =>
  getNow().toFormat(format);

/**
 *
 * @param {string} date
 * @param {string} format
 * @returns {DateTime}
 */
const parseDatetime = (date, format) => DateTime.fromFormat(date, format);

export const useDatetime = () => ({
  getNow,
  getNowFromFormat,
  parseDatetime,
});
