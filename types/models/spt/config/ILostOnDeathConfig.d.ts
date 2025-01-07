import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface ILostOnDeathConfig extends IBaseConfig {
    kind: "spt-lostondeath";
    /** What equipment in each slot should be lost on death */
    equipment: ILostEquipment;
    /** Should special slot items be removed from quest inventory on death e.g. wifi camera/markers */
    specialSlotItems: boolean;
    /** Should quest items be removed from quest inventory on death */
    questItems: boolean;
}
export interface ILostEquipment {
    ArmBand: boolean;
    Headwear: boolean;
    Earpiece: boolean;
    FaceCover: boolean;
    ArmorVest: boolean;
    Eyewear: boolean;
    TacticalVest: boolean;
    PocketItems: boolean;
    Backpack: boolean;
    Holster: boolean;
    FirstPrimaryWeapon: boolean;
    SecondPrimaryWeapon: boolean;
    Scabbard: boolean;
}
