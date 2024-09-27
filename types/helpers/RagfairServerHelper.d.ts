import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { TraderHelper } from "@spt/helpers/TraderHelper";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { IQuestConfig } from "@spt/models/spt/config/IQuestConfig";
import { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { SaveServer } from "@spt/servers/SaveServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { ItemFilterService } from "@spt/services/ItemFilterService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { MailSendService } from "@spt/services/MailSendService";
import { RandomUtil } from "@spt/utils/RandomUtil";
import { TimeUtil } from "@spt/utils/TimeUtil";
import { ICloner } from "@spt/utils/cloners/ICloner";
/**
 * Helper class for common ragfair server actions
 */
export declare class RagfairServerHelper {
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected saveServer: SaveServer;
    protected databaseService: DatabaseService;
    protected profileHelper: ProfileHelper;
    protected itemHelper: ItemHelper;
    protected traderHelper: TraderHelper;
    protected mailSendService: MailSendService;
    protected localisationService: LocalisationService;
    protected itemFilterService: ItemFilterService;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected ragfairConfig: IRagfairConfig;
    protected questConfig: IQuestConfig;
    protected static goodsReturnedTemplate: string;
    constructor(logger: ILogger, randomUtil: RandomUtil, timeUtil: TimeUtil, saveServer: SaveServer, databaseService: DatabaseService, profileHelper: ProfileHelper, itemHelper: ItemHelper, traderHelper: TraderHelper, mailSendService: MailSendService, localisationService: LocalisationService, itemFilterService: ItemFilterService, configServer: ConfigServer, cloner: ICloner);
    /**
     * Is item valid / on blacklist / quest item
     * @param itemDetails
     * @returns boolean
     */
    isItemValidRagfairItem(itemDetails: [boolean, ITemplateItem]): boolean;
    /**
     * Is supplied item tpl on the ragfair custom blacklist from configs/ragfair.json/dynamic
     * @param itemTemplateId Item tpl to check is blacklisted
     * @returns True if its blacklsited
     */
    protected isItemOnCustomFleaBlacklist(itemTemplateId: string): boolean;
    /**
     * Is supplied parent id on the ragfair custom item category blacklist
     * @param parentId Parent Id to check is blacklisted
     * @returns true if blacklisted
     */
    protected isItemCategoryOnCustomFleaBlacklist(itemParentId: string): boolean;
    /**
     * is supplied id a trader
     * @param traderId
     * @returns True if id was a trader
     */
    isTrader(traderId: string): boolean;
    /**
     * Send items back to player
     * @param sessionID Player to send items to
     * @param returnedItems Items to send to player
     */
    returnItems(sessionID: string, returnedItems: IItem[]): void;
    calculateDynamicStackCount(tplId: string, isWeaponPreset: boolean): number;
    /**
     * Choose a currency at random with bias
     * @returns currency tpl
     */
    getDynamicOfferCurrency(): string;
    /**
     * Given a preset id from globals.json, return an array of items[] with unique ids
     * @param item Preset item
     * @returns Array of weapon and its children
     */
    getPresetItems(item: IItem): IItem[];
    /**
     * Possible bug, returns all items associated with an items tpl, could be multiple presets from globals.json
     * @param item Preset item
     * @returns
     */
    getPresetItemsByTpl(item: IItem): IItem[];
}
