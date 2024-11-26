import { IRequirementBase } from "@spt/models/eft/hideout/IHideoutProduction";
import { BonusSkillType } from "@spt/models/enums/BonusSkillType";
import { BonusType } from "@spt/models/enums/BonusType";
export interface IHideoutArea {
    _id: string;
    type: number;
    enabled: boolean;
    needsFuel: boolean;
    requirements: IAreaRequirement[];
    takeFromSlotLocked: boolean;
    craftGivesExp: boolean;
    displayLevel: boolean;
    enableAreaRequirements: boolean;
    parentArea?: string;
    stages: Record<string, IStage>;
}
export interface IAreaRequirement {
    areaType: number;
    requiredlevel: number;
    type: string;
}
export interface IStage {
    autoUpgrade: boolean;
    bonuses: IStageBonus[];
    constructionTime: number;
    /** Containers inventory tpl */
    container?: string;
    description: string;
    displayInterface: boolean;
    improvements: IStageImprovement[];
    requirements: IStageRequirement[];
    slots: number;
}
export interface IStageImprovement {
    id: string;
    bonuses: IStageImprovementBonus[];
    improvementTime: number;
    requirements: IStageImprovementRequirement[];
}
export interface IStageImprovementBonus {
    passive: boolean;
    production: boolean;
    type: string;
    value: number;
    visible: boolean;
}
export interface IStageImprovementRequirement {
    count: number;
    isEncoded: boolean;
    isFunctional: boolean;
    templateId: string;
    type: string;
}
export interface IStageRequirement extends IRequirementBase {
    areaType?: number;
    requiredLevel?: number;
    templateId?: string;
    count?: number;
    isEncoded?: false;
    isFunctional?: boolean;
    traderId?: string;
    loyaltyLevel?: number;
    skillName?: string;
    skillLevel?: number;
}
export interface IStageBonus {
    value: number;
    passive: boolean;
    production: boolean;
    visible: boolean;
    skillType?: BonusSkillType;
    type: BonusType;
    filter?: string[];
    icon?: string;
    /** CHANGES PER DUMP */
    id?: string;
    templateId?: string;
}
