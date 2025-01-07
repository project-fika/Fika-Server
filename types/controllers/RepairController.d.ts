import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { RepairHelper } from "@spt/helpers/RepairHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { IRepairActionDataRequest } from "@spt/models/eft/repair/IRepairActionDataRequest";
import { ITraderRepairActionDataRequest } from "@spt/models/eft/repair/ITraderRepairActionDataRequest";
import { IRepairConfig } from "@spt/models/spt/config/IRepairConfig";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { DatabaseService } from "@spt/services/DatabaseService";
import { PaymentService } from "@spt/services/PaymentService";
import { RepairService } from "@spt/services/RepairService";
export declare class RepairController {
    protected logger: ILogger;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseService: DatabaseService;
    protected questHelper: QuestHelper;
    protected traderHelper: TraderHelper;
    protected paymentService: PaymentService;
    protected repairHelper: RepairHelper;
    protected repairService: RepairService;
    protected profileHelper: ProfileHelper;
    protected repairConfig: IRepairConfig;
    constructor(logger: ILogger, eventOutputHolder: EventOutputHolder, databaseService: DatabaseService, questHelper: QuestHelper, traderHelper: TraderHelper, paymentService: PaymentService, repairHelper: RepairHelper, repairService: RepairService, profileHelper: ProfileHelper);
    /**
     * Handle TraderRepair event
     * Repair with trader
     * @param sessionID session id
     * @param body endpoint request data
     * @param pmcData player profile
     * @returns item event router action
     */
    traderRepair(sessionID: string, body: ITraderRepairActionDataRequest, pmcData: IPmcData): IItemEventRouterResponse;
    /**
     * Handle Repair event
     * Repair with repair kit
     * @param sessionID session id
     * @param body endpoint request data
     * @param pmcData player profile
     * @returns item event router action
     */
    repairWithKit(sessionID: string, body: IRepairActionDataRequest, pmcData: IPmcData): IItemEventRouterResponse;
}
