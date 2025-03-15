import type { IQuestCondition } from "@spt/models/eft/common/tables/IQuest";
export interface IHideoutCustomisation {
    globals: IHideoutCustomisationGlobal[];
    slots: IHideoutCustomisationSlot[];
}
export interface IHideoutCustomisationGlobal {
    id: string;
    conditions: IQuestCondition[];
    type: string;
    index: number;
    systemName: string;
    isEnabled: boolean;
    itemId: string;
}
export interface IHideoutCustomisationSlot {
    id: string;
    conditions: IQuestCondition[];
    type: string;
    index: number;
    systemName: string;
    isEnabled: boolean;
    slotId: string;
    areaTypeId: number;
}
