import { InventoryController } from "@spt-aki/controllers/InventoryController";
import { QuestController } from "@spt-aki/controllers/QuestController";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IInventoryBindRequestData } from "@spt-aki/models/eft/inventory/IInventoryBindRequestData";
import { IInventoryCreateMarkerRequestData } from "@spt-aki/models/eft/inventory/IInventoryCreateMarkerRequestData";
import { IInventoryDeleteMarkerRequestData } from "@spt-aki/models/eft/inventory/IInventoryDeleteMarkerRequestData";
import { IInventoryEditMarkerRequestData } from "@spt-aki/models/eft/inventory/IInventoryEditMarkerRequestData";
import { IInventoryExamineRequestData } from "@spt-aki/models/eft/inventory/IInventoryExamineRequestData";
import { IInventoryFoldRequestData } from "@spt-aki/models/eft/inventory/IInventoryFoldRequestData";
import { IInventoryMergeRequestData } from "@spt-aki/models/eft/inventory/IInventoryMergeRequestData";
import { IInventoryMoveRequestData } from "@spt-aki/models/eft/inventory/IInventoryMoveRequestData";
import { IInventoryReadEncyclopediaRequestData } from "@spt-aki/models/eft/inventory/IInventoryReadEncyclopediaRequestData";
import { IInventoryRemoveRequestData } from "@spt-aki/models/eft/inventory/IInventoryRemoveRequestData";
import { IInventorySortRequestData } from "@spt-aki/models/eft/inventory/IInventorySortRequestData";
import { IInventorySplitRequestData } from "@spt-aki/models/eft/inventory/IInventorySplitRequestData";
import { IInventorySwapRequestData } from "@spt-aki/models/eft/inventory/IInventorySwapRequestData";
import { IInventoryTagRequestData } from "@spt-aki/models/eft/inventory/IInventoryTagRequestData";
import { IInventoryToggleRequestData } from "@spt-aki/models/eft/inventory/IInventoryToggleRequestData";
import { IInventoryTransferRequestData } from "@spt-aki/models/eft/inventory/IInventoryTransferRequestData";
import { IOpenRandomLootContainerRequestData } from "@spt-aki/models/eft/inventory/IOpenRandomLootContainerRequestData";
import { IRedeemProfileRequestData } from "@spt-aki/models/eft/inventory/IRedeemProfileRequestData";
import { ISetFavoriteItems } from "@spt-aki/models/eft/inventory/ISetFavoriteItems";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { IFailQuestRequestData } from "@spt-aki/models/eft/quests/IFailQuestRequestData";
export declare class InventoryCallbacks {
    protected inventoryController: InventoryController;
    protected questController: QuestController;
    constructor(inventoryController: InventoryController, questController: QuestController);
    /** Handle client/game/profile/items/moving Move event */
    moveItem(pmcData: IPmcData, body: IInventoryMoveRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /** Handle Remove event */
    removeItem(pmcData: IPmcData, body: IInventoryRemoveRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /** Handle Split event */
    splitItem(pmcData: IPmcData, body: IInventorySplitRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    mergeItem(pmcData: IPmcData, body: IInventoryMergeRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    transferItem(pmcData: IPmcData, request: IInventoryTransferRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /** Handle Swap */
    swapItem(pmcData: IPmcData, body: IInventorySwapRequestData, sessionID: string): IItemEventRouterResponse;
    foldItem(pmcData: IPmcData, body: IInventoryFoldRequestData, sessionID: string): IItemEventRouterResponse;
    toggleItem(pmcData: IPmcData, body: IInventoryToggleRequestData, sessionID: string): IItemEventRouterResponse;
    tagItem(pmcData: IPmcData, body: IInventoryTagRequestData, sessionID: string): IItemEventRouterResponse;
    bindItem(pmcData: IPmcData, body: IInventoryBindRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    unbindItem(pmcData: IPmcData, body: IInventoryBindRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    examineItem(pmcData: IPmcData, body: IInventoryExamineRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /** Handle ReadEncyclopedia */
    readEncyclopedia(pmcData: IPmcData, body: IInventoryReadEncyclopediaRequestData, sessionID: string): IItemEventRouterResponse;
    /** Handle ApplyInventoryChanges */
    sortInventory(pmcData: IPmcData, body: IInventorySortRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    createMapMarker(pmcData: IPmcData, body: IInventoryCreateMarkerRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    deleteMapMarker(pmcData: IPmcData, body: IInventoryDeleteMarkerRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    editMapMarker(pmcData: IPmcData, body: IInventoryEditMarkerRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /** Handle OpenRandomLootContainer */
    openRandomLootContainer(pmcData: IPmcData, body: IOpenRandomLootContainerRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    redeemProfileReward(pmcData: IPmcData, body: IRedeemProfileRequestData, sessionId: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    setFavoriteItem(pmcData: IPmcData, body: ISetFavoriteItems, sessionId: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * TODO - MOVE INTO QUEST CODE
     * Handle game/profile/items/moving - QuestFail
     */
    failQuest(pmcData: IPmcData, request: IFailQuestRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
}
