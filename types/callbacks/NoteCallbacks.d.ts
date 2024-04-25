import { NoteController } from "@spt-aki/controllers/NoteController";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { INoteActionData } from "@spt-aki/models/eft/notes/INoteActionData";
export declare class NoteCallbacks {
    protected noteController: NoteController;
    constructor(noteController: NoteController);
    /** Handle AddNote event */
    addNote(pmcData: IPmcData, body: INoteActionData, sessionID: string): IItemEventRouterResponse;
    /** Handle EditNote event */
    editNote(pmcData: IPmcData, body: INoteActionData, sessionID: string): IItemEventRouterResponse;
    /** Handle DeleteNote event */
    deleteNote(pmcData: IPmcData, body: INoteActionData, sessionID: string): IItemEventRouterResponse;
}
