import { DateTime } from "luxon";

/**
 *
 * @param {string} date exemplo: 2023-02-28
 * @param {string} format exemplo: yyyy, dd/LL/yyyy
 * @returns {DateTime} retorna um objeto DateTime do luxon
 */
const parseDatetime = (date, format, zone = 'local') =>
  DateTime.fromFormat(String(date), format, { zone });

const getNow = () => DateTime.now();

export const useDatetime = () => ({
  getNow,
  parseDatetime,
});
