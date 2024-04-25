import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { RepairHelper } from "@spt-aki/helpers/RepairHelper";
import { TraderHelper } from "@spt-aki/helpers/TraderHelper";
import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
import { RepairKitsInfo } from "@spt-aki/models/eft/repair/IRepairActionDataRequest";
import { RepairItem } from "@spt-aki/models/eft/repair/ITraderRepairActionDataRequest";
import { BonusType } from "@spt-aki/models/enums/BonusType";
import { SkillTypes } from "@spt-aki/models/enums/SkillTypes";
import { BonusSettings, IRepairConfig } from "@spt-aki/models/spt/config/IRepairConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocalisationService } from "@spt-aki/services/LocalisationService";
import { PaymentService } from "@spt-aki/services/PaymentService";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
export declare class RepairService {
    protected logger: ILogger;
    protected databaseServer: DatabaseServer;
    protected profileHelper: ProfileHelper;
    protected randomUtil: RandomUtil;
    protected itemHelper: ItemHelper;
    protected traderHelper: TraderHelper;
    protected weightedRandomHelper: WeightedRandomHelper;
    protected paymentService: PaymentService;
    protected repairHelper: RepairHelper;
    protected localisationService: LocalisationService;
    protected configServer: ConfigServer;
    protected repairConfig: IRepairConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, profileHelper: ProfileHelper, randomUtil: RandomUtil, itemHelper: ItemHelper, traderHelper: TraderHelper, weightedRandomHelper: WeightedRandomHelper, paymentService: PaymentService, repairHelper: RepairHelper, localisationService: LocalisationService, configServer: ConfigServer);
    /**
     * Use trader to repair an items durability
     * @param sessionID Session id
     * @param pmcData profile to find item to repair in
     * @param repairItemDetails details of the item to repair
     * @param traderId Trader being used to repair item
     * @returns RepairDetails object
     */
    repairItemByTrader(sessionID: string, pmcData: IPmcData, repairItemDetails: RepairItem, traderId: string): RepairDetails;
    /**
     * @param sessionID Session id
     * @param pmcData profile to take money from
     * @param repairedItemId Repaired item id
     * @param repairCost Cost to repair item in roubles
     * @param traderId Id of the trader who repaired the item / who is paid
     * @param output
     */
    payForRepair(sessionID: string, pmcData: IPmcData, repairedItemId: string, repairCost: number, traderId: string, output: IItemEventRouterResponse): void;
    /**
     * Add skill points to profile after repairing an item
     * @param sessionId Session id
     * @param repairDetails details of item repaired, cost/item
     * @param pmcData Profile to add points to
     */
    addRepairSkillPoints(sessionId: string, repairDetails: RepairDetails, pmcData: IPmcData): void;
    protected getIntellectGainedFromRepair(repairDetails: RepairDetails): number;
    /**
     * Return an appromixation of the amount of skill points live would return for the given repairDetails
     * @param repairDetails the repair details to calculate skill points for
     * @returns the number of skill points to reward the user
     */
    protected getWeaponRepairSkillPoints(repairDetails: RepairDetails): number;
    /**
     * @param sessionId Session id
     * @param pmcData Profile to update repaired item in
     * @param repairKits Array of Repair kits to use
     * @param itemToRepairId Item id to repair
     * @param output IItemEventRouterResponse
     * @returns Details of repair, item/price
     */
    repairItemByKit(sessionId: string, pmcData: IPmcData, repairKits: RepairKitsInfo[], itemToRepairId: string, output: IItemEventRouterResponse): RepairDetails;
    /**
     * Calculate value repairkit points need to be divided by to get the durability points to be added to an item
     * @param itemToRepairDetails Item to repair details
     * @param isArmor Is the item being repaired armor
     * @param pmcData Player profile
     * @returns Number to divide kit points by
     */
    protected getKitDivisor(itemToRepairDetails: ITemplateItem, isArmor: boolean, pmcData: IPmcData): number;
    /**
     * Get the bonus multiplier for a skill from a player profile
     * @param skillBonus Bonus to get multipler of
     * @param pmcData Player profile to look in for skill
     * @returns Multiplier value
     */
    protected getBonusMultiplierValue(skillBonus: BonusType, pmcData: IPmcData): number;
    /**
     * Should a repair kit apply total durability loss on repair
     * @param pmcData Player profile
     * @param applyRandomizeDurabilityLoss Value from repair config
     * @returns True if loss should be applied
     */
    protected shouldRepairKitApplyDurabilityLoss(pmcData: IPmcData, applyRandomizeDurabilityLoss: boolean): boolean;
    /**
     * Update repair kits Resource object if it doesn't exist
     * @param repairKitDetails Repair kit details from db
     * @param repairKitInInventory Repair kit to update
     */
    protected addMaxResourceToKitIfMissing(repairKitDetails: ITemplateItem, repairKitInInventory: Item): void;
    /**
     * Chance to apply buff to an item (Armor/weapon) if repaired by armor kit
     * @param repairDetails Repair details of item
     * @param pmcData Player profile
     */
    addBuffToItem(repairDetails: RepairDetails, pmcData: IPmcData): void;
    /**
     * Add random buff to item
     * @param itemConfig weapon/armor config
     * @param repairDetails Details for item to repair
     */
    addBuff(itemConfig: BonusSettings, item: Item): void;
    /**
     * Check if item should be buffed by checking the item type and relevant player skill level
     * @param repairDetails Item that was repaired
     * @param itemTpl tpl of item to be buffed
     * @param pmcData Player profile
     * @returns True if item should have buff applied
     */
    protected shouldBuffItem(repairDetails: RepairDetails, pmcData: IPmcData): boolean;
    /**
     * Based on item, what underlying skill does this item use for buff settings
     * @param itemTemplate Item to check for skill
     * @returns Skill name
     */
    protected getItemSkillType(itemTemplate: ITemplateItem): SkillTypes | undefined;
    /**
     * Ensure multiplier is between 1 and 0.01
     * @param receiveDurabilityMaxPercent Max durability percent
     * @param receiveDurabilityPercent current durability percent
     * @returns durability multiplier value
     */
    protected getDurabilityMultiplier(receiveDurabilityMaxPercent: number, receiveDurabilityPercent: number): number;
}
export declare class RepairDetails {
    repairCost?: number;
    repairPoints?: number;
    repairedItem: Item;
    repairedItemIsArmor: boolean;
    repairAmount: number;
    repairedByKit: boolean;
}
