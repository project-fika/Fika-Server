import { ISkills } from "@spt/models/eft/common/tables/IBotBase";
export interface IPlayerIncrementSkillLevelRequestData {
    _id: string;
    experience: number;
    quests: any[];
    ragFairOffers: any[];
    builds: any[];
    items: Items;
    production: Production;
    skills: ISkills;
    traderRelations: TraderRelations;
}
export interface Items {
    new: any[];
    change: any[];
    del: any[];
}
export type Production = {};
export type TraderRelations = {};
