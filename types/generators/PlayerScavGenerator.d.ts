import { BotGenerator } from "@spt-aki/generators/BotGenerator";
import { BotGeneratorHelper } from "@spt-aki/helpers/BotGeneratorHelper";
import { BotHelper } from "@spt-aki/helpers/BotHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IBotBase, Skills, Stats } from "@spt-aki/models/eft/common/tables/IBotBase";
import { IBotType } from "@spt-aki/models/eft/common/tables/IBotType";
import { IPlayerScavConfig, KarmaLevel } from "@spt-aki/models/spt/config/IPlayerScavConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { BotLootCacheService } from "@spt-aki/services/BotLootCacheService";
import { FenceService } from "@spt-aki/services/FenceService";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
export declare class PlayerScavGenerator {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseServer: DatabaseServer;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected botGeneratorHelper: BotGeneratorHelper;
    protected saveServer: SaveServer;
    protected profileHelper: ProfileHelper;
    protected botHelper: BotHelper;
    protected jsonUtil: JsonUtil;
    protected fenceService: FenceService;
    protected botLootCacheService: BotLootCacheService;
    protected localisationService: LocalisationService;
    protected botGenerator: BotGenerator;
    protected configServer: ConfigServer;
    protected playerScavConfig: IPlayerScavConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseServer: DatabaseServer, hashUtil: HashUtil, itemHelper: ItemHelper, botGeneratorHelper: BotGeneratorHelper, saveServer: SaveServer, profileHelper: ProfileHelper, botHelper: BotHelper, jsonUtil: JsonUtil, fenceService: FenceService, botLootCacheService: BotLootCacheService, localisationService: LocalisationService, botGenerator: BotGenerator, configServer: ConfigServer);
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
