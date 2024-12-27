import type { IInventory } from "@spt/models/eft/common/tables/IBotBase";
import type { IGenerationData } from "@spt/models/eft/common/tables/IBotType";
import type { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
export declare class InventoryMagGen {
    private magCounts;
    private magazineTemplate;
    private weaponTemplate;
    private ammoTemplate;
    private pmcInventory;
    constructor(magCounts: IGenerationData, magazineTemplate: ITemplateItem, weaponTemplate: ITemplateItem, ammoTemplate: ITemplateItem, pmcInventory: IInventory);
    getMagCount(): IGenerationData;
    getMagazineTemplate(): ITemplateItem;
    getWeaponTemplate(): ITemplateItem;
    getAmmoTemplate(): ITemplateItem;
    getPmcInventory(): IInventory;
}
