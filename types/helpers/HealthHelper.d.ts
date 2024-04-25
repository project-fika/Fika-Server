import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { ISyncHealthRequestData } from "@spt-aki/models/eft/health/ISyncHealthRequestData";
import { Effects, IAkiProfile } from "@spt-aki/models/eft/profile/IAkiProfile";
import { IHealthConfig } from "@spt-aki/models/spt/config/IHealthConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class HealthHelper {
    protected jsonUtil: JsonUtil;
    protected logger: ILogger;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected configServer: ConfigServer;
    protected healthConfig: IHealthConfig;
    constructor(jsonUtil: JsonUtil, logger: ILogger, timeUtil: TimeUtil, saveServer: SaveServer, configServer: ConfigServer);
    /**
     * Resets the profiles vitality/health and vitality/effects properties to their defaults
     * @param sessionID Session Id
     * @returns updated profile
     */
    resetVitality(sessionID: string): IAkiProfile;
    /**
     * Update player profile with changes from request object
     * @param pmcData Player profile
     * @param request Heal request
     * @param sessionID Session id
     * @param addEffects Should effects be added or removed (default - add)
     * @param deleteExistingEffects Should all prior effects be removed before apply new ones
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
