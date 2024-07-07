import { RagfairAssortGenerator } from "@spt/generators/RagfairAssortGenerator";
import { RagfairOfferGenerator } from "@spt/generators/RagfairOfferGenerator";
import { AssortHelper } from "@spt/helpers/AssortHelper";
import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { ITrader, ITraderAssort } from "@spt/models/eft/common/tables/ITrader";
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { FenceService } from "@spt/services/FenceService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { TraderAssortService } from "@spt/services/TraderAssortService";
import { TraderPurchasePersisterService } from "@spt/services/TraderPurchasePersisterService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { MathUtil } from "@spt/utils/MathUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class TraderAssortHelper {
    protected logger: ILogger;
    protected mathUtil: MathUtil;
    protected timeUtil: TimeUtil;
    protected databaseService: DatabaseService;
    protected profileHelper: ProfileHelper;
    protected assortHelper: AssortHelper;
    protected paymentHelper: PaymentHelper;
    protected ragfairAssortGenerator: RagfairAssortGenerator;
    protected ragfairOfferGenerator: RagfairOfferGenerator;
    protected traderAssortService: TraderAssortService;
    protected localisationService: LocalisationService;
    protected traderPurchasePersisterService: TraderPurchasePersisterService;
    protected traderHelper: TraderHelper;
    protected fenceService: FenceService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected traderConfig: ITraderConfig;
    protected mergedQuestAssorts: Record<string, Record<string, string>>;
    protected createdMergedQuestAssorts: boolean;
    constructor(logger: ILogger, mathUtil: MathUtil, timeUtil: TimeUtil, databaseService: DatabaseService, profileHelper: ProfileHelper, assortHelper: AssortHelper, paymentHelper: PaymentHelper, ragfairAssortGenerator: RagfairAssortGenerator, ragfairOfferGenerator: RagfairOfferGenerator, traderAssortService: TraderAssortService, localisationService: LocalisationService, traderPurchasePersisterService: TraderPurchasePersisterService, traderHelper: TraderHelper, fenceService: FenceService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Get a traders assorts
     * Can be used for returning ragfair / fence assorts
     * Filter out assorts not unlocked due to level OR quest completion
     * @param sessionId session id
     * @param traderId traders id
     * @param flea Should assorts player hasn't unlocked be returned - default false
     * @returns a traders' assorts
     */
    getAssort(sessionId: string, traderId: string, flea?: boolean): ITraderAssort;
    /**
     * Given the blacklist provided, remove root items from assort
     * @param assortToFilter Trader assort to modify
     * @param itemsTplsToRemove Item TPLs the assort should not have
     */
    protected removeItemsFromAssort(assortToFilter: ITraderAssort, itemsTplsToRemove: string[]): void;
    /**
     * Reset every traders root item `BuyRestrictionCurrent` property to 0
     * @param assortItems Items to adjust
     */
    protected resetBuyRestrictionCurrentValue(assortItems: Item[]): void;
    /**
     * Create a dict of all assort id = quest id mappings used to work out what items should be shown to player based on the quests they've started/completed/failed
     */
    protected hydrateMergedQuestAssorts(): void;
    /**
     * Reset a traders assorts and move nextResupply value to future
     * Flag trader as needing a flea offer reset to be picked up by flea update() function
     * @param trader trader details to alter
     */
    resetExpiredTrader(trader: ITrader): void;
    /**
     * Does the supplied trader need its assorts refreshed
     * @param traderID Trader to check
     * @returns true they need refreshing
     */
    traderAssortsHaveExpired(traderID: string): boolean;
    /**
     * Iterate over all assorts barter_scheme values, find barters selling for money and multiply by multipler in config
     * @param traderAssort Assorts to multiple price of
     */
    protected multiplyItemPricesByConfigMultiplier(traderAssort: ITraderAssort): void;
    /**
     * Get an array of pristine trader items prior to any alteration by player (as they were on server start)
     * @param traderId trader id
     * @returns array of Items
     */
    protected getPristineTraderAssorts(traderId: string): Item[];
    /**
     * Returns generated ragfair offers in a trader assort format
     * @returns Trader assort object
     */
    protected getRagfairDataAsTraderAssort(): ITraderAssort;
}
