import { inject, injectable } from "tsyringe";

import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";

import { FikaSendItemController } from "../controllers/FikaSendItemController";
import { IFikaSendItemRequestData } from "../models/fika/routes/senditem/IFikaSendItemRequestData";
import { IFikaSenditemAvailablereceiversRequestData } from "../models/fika/routes/senditem/availablereceivers/IFikaSenditemAvailablereceiversRequestData";

@injectable()
export class FikaSendItemCallbacks {
    constructor(
        @inject("HttpResponseUtil") protected httpResponseUtil: HttpResponseUtil,
        @inject("FikaSendItemController") protected fikaSendItemController: FikaSendItemController,
    ) {
        // empty
    }

    public handleSendItem(pmcData: IPmcData, body: IFikaSendItemRequestData, sessionID: string): IItemEventRouterResponse {
        return this.fikaSendItemController.sendItem(pmcData, body, sessionID);
    }

    /** Handle /fika/senditem/availablereceivers */
    public handleAvailableReceivers(_url: string, _info: IFikaSenditemAvailablereceiversRequestData, sessionID: string): string {
        return this.httpResponseUtil.noBody(this.fikaSendItemController.handleAvailableReceivers(sessionID));
    }
}
