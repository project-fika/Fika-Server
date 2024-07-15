import { MinMax } from "@spt/models/common/MinMax";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IBTRConfig extends IBaseConfig {
    kind: "spt-btr";
    /** How fast the BTR moves */
    moveSpeed: number;
    /** How long the cover fire service lasts for */
    coverFireTime: number;
    /** How long the BTR waits at every point in its path */
    pointWaitTime: MinMax;
    /** How long after purchasing the taxi service before the BTR leaves */
    taxiWaitTime: number;
}
