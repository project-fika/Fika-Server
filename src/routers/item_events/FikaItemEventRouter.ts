import { inject, injectable } from "tsyringe";

import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { HandledRoute, ItemEventRouterDefinition } from "@spt-aki/di/Router";

import { FikaSendItemCallbacks } from "../../callbacks/FikaSendItemCallbacks";

@injectable()
export class FikaItemEventRouter extends ItemEventRouterDefinition {
    constructor(
        @inject("FikaSendItemCallbacks") protected fikaSendItemCallbacks: FikaSendItemCallbacks
    ) {
        super();
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [
            new HandledRoute("SendToPlayer", false)
        ];
    }

    public handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string): IItemEventRouterResponse {
        switch (url) {
            case "SendToPlayer":
                return this.fikaSendItemCallbacks.handleSendItem(pmcData, body, sessionID);
        }
    }
}
