import { Item } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem, Props } from "@spt/models/eft/common/tables/ITemplateItem";
import { IRepairConfig } from "@spt/models/spt/config/IRepairConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
export declare class RepairHelper {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected databaseService: DatabaseService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected repairConfig: IRepairConfig;
    constructor(logger: ILogger, randomUtil: RandomUtil, databaseService: DatabaseService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Alter an items durability after a repair by trader/repair kit
     * @param itemToRepair item to update durability details
     * @param itemToRepairDetails db details of item to repair
     * @param isArmor Is item being repaired a piece of armor
     * @param amountToRepair how many unit of durability to repair
     * @param useRepairKit Is item being repaired with a repair kit
     * @param traderQualityMultipler Trader quality value from traders base json
     * @param applyMaxDurabilityDegradation should item have max durability reduced
     */
    updateItemDurability(itemToRepair: Item, itemToRepairDetails: ITemplateItem, isArmor: boolean, amountToRepair: number, useRepairKit: boolean, traderQualityMultipler: number, applyMaxDurabilityDegradation?: boolean): void;
    /**
     * Repairing armor reduces the total durability value slightly, get a randomised (to 2dp) amount based on armor material
     * @param armorMaterial What material is the armor being repaired made of
     * @param isRepairKit Was a repair kit used
     * @param armorMax Max amount of durability item can have
     * @param traderQualityMultipler Different traders produce different loss values
     * @returns Amount to reduce max durability by
     */
    protected getRandomisedArmorRepairDegradationValue(armorMaterial: string, isRepairKit: boolean, armorMax: number, traderQualityMultipler: number): number;
    /**
     * Repairing weapons reduces the total durability value slightly, get a randomised (to 2dp) amount
     * @param itemProps Weapon properties
     * @param isRepairKit Was a repair kit used
     * @param weaponMax ax amount of durability item can have
     * @param traderQualityMultipler Different traders produce different loss values
     * @returns Amount to reduce max durability by
     */
    protected getRandomisedWeaponRepairDegradationValue(itemProps: Props, isRepairKit: boolean, weaponMax: number, traderQualityMultipler: number): number;
}
