/**
 * A utility class for measuring elapsed time using high-resolution nanosecond precision.
 */
export declare class BunTimer {
    private startTime;
    private endTime;
    /**
     * Initializes a new instance of the `BunTimer` class and starts the timer.
     */
    constructor();
    /**
     * Starts or restarts the timer.
     */
    start(): void;
    /**
     * Stops the timer and returns the elapsed time.
     *
     * @returns {Object} An object containing the elapsed time in nanoseconds, milliseconds, and seconds.
     * @returns {number} ns - The elapsed time in nanoseconds.
     * @returns {number} ms - The elapsed time in milliseconds.
     * @returns {number} sec - The elapsed time in seconds.
     */
    finish(): {
        ns: number;
        ms: number;
        sec: number;
    };
}
