import { Inventory } from "@spt-aki/models/eft/common/tables/IBotBase";
import { GenerationData } from "@spt-aki/models/eft/common/tables/IBotType";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
export declare class InventoryMagGen {
    private magCounts;
    private magazineTemplate;
    private weaponTemplate;
    private ammoTemplate;
    private pmcInventory;
    constructor(magCounts: GenerationData, magazineTemplate: ITemplateItem, weaponTemplate: ITemplateItem, ammoTemplate: ITemplateItem, pmcInventory: Inventory);
    getMagCount(): GenerationData;
    getMagazineTemplate(): ITemplateItem;
    getWeaponTemplate(): ITemplateItem;
    getAmmoTemplate(): ITemplateItem;
    getPmcInventory(): Inventory;
}
