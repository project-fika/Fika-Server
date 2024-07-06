import { inject, injectable } from "tsyringe";

import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";

import { FikaSendItemCallbacks } from "../../callbacks/FikaSendItemCallbacks";

@injectable()
export class FikaItemEventRouter extends ItemEventRouterDefinition {
    constructor(@inject("FikaSendItemCallbacks") protected fikaSendItemCallbacks: FikaSendItemCallbacks) {
        super();
    }

    public override getHandledRoutes(): HandledRoute[] {
        return [new HandledRoute("SendToPlayer", false)];
    }

    public override async handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string): Promise<IItemEventRouterResponse> {
        switch (url) {
            case "SendToPlayer":
                return this.fikaSendItemCallbacks.handleSendItem(pmcData, body, sessionID);
        }
    }
}
