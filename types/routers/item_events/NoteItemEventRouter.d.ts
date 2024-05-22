import { NoteCallbacks } from "@spt/callbacks/NoteCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt/di/Router";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { INoteActionData } from "@spt/models/eft/notes/INoteActionData";
export declare class NoteItemEventRouter extends ItemEventRouterDefinition {
    protected noteCallbacks: NoteCallbacks;
    constructor(noteCallbacks: NoteCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: INoteActionData, sessionID: string): Promise<IItemEventRouterResponse>;
}
