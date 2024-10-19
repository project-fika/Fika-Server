import { IGenerationData } from "@spt/models/eft/common/tables/IBotType";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IPlayerScavConfig extends IBaseConfig {
    kind: "spt-playerscav";
    karmaLevel: Record<string, IKarmaLevel>;
}
export interface IKarmaLevel {
    botTypeForLoot: string;
    modifiers: IModifiers;
    itemLimits: ItemLimits;
    equipmentBlacklist: Record<string, string[]>;
    lootItemsToAddChancePercent: Record<string, number>;
}
export interface IModifiers {
    equipment: Record<string, number>;
    mod: Record<string, number>;
}
export interface ItemLimits {
    healing: IGenerationData;
    drugs: IGenerationData;
    stims: IGenerationData;
    looseLoot: IGenerationData;
    magazines: IGenerationData;
    grenades: IGenerationData;
}
