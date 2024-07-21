import { SellResult } from "@spt/models/eft/ragfair/IRagfairOffer";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class RagfairSellHelper {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected databaseService: DatabaseService;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, timeUtil: TimeUtil, databaseService: DatabaseService, configServer: ConfigServer);
    /**
     * Get the percent chance to sell an item based on its average listed price vs player chosen listing price
     * @param averageOfferPriceRub Price of average offer in roubles
     * @param playerListedPriceRub Price player listed item for in roubles
     * @param qualityMultiplier Quality multipler of item being sold
     * @returns percent value
     */
    calculateSellChance(averageOfferPriceRub: number, playerListedPriceRub: number, qualityMultiplier: number): number;
    /**
     * Get array of item count and sell time (empty array = no sell)
     * @param sellChancePercent chance item will sell
     * @param itemSellCount count of items to sell
     * @param sellInOneGo All items listed get sold at once
     * @returns Array of purchases of item(s) listed
     */
    rollForSale(sellChancePercent: number, itemSellCount: number, sellInOneGo?: boolean): SellResult[];
}
