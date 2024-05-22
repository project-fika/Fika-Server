import { MinMax } from "@spt/models/common/MinMax";
export interface BotGenerationDetails {
    /** Should the bot be generated as a PMC */
    isPmc: boolean;
    /** assault/pmcBot etc */
    role: string;
    /** Side of bot */
    side: string;
    /** Active players current level */
    playerLevel?: number;
    playerName?: string;
    /** Level specific overrides for PMC level */
    locationSpecificPmcLevelOverride?: MinMax;
    /** Delta of highest level of bot e.g. 50 means 50 levels above player */
    botRelativeLevelDeltaMax: number;
    /** Delta of lowest level of bot e.g. 50 means 50 levels below player */
    botRelativeLevelDeltaMin: number;
    /** How many to create and store */
    botCountToGenerate: number;
    /** Desired difficulty of the bot */
    botDifficulty: string;
    /** Will the generated bot be a player scav */
    isPlayerScav: boolean;
    eventRole?: string;
    allPmcsHaveSameNameAsPlayer?: boolean;
}
