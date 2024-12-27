import type { InventoryController } from "@spt/controllers/InventoryController";
import { QuestController } from "@spt/controllers/QuestController";
import type { IPmcData } from "@spt/models/eft/common/IPmcData";
import type { IInventoryBindRequestData } from "@spt/models/eft/inventory/IInventoryBindRequestData";
import type { IInventoryCreateMarkerRequestData } from "@spt/models/eft/inventory/IInventoryCreateMarkerRequestData";
import type { IInventoryDeleteMarkerRequestData } from "@spt/models/eft/inventory/IInventoryDeleteMarkerRequestData";
import type { IInventoryEditMarkerRequestData } from "@spt/models/eft/inventory/IInventoryEditMarkerRequestData";
import type { IInventoryExamineRequestData } from "@spt/models/eft/inventory/IInventoryExamineRequestData";
import type { IInventoryFoldRequestData } from "@spt/models/eft/inventory/IInventoryFoldRequestData";
import type { IInventoryMergeRequestData } from "@spt/models/eft/inventory/IInventoryMergeRequestData";
import type { IInventoryMoveRequestData } from "@spt/models/eft/inventory/IInventoryMoveRequestData";
import type { IInventoryReadEncyclopediaRequestData } from "@spt/models/eft/inventory/IInventoryReadEncyclopediaRequestData";
import type { IInventoryRemoveRequestData } from "@spt/models/eft/inventory/IInventoryRemoveRequestData";
import type { IInventorySortRequestData } from "@spt/models/eft/inventory/IInventorySortRequestData";
import type { IInventorySplitRequestData } from "@spt/models/eft/inventory/IInventorySplitRequestData";
import type { IInventorySwapRequestData } from "@spt/models/eft/inventory/IInventorySwapRequestData";
import type { IInventoryTagRequestData } from "@spt/models/eft/inventory/IInventoryTagRequestData";
import type { IInventoryToggleRequestData } from "@spt/models/eft/inventory/IInventoryToggleRequestData";
import type { IInventoryTransferRequestData } from "@spt/models/eft/inventory/IInventoryTransferRequestData";
import type { IOpenRandomLootContainerRequestData } from "@spt/models/eft/inventory/IOpenRandomLootContainerRequestData";
import type { IPinOrLockItemRequest } from "@spt/models/eft/inventory/IPinOrLockItemRequest";
import type { IRedeemProfileRequestData } from "@spt/models/eft/inventory/IRedeemProfileRequestData";
import type { ISetFavoriteItems } from "@spt/models/eft/inventory/ISetFavoriteItems";
import type { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import type { IFailQuestRequestData } from "@spt/models/eft/quests/IFailQuestRequestData";
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
    pinOrLock(pmcData: IPmcData, request: IPinOrLockItemRequest, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
}
