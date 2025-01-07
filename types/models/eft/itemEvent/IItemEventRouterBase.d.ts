import { IHealth, IHideoutImprovement, IMoneyTransferLimits, IProductive, IQuestStatus, ISkills } from "@spt/models/eft/common/tables/IBotBase";
import { IItem, IItemLocation, IUpd } from "@spt/models/eft/common/tables/IItem";
import { IQuest } from "@spt/models/eft/common/tables/IQuest";
import { IPmcDataRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
import { IRagfairOffer } from "@spt/models/eft/ragfair/IRagfairOffer";
import { EquipmentBuildType } from "@spt/models/enums/EquipmentBuildType";
export interface IItemEventRouterBase {
    warnings: Warning[];
    profileChanges: TProfileChanges | "";
}
export type TProfileChanges = Record<string, IProfileChange>;
export interface Warning {
    index: number;
    errmsg: string;
    code?: string;
    data?: any;
}
export interface IProfileChange {
    _id: string;
    experience: number;
    quests: IQuest[];
    ragFairOffers: IRagfairOffer[];
    weaponBuilds: IWeaponBuildChange[];
    equipmentBuilds: IEquipmentBuildChange[];
    items: IItemChanges;
    production: Record<string, IProductive>;
    /** Hideout area improvement id */
    improvements: Record<string, IHideoutImprovement>;
    skills: ISkills;
    health: IHealth;
    traderRelations: Record<string, ITraderData>;
    moneyTransferLimitData: IMoneyTransferLimits;
    repeatableQuests?: IPmcDataRepeatableQuest[];
    recipeUnlocked: Record<string, boolean>;
    changedHideoutStashes?: Record<string, IHideoutStashItem>;
    questsStatus: IQuestStatus[];
}
export interface IHideoutStashItem {
    id: string;
    tpl: string;
}
export interface IWeaponBuildChange {
    id: string;
    name: string;
    root: string;
    items: IItem[];
}
export interface IEquipmentBuildChange {
    id: string;
    name: string;
    root: string;
    items: IItem[];
    type: string;
    fastpanel: any[];
    buildType: EquipmentBuildType;
}
export interface IItemChanges {
    new: IProduct[];
    change: IProduct[];
    del: IProduct[];
}
/** Related to TraderInfo */
export interface ITraderData {
    salesSum: number;
    standing: number;
    loyalty: number;
    unlocked: boolean;
    disabled: boolean;
}
export interface IProduct {
    _id: string;
    _tpl?: string;
    parentId?: string;
    slotId?: string;
    location?: IItemLocation;
    upd?: IUpd;
}
