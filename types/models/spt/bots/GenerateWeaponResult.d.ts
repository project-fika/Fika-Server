import { Mods } from "@spt/models/eft/common/tables/IBotType";
import { Item } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
export declare class GenerateWeaponResult {
    weapon: Item[];
    chosenAmmoTpl: string;
    chosenUbglAmmoTpl: string;
    weaponMods: Mods;
    weaponTemplate: ITemplateItem;
}
