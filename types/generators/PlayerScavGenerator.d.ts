import { BotGenerator } from "@spt/generators/BotGenerator";
import { BotGeneratorHelper } from "@spt/helpers/BotGeneratorHelper";
import { BotHelper } from "@spt/helpers/BotHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IBotBase, Skills, Stats } from "@spt/models/eft/common/tables/IBotBase";
import { IBotType } from "@spt/models/eft/common/tables/IBotType";
import { IPlayerScavConfig, KarmaLevel } from "@spt/models/spt/config/IPlayerScavConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { BotLootCacheService } from "@spt/services/BotLootCacheService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { FenceService } from "@spt/services/FenceService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class PlayerScavGenerator {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseService: DatabaseService;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected botGeneratorHelper: BotGeneratorHelper;
    protected saveServer: SaveServer;
    protected profileHelper: ProfileHelper;
    protected botHelper: BotHelper;
    protected fenceService: FenceService;
    protected botLootCacheService: BotLootCacheService;
    protected localisationService: LocalisationService;
    protected botGenerator: BotGenerator;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected playerScavConfig: IPlayerScavConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseService: DatabaseService, hashUtil: HashUtil, itemHelper: ItemHelper, botGeneratorHelper: BotGeneratorHelper, saveServer: SaveServer, profileHelper: ProfileHelper, botHelper: BotHelper, fenceService: FenceService, botLootCacheService: BotLootCacheService, localisationService: LocalisationService, botGenerator: BotGenerator, configServer: ConfigServer, cloner: ICloner);
    /**
     * Update a player profile to include a new player scav profile
     * @param sessionID session id to specify what profile is updated
     * @returns profile object
     */
    generate(sessionID: string): IPmcData;
    /**
     * Add items picked from `playerscav.lootItemsToAddChancePercent`
     * @param possibleItemsToAdd dict of tpl + % chance to be added
     * @param scavData
     * @param containersToAddTo Possible slotIds to add loot to
     */
    protected addAdditionalLootToPlayerScavContainers(possibleItemsToAdd: Record<string, number>, scavData: IBotBase, containersToAddTo: string[]): void;
    /**
     * Get the scav karama level for a profile
     * Is also the fence trader rep level
     * @param pmcData pmc profile
     * @returns karma level
     */
    protected getScavKarmaLevel(pmcData: IPmcData): number;
    /**
     * Get a baseBot template
     * If the parameter doesnt match "assault", take parts from the loot type and apply to the return bot template
     * @param botTypeForLoot bot type to use for inventory/chances
     * @returns IBotType object
     */
    protected constructBotBaseTemplate(botTypeForLoot: string): IBotType;
    /**
     * Adjust equipment/mod/item generation values based on scav karma levels
     * @param karmaSettings Values to modify the bot template with
     * @param baseBotNode bot template to modify according to karama level settings
     */
    protected adjustBotTemplateWithKarmaSpecificSettings(karmaSettings: KarmaLevel, baseBotNode: IBotType): void;
    protected getScavSkills(scavProfile: IPmcData): Skills;
    protected getDefaultScavSkills(): Skills;
    protected getScavStats(scavProfile: IPmcData): Stats;
    protected getScavLevel(scavProfile: IPmcData): number;
    protected getScavExperience(scavProfile: IPmcData): number;
    /**
     * Set cooldown till pscav is playable
     * take into account scav cooldown bonus
     * @param scavData scav profile
     * @param pmcData pmc profile
     * @returns
     */
    protected setScavCooldownTimer(scavData: IPmcData, pmcData: IPmcData): IPmcData;
}
