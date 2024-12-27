import type { IMods } from "@spt/models/eft/common/tables/IBotType";
import type { IItem } from "@spt/models/eft/common/tables/IItem";
import type { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
export interface IGenerateWeaponResult {
    weapon: IItem[];
    chosenAmmoTpl: string;
    chosenUbglAmmoTpl: string;
    weaponMods: IMods;
    weaponTemplate: ITemplateItem;
}
