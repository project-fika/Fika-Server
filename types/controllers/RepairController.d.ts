import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { QuestHelper } from "@spt-aki/helpers/QuestHelper";
import { RepairHelper } from "@spt-aki/helpers/RepairHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IRepairActionDataRequest } from "@spt-aki/models/eft/repair/IRepairActionDataRequest";
import { ITraderRepairActionDataRequest } from "@spt-aki/models/eft/repair/ITraderRepairActionDataRequest";
import { IRepairConfig } from "@spt-aki/models/spt/config/IRepairConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { PaymentService } from "@spt-aki/services/PaymentService";
import { RepairService } from "@spt-aki/services/RepairService";
export declare class RepairController {
    protected logger: ILogger;
    protected eventOutputHolder: EventOutputHolder;
    protected databaseServer: DatabaseServer;
    protected questHelper: QuestHelper;
    protected traderHelper: TraderHelper;
    protected paymentService: PaymentService;
    protected repairHelper: RepairHelper;
    protected repairService: RepairService;
    protected profileHelper: ProfileHelper;
    protected repairConfig: IRepairConfig;
    constructor(logger: ILogger, eventOutputHolder: EventOutputHolder, databaseServer: DatabaseServer, questHelper: QuestHelper, traderHelper: TraderHelper, paymentService: PaymentService, repairHelper: RepairHelper, repairService: RepairService, profileHelper: ProfileHelper);
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
