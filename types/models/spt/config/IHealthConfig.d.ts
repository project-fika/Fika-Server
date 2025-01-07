import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IHealthConfig extends IBaseConfig {
    kind: "spt-health";
    healthMultipliers: IHealthMultipliers;
    save: ISave;
}
export interface IHealthMultipliers {
    death: number;
    blacked: number;
}
export interface ISave {
    health: boolean;
    effects: boolean;
}
