import { IMods } from "@spt/models/eft/common/tables/IBotType";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
export interface IGenerateWeaponResult {
    weapon: IItem[];
    chosenAmmoTpl: string;
    chosenUbglAmmoTpl: string;
    weaponMods: IMods;
    weaponTemplate: ITemplateItem;
}
