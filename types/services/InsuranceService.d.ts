import { DialogueHelper } from "@spt/helpers/DialogueHelper";
import { HandbookHelper } from "@spt/helpers/HandbookHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { SecureContainerHelper } from "@spt/helpers/SecureContainerHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { ITraderBase } from "@spt/models/eft/common/tables/ITrader";
import { IInsuredItemsData } from "@spt/models/eft/inRaid/IInsuredItemsData";
import { ISaveProgressRequestData } from "@spt/models/eft/inRaid/ISaveProgressRequestData";
import { IInsuranceConfig } from "@spt/models/spt/config/IInsuranceConfig";
import { ILostOnDeathConfig } from "@spt/models/spt/config/ILostOnDeathConfig";
import { IInsuranceEquipmentPkg } from "@spt/models/spt/services/IInsuranceEquipmentPkg";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocaleService } from "@spt/services/LocaleService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { ICloner } from "@spt/utils/cloners/ICloner";
import { HashUtil } from "@spt/utils/HashUtil";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
export declare class InsuranceService {
    protected logger: ILogger;
    protected databaseService: DatabaseService;
    protected secureContainerHelper: SecureContainerHelper;
    protected randomUtil: RandomUtil;
    protected itemHelper: ItemHelper;
    protected hashUtil: HashUtil;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected traderHelper: TraderHelper;
    protected dialogueHelper: DialogueHelper;
    protected handbookHelper: HandbookHelper;
    protected localisationService: LocalisationService;
    protected localeService: LocaleService;
    protected mailSendService: MailSendService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected insured: Record<string, Record<string, Item[]>>;
    protected insuranceConfig: IInsuranceConfig;
    protected lostOnDeathConfig: ILostOnDeathConfig;
    constructor(logger: ILogger, databaseService: DatabaseService, secureContainerHelper: SecureContainerHelper, randomUtil: RandomUtil, itemHelper: ItemHelper, hashUtil: HashUtil, timeUtil: TimeUtil, saveServer: SaveServer, traderHelper: TraderHelper, dialogueHelper: DialogueHelper, handbookHelper: HandbookHelper, localisationService: LocalisationService, localeService: LocaleService, mailSendService: MailSendService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Does player have insurance array
     * @param sessionId Player id
     * @returns True if exists
     */
    insuranceExists(sessionId: string): boolean;
    /**
     * Get all insured items by all traders for a profile
     * @param sessionId Profile id (session id)
     * @returns Item array
     */
    getInsurance(sessionId: string): Record<string, Item[]>;
    /**
     * Get insured items by profile id + trader id
     * @param sessionId Profile id (session id)
     * @param traderId Trader items were insured with
     * @returns Item array
     */
    getInsuranceItems(sessionId: string, traderId: string): Item[];
    resetInsurance(sessionId: string): void;
    /**
     * Sends stored insured items as message to player
     * @param pmcData profile to send insured items to
     * @param sessionID SessionId of current player
     * @param mapId Id of the map player died/exited that caused the insurance to be issued on
     */
    sendInsuredItems(pmcData: IPmcData, sessionID: string, mapId: string): void;
    /**
     * Check all root insured items and remove location property + set slotId to 'hideout'
     * @param sessionId Session id
     * @param traderId Trader id
     */
    protected removeLocationProperty(sessionId: string, traderId: string): void;
    /**
     * Get a timestamp of when insurance items should be sent to player based on trader used to insure
     * Apply insurance return bonus if found in profile
     * @param pmcData Player profile
     * @param trader Trader base used to insure items
     * @returns Timestamp to return items to player in seconds
     */
    protected getInsuranceReturnTimestamp(pmcData: IPmcData, trader: ITraderBase): number;
    /**
     * Create insurance equipment packages that should be sent to the user. The packages should contain items that have
     * been lost in a raid and should be returned to the player through the insurance system.
     *
     * NOTE: We do not have data on items that were dropped in a raid. This means we have to pull item data from the
     *       profile at the start of the raid to return to the player in insurance. Because of this, the item
     *       positioning may differ from the position the item was in when the player died. Apart from removing all
     *       positioning, this is the best we can do. >:{}
     *
     * @param pmcData Player profile
     * @param offraidData Post-raid data
     * @param preRaidGear Pre-raid data
     * @param sessionID Session id
     * @param playerDied Did player die in raid
     * @returns Array of insured items lost in raid
     */
    getGearLostInRaid(pmcData: IPmcData, offraidData: ISaveProgressRequestData, preRaidGear: Item[], sessionID: string, playerDied: boolean): IInsuranceEquipmentPkg[];
    /**
     * Take the insurance item packages within a profile session and ensure that each of the items in that package are
     * not orphaned from their parent ID.
     *
     * @param sessionID The session ID to update insurance equipment packages in.
     * @returns void
     */
    protected adoptOrphanedInsEquipment(sessionID: string): void;
    /**
     * Store lost gear post-raid inside profile, ready for later code to pick it up and mail it
     * @param equipmentPkg Gear to store - generated by getGearLostInRaid()
     */
    storeGearLostInRaidToSendLater(sessionID: string, equipmentPkg: IInsuranceEquipmentPkg[]): void;
    /**
     * Take preraid item and update properties to ensure its ready to be given to player in insurance return mail
     * @param pmcData Player profile
     * @param preRaidItemWithChildren Insured item (with children) as it was pre-raid
     * @param allItemsFromClient Item data when player left raid (durability values)
     * @returns Item (with children) to send to player
     */
    protected getInsuredItemDetails(pmcData: IPmcData, preRaidItem: Item, insuredItemFromClient: IInsuredItemsData): Item;
    /**
     * Reset slotId property to "hideout" when necessary (used to be in )
     * @param pmcData Players pmcData.Inventory.equipment value
     * @param itemToReturn item we will send to player as insurance return
     */
    protected updateSlotIdValue(playerBaseInventoryEquipmentId: string, itemToReturn: Item): void;
    /**
     * Add gear item to InsuredItems array in player profile
     * @param sessionID Session id
     * @param pmcData Player profile
     * @param itemToReturnToPlayer item to store
     * @param traderId Id of trader item was insured with
     */
    protected addGearToSend(gear: IInsuranceEquipmentPkg): void;
    /**
     * Does insurance exist for a player and by trader
     * @param sessionId Player id (session id)
     * @param traderId Trader items insured with
     * @returns True if exists
     */
    protected insuranceTraderArrayExists(sessionId: string, traderId: string): boolean;
    /**
     * Empty out array holding insured items by sessionid + traderid
     * @param sessionId Player id (session id)
     * @param traderId Trader items insured with
     */
    resetInsuranceTraderArray(sessionId: string, traderId: string): void;
    /**
     * Store insured item
     * @param sessionId Player id (session id)
     * @param traderId Trader item insured with
     * @param itemToAdd Insured item (with children)
     */
    addInsuranceItemToArray(sessionId: string, traderId: string, itemToAdd: Item): void;
    /**
     * Get price of insurance * multiplier from config
     * @param pmcData Player profile
     * @param inventoryItem Item to be insured
     * @param traderId Trader item is insured with
     * @returns price in roubles
     */
    getRoublePriceToInsureItemWithTrader(pmcData: IPmcData, inventoryItem: Item, traderId: string): number;
    /**
     * Returns the ID that should be used for a root-level Item's parentId property value within in the context of insurance.
     * @param sessionID Players id
     * @returns The root item Id.
     */
    getRootItemParentID(sessionID: string): string;
}
