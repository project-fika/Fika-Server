/**
 * Utility class to handle time related operations.
 */
export declare class TimeUtil {
    static readonly ONE_HOUR_AS_SECONDS = 3600;
    /**
     * Pads a number with a leading zero if it is less than 10.
     *
     * @param {number} number - The number to pad.
     * @returns {string} The padded number as a string.
     */
    protected pad(number: number): string;
    /**
     * Formats the time part of a date as a UTC string.
     *
     * @param {Date} date - The date to format in UTC.
     * @returns {string} The formatted time as 'HH-MM-SS'.
     */
    formatTime(date: Date): string;
    /**
     * Formats the date part of a date as a UTC string.
     *
     * @param {Date} date - The date to format in UTC.
     * @returns {string} The formatted date as 'YYYY-MM-DD'.
     */
    formatDate(date: Date): string;
    /**
     * Gets the current date as a formatted UTC string.
     *
     * @returns {string} The current date as 'YYYY-MM-DD'.
     */
    getDate(): string;
    /**
     * Gets the current time as a formatted UTC string.
     *
     * @returns {string} The current time as 'HH-MM-SS'.
     */
    getTime(): string;
    /**
     * Gets the current timestamp in seconds in UTC.
     *
     * @returns {number} The current timestamp in seconds since the Unix epoch in UTC.
     */
    getTimestamp(): number;
    getStartOfDayTimestamp(timestamp?: number): number;
    /**
     * Get timestamp of today + passed in day count
     * @param daysFromNow Days from now
     */
    getTimeStampFromNowDays(daysFromNow: number): number;
    /**
     * Get timestamp of today + passed in hour count
     * @param daysFromNow Days from now
     */
    getTimeStampFromNowHours(hoursFromNow: number): number;
    /**
     * Gets the current time in UTC in a format suitable for mail in EFT.
     *
     * @returns {string} The current time as 'HH:MM' in UTC.
     */
    getTimeMailFormat(): string;
    /**
     * Gets the current date in UTC in a format suitable for emails in EFT.
     *
     * @returns {string} The current date as 'DD.MM.YYYY' in UTC.
     */
    getDateMailFormat(): string;
    /**
     * Converts a number of hours into seconds.
     *
     * @param {number} hours - The number of hours to convert.
     * @returns {number} The equivalent number of seconds.
     */
    getHoursAsSeconds(hours: number): number;
    getTimestampOfNextHour(): number;
    /**
     * Returns the current days timestamp at 00:00
     * e.g. current time: 13th march 14:22 will return 13th march 00:00
     * @returns Timestamp
     */
    getTodaysMidnightTimestamp(): number;
}
