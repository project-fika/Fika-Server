export declare class Timer {
    private startTime;
    /**
     * Resets the timer to its initial state.
     */
    restart(): void;
    /**
     * Returns the elapsed time in the specified unit with up to four decimal places of precision for ms and sec.
     *
     * @param unit The desired unit for the elapsed time ("ns", "ms", "sec").
     * @returns The elapsed time in the specified unit.
     */
    getTime(unit: "ns" | "ms" | "sec"): number;
}
