import { ApplicationContext } from "@spt/context/ApplicationContext";
import type { IEndLocalRaidRequestData } from "@spt/models/eft/match/IEndLocalRaidRequestData";
import type { IGetRaidConfigurationRequestData } from "@spt/models/eft/match/IGetRaidConfigurationRequestData";
import type { IMatchGroupStartGameRequest } from "@spt/models/eft/match/IMatchGroupStartGameRequest";
import type { IMatchGroupStatusRequest } from "@spt/models/eft/match/IMatchGroupStatusRequest";
import type { IMatchGroupStatusResponse } from "@spt/models/eft/match/IMatchGroupStatusResponse";
import type { IProfileStatusResponse } from "@spt/models/eft/match/IProfileStatusResponse";
import type { IStartLocalRaidRequestData } from "@spt/models/eft/match/IStartLocalRaidRequestData";
import type { IStartLocalRaidResponseData } from "@spt/models/eft/match/IStartLocalRaidResponseData";
import type { IMatchConfig } from "@spt/models/spt/config/IMatchConfig";
import type { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { LocationLifecycleService } from "@spt/services/LocationLifecycleService";
import { MatchLocationService } from "@spt/services/MatchLocationService";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class MatchController {
    protected logger: ILogger;
    protected saveServer: SaveServer;
    protected matchLocationService: MatchLocationService;
    protected configServer: ConfigServer;
    protected applicationContext: ApplicationContext;
    protected locationLifecycleService: LocationLifecycleService;
    protected cloner: ICloner;
    protected matchConfig: IMatchConfig;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, saveServer: SaveServer, matchLocationService: MatchLocationService, configServer: ConfigServer, applicationContext: ApplicationContext, locationLifecycleService: LocationLifecycleService, cloner: ICloner);
    getEnabled(): boolean;
    /** Handle client/match/group/delete */
    deleteGroup(info: any): void;
    /** Handle match/group/start_game */
    joinMatch(info: IMatchGroupStartGameRequest, sessionId: string): IProfileStatusResponse;
    /** Handle client/match/group/status */
    getGroupStatus(info: IMatchGroupStatusRequest): IMatchGroupStatusResponse;
    /**
     * Handle /client/raid/configuration
     * @param request Raid config request
     * @param sessionID Session id
     */
    configureOfflineRaid(request: IGetRaidConfigurationRequestData, sessionID: string): void;
    /**
     * Convert a difficulty value from pre-raid screen to a bot difficulty
     * @param botDifficulty dropdown difficulty value
     * @returns bot difficulty
     */
    protected convertDifficultyDropdownIntoBotDifficulty(botDifficulty: string): string;
    /** Handle client/match/local/start */
    startLocalRaid(sessionId: string, request: IStartLocalRaidRequestData): IStartLocalRaidResponseData;
    /** Handle client/match/local/end */
    endLocalRaid(sessionId: string, request: IEndLocalRaidRequestData): void;
}
