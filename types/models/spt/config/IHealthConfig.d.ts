import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface IHealthConfig extends IBaseConfig {
    kind: "spt-health";
    healthMultipliers: HealthMultipliers;
    save: Save;
}
export interface HealthMultipliers {
    death: number;
    blacked: number;
}
export interface Save {
    health: boolean;
    effects: boolean;
}
