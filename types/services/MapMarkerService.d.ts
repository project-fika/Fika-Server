import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { IInventoryCreateMarkerRequestData } from "@spt/models/eft/inventory/IInventoryCreateMarkerRequestData";
import { IInventoryDeleteMarkerRequestData } from "@spt/models/eft/inventory/IInventoryDeleteMarkerRequestData";
import { IInventoryEditMarkerRequestData } from "@spt/models/eft/inventory/IInventoryEditMarkerRequestData";
import { ILogger } from "@spt/models/spt/utils/ILogger";
export declare class MapMarkerService {
    protected logger: ILogger;
    constructor(logger: ILogger);
    /**
     * Add note to a map item in player inventory
     * @param pmcData Player profile
     * @param request Add marker request
     * @returns Item
     */
    createMarkerOnMap(pmcData: IPmcData, request: IInventoryCreateMarkerRequestData): Item;
    /**
     * Delete a map marker
     * @param pmcData Player profile
     * @param request Delete marker request
     * @returns Item
     */
    deleteMarkerFromMap(pmcData: IPmcData, request: IInventoryDeleteMarkerRequestData): Item;
    /**
     * Edit an existing map marker
     * @param pmcData Player profile
     * @param request Edit marker request
     * @returns Item
     */
    editMarkerOnMap(pmcData: IPmcData, request: IInventoryEditMarkerRequestData): Item;
    /**
     * Strip out characters from note string that are not: letter/numbers/unicode/spaces
     * @param mapNoteText Marker text to sanitise
     * @returns Sanitised map marker text
     */
    protected sanitiseMapMarkerText(mapNoteText: string): string;
}
