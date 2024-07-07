import { ItemHelper } from "@spt/helpers/ItemHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { IStorePlayerOfferTaxAmountRequestData } from "@spt/models/eft/ragfair/IStorePlayerOfferTaxAmountRequestData";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";
import { RagfairPriceService } from "@spt/services/RagfairPriceService";
export declare class RagfairTaxService {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected ragfairPriceService: RagfairPriceService;
    protected itemHelper: ItemHelper;
    protected playerOfferTaxCache: Record<string, IStorePlayerOfferTaxAmountRequestData>;
    constructor(logger: ILogger, databaseService: DatabaseService, ragfairPriceService: RagfairPriceService, itemHelper: ItemHelper);
    storeClientOfferTaxValue(sessionId: string, offer: IStorePlayerOfferTaxAmountRequestData): void;
    clearStoredOfferTaxById(offerIdToRemove: string): void;
    getStoredClientOfferTaxValueById(offerIdToGet: string): IStorePlayerOfferTaxAmountRequestData;
    /**
    // This method, along with calculateItemWorth, is trying to mirror the client-side code found in the method "CalculateTaxPrice".
    // It's structured to resemble the client-side code as closely as possible - avoid making any big structure changes if it's not necessary.
     * @param item Item being sold on flea
     * @param pmcData player profile
     * @param requirementsValue
     * @param offerItemCount Number of offers being created
     * @param sellInOnePiece
     * @returns Tax in roubles
     */
    calculateTax(item: Item, pmcData: IPmcData, requirementsValue: number, offerItemCount: number, sellInOnePiece: boolean): number;
    protected calculateItemWorth(item: Item, itemTemplate: ITemplateItem, itemCount: number, pmcData: IPmcData, isRootItem?: boolean): number;
}
