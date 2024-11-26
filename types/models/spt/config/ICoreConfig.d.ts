import { ISurveyResponseData } from "@spt/models/eft/game/ISurveyResponseData";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface ICoreConfig extends IBaseConfig {
    kind: "spt-core";
    sptVersion: string;
    projectName: string;
    compatibleTarkovVersion: string;
    serverName: string;
    profileSaveIntervalSeconds: number;
    sptFriendNickname: string;
    allowProfileWipe: boolean;
    bsgLogging: IBsgLogging;
    release: IRelease;
    fixes: IGameFixes;
    survey: ISurveyResponseData;
    features: IServerFeatures;
    /** Commit hash build server was created from */
    commit?: string;
    /** Timestamp of server build */
    buildTime?: string;
    /** Server locale keys that will be added to the bottom of the startup watermark */
    customWatermarkLocaleKeys?: string[];
}
export interface IBsgLogging {
    /**
     * verbosity of what to log, yes I know this is backwards, but its how nlog deals with ordinals.
     * complain to them about it! In all cases, better exceptions will be logged.
     * WARNING: trace-info logging will quickly create log files in the megabytes.
     * 0 - trace
     * 1 - debug
     * 2 - info
     * 3 - warn
     * 4 - error
     * 5 - fatal
     * 6 - off
     */
    verbosity: number;
    sendToServer: boolean;
}
export interface IRelease {
    betaDisclaimerText?: string;
    betaDisclaimerAcceptText: string;
    serverModsLoadedText: string;
    serverModsLoadedDebugText: string;
    clientModsLoadedText: string;
    clientModsLoadedDebugText: string;
    illegalPluginsLoadedText: string;
    illegalPluginsExceptionText: string;
    releaseSummaryText?: string;
    isBeta?: boolean;
    isModdable?: boolean;
    isModded: boolean;
    betaDisclaimerTimeoutDelay: number;
}
export interface IGameFixes {
    /** Shotguns use a different value than normal guns causing huge pellet dispersion  */
    fixShotgunDispersion: boolean;
    /** Remove items added by mods when the mod no longer exists - can fix dead profiles stuck at game load */
    removeModItemsFromProfile: boolean;
    /** Fix issues that cause the game to not start due to inventory item issues */
    fixProfileBreakingInventoryItemIssues: boolean;
}
export interface IServerFeatures {
    autoInstallModDependencies: boolean;
    compressProfile: boolean;
    chatbotFeatures: IChatbotFeatures;
    /** Keyed to profile type e.g. "Standard" or "SPT Developer" */
    createNewProfileTypesBlacklist: string[];
}
export interface IChatbotFeatures {
    sptFriendEnabled: boolean;
    sptFriendGiftsEnabled: boolean;
    commandoEnabled: boolean;
    commandoFeatures: ICommandoFeatures;
    commandUseLimits: Record<string, number>;
    ids: Record<string, string>;
}
export interface ICommandoFeatures {
    giveCommandEnabled: boolean;
}
