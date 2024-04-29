export declare class ProfileActivityService {
    protected profileActivityTimestamps: Record<string, number>;
    /**
     * Was the requested profile active in the last requested minutes
     * @param sessionId Profile to check
     * @param minutes Minutes to check for activity in
     * @returns True when profile was active within past x minutes
     */
    activeWithinLastMinutes(sessionId: string, minutes: number): boolean;
    /**
     * Get an array of profile ids that were active in the last x minutes
     * @param minutes How many minutes from now to search for profiles
     * @returns String array of profile ids
     */
    getActiveProfileIdsWithinMinutes(minutes: number): string[];
    /**
     * Update the timestamp a profile was last observed active
     * @param sessionId Profile to update
     */
    setActivityTimestamp(sessionId: string): void;
}
