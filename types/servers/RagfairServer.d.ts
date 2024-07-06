import { RagfairOfferGenerator } from "@spt/generators/RagfairOfferGenerator";
import { TraderAssortHelper } from "@spt/helpers/TraderAssortHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IRagfairOffer } from "@spt/models/eft/ragfair/IRagfairOffer";
import { ISearchRequestData } from "@spt/models/eft/ragfair/ISearchRequestData";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { LocalisationService } from "@spt/services/LocalisationService";
import { RagfairCategoriesService } from "@spt/services/RagfairCategoriesService";
import { RagfairOfferService } from "@spt/services/RagfairOfferService";
import { RagfairRequiredItemsService } from "@spt/services/RagfairRequiredItemsService";
export declare class RagfairServer {
    protected logger: ILogger;
    protected ragfairOfferGenerator: RagfairOfferGenerator;
    protected ragfairOfferService: RagfairOfferService;
    protected ragfairCategoriesService: RagfairCategoriesService;
    protected ragfairRequiredItemsService: RagfairRequiredItemsService;
    protected localisationService: LocalisationService;
    protected traderHelper: TraderHelper;
    protected traderAssortHelper: TraderAssortHelper;
    protected configServer: ConfigServer;
    protected ragfairConfig: IRagfairConfig;
    constructor(logger: ILogger, ragfairOfferGenerator: RagfairOfferGenerator, ragfairOfferService: RagfairOfferService, ragfairCategoriesService: RagfairCategoriesService, ragfairRequiredItemsService: RagfairRequiredItemsService, localisationService: LocalisationService, traderHelper: TraderHelper, traderAssortHelper: TraderAssortHelper, configServer: ConfigServer);
    load(): Promise<void>;
    update(): Promise<void>;
    /**
     * Get traders who need to be periodically refreshed
     * @returns string array of traders
     */
    getUpdateableTraders(): string[];
    getAllActiveCategories(fleaUnlocked: boolean, searchRequestData: ISearchRequestData, offers: IRagfairOffer[]): Record<string, number>;
    /**
     * Disable/Hide an offer from flea
     * @param offerId
     */
    hideOffer(offerId: string): void;
    getOffer(offerID: string): IRagfairOffer;
    getOffers(): IRagfairOffer[];
    removeOfferStack(offerID: string, amount: number): void;
    doesOfferExist(offerId: string): boolean;
    addPlayerOffers(): void;
}
