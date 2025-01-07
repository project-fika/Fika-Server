import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { IRagfairOffer } from "@spt/models/eft/ragfair/IRagfairOffer";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { RagfairOfferService } from "@spt/services/RagfairOfferService";
export declare class RagfairRequiredItemsService {
    protected logger: ILogger;
    protected paymentHelper: PaymentHelper;
    protected ragfairOfferService: RagfairOfferService;
    protected requiredItemsCache: {};
    constructor(logger: ILogger, paymentHelper: PaymentHelper, ragfairOfferService: RagfairOfferService);
    getRequiredItemsById(searchId: string): IRagfairOffer[];
    buildRequiredItemTable(): void;
}
