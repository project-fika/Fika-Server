import { IInventoryMagGen } from "@spt/generators/weapongen/IInventoryMagGen";
import { InventoryMagGen } from "@spt/generators/weapongen/InventoryMagGen";
import { BotGeneratorHelper } from "@spt/helpers/BotGeneratorHelper";
import { BotWeaponGeneratorHelper } from "@spt/helpers/BotWeaponGeneratorHelper";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LocalisationService } from "@spt/services/LocalisationService";
import { RandomUtil } from "@spt/utils/RandomUtil";
export declare class ExternalInventoryMagGen implements IInventoryMagGen {
    protected logger: ILogger;
    protected itemHelper: ItemHelper;
    protected localisationService: LocalisationService;
    protected botWeaponGeneratorHelper: BotWeaponGeneratorHelper;
    protected botGeneratorHelper: BotGeneratorHelper;
    protected randomUtil: RandomUtil;
    constructor(logger: ILogger, itemHelper: ItemHelper, localisationService: LocalisationService, botWeaponGeneratorHelper: BotWeaponGeneratorHelper, botGeneratorHelper: BotGeneratorHelper, randomUtil: RandomUtil);
    getPriority(): number;
    canHandleInventoryMagGen(inventoryMagGen: InventoryMagGen): boolean;
    process(inventoryMagGen: InventoryMagGen): void;
    /**
     * Get a random compatible external magazine for a weapon, exclude internal magazines from possible pool
     * @param weaponTpl Weapon to get mag for
     * @returns tpl of magazine
     */
    protected getRandomExternalMagazineForInternalMagazineGun(weaponTpl: string, magazineBlacklist: string[]): ITemplateItem | undefined;
}
