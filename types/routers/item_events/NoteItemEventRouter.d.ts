import { NoteCallbacks } from "@spt-aki/callbacks/NoteCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt-aki/di/Router";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { INoteActionData } from "@spt-aki/models/eft/notes/INoteActionData";
export declare class NoteItemEventRouter extends ItemEventRouterDefinition {
    protected noteCallbacks: NoteCallbacks;
    constructor(noteCallbacks: NoteCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: INoteActionData, sessionID: string): IItemEventRouterResponse;
}
