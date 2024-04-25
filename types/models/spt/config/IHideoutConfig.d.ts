import { IBaseConfig } from "@spt-aki/models/spt/config/IBaseConfig";
export interface IHideoutConfig extends IBaseConfig {
    kind: "aki-hideout";
    runIntervalSeconds: number;
    hoursForSkillCrafting: number;
    expCraftAmount: number;
}
