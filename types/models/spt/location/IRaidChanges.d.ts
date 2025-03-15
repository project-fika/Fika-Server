export interface IRaidChanges {
    /** What percentage of dynamic loot should the map contain */
    dynamicLootPercent: number;
    /** What percentage of static loot should the map contain */
    staticLootPercent: number;
    /** How many seconds into the raid is the player simulated to spawn in at */
    simulatedRaidStartSeconds: number;
    /** How many minutes are in the raid total */
    raidTimeMinutes: number;
    /** The new number of seconds required to avoid a run through */
    newSurviveTimeSeconds?: number;
    /** The original number of seconds required to avoid a run through */
    originalSurvivalTimeSeconds: number;
    /** Any changes required to the extract list */
    exitChanges: ExtractChange[];
}
export interface ExtractChange {
    Name: string;
    MinTime?: number;
    MaxTime?: number;
    Chance?: number;
}
