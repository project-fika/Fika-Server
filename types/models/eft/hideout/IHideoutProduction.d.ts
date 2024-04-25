export interface IHideoutProduction {
    _id: string;
    areaType: number;
    requirements: Requirement[];
    productionTime: number;
    /** Tpl of item being crafted */
    endProduct: string;
    isEncoded: boolean;
    locked: boolean;
    needFuelForAllProductionTime: boolean;
    continuous: boolean;
    count: number;
    productionLimitCount: number;
}
export interface Requirement {
    templateId?: string;
    count?: number;
    isEncoded?: boolean;
    isFunctional?: boolean;
    type: string;
    areaType?: number;
    requiredLevel?: number;
    resource?: number;
    questId?: string;
}
