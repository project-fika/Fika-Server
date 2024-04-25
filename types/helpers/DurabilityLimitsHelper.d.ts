import { BotHelper } from "@spt-aki/helpers/BotHelper";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
export declare class DurabilityLimitsHelper {
    protected randomUtil: RandomUtil;
    protected botHelper: BotHelper;
    protected configServer: ConfigServer;
    protected botConfig: IBotConfig;
    constructor(randomUtil: RandomUtil, botHelper: BotHelper, configServer: ConfigServer);
    /**
     * Get max durability for a weapon based on bot role
     * @param itemTemplate UNUSED - Item to get durability for
     * @param botRole Role of bot to get max durability for
     * @returns Max durability of weapon
     */
    getRandomizedMaxWeaponDurability(itemTemplate: ITemplateItem, botRole: string): number;
    /**
     * Get max durability value for armor based on bot role
     * @param itemTemplate Item to get max durability for
     * @param botRole Role of bot to get max durability for
     * @returns max durability
     */
    getRandomizedMaxArmorDurability(itemTemplate: ITemplateItem, botRole: string): number;
    /**
     * Get randomised current weapon durability by bot role
     * @param itemTemplate Unused - Item to get current durability of
     * @param botRole Role of bot to get current durability for
     * @param maxDurability Max durability of weapon
     * @returns Current weapon durability
     */
    getRandomizedWeaponDurability(itemTemplate: ITemplateItem, botRole: string, maxDurability: number): number;
    /**
     * Get randomised current armor durability by bot role
     * @param itemTemplate Unused - Item to get current durability of
     * @param botRole Role of bot to get current durability for
     * @param maxDurability Max durability of armor
     * @returns Current armor durability
     */
    getRandomizedArmorDurability(itemTemplate: ITemplateItem, botRole: string, maxDurability: number): number;
    protected generateMaxWeaponDurability(botRole: string): number;
    protected generateMaxPmcArmorDurability(itemMaxDurability: number): number;
    protected getLowestMaxWeaponFromConfig(botRole: string): number;
    protected getHighestMaxWeaponDurabilityFromConfig(botRole: string): number;
    protected generateWeaponDurability(botRole: string, maxDurability: number): number;
    protected generateArmorDurability(botRole: string, maxDurability: number): number;
    protected getMinWeaponDeltaFromConfig(botRole: string): number;
    protected getMaxWeaponDeltaFromConfig(botRole: string): number;
    protected getMinArmorDeltaFromConfig(botRole: string): number;
    protected getMaxArmorDeltaFromConfig(botRole: string): number;
    protected getMinArmorLimitPercentFromConfig(botRole: string): number;
    protected getMinWeaponLimitPercentFromConfig(botRole: string): number;
}
