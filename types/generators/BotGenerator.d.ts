import { BotInventoryGenerator } from "@spt/generators/BotInventoryGenerator";
import { BotLevelGenerator } from "@spt/generators/BotLevelGenerator";
import { BotDifficultyHelper } from "@spt/helpers/BotDifficultyHelper";
import { BotHelper } from "@spt/helpers/BotHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { IBaseJsonSkills, IBaseSkill, IBotBase, Info, Health as PmcHealth, Skills as botSkills } from "@spt/models/eft/common/tables/IBotBase";
import { Appearance, Health, IBotType, Inventory } from "@spt/models/eft/common/tables/IBotType";
import { BotGenerationDetails } from "@spt/models/spt/bots/BotGenerationDetails";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { BotEquipmentFilterService } from "@spt/services/BotEquipmentFilterService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class BotGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected profileHelper: ProfileHelper;
    protected databaseService: DatabaseService;
    protected botInventoryGenerator: BotInventoryGenerator;
    protected botLevelGenerator: BotLevelGenerator;
    protected botEquipmentFilterService: BotEquipmentFilterService;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected botHelper: BotHelper;
    protected botDifficultyHelper: BotDifficultyHelper;
    protected seasonalEventService: SeasonalEventService;
    protected localisationService: LocalisationService;
    protected itemFilterService: ItemFilterService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected botConfig: IBotConfig;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, randomUtil: RandomUtil, timeUtil: TimeUtil, profileHelper: ProfileHelper, databaseService: DatabaseService, botInventoryGenerator: BotInventoryGenerator, botLevelGenerator: BotLevelGenerator, botEquipmentFilterService: BotEquipmentFilterService, weightedRandomHelper: WeightedRandomHelper, botHelper: BotHelper, botDifficultyHelper: BotDifficultyHelper, seasonalEventService: SeasonalEventService, localisationService: LocalisationService, itemFilterService: ItemFilterService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Generate a player scav bot object
     * @param role e.g. assault / pmcbot
     * @param difficulty easy/normal/hard/impossible
     * @param botTemplate base bot template to use  (e.g. assault/pmcbot)
     * @returns
     */
    generatePlayerScav(sessionId: string, role: string, difficulty: string, botTemplate: IBotType): IBotBase;
    /**
     * Create 1  bots of the type/side/difficulty defined in botGenerationDetails
     * @param sessionId Session id
     * @param botGenerationDetails details on how to generate bots
     * @returns constructed bot
     */
    prepareAndGenerateBot(sessionId: string, botGenerationDetails: BotGenerationDetails): IBotBase;
    /**
     * Get a clone of the default bot base object and adjust its role/side/difficulty values
     * @param botRole Role bot should have
     * @param botSide Side bot should have
     * @param difficulty Difficult bot should have
     * @returns Cloned bot base
     */
    protected getPreparedBotBase(botRole: string, botSide: string, difficulty: string): IBotBase;
    /**
     * Get a clone of the database\bots\base.json file
     * @returns IBotBase object
     */
    protected getCloneOfBotBase(): IBotBase;
    /**
     * Create a IBotBase object with equipment/loot/exp etc
     * @param sessionId Session id
     * @param bot Bots base file
     * @param botJsonTemplate Bot template from db/bots/x.json
     * @param botGenerationDetails details on how to generate the bot
     * @returns IBotBase object
     */
    protected generateBot(sessionId: string, bot: IBotBase, botJsonTemplate: IBotType, botGenerationDetails: BotGenerationDetails): IBotBase;
    protected addAdditionalPocketLootWeightsForUnheardBot(botJsonTemplate: IBotType): void;
    /**
     * Remove items from item.json/lootableItemBlacklist from bots inventory
     * @param botInventory Bot to filter
     */
    protected removeBlacklistedLootFromBotTemplate(botInventory: Inventory): void;
    /**
     * Choose various appearance settings for a bot using weights: head/body/feet/hands
     * @param bot Bot to adjust
     * @param appearance Appearance settings to choose from
     * @param botGenerationDetails Generation details
     */
    protected setBotAppearance(bot: IBotBase, appearance: Appearance, botGenerationDetails: BotGenerationDetails): void;
    /**
     * Create a bot nickname
     * @param botJsonTemplate x.json from database
     * @param botGenerationDetails
     * @param botRole role of bot e.g. assault
     * @param sessionId OPTIONAL: profile session id
     * @returns Nickname for bot
     */
    protected generateBotNickname(botJsonTemplate: IBotType, botGenerationDetails: BotGenerationDetails, botRole: string, sessionId?: string): string;
    protected shouldSimulatePlayerScavName(botRole: string, isPlayerScav: boolean): boolean;
    protected addPlayerScavNameSimulationSuffix(nickname: string): string;
    /**
     * Log the number of PMCs generated to the debug console
     * @param output Generated bot array, ready to send to client
     */
    protected logPmcGeneratedCount(output: IBotBase[]): void;
    /**
     * Converts health object to the required format
     * @param healthObj health object from bot json
     * @param playerScav Is a pscav bot being generated
     * @returns PmcHealth object
     */
    protected generateHealth(healthObj: Health, playerScav?: boolean): PmcHealth;
    /**
     * Get a bots skills with randomsied progress value between the min and max values
     * @param botSkills Skills that should have their progress value randomised
     * @returns
     */
    protected generateSkills(botSkills: IBaseJsonSkills): botSkills;
    /**
     * Randomise the progress value of passed in skills based on the min/max value
     * @param skills Skills to randomise
     * @param isCommonSkills Are the skills 'common' skills
     * @returns Skills with randomised progress values as an array
     */
    protected getSkillsWithRandomisedProgressValue(skills: Record<string, IBaseSkill>, isCommonSkills: boolean): IBaseSkill[];
    /**
     * Generate an id+aid for a bot and apply
     * @param bot bot to update
     * @returns updated IBotBase object
     */
    protected addIdsToBot(bot: IBotBase): void;
    /**
     * Update a profiles profile.Inventory.equipment value with a freshly generated one
     * Update all inventory items that make use of this value too
     * @param profile Profile to update
     */
    protected generateInventoryId(profile: IBotBase): void;
    /**
     * Randomise a bots game version and account category
     * Chooses from all the game versions (standard, eod etc)
     * Chooses account type (default, Sherpa, etc)
     * @param botInfo bot info object to update
     * @returns Chosen game version
     */
    protected setRandomisedGameVersionAndCategory(botInfo: Info): string;
    /**
     * Add a side-specific (usec/bear) dogtag item to a bots inventory
     * @param bot bot to add dogtag to
     * @returns Bot with dogtag added
     */
    protected addDogtagToBot(bot: IBotBase): void;
    /**
     * Get a dogtag tpl that matches the bots game version and side
     * @param side Usec/Bear
     * @param gameVersion edge_of_darkness / standard
     * @returns item tpl
     */
    protected getDogtagTplByGameVersionAndSide(side: string, gameVersion: string): string;
    /**
     * Adjust a PMCs pocket tpl to UHD if necessary, otherwise do nothing
     * @param bot Pmc object to adjust
     */
    protected setPmcPocketsByGameVersion(bot: IBotBase): void;
}
