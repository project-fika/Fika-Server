import { DialogueHelper } from "@spt-aki/helpers/DialogueHelper";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IGetInsuranceCostRequestData } from "@spt-aki/models/eft/insurance/IGetInsuranceCostRequestData";
import { IGetInsuranceCostResponseData } from "@spt-aki/models/eft/insurance/IGetInsuranceCostResponseData";
import { IInsureRequestData } from "@spt-aki/models/eft/insurance/IInsureRequestData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { Insurance } from "@spt-aki/models/eft/profile/IAkiProfile";
import { IInsuranceConfig } from "@spt-aki/models/spt/config/IInsuranceConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { EventOutputHolder } from "@spt-aki/routers/EventOutputHolder";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { SaveServer } from "@spt-aki/servers/SaveServer";
import { InsuranceService } from "@spt-aki/services/InsuranceService";
import { MailSendService } from "@spt-aki/services/MailSendService";
import { PaymentService } from "@spt-aki/services/PaymentService";
import { RagfairPriceService } from "@spt-aki/services/RagfairPriceService";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { MathUtil } from "@spt-aki/utils/MathUtil";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";
export declare class InsuranceController {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected mathUtil: MathUtil;
    protected jsonUtil: JsonUtil;
    protected hashUtil: HashUtil;
    protected eventOutputHolder: EventOutputHolder;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseServer: DatabaseServer;
    protected itemHelper: ItemHelper;
    protected profileHelper: ProfileHelper;
    protected dialogueHelper: DialogueHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected traderHelper: TraderHelper;
    protected paymentService: PaymentService;
    protected insuranceService: InsuranceService;
    protected mailSendService: MailSendService;
    protected ragfairPriceService: RagfairPriceService;
    protected configServer: ConfigServer;
    protected insuranceConfig: IInsuranceConfig;
    protected roubleTpl: string;
    constructor(logger: ILogger, randomUtil: RandomUtil, mathUtil: MathUtil, jsonUtil: JsonUtil, hashUtil: HashUtil, eventOutputHolder: EventOutputHolder, timeUtil: TimeUtil, saveServer: SaveServer, databaseServer: DatabaseServer, itemHelper: ItemHelper, profileHelper: ProfileHelper, dialogueHelper: DialogueHelper, weightedRandomHelper: WeightedRandomHelper, traderHelper: TraderHelper, paymentService: PaymentService, insuranceService: InsuranceService, mailSendService: MailSendService, ragfairPriceService: RagfairPriceService, configServer: ConfigServer);
    /**
     * Process insurance items of all profiles prior to being given back to the player through the mail service.
     *
     * @returns void
     */
    processReturn(): void;
    /**
     * Process insurance items of a single profile prior to being given back to the player through the mail service.
     *
     * @returns void
     */
    processReturnByProfile(sessionID: string): void;
    /**
     * Get all insured items that are ready to be processed in a specific profile.
     *
     * @param sessionID Session ID of the profile to check.
     * @param time The time to check ready status against. Current time by default.
     * @returns All insured items that are ready to be processed.
     */
    protected filterInsuredItems(sessionID: string, time?: number): Insurance[];
    /**
     * This method orchestrates the processing of insured items in a profile.
     *
     * @param insuranceDetails The insured items to process.
     * @param sessionID The session ID that should receive the processed items.
     * @returns void
     */
    protected processInsuredItems(insuranceDetails: Insurance[], sessionID: string): void;
    /**
     * Count all items in all insurance packages.
     * @param insurance
     * @returns
     */
    protected countAllInsuranceItems(insurance: Insurance[]): number;
    /**
     * Remove an insurance package from a profile using the package's system data information.
     *
     * @param sessionID The session ID of the profile to remove the package from.
     * @param index The array index of the insurance package to remove.
     * @returns void
     */
    protected removeInsurancePackageFromProfile(sessionID: string, insPackage: Insurance): void;
    /**
     * Finds the items that should be deleted based on the given Insurance object.
     *
     * @param rootItemParentID - The ID that should be assigned to all "hideout"/root items.
     * @param insured - The insurance object containing the items to evaluate for deletion.
     * @returns A Set containing the IDs of items that should be deleted.
     */
    protected findItemsToDelete(rootItemParentID: string, insured: Insurance): Set<string>;
    /**
     * Initialize a Map object that holds main-parents to all of their attachments. Note that "main-parent" in this
     * context refers to the parent item that an attachment is attached to. For example, a suppressor attached to a gun,
     * not the backpack that the gun is located in (the gun's parent).
     *
     * @param rootItemParentID - The ID that should be assigned to all "hideout"/root items.
     * @param insured - The insurance object containing the items to evaluate.
     * @param itemsMap - A Map object for quick item look-up by item ID.
     * @returns A Map object containing parent item IDs to arrays of their attachment items.
     */
    protected populateParentAttachmentsMap(rootItemParentID: string, insured: Insurance, itemsMap: Map<string, Item>): Map<string, Item[]>;
    /**
     * Remove attachments that can not be moddable in-raid from the parentAttachmentsMap. If no moddable attachments
     * remain, the parent is removed from the map as well.
     *
     * @param parentAttachmentsMap - A Map object containing parent item IDs to arrays of their attachment items.
     * @param itemsMap - A Map object for quick item look-up by item ID.
     * @returns A Map object containing parent item IDs to arrays of their attachment items which are not moddable in-raid.
     */
    protected removeNonModdableAttachments(parentAttachmentsMap: Map<string, Item[]>, itemsMap: Map<string, Item>): Map<string, Item[]>;
    /**
     * Process "regular" insurance items. Any insured item that is not an attached, attachment is considered a "regular"
     * item. This method iterates over them, preforming item deletion rolls to see if they should be deleted. If so,
     * they (and their attached, attachments, if any) are marked for deletion in the toDelete Set.
     *
     * @param insured The insurance object containing the items to evaluate.
     * @param toDelete A Set to keep track of items marked for deletion.
     * @param parentAttachmentsMap A Map object containing parent item IDs to arrays of their attachment items.
     * @returns void
     */
    protected processRegularItems(insured: Insurance, toDelete: Set<string>, parentAttachmentsMap: Map<string, Item[]>): void;
    /**
     * Process parent items and their attachments, updating the toDelete Set accordingly.
     *
     * @param mainParentToAttachmentsMap A Map object containing parent item IDs to arrays of their attachment items.
     * @param itemsMap A Map object for quick item look-up by item ID.
     * @param traderId The trader ID from the Insurance object.
     * @param toDelete A Set object to keep track of items marked for deletion.
     */
    protected processAttachments(mainParentToAttachmentsMap: Map<string, Item[]>, itemsMap: Map<string, Item>, traderId: string, toDelete: Set<string>): void;
    /**
     * Takes an array of attachment items that belong to the same main-parent item, sorts them in descending order by
     * their maximum price. For each attachment, a roll is made to determine if a deletion should be made. Once the
     * number of deletions has been counted, the attachments are added to the toDelete Set, starting with the most
     * valuable attachments first.
     *
     * @param attachments The array of attachment items to sort, filter, and roll.
     * @param traderId The ID of the trader to that has ensured these items.
     * @param toDelete The array that accumulates the IDs of the items to be deleted.
     * @returns void
     */
    protected processAttachmentByParent(attachments: Item[], traderId: string, toDelete: Set<string>): void;
    protected logAttachmentsBeingRemoved(attachmentIdsToRemove: string[], attachments: Item[], attachmentPrices: Record<string, number>): void;
    protected weightAttachmentsByPrice(attachments: Item[]): Record<string, number>;
    /**
     * Get count of items to remove from weapon (take into account trader + price of attachment)
     * @param weightedAttachmentByPrice Dict of item Tpls and thier rouble price
     * @param traderId Trader attachment insured against
     * @returns Attachment count to remove
     */
    protected getAttachmentCountToRemove(weightedAttachmentByPrice: Record<string, number>, traderId: string): number;
    /**
     * Remove items from the insured items that should not be returned to the player.
     *
     * @param insured The insured items to process.
     * @param toDelete The items that should be deleted.
     * @returns void
     */
    protected removeItemsFromInsurance(insured: Insurance, toDelete: Set<string>): void;
    /**
     * Handle sending the insurance message to the user that potentially contains the valid insurance items.
     *
     * @param sessionID The session ID that should receive the insurance message.
     * @param insurance The context of insurance to use.
     * @returns void
     */
    protected sendMail(sessionID: string, insurance: Insurance): void;
    /**
     * Determines whether an insured item should be removed from the player's inventory based on a random roll and
     * trader-specific return chance.
     *
     * @param traderId The ID of the trader who insured the item.
     * @param insuredItem Optional. The item to roll for. Only used for logging.
     * @returns true if the insured item should be removed from inventory, false otherwise, or null on error.
     */
    protected rollForDelete(traderId: string, insuredItem?: Item): boolean | null;
    /**
     * Handle Insure event
     * Add insurance to an item
     *
     * @param pmcData Player profile
     * @param body Insurance request
     * @param sessionID Session id
     * @returns IItemEventRouterResponse object to send to client
     */
    insure(pmcData: IPmcData, body: IInsureRequestData, sessionID: string): IItemEventRouterResponse;
    /**
     * Handle client/insurance/items/list/cost
     * Calculate insurance cost
     *
     * @param request request object
     * @param sessionID session id
     * @returns IGetInsuranceCostResponseData object to send to client
     */
    cost(request: IGetInsuranceCostRequestData, sessionID: string): IGetInsuranceCostResponseData;
}
