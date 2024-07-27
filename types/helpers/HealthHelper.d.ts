import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { ISyncHealthRequestData } from "@spt/models/eft/health/ISyncHealthRequestData";
import { Effects, ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { IHealthConfig } from "@spt/models/spt/config/IHealthConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class HealthHelper {
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected healthConfig: IHealthConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, saveServer: SaveServer, configServer: ConfigServer, cloner: ICloner);
    /**
     * Resets the profiles vitality/health and vitality/effects properties to their defaults
     * @param sessionID Session Id
     * @returns updated profile
     */
    resetVitality(sessionID: string): ISptProfile;
    /**
     * Update player profile vitality values with changes from client request object
     * @param pmcData Player profile
     * @param request Heal request
     * @param sessionID Session id
     * @param addEffects Should effects be added to profile (default - true)
     * @param deleteExistingEffects Should all prior effects be removed before apply new ones  (default - true)
     */
    saveVitality(pmcData: IPmcData, request: ISyncHealthRequestData, sessionID: string, addEffects?: boolean, deleteExistingEffects?: boolean): void;
    /**
     * Adjust hydration/energy/temperate and body part hp values in player profile to values in profile.vitality
     * @param pmcData Profile to update
     * @param sessionId Session id
     */
    protected saveHealth(pmcData: IPmcData, sessionID: string): void;
    /**
     * Save effects to profile
     * Works by removing all effects and adding them back from profile
     * Removes empty 'Effects' objects if found
     * @param pmcData Player profile
     * @param sessionId Session id
     * @param bodyPartsWithEffects dict of body parts with effects that should be added to profile
     * @param addEffects Should effects be added back to profile
     */
    protected saveEffects(pmcData: IPmcData, sessionId: string, bodyPartsWithEffects: Effects, deleteExistingEffects?: boolean): void;
    /**
     * Add effect to body part in profile
     * @param pmcData Player profile
     * @param effectBodyPart body part to edit
     * @param effectType Effect to add to body part
     * @param duration How long the effect has left in seconds (-1 by default, no duration).
     */
    protected addEffect(pmcData: IPmcData, effectBodyPart: string, effectType: string, duration?: number): void;
    protected isEmpty(map: Record<string, {
        Time: number;
    }>): boolean;
}
