import { inject, injectable } from "tsyringe";

import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import { IFikaSendItemRequestData } from "../models/fika/routes/senditem/IFikaSendItemRequestData";
import { IFikaSenditemAvailablereceiversRequestData } from "../models/fika/routes/senditem/availablereceivers/IFikaSenditemAvailablereceiversRequestData";
import { FikaSendItemController } from "../controllers/FikaSendItemController";

@injectable()
export class FikaSendItemCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaSendItemController") protected fikaSendItemController: FikaSendItemController
    ) {
        // empty
    }

    public handleSendItem(pmcData: IPmcData, body: IFikaSendItemRequestData, sessionID: string): IItemEventRouterResponse {
        return this.fikaSendItemController.sendItem(pmcData, body, sessionID);
    }

    /** Handle /fika/senditem/availablereceivers */
    public handleAvailableReceivers(url: string, info: IFikaSenditemAvailablereceiversRequestData, sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaSendItemController.handleAvailableReceivers(sessionID));
    }
}
