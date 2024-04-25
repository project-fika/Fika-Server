import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IInRaidConfig extends IBaseConfig {
    kind: "aki-inraid";
    MIAOnRaidEnd: boolean;
    /** Overrides to apply to the pre-raid settings screen */
    raidMenuSettings: RaidMenuSettings;
    /** What effects should be saved post-raid */
    save: Save;
    /** Names of car extracts */
    carExtracts: string[];
    /** Names of coop extracts */
    coopExtracts: string[];
    /** Fence rep gain from a single car extract */
    carExtractBaseStandingGain: number;
    /** Fence rep gain from a single coop extract */
    coopExtractBaseStandingGain: number;
    /** Fence rep gain when successfully extracting as pscav */
    scavExtractGain: number;
    /** The likelihood of PMC eliminating a minimum of 2 scavs while you engage them as a pscav. */
    pmcKillProbabilityForScavGain: number;
    /** On death should items in your secure keep their Find in raid status regardless of how you finished the raid */
    keepFiRSecureContainerOnDeath: boolean;
    /** Percentage chance a player scav hot is hostile to the player when scavving */
    playerScavHostileChancePercent: number;
}
export interface RaidMenuSettings {
    aiAmount: string;
    aiDifficulty: string;
    bossEnabled: boolean;
    scavWars: boolean;
    taggedAndCursed: boolean;
    enablePve: boolean;
    randomWeather: boolean;
    randomTime: boolean;
}
export interface Save {
    /** Should loot gained from raid be saved */
    loot: boolean;
    durability: boolean;
}
