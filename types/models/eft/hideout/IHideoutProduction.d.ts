import { MinMax } from "@spt/models/common/MinMax";
export interface IHideoutProductionData {
    recipes: IHideoutProduction[];
    scavRecipes: IScavRecipe[];
    cultistRecipes: ICultistRecipe[];
}
export interface IHideoutProduction {
    _id: string;
    areaType: number;
    requirements: IRequirement[];
    productionTime: number;
    /** Tpl of item being crafted */
    endProduct: string;
    isEncoded: boolean;
    locked: boolean;
    needFuelForAllProductionTime: boolean;
    continuous: boolean;
    count: number;
    productionLimitCount: number;
    isCodeProduction: boolean;
}
export interface IRequirement extends IRequirementBase {
    templateId?: string;
    count?: number;
    isEncoded?: boolean;
    isFunctional?: boolean;
    isSpawnedInSession?: boolean;
    areaType?: number;
    requiredLevel?: number;
    resource?: number;
    questId?: string;
}
export interface IRequirementBase {
    type: string;
}
export type IScavRecipe = {
    _id: string;
    requirements: IRequirement[];
    productionTime: number;
    endProducts: IEndProducts;
};
export interface IEndProducts {
    Common: MinMax;
    Rare: MinMax;
    Superrare: MinMax;
}
export type ICultistRecipe = {
    _id: string;
};
