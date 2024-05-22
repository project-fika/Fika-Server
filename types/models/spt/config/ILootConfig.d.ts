import { Spawnpoint } from "@spt/models/eft/common/ILooseLoot";
import { IBaseConfig } from "@spt/models/spt/config/IBaseConfig";
export interface ILootConfig extends IBaseConfig {
    kind: "spt-loot";
    /** Spawn positions to add into a map, key=mapid */
    looseLoot: Record<string, Spawnpoint[]>;
    /** Loose loot probability adjustments to apply on game start */
    looseLootSpawnPointAdjustments: Record<string, Record<string, number>>;
}
