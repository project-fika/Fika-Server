import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { INoteActionData } from "@spt-aki/models/eft/notes/INoteActionData";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
export declare class NoteController {
    protected eventOutputHolder: EventOutputHolder;
    constructor(eventOutputHolder: EventOutputHolder);
    addNote(pmcData: IPmcData, body: INoteActionData, sessionID: string): IItemEventRouterResponse;
    editNote(pmcData: IPmcData, body: INoteActionData, sessionID: string): IItemEventRouterResponse;
    deleteNote(pmcData: IPmcData, body: INoteActionData, sessionID: string): IItemEventRouterResponse;
}
