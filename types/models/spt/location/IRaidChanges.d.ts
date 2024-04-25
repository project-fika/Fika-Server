export interface IRaidChanges {
    /** What percentage of dynamic loot should the map contain */
    dynamicLootPercent: number;
    /** What percentage of static loot should the map contain */
    staticLootPercent: number;
    /** How many seconds into the raid is the player simulated to spawn in at */
    simulatedRaidStartSeconds: number;
}
