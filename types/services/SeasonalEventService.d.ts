import { BotHelper } from "@spt/helpers/BotHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IConfig } from "@spt/models/eft/common/IGlobals";
import { IAdditionalHostilitySettings } from "@spt/models/eft/common/ILocationBase";
import { IInventory } from "@spt/models/eft/common/tables/IBotType";
import { Season } from "@spt/models/enums/Season";
import { SeasonalEventType } from "@spt/models/enums/SeasonalEventType";
import { IHttpConfig } from "@spt/models/spt/config/IHttpConfig";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { IQuestConfig } from "@spt/models/spt/config/IQuestConfig";
import { ISeasonalEvent, ISeasonalEventConfig, IZombieSettings } from "@spt/models/spt/config/ISeasonalEventConfig";
import { IWeatherConfig } from "@spt/models/spt/config/IWeatherConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { GiftService } from "@spt/services/GiftService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { DatabaseImporter } from "@spt/utils/DatabaseImporter";
export declare class SeasonalEventService {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected databaseImporter: DatabaseImporter;
    protected giftService: GiftService;
    protected localisationService: LocalisationService;
    protected botHelper: BotHelper;
    protected profileHelper: ProfileHelper;
    protected configServer: ConfigServer;
    protected seasonalEventConfig: ISeasonalEventConfig;
    protected questConfig: IQuestConfig;
    protected httpConfig: IHttpConfig;
    protected weatherConfig: IWeatherConfig;
    protected locationConfig: ILocationConfig;
    protected halloweenEventActive?: boolean;
    protected christmasEventActive?: boolean;
    /** All events active at this point in time */
    protected currentlyActiveEvents: ISeasonalEvent[];
    constructor(logger: ILogger, databaseService: DatabaseService, databaseImporter: DatabaseImporter, giftService: GiftService, localisationService: LocalisationService, botHelper: BotHelper, profileHelper: ProfileHelper, configServer: ConfigServer);
    protected get christmasEventItems(): string[];
    protected get halloweenEventItems(): string[];
    /**
     * Get an array of christmas items found in bots inventories as loot
     * @returns array
     */
    getChristmasEventItems(): string[];
    /**
     * Get an array of halloween items found in bots inventories as loot
     * @returns array
     */
    getHalloweenEventItems(): string[];
    itemIsChristmasRelated(itemTpl: string): boolean;
    itemIsHalloweenRelated(itemTpl: string): boolean;
    /**
     * Check if item id exists in christmas or halloween event arrays
     * @param itemTpl item tpl to check for
     * @returns
     */
    itemIsSeasonalRelated(itemTpl: string): boolean;
    /**
     * Get an array of seasonal items that should not appear
     * e.g. if halloween is active, only return christmas items
     * or, if halloween and christmas are inactive, return both sets of items
     * @returns array of tpl strings
     */
    getInactiveSeasonalEventItems(): string[];
    /**
     * Is a seasonal event currently active
     * @returns true if event is active
     */
    seasonalEventEnabled(): boolean;
    /**
     * Is christmas event active
     * @returns true if active
     */
    christmasEventEnabled(): boolean;
    /**
     * is halloween event active
     * @returns true if active
     */
    halloweenEventEnabled(): boolean;
    /**
     * Is detection of seasonal events enabled (halloween / christmas)
     * @returns true if seasonal events should be checked for
     */
    isAutomaticEventDetectionEnabled(): boolean;
    /**
     * Get a dictionary of gear changes to apply to bots for a specific event e.g. Christmas/Halloween
     * @param eventName Name of event to get gear changes for
     * @returns bots with equipment changes
     */
    protected getEventBotGear(eventType: SeasonalEventType): Record<string, Record<string, Record<string, number>>>;
    /**
     * Get the dates each seasonal event starts and ends at
     * @returns Record with event name + start/end date
     */
    getEventDetails(): ISeasonalEvent[];
    /**
     * Look up quest in configs/quest.json
     * @param questId Quest to look up
     * @param event event type (Christmas/Halloween/None)
     * @returns true if related
     */
    isQuestRelatedToEvent(questId: string, event: SeasonalEventType): boolean;
    /**
     * Handle activating seasonal events
     */
    enableSeasonalEvents(): void;
    forceSeasonalEvent(eventType: SeasonalEventType): boolean;
    /**
     * Store active events inside class array property `currentlyActiveEvents` + set class properties: christmasEventActive/halloweenEventActive
     */
    protected cacheActiveEvents(): void;
    /**
     * Get the currently active weather season e.g. SUMMER/AUTUMN/WINTER
     * @returns Season enum value
     */
    getActiveWeatherSeason(): Season;
    /**
     * Iterate through bots inventory and loot to find and remove christmas items (as defined in SeasonalEventService)
     * @param botInventory Bots inventory to iterate over
     * @param botRole the role of the bot being processed
     */
    removeChristmasItemsFromBotInventory(botInventory: IInventory, botRole: string): void;
    /**
     * Make adjusted to server code based on the name of the event passed in
     * @param globalConfig globals.json
     * @param eventName Name of the event to enable. e.g. Christmas
     */
    protected updateGlobalEvents(globalConfig: IConfig, event: ISeasonalEvent): void;
    protected replaceBotHostility(hostilitySettings: Record<string, IAdditionalHostilitySettings[]>): void;
    protected removeEntryRequirement(locationIds: string[]): void;
    givePlayerSeasonalGifts(sessionId: string): void;
    /**
     * Force zryachiy to always have a melee weapon
     */
    protected adjustZryachiyMeleeChance(): void;
    /**
     * Enable the halloween zryachiy summon event
     */
    protected enableHalloweenSummonEvent(): void;
    protected configureZombies(zombieSettings: IZombieSettings): void;
    protected addEventWavesToMaps(eventType: string): void;
    /**
     * Add event bosses to maps
     * @param eventType Seasonal event, e.g. HALLOWEEN/CHRISTMAS
     * @param mapWhitelist OPTIONAL - Maps to add bosses to
     */
    protected addEventBossesToMaps(eventType: string, mapIdWhitelist?: string[]): void;
    /**
     * Change trader icons to be more event themed (Halloween only so far)
     * @param eventType What event is active
     */
    protected adjustTraderIcons(eventType: SeasonalEventType): void;
    /**
     * Add lootble items from backpack into patrol.ITEMS_TO_DROP difficulty property
     */
    protected addLootItemsToGifterDropItemsList(): void;
    /**
     * Read in data from seasonalEvents.json and add found equipment items to bots
     * @param eventName Name of the event to read equipment in from config
     */
    protected addEventGearToBots(eventType: SeasonalEventType): void;
    /**
     * Add pumpkin loot boxes to scavs
     */
    protected addPumpkinsToScavBackpacks(): void;
    protected renameBitcoin(): void;
    /**
     * Set Khorovod(dancing tree) chance to 100% on all maps that support it
     */
    protected enableDancingTree(): void;
    /**
     * Add santa to maps
     */
    protected addGifterBotToMaps(): void;
    protected handleModEvent(event: ISeasonalEvent): void;
    /**
     * Send gift to player if they'e not already received it
     * @param playerId Player to send gift to
     * @param giftKey Key of gift to give
     */
    protected giveGift(playerId: string, giftKey: string): void;
    /**
     * Get the underlying bot type for an event bot e.g. `peacefullZryachiyEvent` will return `bossZryachiy`
     * @param eventBotRole Event bot role type
     * @returns Bot role as string
     */
    getBaseRoleForEventBot(eventBotRole: string): string;
    /**
     * Force the weather to be snow
     */
    enableSnow(): void;
}
