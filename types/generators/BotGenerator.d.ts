import { BotInventoryGenerator } from "@spt/generators/BotInventoryGenerator";
import { BotLevelGenerator } from "@spt/generators/BotLevelGenerator";
import { BotGeneratorHelper } from "@spt/helpers/BotGeneratorHelper";
import { BotHelper } from "@spt/helpers/BotHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { WeightedRandomHelper } from "@spt/helpers/WeightedRandomHelper";
import { MinMax } from "@spt/models/common/MinMax";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IBaseJsonSkills, IBaseSkill, IBotBase, IInfo, IHealth as PmcHealth, ISkills as botSkills } from "@spt/models/eft/common/tables/IBotBase";
import { IAppearance, IBodyPart, IBotType, IHealth, IInventory } from "@spt/models/eft/common/tables/IBotType";
import { IBotGenerationDetails } from "@spt/models/spt/bots/BotGenerationDetails";
import { IBotConfig } from "@spt/models/spt/config/IBotConfig";
import { IPmcConfig } from "@spt/models/spt/config/IPmcConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { BotEquipmentFilterService } from "@spt/services/BotEquipmentFilterService";
import { BotNameService } from "@spt/services/BotNameService";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { SeasonalEventService } from "@spt/services/SeasonalEventService";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
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
    protected botGeneratorHelper: BotGeneratorHelper;
    protected seasonalEventService: SeasonalEventService;
    protected itemFilterService: ItemFilterService;
    protected botNameService: BotNameService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected botConfig: IBotConfig;
    protected pmcConfig: IPmcConfig;
    constructor(logger: ILogger, hashUtil: HashUtil, randomUtil: RandomUtil, timeUtil: TimeUtil, profileHelper: ProfileHelper, databaseService: DatabaseService, botInventoryGenerator: BotInventoryGenerator, botLevelGenerator: BotLevelGenerator, botEquipmentFilterService: BotEquipmentFilterService, weightedRandomHelper: WeightedRandomHelper, botHelper: BotHelper, botGeneratorHelper: BotGeneratorHelper, seasonalEventService: SeasonalEventService, itemFilterService: ItemFilterService, botNameService: BotNameService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Generate a player scav bot object
     * @param role e.g. assault / pmcbot
     * @param difficulty easy/normal/hard/impossible
     * @param botTemplate base bot template to use  (e.g. assault/pmcbot)
     * profile PMC profile of player generating pscav
     * @returns IBotBase
     */
    generatePlayerScav(sessionId: string, role: string, difficulty: string, botTemplate: IBotType, profile: IPmcData): IBotBase;
    /**
     * Create 1 bot of the type/side/difficulty defined in botGenerationDetails
     * @param sessionId Session id
     * @param botGenerationDetails details on how to generate bots
     * @returns constructed bot
     */
    prepareAndGenerateBot(sessionId: string, botGenerationDetails: IBotGenerationDetails): Promise<IBotBase>;
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
    protected generateBot(sessionId: string, bot: IBotBase, botJsonTemplate: IBotType, botGenerationDetails: IBotGenerationDetails): IBotBase;
    /**
     * Should this bot have a name like "name (Pmc Name)" and be altered by client patch to be hostile to player
     * @param botRole Role bot has
     * @returns True if name should be simulated pscav
     */
    protected shouldSimulatePlayerScav(botRole: string): boolean;
    /**
     * Get exp for kill by bot difficulty
     * @param experience Dict of difficulties and experience
     * @param botDifficulty the killed bots difficulty
     * @param role Role of bot (optional, used for error logging)
     * @returns Experience for kill
     */
    protected getExperienceRewardForKillByDifficulty(experience: Record<string, MinMax>, botDifficulty: string, role: string): number;
    /**
     * Get the standing value change when player kills a bot
     * @param standingForKill Dictionary of standing values keyed by bot difficulty
     * @param botDifficulty Difficulty of bot to look up
     * @param role Role of bot (optional, used for error logging)
     * @returns Standing change value
     */
    protected getStandingChangeForKillByDifficulty(standingForKill: Record<string, number>, botDifficulty: string, role: string): number;
    /**
     * Get the agressor bonus value when player kills a bot
     * @param standingForKill Dictionary of standing values keyed by bot difficulty
     * @param botDifficulty Difficulty of bot to look up
     * @param role Role of bot (optional, used for error logging)
     * @returns Standing change value
     */
    protected getAgressorBonusByDifficulty(aggressorBonus: Record<string, number>, botDifficulty: string, role: string): number;
    /**
     * Set weighting of flagged equipment to 0
     * @param botJsonTemplate Bot data to adjust
     * @param botGenerationDetails Generation details of bot
     */
    protected filterBlacklistedGear(botJsonTemplate: IBotType, botGenerationDetails: IBotGenerationDetails): void;
    protected addAdditionalPocketLootWeightsForUnheardBot(botJsonTemplate: IBotType): void;
    /**
     * Remove items from item.json/lootableItemBlacklist from bots inventory
     * @param botInventory Bot to filter
     */
    protected removeBlacklistedLootFromBotTemplate(botInventory: IInventory): void;
    /**
     * Choose various appearance settings for a bot using weights: head/body/feet/hands
     * @param bot Bot to adjust
     * @param appearance Appearance settings to choose from
     * @param botGenerationDetails Generation details
     */
    protected setBotAppearance(bot: IBotBase, appearance: IAppearance, botGenerationDetails: IBotGenerationDetails): void;
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
    protected generateHealth(healthObj: IHealth, playerScav?: boolean): PmcHealth;
    /**
     * Sum up body parts max hp values, return the bodypart collection with lowest value
     * @param bodies Body parts to sum up
     * @returns Lowest hp collection
     */
    protected getLowestHpBody(bodies: IBodyPart[]): IBodyPart | undefined;
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
    protected setRandomisedGameVersionAndCategory(botInfo: IInfo): string;
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
