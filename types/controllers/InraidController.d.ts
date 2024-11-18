import { ApplicationContext } from "@spt/context/ApplicationContext";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IRegisterPlayerRequestData } from "@spt/models/eft/inRaid/IRegisterPlayerRequestData";
import { IScavSaveRequestData } from "@spt/models/eft/inRaid/IScavSaveRequestData";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IInRaidConfig } from "@spt/models/spt/config/IInRaidConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { LocalisationService } from "@spt/services/LocalisationService";
/**
 * Logic for handling In Raid callbacks
 */
export declare class InraidController {
    protected logger: ILogger;
    protected saveServer: SaveServer;
    protected profileHelper: ProfileHelper;
    protected localisationService: LocalisationService;
    protected applicationContext: ApplicationContext;
    protected configServer: ConfigServer;
    protected inRaidConfig: IInRaidConfig;
    protected botConfig: IBotConfig;
    constructor(logger: ILogger, saveServer: SaveServer, profileHelper: ProfileHelper, localisationService: LocalisationService, applicationContext: ApplicationContext, configServer: ConfigServer);
    /**
     * Save locationId to active profiles inraid object AND app context
     * @param sessionID Session id
     * @param info Register player request
     */
    addPlayer(sessionID: string, info: IRegisterPlayerRequestData): void;
    /**
     * Handle raid/profile/scavsave
     * Save profile state to disk
     * Handles pmc/pscav
     * @param offraidProfileData Post-raid scav profile data
     * @param sessionID Session id
     */
    savePostRaidProfileForScav(offraidProfileData: IScavSaveRequestData, sessionID: string): void;
    /**
     * Get the inraid config from configs/inraid.json
     * @returns InRaid Config
     */
    getInraidConfig(): IInRaidConfig;
    getTraitorScavHostileChance(url: string, sessionID: string): number;
    getBossConvertSettings(url: string, sessionId: string): string[];
}
