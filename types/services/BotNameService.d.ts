import { BotHelper } from "@spt/helpers/BotHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IBotType } from "@spt/models/eft/common/tables/IBotType";
import { IBotGenerationDetails } from "@spt/models/spt/bots/BotGenerationDetails";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { DatabaseService } from "./DatabaseService";
import { LocalisationService } from "./LocalisationService";
export declare class BotNameService {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected profileHelper: ProfileHelper;
    protected botHelper: BotHelper;
    protected databaseService: DatabaseService;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected botConfig: IBotConfig;
    protected pmcConfig: IPmcConfig;
    protected usedNameCache: Set<string>;
    constructor(logger: ILogger, randomUtil: RandomUtil, profileHelper: ProfileHelper, botHelper: BotHelper, databaseService: DatabaseService, localisationService: LocalisationService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Clear out any entries in Name Set
     */
    clearNameCache(): void;
    /**
     * Create a unique bot nickname
     * @param botJsonTemplate bot JSON data from db
     * @param botGenerationDetails
     * @param botRole role of bot e.g. assault
     * @param uniqueRoles Lowercase roles to always make unique
     * @param sessionId OPTIONAL: profile session id
     * @returns Nickname for bot
     */
    generateUniqueBotNickname(botJsonTemplate: IBotType, botGenerationDetails: IBotGenerationDetails, botRole: string, uniqueRoles?: string[]): string;
    /**
     * Should this bot have a name like "name (Pmc Name)"
     * @param botRole Role bot has
     * @returns True if name should be simulated pscav
     */
    protected shouldSimulatePlayerScavName(botRole: string): boolean;
    protected addPlayerScavNameSimulationSuffix(nickname: string): string;
}
