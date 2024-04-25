import { GenerationData } from "@spt-aki/models/eft/common/tables/IBotType";
import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IPlayerScavConfig extends IBaseConfig {
    kind: "aki-playerscav";
    karmaLevel: Record<string, KarmaLevel>;
}
export interface KarmaLevel {
    botTypeForLoot: string;
    modifiers: Modifiers;
    itemLimits: ItemLimits;
    equipmentBlacklist: Record<string, string[]>;
    lootItemsToAddChancePercent: Record<string, number>;
}
export interface Modifiers {
    equipment: Record<string, number>;
    mod: Record<string, number>;
}
export interface ItemLimits {
    healing: GenerationData;
    drugs: GenerationData;
    stims: GenerationData;
    looseLoot: GenerationData;
    magazines: GenerationData;
    grenades: GenerationData;
}
