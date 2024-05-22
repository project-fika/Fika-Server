import { IBaseConfig, IRunIntervalValues } from "@spt/models/spt/config/IBaseConfig";
export interface IHideoutConfig extends IBaseConfig {
    kind: "spt-hideout";
    /** How many seconds should pass before hideout crafts / fuel usage is checked and procesed */
    runIntervalSeconds: number;
    /** Default values used to hydrate `runIntervalSeconds` with */
    runIntervalValues: IRunIntervalValues;
    hoursForSkillCrafting: number;
    expCraftAmount: number;
    overrideCraftTimeSeconds: number;
    overrideBuildTimeSeconds: number;
    /** Only process a profiles hideout crafts when it has been active in the last x minutes */
    updateProfileHideoutWhenActiveWithinMinutes: number;
}
