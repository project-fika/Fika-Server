import { RagfairOfferGenerator } from "@spt-aki/generators/RagfairOfferGenerator";
import { TraderAssortHelper } from "@spt-aki/helpers/TraderAssortHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { IRagfairOffer } from "@spt-aki/models/eft/ragfair/IRagfairOffer";
import { ISearchRequestData } from "@spt-aki/models/eft/ragfair/ISearchRequestData";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { RagfairCategoriesService } from "@spt-aki/services/RagfairCategoriesService";
import { RagfairOfferService } from "@spt-aki/services/RagfairOfferService";
import { RagfairRequiredItemsService } from "@spt-aki/services/RagfairRequiredItemsService";
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
