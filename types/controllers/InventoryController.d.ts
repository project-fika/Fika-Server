import { LootGenerator } from "@spt/generators/LootGenerator";
import { HideoutHelper } from "@spt/helpers/HideoutHelper";
import { InventoryHelper } from "@spt/helpers/InventoryHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { PaymentHelper } from "@spt/helpers/PaymentHelper";
import { PresetHelper } from "@spt/helpers/PresetHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IInventoryBindRequestData } from "@spt/models/eft/inventory/IInventoryBindRequestData";
import { IInventoryCreateMarkerRequestData } from "@spt/models/eft/inventory/IInventoryCreateMarkerRequestData";
import { IInventoryDeleteMarkerRequestData } from "@spt/models/eft/inventory/IInventoryDeleteMarkerRequestData";
import { IInventoryEditMarkerRequestData } from "@spt/models/eft/inventory/IInventoryEditMarkerRequestData";
import { IInventoryExamineRequestData } from "@spt/models/eft/inventory/IInventoryExamineRequestData";
import { IInventoryFoldRequestData } from "@spt/models/eft/inventory/IInventoryFoldRequestData";
import { IInventoryMergeRequestData } from "@spt/models/eft/inventory/IInventoryMergeRequestData";
import { IInventoryMoveRequestData } from "@spt/models/eft/inventory/IInventoryMoveRequestData";
import { IInventoryReadEncyclopediaRequestData } from "@spt/models/eft/inventory/IInventoryReadEncyclopediaRequestData";
import { IInventoryRemoveRequestData } from "@spt/models/eft/inventory/IInventoryRemoveRequestData";
import { IInventorySortRequestData } from "@spt/models/eft/inventory/IInventorySortRequestData";
import { IInventorySplitRequestData } from "@spt/models/eft/inventory/IInventorySplitRequestData";
import { IInventorySwapRequestData } from "@spt/models/eft/inventory/IInventorySwapRequestData";
import { IInventoryTagRequestData } from "@spt/models/eft/inventory/IInventoryTagRequestData";
import { IInventoryToggleRequestData } from "@spt/models/eft/inventory/IInventoryToggleRequestData";
import { IInventoryTransferRequestData } from "@spt/models/eft/inventory/IInventoryTransferRequestData";
import { IOpenRandomLootContainerRequestData } from "@spt/models/eft/inventory/IOpenRandomLootContainerRequestData";
import { IRedeemProfileRequestData } from "@spt/models/eft/inventory/IRedeemProfileRequestData";
import { ISetFavoriteItems } from "@spt/models/eft/inventory/ISetFavoriteItems";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { ISptProfile } from "@spt/models/eft/profile/ISptProfile";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt/routers/EventOutputHolder";
import { DatabaseService } from "@spt/services/DatabaseService";
import { FenceService } from "@spt/services/FenceService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MapMarkerService } from "@spt/services/MapMarkerService";
import { PlayerService } from "@spt/services/PlayerService";
import { RagfairOfferService } from "@spt/services/RagfairOfferService";
import { HashUtil } from "@spt/utils/HashUtil";
import { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class InventoryController {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected itemHelper: ItemHelper;
    protected randomUtil: RandomUtil;
    protected databaseService: DatabaseService;
    protected fenceService: FenceService;
    protected presetHelper: PresetHelper;
    protected inventoryHelper: InventoryHelper;
    protected questHelper: QuestHelper;
    protected hideoutHelper: HideoutHelper;
    protected ragfairOfferService: RagfairOfferService;
    protected mapMarkerService: MapMarkerService;
    protected profileHelper: ProfileHelper;
    protected paymentHelper: PaymentHelper;
    protected traderHelper: TraderHelper;
    protected localisationService: LocalisationService;
    protected playerService: PlayerService;
    protected lootGenerator: LootGenerator;
    protected eventOutputHolder: EventOutputHolder;
    protected httpResponseUtil: HttpResponseUtil;
    protected cloner: ICloner;
    constructor(logger: ILogger, hashUtil: HashUtil, itemHelper: ItemHelper, randomUtil: RandomUtil, databaseService: DatabaseService, fenceService: FenceService, presetHelper: PresetHelper, inventoryHelper: InventoryHelper, questHelper: QuestHelper, hideoutHelper: HideoutHelper, ragfairOfferService: RagfairOfferService, mapMarkerService: MapMarkerService, profileHelper: ProfileHelper, paymentHelper: PaymentHelper, traderHelper: TraderHelper, localisationService: LocalisationService, playerService: PlayerService, lootGenerator: LootGenerator, eventOutputHolder: EventOutputHolder, httpResponseUtil: HttpResponseUtil, cloner: ICloner);
    /**
     * Move Item
     * change location of item with parentId and slotId
     * transfers items from one profile to another if fromOwner/toOwner is set in the body.
     * otherwise, move is contained within the same profile_f.
     * @param pmcData Profile
     * @param moveRequest Move request data
     * @param sessionID Session id
     * @param output Client response
     */
    moveItem(pmcData: IPmcData, moveRequest: IInventoryMoveRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Get a event router response with inventory trader message
     * @param output Item event router response
     * @returns Item event router response
     */
    protected appendTraderExploitErrorResponse(output: IItemEventRouterResponse): void;
    /**
     * Handle Remove event
     * Implements functionality "Discard" from Main menu (Stash etc.)
     * Removes item from PMC Profile
     */
    discardItem(pmcData: IPmcData, request: IInventoryRemoveRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Split Item
     * spliting 1 stack into 2
     * @param pmcData Player profile (unused, getOwnerInventoryItems() gets profile)
     * @param request Split request
     * @param sessionID Session/player id
     * @param output Client response
     * @returns IItemEventRouterResponse
     */
    splitItem(pmcData: IPmcData, request: IInventorySplitRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Fully merge 2 inventory stacks together into one stack (merging where both stacks remain is called 'transfer')
     * Deletes item from `body.item` and adding number of stacks into `body.with`
     * @param pmcData Player profile (unused, getOwnerInventoryItems() gets profile)
     * @param body Merge request
     * @param sessionID Player id
     * @param output Client response
     * @returns IItemEventRouterResponse
     */
    mergeItem(pmcData: IPmcData, body: IInventoryMergeRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * TODO: Adds no data to output to send to client, is this by design?
     * Transfer items from one stack into another while keeping original stack
     * Used to take items from scav inventory into stash or to insert ammo into mags (shotgun ones) and reloading weapon by clicking "Reload"
     * @param pmcData Player profile
     * @param body Transfer request
     * @param sessionID Session id
     * @param output Client response
     * @returns IItemEventRouterResponse
     */
    transferItem(pmcData: IPmcData, body: IInventoryTransferRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Swap Item
     * its used for "reload" if you have weapon in hands and magazine is somewhere else in rig or backpack in equipment
     * Also used to swap items using quick selection on character screen
     */
    swapItem(pmcData: IPmcData, request: IInventorySwapRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handles folding of Weapons
     */
    foldItem(pmcData: IPmcData, request: IInventoryFoldRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Toggles "Toggleable" items like night vision goggles and face shields.
     * @param pmcData player profile
     * @param body Toggle request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    toggleItem(pmcData: IPmcData, body: IInventoryToggleRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Add a tag to an inventory item
     * @param pmcData profile with item to add tag to
     * @param body tag request data
     * @param sessionID session id
     * @returns client response object
     */
    tagItem(pmcData: IPmcData, body: IInventoryTagRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Bind an inventory item to the quick access menu at bottom of player screen
     * Handle bind event
     * @param pmcData Player profile
     * @param bindRequest Reqeust object
     * @param sessionID Session id
     * @returns IItemEventRouterResponse
     */
    bindItem(pmcData: IPmcData, bindRequest: IInventoryBindRequestData, sessionID: string): void;
    /**
     * Unbind an inventory item from quick access menu at bottom of player screen
     * Handle unbind event
     * @param pmcData Player profile
     * @param bindRequest Request object
     * @param sessionID Session id
     * @param output Client response
     */
    unbindItem(pmcData: IPmcData, request: IInventoryBindRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Handles examining an item
     * @param pmcData player profile
     * @param body request object
     * @param sessionID session id
     * @param output Client response
     * @returns response
     */
    examineItem(pmcData: IPmcData, body: IInventoryExamineRequestData, sessionID: string, output: IItemEventRouterResponse): IItemEventRouterResponse;
    /**
     * Flag an item as seen in profiles encyclopedia + add inspect xp to profile
     * @param itemTpls Inspected item tpls
     * @param fullProfile Profile to add xp to
     */
    protected flagItemsAsInspectedAndRewardXp(itemTpls: string[], fullProfile: ISptProfile): void;
    /**
     * Get the tplid of an item from the examine request object
     * @param request Response request
     * @returns tplId
     */
    protected getExaminedItemTpl(request: IInventoryExamineRequestData): string;
    readEncyclopedia(pmcData: IPmcData, body: IInventoryReadEncyclopediaRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle ApplyInventoryChanges
     * Sorts supplied items.
     * @param pmcData Player profile
     * @param request sort request
     * @param sessionID Session id
     */
    sortInventory(pmcData: IPmcData, request: IInventorySortRequestData, sessionID: string): void;
    /**
     * Add note to a map
     * @param pmcData Player profile
     * @param request Add marker request
     * @param sessionID Session id
     * @param output Client response
     * @returns IItemEventRouterResponse
     */
    createMapMarker(pmcData: IPmcData, request: IInventoryCreateMarkerRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Delete a map marker
     * @param pmcData Player profile
     * @param request Delete marker request
     * @param sessionID Session id
     * @param output Client response
     */
    deleteMapMarker(pmcData: IPmcData, request: IInventoryDeleteMarkerRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Edit an existing map marker
     * @param pmcData Player profile
     * @param request Edit marker request
     * @param sessionID Session id
     * @param output Client response
     */
    editMapMarker(pmcData: IPmcData, request: IInventoryEditMarkerRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    /**
     * Handle OpenRandomLootContainer event
     * Handle event fired when a container is unpacked (currently only the halloween pumpkin)
     * @param pmcData Profile data
     * @param body Open loot container request data
     * @param sessionID Session id
     * @param output Client response
     */
    openRandomLootContainer(pmcData: IPmcData, body: IOpenRandomLootContainerRequestData, sessionID: string, output: IItemEventRouterResponse): void;
    redeemProfileReward(pmcData: IPmcData, request: IRedeemProfileRequestData, sessionId: string): void;
    setFavoriteItem(pmcData: IPmcData, request: ISetFavoriteItems, sessionId: string): void;
}
